import { stat } from "node:fs/promises";
import * as path from "node:path";
import type { LegalDocument } from "@common/utils/legal-docs.ts";
import type { LegalPdfInfo } from "@common/types/legal/index.ts";

/**
 * Los PDF congelados de este nodo.
 *
 * `presets/help/apps/help/public/legal/` está **gitignored** a propósito: cada archivo lleva
 * horneados el nombre legal, el CUIT y el domicilio, que llegan por `ADC_PUBLIC_*` para que un fork
 * no los herede. La consecuencia es que desarrollo y producción tienen archivos distintos por
 * construcción — y hasta ahora no había forma de ver cuáles tenía cada uno.
 */

/** Directorio donde `scripts/build-legal-pdfs.ts` deja los archivos. */
export const LEGAL_PDF_DIR = path.join("presets", "help", "apps", "help", "public", "legal");

/** Nombre del archivo congelado de una versión. Mismo formato que arma el script y que enlaza `PageShell`. */
export function pdfFileName(doc: LegalDocument): string {
	return `${doc.id}-${doc.version}.pdf`;
}

/**
 * El PDF de la versión vigente de `doc`, o `null` si este nodo no lo tiene.
 * `href` es la ruta pública de la app `help`; la resuelve quien la muestre.
 */
export async function findPdf(doc: LegalDocument, root: string = process.cwd()): Promise<LegalPdfInfo | null> {
	const file = pdfFileName(doc);
	try {
		const info = await stat(path.join(root, LEGAL_PDF_DIR, file));
		if (!info.isFile()) return null;
		return { file, bytes: info.size, generatedAt: info.mtime.toISOString(), href: `/pub/legal/${file}` };
	} catch {
		return null;
	}
}
