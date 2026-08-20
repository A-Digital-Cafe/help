import { RegisterEndpoint, type EndpointCtx } from "@services/core/EndpointManagerService/index.js";
import { AuthError } from "@common/types/custom-errors/AuthError.ts";
import { P } from "@common/types/Permissions.ts";
import type LegalDocsService from "../index.js";
import * as LS from "./schemas/admin.ts";

const TAG = "LegalDocsService/Admin";

/**
 * Gobierno de los documentos legales. Recurso `security` (global-only) con su propio bit `legal`:
 * administrar los documentos que la gente acepta no es lo mismo que instruir incidentes ni que leer
 * el rastro de acciones sobre datos personales, así que no se hereda de esos permisos.
 *
 * Todo lo que devuelve describe **este nodo**. El texto legal viaja en el código y el PDF congelado
 * vive en el volumen de cada despliegue, así que preguntarle a otro nodo daría otra respuesta — y
 * poder verlo es el punto.
 */
export class LegalAdminEndpoints {
	static #service: LegalDocsService;

	static init(service: LegalDocsService): void {
		LegalAdminEndpoints.#service ??= service;
	}

	/** Contexto global + sesión. Devuelve el actor para no repetir el chequeo en cada handler. */
	static #actor(ctx: EndpointCtx): string {
		if (!ctx.user) throw new AuthError(401, "UNAUTHORIZED", "No hay sesión");
		if (ctx.user.orgId) throw new AuthError(403, "FORBIDDEN", "Los documentos legales se administran en contexto global");
		return ctx.user.id;
	}

	@RegisterEndpoint({
		method: "GET",
		url: "/api/legal/admin/overview",
		permissions: [P.SECURITY.LEGAL.READ],
		options: {
			tag: TAG,
			summary: "Estado de los cuatro documentos legales en este nodo",
			description:
				"Por documento: si rige o está en preaviso, cuántos días faltan, si el texto desplegado sigue coincidiendo con el hash sellado, las correcciones aplicadas antes de la vigencia y el PDF congelado que tiene este nodo. Suma las cifras de aceptación de la versión vigente (contadores, nunca personas) y las fechas que le tocarían a una versión publicada hoy.",
			rateLimit: { max: 60, timeWindow: 60_000 },
			schema: { response: { 200: LS.OverviewResponse } },
		},
	})
	static async overview(ctx: EndpointCtx) {
		LegalAdminEndpoints.#actor(ctx);
		return LegalAdminEndpoints.#service.overview();
	}

	@RegisterEndpoint({
		method: "GET",
		url: "/api/legal/admin/runs",
		permissions: [P.SECURITY.LEGAL.READ],
		options: {
			tag: TAG,
			summary: "Historial de ejecuciones sobre los documentos legales",
			description:
				"Generaciones de PDF, avisos de cambio de versión y regeneraciones forzadas, del más nuevo al más viejo. Incluye las corridas automáticas del arranque, que antes sólo dejaban un `console.log`. Cursor `at` en ISO.",
			rateLimit: { max: 60, timeWindow: 60_000 },
			schema: { querystring: LS.RunsQuery, response: { 200: LS.RunsResponse } },
		},
	})
	static async runs(ctx: EndpointCtx) {
		LegalAdminEndpoints.#actor(ctx);
		const limit = Number.parseInt(ctx.query.limit ?? "", 10);
		return LegalAdminEndpoints.#service.listRuns(Number.isFinite(limit) ? limit : undefined, ctx.query.cursor || undefined);
	}

	@RegisterEndpoint({
		method: "POST",
		url: "/api/legal/admin/pdf/build",
		permissions: [P.SECURITY.LEGAL.EXECUTE],
		options: {
			tag: TAG,
			summary: "Genera los PDF congelados que falten",
			description:
				"Idempotente: un archivo ya congelado nunca se regenera, así que llamar de más no cambia nada. Es la misma corrida que hace el servicio al arrancar.",
			skipIdempotency: true,
			rateLimit: { max: 6, timeWindow: 60_000 },
			schema: { response: { 200: LS.PdfBuildResponse } },
		},
	})
	static async buildPdfs(ctx: EndpointCtx) {
		const actor = LegalAdminEndpoints.#actor(ctx);
		const { ok, written, skipped, durationMs } = await LegalAdminEndpoints.#service.buildPdfs(actor);
		return { ok, written, skipped, durationMs };
	}

	@RegisterEndpoint({
		method: "POST",
		url: "/api/legal/admin/pdf/rebuild",
		permissions: [P.SECURITY.LEGAL.DELETE],
		options: {
			tag: TAG,
			summary: "Regenera un PDF congelado (destructivo)",
			description:
				"Borra el archivo congelado de la versión vigente del documento y lo vuelve a generar. Un PDF congelado es la copia que le queda a quien aceptó, así que el motivo es obligatorio y la operación es fail-closed: sin auditoría disponible responde 503 y no toca nada.",
			skipIdempotency: true,
			rateLimit: { max: 3, timeWindow: 300_000 },
			schema: { body: LS.RebuildBody, response: { 200: LS.PdfBuildResponse } },
		},
	})
	static async rebuildPdf(ctx: EndpointCtx<Record<string, string>, { docId: string; reason: string }>) {
		const actor = LegalAdminEndpoints.#actor(ctx);
		const { ok, written, skipped, durationMs } = await LegalAdminEndpoints.#service.rebuildPdf(ctx.data.docId, ctx.data.reason, actor);
		return { ok, written, skipped, durationMs };
	}

	@RegisterEndpoint({
		method: "POST",
		url: "/api/legal/admin/announce",
		permissions: [P.SECURITY.LEGAL.EXECUTE],
		options: {
			tag: TAG,
			summary: "Re-dispara el aviso de cambio de versión de un documento",
			description:
				"Para cuando el aviso automático se descartó porque el subsistema de notificaciones no estaba. `NotificationService` deduplica por `broadcastId` (documento + versión), así que a quien ya le llegó no le llega dos veces.",
			skipIdempotency: true,
			rateLimit: { max: 3, timeWindow: 300_000 },
			schema: { body: LS.AnnounceBody, response: { 200: LS.AnnounceResponse } },
		},
	})
	static async announce(ctx: EndpointCtx<Record<string, string>, { docId: string }>) {
		const actor = LegalAdminEndpoints.#actor(ctx);
		return LegalAdminEndpoints.#service.announce(ctx.data.docId, actor);
	}
}
