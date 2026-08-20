import { MIN_LEGAL_NOTICE_DAYS, currentLegalVersions, legalNoticeDays, type LegalDocument } from "@common/utils/legal-docs.ts";
import { PLATFORM_TOPICS } from "@common/utils/notifications/platform-topics.ts";
import type { BroadcastInput } from "@common/types/notifications/Notification.ts";
import type { IIdentityNotifyManager } from "@common/types/identity/IIdentityManagerService.ts";
import type { ILogger } from "@interfaces/utils/ILogger.js";
import { LEGAL_DOC_LIST } from "../domain/sources.ts";

/**
 * Aviso de que se desplegó una versión nueva de un documento legal.
 *
 * Vivía en `SessionManagerService`, que lo hacía porque valida la aceptación y por lo tanto sabe
 * qué versión rige. Se movió acá con el resto del gobierno de los documentos: el aviso, el PDF
 * congelado y el estado de la versión son la misma operación vista desde tres lados, y tenerlos en
 * servicios distintos era justamente lo que hacía imposible saber si un cambio se comunicó.
 *
 * Lo que no cambió: la marca de "ya avisado" vive en Redis y no en Mongo —no vale un modelo nuevo
 * para un par de strings, y el peor caso de perder la clave es un aviso repetido, que para un
 * cambio legal es el lado seguro del error—, y el `broadcastId` determinista deja que
 * `NotificationService` deduplique la doble entrega.
 */

/** Marca de versiones ya anunciadas. Bajo el `keyPrefix` del servicio (`adc:legal:`). */
const ANNOUNCED_KEY = "announced-versions";

/** Margen tras el arranque antes de mirar si hay algo que anunciar. */
export const ANNOUNCE_CHECK_DELAY_MS = 30_000;

interface RedisLike {
	get(key: string): Promise<string | null>;
	set(key: string, value: string, ttlSeconds?: number): Promise<void>;
}

export interface AnnouncerDeps {
	redis: RedisLike | null;
	logger: ILogger;
	/** `BaseModule.emitBroadcast` del servicio: `"dropped"` = no salió. */
	emitBroadcast(input: BroadcastInput): Promise<string>;
	/** Aviso al equipo. `null` si el servicio de identidad no está. */
	identityNotify(): IIdentityNotifyManager | null;
	/** Corre `fn` sólo en el nodo con el lease (sin `OperationsService`, corre igual). */
	onlyOnLeader(name: string, ttlSeconds: number, fn: () => Promise<void>): Promise<void>;
	/** Asienta la corrida en el historial. */
	record(entry: { ok: boolean; summary: string; docIds: string[]; actorUserId?: string | null }): Promise<void>;
}

export class LegalAnnouncer {
	readonly #deps: AnnouncerDeps;

	constructor(deps: AnnouncerDeps) {
		this.#deps = deps;
	}

	/**
	 * Chequeo automático del arranque. Corre bajo lease porque un despliegue de N nodos lo dispara N
	 * veces casi a la vez: el que llega primero sella la marca y los demás la leen ya escrita.
	 */
	async checkOnBoot(): Promise<void> {
		await this.#deps.onlyOnLeader("legal.version-check", 600, () => this.#batch());
	}

	async #batch(): Promise<void> {
		const { redis, logger } = this.#deps;
		if (!redis) return;

		const docs = LEGAL_DOC_LIST;
		const current: Record<string, string> = Object.fromEntries(docs.map((doc) => [doc.id, doc.version]));
		try {
			const raw = await redis.get(ANNOUNCED_KEY);
			const previous = raw ? this.#parse(raw) : null;

			// Primer arranque con la clave vacía: sellar sin avisar. Es también lo que hace segura la
			// mudanza desde SessionManagerService —su marca vivía bajo otro prefijo—: al no encontrar
			// nada acá, el servicio adopta lo desplegado como punto de partida en vez de anunciarle a
			// todas las cuentas cuatro cambios que no ocurrieron.
			if (!previous || Object.keys(previous).length === 0) {
				await redis.set(ANNOUNCED_KEY, JSON.stringify(current));
				const sealed = docs.map((d) => `${d.id} ${d.version}`).join(", ");
				await this.#deps.record({ ok: true, summary: `Punto de partida sellado sin anunciar: ${sealed}`, docIds: docs.map((d) => d.id) });
				return;
			}

			// Un documento visto por primera vez se sella sin anunciar: sólo se anuncia un CAMBIO de
			// versión respecto de lo ya sellado.
			const changed = docs.filter((doc) => previous[doc.id] && previous[doc.id] !== doc.version);
			if (changed.length === 0) {
				if (raw !== JSON.stringify(current)) await redis.set(ANNOUNCED_KEY, JSON.stringify(current));
				return;
			}

			// Sellar sólo si el aviso salió: si se descartó, el próximo arranque lo reintenta. Un aviso
			// repetido lo deduplica `NotificationService`; uno perdido no lo recupera nadie.
			if (await this.announce(changed)) await redis.set(ANNOUNCED_KEY, JSON.stringify(current));
			else logger.logWarn("[LegalDocs] Cambio de documentos legales sin anunciar: se reintenta en el próximo arranque");
		} catch (err: any) {
			logger.logWarn(`[LegalDocs] Chequeo de versión de documentos legales falló: ${err?.message || err}`);
		}
	}

	/**
	 * Versiones ya anunciadas, tolerando el formato viejo (`{termsVersion, privacyVersion}`): sin
	 * esta compatibilidad, un Redis que venga de la implementación anterior trataría a terms/privacy
	 * como "nunca vistos".
	 */
	#parse(raw: string): Record<string, string> {
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		const out: Record<string, string> = {};
		if (typeof parsed.termsVersion === "string") out.terms = parsed.termsVersion;
		if (typeof parsed.privacyVersion === "string") out.privacy = parsed.privacyVersion;
		const known = new Set<string>(LEGAL_DOC_LIST.map((d) => d.id));
		for (const [id, version] of Object.entries(parsed)) {
			if (typeof version === "string" && known.has(id)) out[id] = version;
		}
		return out;
	}

	/**
	 * Anuncia a TODAS las personas usuarias (`platform.legal`, canal in-app no silenciable) y al
	 * equipo. El aviso sale al desplegar la versión nueva y dice desde cuándo rige: eso es lo que
	 * hace cierto el preaviso de los Términos, porque la re-aceptación no se pide hasta
	 * `effectiveFrom`. Un `effectiveFrom` demasiado cerca de la publicación deja el compromiso
	 * incumplido, así que se loguea como error en vez de pasar en silencio.
	 *
	 * @returns `false` si el anuncio a las personas usuarias se descartó: el caller no debe dar el
	 * cambio por avisado.
	 */
	async announce(changed: readonly LegalDocument[], actorUserId?: string | null): Promise<boolean> {
		const { logger } = this.#deps;
		for (const doc of changed) {
			const days = legalNoticeDays(doc);
			if (days < MIN_LEGAL_NOTICE_DAYS) {
				logger.logError(
					`[LegalDocs] ${doc.label} ${doc.version} rige desde ${doc.effectiveFrom}: ${days} día(s) de preaviso, menos de los ${MIN_LEGAL_NOTICE_DAYS} comprometidos en los Términos`
				);
			}
		}

		const detail = changed.map((doc) => `${doc.label} (rige desde el ${doc.effectiveFrom})`).join(" y ");
		// Los informativos se anuncian igual, pero sin prometer una re-aceptación que nunca se pide.
		const requiresAcceptance = changed.some((doc) => doc.requiresAcceptance);
		const stamp = changed.map((doc) => `${doc.id}@${doc.version}`).join("+");
		const mode = await this.#deps.emitBroadcast({
			broadcastId: `legal:${stamp}`,
			topic: PLATFORM_TOPICS.legal.topic,
			title: "Actualizamos nuestros documentos legales",
			body: requiresAcceptance
				? `Cambió: ${detail}. Podés leer el texto nuevo ahora; a partir de esa fecha te vamos a pedir que lo aceptes para seguir usando la plataforma.`
				: `Cambió: ${detail}. Podés leer el texto nuevo ahora; rige desde esa fecha, sin necesidad de volver a aceptar nada.`,
			link: changed[0].href,
			// Ruta de la app `help`: que la resuelva el cliente según entorno en vez de clavar un dominio.
			linkApp: "help",
			data: { changed: changed.map((doc) => ({ id: doc.id, version: doc.version, effectiveFrom: doc.effectiveFrom })) },
		});

		await this.#deps.identityNotify()?.legalDocsUpdated({ changed: changed.map((doc) => doc.label), ...currentLegalVersions() });

		const ok = mode !== "dropped";
		logger.logInfo(`[LegalDocs] Documentos legales actualizados (${changed.map((doc) => doc.label).join(", ")}): anuncio ${mode}`);
		await this.#deps.record({
			ok,
			summary: ok ? `Aviso ${mode}: ${detail}` : `Aviso DESCARTADO (sin subsistema de notificaciones): ${detail}`,
			docIds: changed.map((doc) => doc.id),
			actorUserId,
		});
		return ok;
	}

	/** Re-sella la marca con lo desplegado. Se llama tras un re-anuncio manual exitoso. */
	async seal(): Promise<void> {
		const current = Object.fromEntries(LEGAL_DOC_LIST.map((doc) => [doc.id, doc.version]));
		await this.#deps.redis?.set(ANNOUNCED_KEY, JSON.stringify(current));
	}
}
