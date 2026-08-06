/**
 * Canales de contacto públicos para consultas de privacidad, soporte, ética y bug bounty.
 * Mantener sincronizado con páginas /privacy, /contact, /ethics y /roadmap.
 */
export const CONTACTS = {
	discordHandle: "@abbytec",
	discordUrl: "https://discord.gg/vShXpyWTTq",
	email: "gpsmurfs@gmail.com",
} as const;

/**
 * Identificación del responsable del tratamiento. La Ley 25.326 (art. 6) y el RGPD (art. 13.1.a)
 * exigen identificar al responsable, no sólo al nombre comercial: por eso figura la persona real
 * detrás de la marca. Fuente única para /privacy#responsable y /terms#quien-ofrece-el-servicio.
 */
export const OPERATOR = {
	legalName: "Abigail Palmero",
	taxId: "20-41001286-4",
	country: "Argentina",
	phone: "+54 9 3541 209175",
	phoneHref: "tel:+5493541209175",
} as const;

export const LAST_REVIEW = "2026-05-09";

export const BRAND = {
	name: "Abby's Digital Cafe",
	short: "ADC",
	homeHref: "https://adigitalcafe.com",
} as const;
