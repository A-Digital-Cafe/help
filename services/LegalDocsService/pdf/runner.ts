import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";
import * as path from "node:path";
import type { ILogger } from "@interfaces/utils/ILogger.js";
import type { LegalDocument } from "@common/utils/legal-docs.ts";
import { LEGAL_PDF_DIR, pdfFileName } from "./inventory.ts";

/**
 * Ejecución de `scripts/build-legal-pdfs.ts` como proceso aparte.
 *
 * No se corre en proceso porque el script **renderiza los componentes React** de la app `help` para
 * derivar el PDF del mismo texto que se publica: importarlo acá metería React y el árbol entero de
 * la app dentro de un servicio de backend. Mismo endurecimiento que `deps-install.ts` del gestor de
 * módulos: binario resuelto de una lista fija, `PATH` acotado y timeout.
 */

const isWindows = process.platform === "win32";

const BUN_CANDIDATES = isWindows
	? [String.raw`C:\Program Files\bun\bun.exe`]
	: [`${process.env.HOME ?? ""}/.bun/bin/bun`, "/usr/local/bin/bun", "/usr/bin/bun", "/opt/homebrew/bin/bun"];

const SAFE_PATH = isWindows ? String.raw`C:\Windows\System32;C:\Windows` : "/usr/bin:/bin:/usr/sbin:/sbin";

/** Techo del render. Cuatro documentos tardan segundos; pasado esto, algo se colgó. */
const BUILD_TIMEOUT_MS = 120_000;
const MAX_OUTPUT = 4 * 1024 * 1024;

/** Prefijo con el que el script emite su resumen legible por máquina (`--json`). */
const JSON_MARKER = "LEGAL_PDF_JSON ";

export interface PdfBuildResult {
	ok: boolean;
	/** Archivos escritos en esta corrida. Vacío = no faltaba ninguno. */
	written: string[];
	/** Versiones que ya estaban congeladas y no se tocaron. */
	skipped: string[];
	error?: string;
	durationMs: number;
}

/** Resuelve `bun` desde rutas fijas; `null` si no está. */
function resolveBunBin(): string | null {
	return BUN_CANDIDATES.find((p) => p && existsSync(p)) ?? null;
}

function parseSummary(stdout: string): { written: string[]; skipped: string[] } | null {
	const line = stdout.split("\n").find((l) => l.startsWith(JSON_MARKER));
	if (!line) return null;
	try {
		const parsed = JSON.parse(line.slice(JSON_MARKER.length)) as { written?: unknown; skipped?: unknown };
		const asStrings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
		return { written: asStrings(parsed.written), skipped: asStrings(parsed.skipped) };
	} catch {
		return null;
	}
}

/**
 * Genera los PDF que falten. Idempotente: un archivo ya congelado nunca se regenera, así que
 * llamar de más no cuesta ni cambia nada — es lo mismo que corre al arrancar el servicio.
 */
export function buildMissingPdfs(root: string, logger: ILogger): Promise<PdfBuildResult> {
	const t0 = Date.now();
	const bin = resolveBunBin();
	if (!bin) {
		return Promise.resolve({ ok: false, written: [], skipped: [], error: "No se encontró el binario de bun", durationMs: 0 });
	}

	return new Promise((resolve) => {
		execFile(
			bin,
			["scripts/build-legal-pdfs.ts", "--json"],
			{ cwd: root, timeout: BUILD_TIMEOUT_MS, killSignal: "SIGKILL", maxBuffer: MAX_OUTPUT, env: { ...process.env, PATH: SAFE_PATH } },
			(err, stdout, stderr) => {
				const durationMs = Date.now() - t0;
				const summary = parseSummary(stdout ?? "");
				if (err || !summary) {
					const detail = (stderr || (err as Error | null)?.message || "sin salida").trim().slice(0, 500);
					logger.logWarn(`[LegalDocs] La generación de PDF falló: ${detail}`);
					return resolve({ ok: false, written: [], skipped: [], error: detail, durationMs });
				}
				resolve({ ok: true, ...summary, durationMs });
			}
		);
	});
}

/**
 * Borra el PDF congelado de `doc` y lo vuelve a generar.
 *
 * **Destructivo por definición**: un archivo congelado que cambia deja de probar qué texto se
 * aceptó. Existe porque hasta ahora la única forma de rehacer uno era borrarlo a mano en el volumen
 * de despliegue, sin motivo ni rastro; acá el motivo y el rastro son condición (los exige el
 * endpoint, que audita antes de llamar).
 */
export async function rebuildPdf(root: string, doc: LegalDocument, logger: ILogger): Promise<PdfBuildResult> {
	const target = path.join(root, LEGAL_PDF_DIR, pdfFileName(doc));
	try {
		await unlink(target);
	} catch (err: any) {
		// ENOENT es un caso válido: se pidió rehacer algo que este nodo no tenía.
		if (err?.code !== "ENOENT") {
			return { ok: false, written: [], skipped: [], error: `No se pudo borrar el PDF anterior: ${err?.message || err}`, durationMs: 0 };
		}
	}
	return buildMissingPdfs(root, logger);
}
