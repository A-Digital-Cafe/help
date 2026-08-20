import {
	MIN_LEGAL_NOTICE_DAYS,
	daysUntilEffective,
	isInCorrectionWindow,
	legalNoticeDays,
	type LegalDocument,
} from "@common/utils/legal-docs.ts";
import type { LegalDocOverview, LegalPdfInfo } from "@common/types/legal/index.ts";

/**
 * Estado de una versión, que es la respuesta a «qué rige, hasta cuándo, y por qué tengo que tocar
 * algo justo ahora».
 *
 * La distinción que importa es la **ventana de corrección**: mientras el documento no rige, el
 * texto se puede corregir actualizando sólo el `contentHash` —versionar pediría re-aceptar algo que
 * nadie aceptó todavía—. Una vez vigente, la misma edición obliga a versionar con
 * {@link MIN_LEGAL_NOTICE_DAYS} días de preaviso, que es lo que prometen los Términos.
 */
export function describeDoc(doc: LegalDocument, deployedHash: string | null, pdf: LegalPdfInfo | null, now: Date): LegalDocOverview {
	const noticeDays = legalNoticeDays(doc);
	return {
		id: doc.id,
		label: doc.label,
		href: doc.href,
		version: doc.version,
		effectiveFrom: doc.effectiveFrom,
		requiresAcceptance: doc.requiresAcceptance,
		sourcePath: doc.sourcePath,
		state: isInCorrectionWindow(doc, now) ? "en-preaviso" : "vigente",
		daysUntilEffective: daysUntilEffective(doc, now),
		noticeDays,
		noticeOk: noticeDays >= MIN_LEGAL_NOTICE_DAYS,
		sealedHash: doc.contentHash,
		deployedHash,
		// Un archivo ilegible NO es deriva: no se puede afirmar que el texto cambió.
		drifted: deployedHash !== null && deployedHash !== doc.contentHash,
		corrections: doc.corrections,
		pdf,
	};
}

/**
 * Frase única del historial cuando arranca el servicio y encuentra algo fuera de lugar.
 * Vacía = no hay nada que hacer con este documento.
 */
export function describeProblems(view: LegalDocOverview): string[] {
	const out: string[] = [];
	if (view.deployedHash === null) out.push(`el archivo fuente no está en este nodo (${view.sourcePath})`);
	else if (view.drifted) {
		out.push(
			view.state === "en-preaviso"
				? `el texto cambió y el hash sellado quedó viejo; se puede corregir sin versionar hasta el ${view.effectiveFrom}`
				: `el texto cambió después de entrar en vigor: exige versionar con ${MIN_LEGAL_NOTICE_DAYS} días de preaviso`
		);
	}
	if (!view.noticeOk) out.push(`el preaviso de esta versión es de ${view.noticeDays} día(s), menos de los ${MIN_LEGAL_NOTICE_DAYS} comprometidos`);
	if (!view.pdf) out.push("no hay PDF congelado de esta versión en este nodo");
	return out;
}
