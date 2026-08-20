import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { LEGAL_DOCUMENTS, type LegalDocument } from "@common/utils/legal-docs.ts";

/**
 * Lectura del texto legal **tal como está desplegado en este nodo**.
 *
 * El `contentHash` de `legal-docs.ts` sella qué texto significa una versión. Hasta ahora nadie
 * verificaba ese sello en runtime: lo recalculaba un hook de git que hay que instalar a mano en
 * cada clon, así que un texto editado en otra máquina llegaba a producción con el hash viejo y sin
 * que nada lo dijera. Acá se recalcula contra el archivo real y la diferencia se muestra.
 */

/** Documentos versionados, en orden estable. */
export const LEGAL_DOC_LIST: readonly LegalDocument[] = Object.values(LEGAL_DOCUMENTS);

/** `sha256` del archivo fuente desplegado; `null` si no está (clon parcial, preset ausente). */
export async function hashDeployedSource(doc: LegalDocument, root: string = process.cwd()): Promise<string | null> {
	try {
		const buf = await readFile(path.join(root, doc.sourcePath));
		return createHash("sha256").update(buf).digest("hex");
	} catch {
		return null;
	}
}

/** Hashes de los cuatro documentos, resueltos en paralelo. */
export async function hashAllSources(root: string = process.cwd()): Promise<Map<string, string | null>> {
	const entries = await Promise.all(LEGAL_DOC_LIST.map(async (doc) => [doc.id, await hashDeployedSource(doc, root)] as const));
	return new Map(entries);
}
