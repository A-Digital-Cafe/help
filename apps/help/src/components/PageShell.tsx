import "@ui-library/utils/react-jsx";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { router } from "@common/utils/router.js";
import { useTranslation } from "@ui-library/utils/i18n-react";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { BRAND, SITE_LAST_VERSION } from "../data/contact";

type LegalDocumentId = keyof typeof LEGAL_DOCUMENTS;

interface PageShellProps {
	title: string;
	subtitle?: string;
	standards?: string[];
	declaration?: "commitment" | "informational" | "policy";
	lastUpdated?: string;
	/**
	 * Id del documento en `LEGAL_DOCUMENTS`. Habilita el enlace a su PDF congelado: el soporte
	 * duradero que exige la contratación electrónica (arts. 1106/1107 CCyC). Sólo lo pasan las
	 * páginas versionadas; el resto no tiene PDF porque no hay nada que archivar.
	 */
	legalDocId?: LegalDocumentId;
	breadcrumb?: Array<{ label: string; href?: string }>;
	children: ReactNode;
}

const DECLARATION_LABEL: Record<NonNullable<PageShellProps["declaration"]>, string> = {
	commitment: "Compromiso público — no certificación externa",
	informational: "Información de referencia",
	policy: "Política vigente",
};

const DECLARATION_TONE = {
	commitment: "warning",
	informational: "info",
	policy: "success",
} as const satisfies Record<NonNullable<PageShellProps["declaration"]>, "info" | "warning" | "success" | "error">;

function interpolateFallback(template: string, params?: Record<string, string>): string {
	if (!params) return template;
	return template.replaceAll(/\{\{(\w+)\}\}/g, (_, key: string) => params[key] ?? `{{${key}}}`);
}

/**
 * Wrapper estable para páginas internas. Mantiene un único nodo top-level
 * para evitar que slots de Stencil (`shadow:false`) repongan hijos al re-render.
 */
export default function PageShell({
	title,
	subtitle,
	standards,
	declaration,
	lastUpdated,
	legalDocId,
	breadcrumb,
	children,
}: Readonly<PageShellProps>) {
	const legalDoc = legalDocId ? LEGAL_DOCUMENTS[legalDocId] : null;
	const { t } = useTranslation({ namespace: "help" });
	const breadcrumbRef = useRef<HTMLElement>(null);
	const backHref = breadcrumb && breadcrumb.length > 1 ? breadcrumb.at(-2)?.href : undefined;
	const breadcrumbItems = JSON.stringify(breadcrumb ?? []);
	const tx = (key: string, fallback: string, params?: Record<string, string>) => {
		const value = t(key, params);
		return value === key ? interpolateFallback(fallback, params) : value;
	};

	useEffect(() => {
		const el = breadcrumbRef.current;
		if (!el) return;

		const handler = () => {
			if (backHref) router.navigate(backHref);
		};

		el.addEventListener("adcBack", handler);
		return () => el.removeEventListener("adcBack", handler);
	}, [backHref]);

	let badgeColor: "orange" | "green" | "blue";
	if (declaration === "commitment") {
		badgeColor = "orange";
	} else if (declaration === "policy") {
		badgeColor = "green";
	} else {
		badgeColor = "blue";
	}
	const declarationLabel = declaration ? tx(`declaration.${declaration}`, DECLARATION_LABEL[declaration]) : undefined;

	return (
		<article className="max-w-5xl mx-auto pb-16">
			{breadcrumb && breadcrumb.length > 0 && (
				<adc-top-breadcrumb ref={breadcrumbRef} items={breadcrumbItems} back-label={tx("common.back", "Volver")} />
			)}

			<header className="mb-6">
				<h1 className="text-3xl font-heading mb-2">{title}</h1>
				{subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
				<div className="flex flex-wrap gap-2 mt-3">
					{standards?.map((s) => (
						<adc-badge key={s} color="blue">
							{s}
						</adc-badge>
					))}
					{declarationLabel && <adc-badge color={badgeColor}>{declarationLabel}</adc-badge>}
				</div>
			</header>

			<adc-callout tone="info" role="note">
				{tx("shell.brandCallout.beforeShort", "Cuando usamos")} <strong>{BRAND.short}</strong>
				{tx("shell.brandCallout.beforeName", ", nos referimos a")} <strong>{BRAND.name}</strong>
				{tx("shell.brandCallout.beforeHome", ", el proyecto publicado como")} <a href={BRAND.homeHref}>adigitalcafe.com</a>
				{tx(
					"shell.brandCallout.afterHome",
					". La sigla es el nombre corto de la plataforma, no una certificación ni una entidad separada."
				)}
			</adc-callout>

			{declaration === "commitment" && (
				<adc-callout tone={DECLARATION_TONE[declaration]} role="note">
					{tx("shell.commitmentCallout.beforeStrong", "Esta página describe un")}{" "}
					<strong>{tx("shell.commitmentCallout.strong", "compromiso público")}</strong>{" "}
					{tx(
						"shell.commitmentCallout.afterStrong",
						"y un roadmap. No implica certificación por un auditor externo. Conserva trazabilidad y se revisa periódicamente."
					)}
				</adc-callout>
			)}

			{/* prose-neutral fijaba grises de Tailwind (pensados para fondo claro) que quedaban
			    ilegibles sobre el tema oscuro. Enlazamos las variables de prose a los tokens del
			    tema (--c-text/--c-muted/--c-accent) para que el contraste funcione en claro y oscuro. */}
			<section className="prose mt-6 space-y-4 contain-content text-text [--tw-prose-body:var(--c-text)] [--tw-prose-headings:var(--c-text)] [--tw-prose-bold:var(--c-text)] [--tw-prose-quotes:var(--c-text)] [--tw-prose-code:var(--c-text)] [--tw-prose-links:var(--c-accent)] [--tw-prose-counters:var(--c-muted)] [--tw-prose-bullets:var(--c-muted)] [--tw-prose-hr:var(--c-muted)]">
				{children}
			</section>

			<footer className="mt-10 text-sm opacity-70">
				<p>
					{lastUpdated ? `${tx("lastUpdated", "Última actualización")}: ` : `${tx("siteLastVersion", "Última versión general del sitio")}: `}
					<time dateTime={lastUpdated ?? SITE_LAST_VERSION}>{lastUpdated ?? SITE_LAST_VERSION}</time>
				</p>
				{legalDoc && (
					<p className="mt-1" data-pdf-omit>
						<a href={`/pub/legal/${legalDoc.id}-${legalDoc.version}.pdf`} download>
							{tx("downloadPdf", "Descargar esta versión en PDF")}
						</a>{" "}
						—{" "}
						{tx(
							"pdfIsCopy",
							"copia para tus registros. La versión oficial es la publicada en esta página; si alguna vez difirieran, vale ésta."
						)}
					</p>
				)}
			</footer>
		</article>
	);
}
