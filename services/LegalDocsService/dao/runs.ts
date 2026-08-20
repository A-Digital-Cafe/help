import { Schema, type Model } from "mongoose";
import { randomUUID } from "node:crypto";
import type { LegalRun, LegalRunKind, LegalRunsPage } from "@common/types/legal/index.ts";

/**
 * Historial de ejecuciones sobre los documentos legales, en la colección `legal_runs`.
 *
 * Existe porque los dos automatismos que tocan estos documentos —la generación de PDF al arrancar
 * y el aviso de cambio de versión— corrían sin dejar más rastro que un `console.log` y una clave en
 * Redis. Quien administra la plataforma no tenía forma de saber si el aviso salió, cuándo, ni desde
 * qué nodo. Append-only, con TTL: es un registro de operación, no una prueba legal (esa es el PDF).
 */

export interface LegalRunRecord {
	id: string;
	kind: LegalRunKind;
	at: Date;
	nodeId: string;
	/** `null` = lo disparó el arranque del servicio y no una persona. */
	actorUserId: string | null;
	ok: boolean;
	summary: string;
	docIds: string[];
}

/** Página por defecto del historial. */
export const RUNS_PAGE_SIZE = 25;

/**
 * Índices por `syncIndexes()` y no por autoIndex: cambiar la retención cambia las opciones del TTL
 * y autoIndex abortaría con IndexOptionsConflict (mismo criterio que `audit_log`).
 */
export function buildLegalRunSchema(retentionSeconds: number): Schema<LegalRunRecord> {
	const schema = new Schema<LegalRunRecord>(
		{
			id: { type: String, required: true, unique: true },
			kind: { type: String, required: true },
			at: { type: Date, required: true, default: () => new Date() },
			nodeId: { type: String, required: true },
			actorUserId: { type: String, default: null },
			ok: { type: Boolean, required: true },
			summary: { type: String, required: true },
			docIds: { type: [String], default: [] },
		},
		{ versionKey: false, autoIndex: false, collection: "legal_runs" }
	);

	schema.index({ at: -1 });
	schema.index({ at: 1 }, { expireAfterSeconds: retentionSeconds });
	return schema;
}

/** Cuánto se guarda de `summary`: es una línea de tabla, no un log. */
const MAX_SUMMARY = 500;

export class LegalRunLog {
	readonly #model: Model<LegalRunRecord>;
	readonly #nodeId: string;

	constructor(model: Model<LegalRunRecord>, nodeId: string) {
		this.#model = model;
		this.#nodeId = nodeId;
	}

	/**
	 * Asienta una ejecución. **Nunca lanza**: perder una línea del historial no puede tumbar la
	 * operación que la produjo (que puede ser el arranque del servicio).
	 */
	async record(entry: { kind: LegalRunKind; actorUserId?: string | null; ok: boolean; summary: string; docIds?: string[] }): Promise<void> {
		try {
			await this.#model.create({
				id: randomUUID(),
				kind: entry.kind,
				at: new Date(),
				nodeId: this.#nodeId,
				actorUserId: entry.actorUserId ?? null,
				ok: entry.ok,
				summary: entry.summary.slice(0, MAX_SUMMARY),
				docIds: entry.docIds ?? [],
			});
		} catch {
			/* histórico best-effort */
		}
	}

	/** Página del historial, del más nuevo al más viejo. `cursor` es el `at` ISO del último visto. */
	async list(limit = RUNS_PAGE_SIZE, cursor?: string): Promise<LegalRunsPage> {
		const size = Math.min(Math.max(limit, 1), 100);
		const query: Record<string, unknown> = {};
		const at = cursor ? new Date(cursor) : null;
		if (at && !Number.isNaN(at.getTime())) query.at = { $lt: at };

		const docs = await this.#model
			.find(query, { _id: 0 })
			.sort({ at: -1 })
			.limit(size + 1)
			.lean<LegalRunRecord[]>();

		const hasMore = docs.length > size;
		const items: LegalRun[] = docs.slice(0, size).map((d) => ({
			id: d.id,
			kind: d.kind,
			at: d.at.toISOString(),
			nodeId: d.nodeId,
			actorUserId: d.actorUserId,
			ok: d.ok,
			summary: d.summary,
			docIds: d.docIds ?? [],
		}));
		return { items, nextCursor: hasMore ? (items.at(-1)?.at ?? null) : null };
	}
}
