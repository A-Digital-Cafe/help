import { publicEnv } from "@common/utils/public-env.js";

/**
 * Canales de contacto públicos para consultas de privacidad, soporte, ética y bug bounty.
 * Mantener sincronizado con páginas /privacy, /contact, /ethics y /roadmap.
 */
export const CONTACTS = {
	discordHandle: publicEnv("discordHandle"),
	discordUrl: publicEnv("discordUrl"),
	email: publicEnv("contactEmail"),
} as const;

/**
 * Identificación del responsable del tratamiento. La Ley 25.326 (art. 6) y el RGPD (art. 13.1.a)
 * exigen identificar al responsable, no sólo al nombre comercial: por eso figura la persona real
 * detrás de la marca. Fuente única para /privacy#responsable y /terms#quien-ofrece-el-servicio.
 *
 * Los valores llegan por entorno (`ADC_PUBLIC_OPERATOR_*`): son públicos, pero identifican a una
 * persona física y ningún clon del repositorio debe heredarlos. Ver `@common/utils/public-env.ts`.
 */
export const OPERATOR = {
	legalName: publicEnv("operatorLegalName"),
	taxId: publicEnv("operatorTaxId"),
	country: publicEnv("operatorCountry"),
	/**
	 * Domicilio publicado. Vacío hasta que se cargue: las páginas lo omiten en vez de inventarlo,
	 * y omitirlo es mejor que publicar uno falso — pero **es obligatorio** (ver la nota de
	 * `public-env-vars.ts`), así que no debería quedar vacío en producción.
	 */
	address: publicEnv("operatorAddress"),
	/** Condición frente al IVA. Sostiene la afirmación de "precio final" de § 11 de los Términos. */
	taxStatus: publicEnv("operatorTaxStatus"),
	phone: publicEnv("operatorPhone"),
	get phoneHref(): string {
		return `tel:${this.phone.replaceAll(/[^+\d]/g, "")}`;
	},
} as const;

/**
 * Fallback del pie de página cuando una página no pasa `lastUpdated` propio. Es la última versión
 * general del sitio, NO la fecha de revisión de esa página: cada página debería pasar la suya
 * (la fecha del último commit que la modificó).
 */
export const SITE_LAST_VERSION = "2026-08-08";

export const BRAND = {
	name: "Abby's Digital Cafe",
	short: "ADC",
	homeHref: "https://adigitalcafe.com",
} as const;
