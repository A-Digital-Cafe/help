/**
 * Códigos ISO 3166-1 alpha-2 actualmente bloqueados por geofiltro en Cloudflare.
 * Se publica como dato visible en /values para transparencia; la sincronía con la
 * regla activa en Cloudflare es manual (actualizar `LAST_REVIEWED` al tocar la lista).
 *
 * Cada país lleva un `reason` acotado que explica por qué está en la lista; se
 * renderiza en /values para que el criterio publicado reconstruya la lista real.
 *
 * El cruce con otras vistas —hoy la tabla de edades mínimas de /terms— se hace por
 * **código**, nunca por nombre: la lista está en inglés y la de edades en español, así
 * que comparar nombres no detectaría que un país figura en las dos.
 */

/**
 * Motivo acotado del bloqueo, renderizado en /values.
 *
 * **Criterio de `sancion-internacional`** (fijado el 2026-08-08, antes la lista lo aplicaba sin
 * decirlo): los destinos bajo **embargo integral de OFAC**. Hoy son Cuba, Irán, Corea del Norte y
 * Siria; se suma Venezuela por el régimen de sanciones sectoriales que los proveedores trasladan
 * igual.
 *
 * OFAC **no le aplica directamente** a un operador argentino — no hay nexo jurisdiccional. La razón
 * es práctica: la infraestructura sí lo tiene (Cloudflare, precios en USD, PayPal), y los términos
 * de esos proveedores trasladan el screening al cliente. El riesgo real que se evita no es una
 * multa del Tesoro estadounidense sino que suspendan la cuenta de Cloudflare o el medio de pago, y
 * con eso se caiga el servicio para todo el mundo.
 *
 * Que el criterio esté escrito es la mitad importante: una lista de países bloqueados sin regla
 * explícita es indistinguible de una decisión arbitraria, y ese es el reproche que se le puede
 * hacer aunque cada país por separado esté bien elegido.
 */
export type BlockReason = "riesgo-seguridad-comunidad" | "abuso-fraude" | "sancion-internacional" | "marco-legal";

export const BLOCK_REASON_LABEL: Record<BlockReason, string> = {
	"riesgo-seguridad-comunidad": "Riesgo para la seguridad de la comunidad",
	"abuso-fraude": "Abuso o fraude recurrente",
	"sancion-internacional": "Sanción internacional",
	"marco-legal": "Marco legal incompatible",
};

/** Fecha (ISO) de la última revisión manual de la lista contra la regla de Cloudflare. */
export const LAST_REVIEWED = "2026-08-08";

export interface Country {
	readonly code: string;
	readonly name: string;
	readonly reason: BlockReason;
}

export const BLOCKED_COUNTRIES = [
	{ code: "AF", name: "Afghanistan", reason: "riesgo-seguridad-comunidad" },
	{ code: "DZ", name: "Algeria", reason: "riesgo-seguridad-comunidad" },
	{ code: "BD", name: "Bangladesh", reason: "riesgo-seguridad-comunidad" },
	{ code: "BN", name: "Brunei", reason: "riesgo-seguridad-comunidad" },
	{ code: "BF", name: "Burkina Faso", reason: "riesgo-seguridad-comunidad" },
	{ code: "BI", name: "Burundi", reason: "riesgo-seguridad-comunidad" },
	{ code: "CM", name: "Cameroon", reason: "riesgo-seguridad-comunidad" },
	{ code: "TD", name: "Chad", reason: "riesgo-seguridad-comunidad" },
	{ code: "KM", name: "Comoros", reason: "riesgo-seguridad-comunidad" },
	{ code: "CU", name: "Cuba", reason: "sancion-internacional" },
	{ code: "EG", name: "Egypt", reason: "riesgo-seguridad-comunidad" },
	{ code: "ER", name: "Eritrea", reason: "riesgo-seguridad-comunidad" },
	{ code: "ET", name: "Ethiopia", reason: "riesgo-seguridad-comunidad" },
	{ code: "GM", name: "Gambia", reason: "riesgo-seguridad-comunidad" },
	{ code: "GH", name: "Ghana", reason: "riesgo-seguridad-comunidad" },
	{ code: "GD", name: "Grenada", reason: "riesgo-seguridad-comunidad" },
	{ code: "GN", name: "Guinea", reason: "riesgo-seguridad-comunidad" },
	{ code: "GY", name: "Guyana", reason: "riesgo-seguridad-comunidad" },
	{ code: "ID", name: "Indonesia", reason: "riesgo-seguridad-comunidad" },
	{ code: "IR", name: "Iran", reason: "sancion-internacional" },
	{ code: "IQ", name: "Iraq", reason: "riesgo-seguridad-comunidad" },
	{ code: "JM", name: "Jamaica", reason: "riesgo-seguridad-comunidad" },
	{ code: "KE", name: "Kenya", reason: "riesgo-seguridad-comunidad" },
	{ code: "KI", name: "Kiribati", reason: "riesgo-seguridad-comunidad" },
	{ code: "KW", name: "Kuwait", reason: "riesgo-seguridad-comunidad" },
	{ code: "LB", name: "Lebanon", reason: "riesgo-seguridad-comunidad" },
	{ code: "LR", name: "Liberia", reason: "riesgo-seguridad-comunidad" },
	{ code: "LY", name: "Libya", reason: "sancion-internacional" },
	{ code: "MW", name: "Malawi", reason: "riesgo-seguridad-comunidad" },
	{ code: "MY", name: "Malaysia", reason: "riesgo-seguridad-comunidad" },
	{ code: "MV", name: "Maldives", reason: "riesgo-seguridad-comunidad" },
	{ code: "ML", name: "Mali", reason: "riesgo-seguridad-comunidad" },
	{ code: "MR", name: "Mauritania", reason: "riesgo-seguridad-comunidad" },
	{ code: "MA", name: "Morocco", reason: "riesgo-seguridad-comunidad" },
	{ code: "MM", name: "Myanmar", reason: "riesgo-seguridad-comunidad" },
	{ code: "NE", name: "Niger", reason: "riesgo-seguridad-comunidad" },
	{ code: "NG", name: "Nigeria", reason: "riesgo-seguridad-comunidad" },
	{ code: "KP", name: "North Korea", reason: "sancion-internacional" },
	{ code: "OM", name: "Oman", reason: "riesgo-seguridad-comunidad" },
	{ code: "PK", name: "Pakistan", reason: "riesgo-seguridad-comunidad" },
	{ code: "PS", name: "Palestine", reason: "riesgo-seguridad-comunidad" },
	{ code: "PG", name: "Papua New Guinea", reason: "riesgo-seguridad-comunidad" },
	{ code: "QA", name: "Qatar", reason: "riesgo-seguridad-comunidad" },
	{ code: "VC", name: "Saint Vincent and the Grenadines", reason: "riesgo-seguridad-comunidad" },
	{ code: "WS", name: "Samoa", reason: "riesgo-seguridad-comunidad" },
	{ code: "SA", name: "Saudi Arabia", reason: "riesgo-seguridad-comunidad" },
	{ code: "SN", name: "Senegal", reason: "riesgo-seguridad-comunidad" },
	{ code: "SL", name: "Sierra Leone", reason: "riesgo-seguridad-comunidad" },
	{ code: "SB", name: "Solomon Islands", reason: "riesgo-seguridad-comunidad" },
	{ code: "SO", name: "Somalia", reason: "riesgo-seguridad-comunidad" },
	{ code: "SS", name: "South Sudan", reason: "riesgo-seguridad-comunidad" },
	{ code: "LK", name: "Sri Lanka", reason: "riesgo-seguridad-comunidad" },
	{ code: "SD", name: "Sudan", reason: "riesgo-seguridad-comunidad" },
	{ code: "SY", name: "Syria", reason: "sancion-internacional" },
	{ code: "TZ", name: "Tanzania", reason: "riesgo-seguridad-comunidad" },
	{ code: "TG", name: "Togo", reason: "riesgo-seguridad-comunidad" },
	{ code: "TO", name: "Tonga", reason: "riesgo-seguridad-comunidad" },
	{ code: "TT", name: "Trinidad and Tobago", reason: "riesgo-seguridad-comunidad" },
	{ code: "TN", name: "Tunisia", reason: "riesgo-seguridad-comunidad" },
	{ code: "TM", name: "Turkmenistan", reason: "riesgo-seguridad-comunidad" },
	{ code: "TV", name: "Tuvalu", reason: "riesgo-seguridad-comunidad" },
	{ code: "UG", name: "Uganda", reason: "riesgo-seguridad-comunidad" },
	{ code: "VE", name: "Venezuela", reason: "sancion-internacional" },
	{ code: "AE", name: "United Arab Emirates", reason: "riesgo-seguridad-comunidad" },
	{ code: "UZ", name: "Uzbekistan", reason: "riesgo-seguridad-comunidad" },
	{ code: "YE", name: "Yemen", reason: "riesgo-seguridad-comunidad" },
	{ code: "ZM", name: "Zambia", reason: "riesgo-seguridad-comunidad" },
	{ code: "ZW", name: "Zimbabwe", reason: "riesgo-seguridad-comunidad" },
] as const satisfies ReadonlyArray<Country>;

/** Índice por código para cruces rápidos. */
export const BLOCKED_COUNTRY_CODES: ReadonlySet<string> = new Set(BLOCKED_COUNTRIES.map((c) => c.code));
