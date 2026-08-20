import type { Model } from "mongoose";
import { BaseService } from "@services/BaseService.js";
import { EnableEndpoints, DisableEndpoints } from "@services/core/EndpointManagerService/index.js";
import type { Kernel } from "@kernel";
import type MongoProvider from "@providers/object/mongo/index.js";
import type RedisProvider from "@providers/queue/redis/index.js";
import type { IAuditLogService } from "@common/types/security/AuditLog.ts";
import type { IIdentityManagerService } from "@common/types/identity/IIdentityManagerService.ts";
import type { IOperationsService } from "@common/types/operations/IOperationsService.ts";
import { LEGAL_DOCUMENTS, nextLegalVersionDates, type LegalDocument } from "@common/utils/legal-docs.ts";
import { nodeId } from "@common/utils/cluster-env.ts";
import { LegalError } from "@common/types/custom-errors/LegalError.ts";
import type { LegalOverview, LegalRunsPage } from "@common/types/legal/index.ts";
import { describeDoc, describeProblems } from "./domain/lifecycle.ts";
import { LEGAL_DOC_LIST, hashDeployedSource } from "./domain/sources.ts";
import { findPdf } from "./pdf/inventory.ts";
import { buildMissingPdfs, rebuildPdf, type PdfBuildResult } from "./pdf/runner.ts";
import { buildLegalRunSchema, LegalRunLog, type LegalRunRecord } from "./dao/runs.ts";
import { AdoptionCounter } from "./dao/adoption.ts";
import { ANNOUNCE_CHECK_DELAY_MS, LegalAnnouncer } from "./announce/announcer.ts";
import { LegalAdminEndpoints } from "./endpoints/admin.ts";

interface LegalPrivateConfig {
	runsRetentionDays?: number | string;
}

/** Retención del historial de operación (5 años, igual que el archivo de constancias). */
const DEFAULT_RUNS_RETENTION_DAYS = 1825;

/**
 * Gobierno del ciclo de vida de los documentos legales.
 *
 * El texto vive en el código (`sourcePath` de cada entrada de `LEGAL_DOCUMENTS`) y viaja con su
 * número en el mismo despliegue: eso es lo que hace imposible que un nodo sirva un texto mientras
 * un registro central afirma otra versión. Lo que faltaba no era administrar el número, sino
 * **ver**: qué rige, hasta cuándo, si el texto desplegado sigue siendo el que la versión sella, qué
 * PDF congelado tiene este nodo, si el aviso salió, y cuánta gente aceptó.
 *
 * Tres cosas que este servicio hace y antes no hacía nadie:
 *  - verifica el `contentHash` **en runtime**, contra el archivo real (lo hacía un hook de git que
 *    hay que instalar a mano en cada clon, o sea que no corría donde importaba);
 *  - deja asentada cada corrida de los automatismos —generar PDF, anunciar—, que hasta ahora sólo
 *    dejaban un `console.log` y una clave en Redis;
 *  - da una salida registrada para regenerar un PDF congelado, que era borrar el archivo a mano en
 *    el volumen de despliegue.
 */
export default class LegalDocsService extends BaseService {
	public readonly name = "LegalDocsService";

	readonly #mongoProvider: MongoProvider;
	#redis: RedisProvider | null = null;
	#runs: LegalRunLog | null = null;
	#adoption: AdoptionCounter | null = null;
	#announcer: LegalAnnouncer | null = null;
	#announceTimer: ReturnType<typeof setTimeout> | null = null;

	constructor(kernel: Kernel, options?: ConstructorParameters<typeof BaseService>[1]) {
		super(kernel, options);
		this.#mongoProvider = this.getMyProvider<MongoProvider>("object/mongo");
	}

	@EnableEndpoints({ managers: () => [LegalAdminEndpoints] })
	async start(kernelKey: symbol): Promise<void> {
		await super.start(kernelKey);
		await this.#waitConnected();

		const model = this.#mongoProvider.createModel<LegalRunRecord>("legal_runs", buildLegalRunSchema(this.#runsRetentionSeconds()));
		await this.#syncIndexes(model);
		this.#runs = new LegalRunLog(model, nodeId());

		try {
			this.#redis = this.getMyProvider<RedisProvider>("queue/redis");
		} catch {
			// Sin Redis no hay anuncio ni caché de cifras; el resto de la pantalla sirve igual.
			this.#redis = null;
		}
		this.#adoption = new AdoptionCounter(this.#redis, this.logger);
		this.#announcer = this.#buildAnnouncer();

		LegalAdminEndpoints.init(this);
		await this.#auditBoot();

		// El anuncio espera igual que antes: si arranca a la vez que el subsistema de
		// notificaciones, el broadcast se descartaría y habría que reintentarlo en el próximo boot.
		this.#announceTimer = setTimeout(() => void this.#announcer?.checkOnBoot(), ANNOUNCE_CHECK_DELAY_MS);
		this.logger.logOk(`${this.name} iniciado`);
	}

	@DisableEndpoints()
	async stop(kernelKey: symbol): Promise<void> {
		if (this.#announceTimer) clearTimeout(this.#announceTimer);
		this.#announceTimer = null;
		await super.stop(kernelKey);
		this.#runs = null;
		this.#announcer = null;
	}

	// ─── API que consumen los endpoints ───────────────────────────────────────

	/** Estado completo: los cuatro documentos de ESTE nodo más las cifras de aceptación. */
	async overview(): Promise<LegalOverview> {
		const now = new Date();
		const docs = await Promise.all(
			LEGAL_DOC_LIST.map(async (doc) => {
				const [deployedHash, pdf] = await Promise.all([hashDeployedSource(doc), findPdf(doc)]);
				return describeDoc(doc, deployedHash, pdf, now);
			})
		);
		// Sin token de sesión: el agregado corre con la capability del servicio, no en nombre de quien mira.
		return { docs, adoption: (await this.#adoption?.read(this.#users())) ?? null, nextVersion: nextLegalVersionDates(now), nodeId: nodeId() };
	}

	listRuns(limit?: number, cursor?: string): Promise<LegalRunsPage> {
		return this.#requireRuns().list(limit, cursor);
	}

	/** Genera los PDF que falten. Idempotente: es la misma corrida que hace el arranque. */
	async buildPdfs(actorUserId: string | null): Promise<PdfBuildResult> {
		const result = await buildMissingPdfs(process.cwd(), this.logger);
		await this.#recordPdfRun("pdf", result, actorUserId);
		return result;
	}

	/**
	 * Regenera el PDF congelado de un documento. Destructivo, así que **fail-closed**: sin auditoría
	 * disponible no se ejecuta. Un archivo congelado es la copia que le queda a quien aceptó; que
	 * pueda cambiar sin dejar quién y por qué lo volvería inútil como prueba.
	 */
	async rebuildPdf(docId: string, reason: string, actorUserId: string): Promise<PdfBuildResult> {
		const doc = this.#requireDoc(docId);
		const audit = this.tryGetMyService<IAuditLogService>("AuditLogService");
		if (!audit?.isWritable()) {
			throw new LegalError(503, "AUDIT_UNAVAILABLE", "Sin auditoría disponible no se regenera un documento publicado");
		}
		await audit.recordStrict(this.getCapability(), {
			action: "legal.pdf-rebuild",
			actorUserId,
			targetResource: `legal:${doc.id}@${doc.version}`,
			context: { docId: doc.id, version: doc.version, reason: reason.slice(0, 300), node: nodeId() },
		});

		const result = await rebuildPdf(process.cwd(), doc, this.logger);
		await this.#requireRuns().record({
			kind: "rebuild",
			actorUserId,
			ok: result.ok,
			summary: result.ok ? `PDF de ${doc.label} ${doc.version} regenerado — ${reason}` : `Regeneración fallida: ${result.error ?? "sin detalle"}`,
			docIds: [doc.id],
		});
		if (!result.ok) throw new LegalError(500, "PDF_BUILD_FAILED", result.error ?? "No se pudo regenerar el PDF");
		return result;
	}

	/**
	 * Re-dispara el aviso de un documento. Para cuando el broadcast automático se descartó porque el
	 * subsistema de notificaciones no estaba: `NotificationService` deduplica por `broadcastId`, así
	 * que a quien ya le llegó no le llega dos veces.
	 */
	async announce(docId: string, actorUserId: string): Promise<{ ok: boolean }> {
		const doc = this.#requireDoc(docId);
		const announcer = this.#announcer;
		if (!announcer) throw new LegalError(503, "LEGAL_UNAVAILABLE", "El anunciador no está disponible");

		const ok = await announcer.announce([doc], actorUserId);
		if (!ok) throw new LegalError(503, "ANNOUNCE_DROPPED", "El aviso no salió: el subsistema de notificaciones no está disponible");
		await announcer.seal();
		return { ok };
	}

	// ─── Interno ──────────────────────────────────────────────────────────────

	#buildAnnouncer(): LegalAnnouncer {
		return new LegalAnnouncer({
			redis: this.#redis,
			logger: this.logger,
			emitBroadcast: (input) => this.emitBroadcast(input),
			identityNotify: () => {
				try {
					return this.tryGetMyService<IIdentityManagerService>("IdentityManagerService")?.notifications(this.getCapability()) ?? null;
				} catch {
					return null;
				}
			},
			onlyOnLeader: async (name, ttlSeconds, fn) => {
				// Sin `OperationsService` corre igual: en un despliegue de un nodo negarse sería peor
				// que el trabajo duplicado que evita.
				const ops = this.tryGetMyService<IOperationsService>("OperationsService");
				if (ops) await ops.withLeadership(name, ttlSeconds, fn);
				else await fn();
			},
			record: (entry) => this.#requireRuns().record({ kind: "announce", ...entry }),
		});
	}

	/**
	 * Al arrancar: verifica el sello de los cuatro documentos, genera los PDF que falten y deja todo
	 * asentado. Es lo que reemplaza al `bun scripts/build-legal-pdfs.ts` colgado de `bun run start`,
	 * que corría en cada boot de producción sin decírselo a nadie.
	 */
	async #auditBoot(): Promise<void> {
		// Generar ANTES de diagnosticar: al revés, el arranque asienta "falta el PDF" y acto seguido
		// lo genera, dejando en el historial un problema que ya no existe.
		if ((await this.overview()).docs.some((d) => !d.pdf)) {
			await this.#recordPdfRun("pdf", await buildMissingPdfs(process.cwd(), this.logger), null);
		}

		const overview = await this.overview();
		const problems: string[] = [];
		for (const view of overview.docs) {
			for (const problem of describeProblems(view)) problems.push(`${view.label}: ${problem}`);
		}

		for (const line of problems) this.logger.logWarn(`[LegalDocs] ${line}`);
		if (problems.length === 0) {
			// Un arranque limpio NO deja entrada: en desarrollo el kernel se reinicia decenas de
			// veces por día y el historial se volvería ilegible justo cuando hay algo que leer.
			this.logger.logDebug("[LegalDocs] Los cuatro documentos coinciden con su hash sellado");
			return;
		}
		await this.#requireRuns().record({
			kind: "pdf",
			ok: false,
			summary: `Arranque: ${problems.join(" · ")}`,
			docIds: overview.docs.filter((d) => describeProblems(d).length > 0).map((d) => d.id),
		});
	}

	async #recordPdfRun(kind: "pdf", result: PdfBuildResult, actorUserId: string | null): Promise<void> {
		let summary: string;
		if (!result.ok) summary = `Falló: ${result.error ?? "sin detalle"}`;
		else if (result.written.length > 0) summary = `Generados ${result.written.length}: ${result.written.join(", ")}`;
		else summary = "Nada que generar: los cuatro PDF ya estaban congelados";
		await this.#requireRuns().record({ kind, actorUserId, ok: result.ok, summary, docIds: [] });
	}

	#requireDoc(docId: string): LegalDocument {
		const doc = (LEGAL_DOCUMENTS as Record<string, LegalDocument | undefined>)[docId];
		if (!doc) throw new LegalError(404, "UNKNOWN_DOCUMENT", `No existe el documento legal "${docId}"`);
		return doc;
	}

	#requireRuns(): LegalRunLog {
		if (!this.#runs) throw new LegalError(503, "LEGAL_UNAVAILABLE", "El servicio de documentos legales no está listo");
		return this.#runs;
	}

	/** Manager de usuarios por la superficie interna; `null` si el servicio de identidad no está. */
	#users() {
		try {
			return this.tryGetMyService<IIdentityManagerService>("IdentityManagerService")?._internal(this.getCapability()).users ?? null;
		} catch {
			return null;
		}
	}

	#runsRetentionSeconds(): number {
		const raw = (this.config?.private as LegalPrivateConfig | undefined)?.runsRetentionDays;
		const days = typeof raw === "string" ? Number.parseInt(raw, 10) : raw;
		return (Number.isFinite(days) && days! > 0 ? days! : DEFAULT_RUNS_RETENTION_DAYS) * 86_400;
	}

	async #syncIndexes(model: Model<any>): Promise<void> {
		try {
			await model.syncIndexes();
		} catch (err: any) {
			this.logger.logWarn(`[LegalDocsService] syncIndexes de ${model.collection.name} falló: ${err?.message || err}`);
		}
	}

	async #waitConnected(): Promise<void> {
		const t0 = Date.now();
		while (!this.#mongoProvider.isConnected() && Date.now() - t0 < 10000) await new Promise((r) => setTimeout(r, 250));
		if (!this.#mongoProvider.isConnected()) throw new Error("[LegalDocsService] Mongo no se conectó en el tiempo esperado");
	}
}
