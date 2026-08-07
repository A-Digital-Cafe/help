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
	phone: publicEnv("operatorPhone"),
	get phoneHref(): string {
		return `tel:${this.phone.replaceAll(/[^+\d]/g, "")}`;
	},
} as const;

export const LAST_REVIEW = "2026-05-09";

export const BRAND = {
	name: "Abby's Digital Cafe",
	short: "ADC",
	homeHref: "https://adigitalcafe.com",
} as const;
