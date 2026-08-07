/**
 * Códigos ISO 3166-1 alpha-2 actualmente bloqueados por geofiltro en Cloudflare.
 * Se publica como dato visible en /values para transparencia; mantener sincronizado
 * con la regla activa en Cloudflare.
 *
 * El cruce con otras vistas —hoy la tabla de edades mínimas de /terms— se hace por
 * **código**, nunca por nombre: la lista está en inglés y la de edades en español, así
 * que comparar nombres no detectaría que un país figura en las dos.
 */

export interface Country {
	readonly code: string;
	readonly name: string;
}

export const BLOCKED_COUNTRIES = [
	{ code: "AF", name: "Afghanistan" },
	{ code: "DZ", name: "Algeria" },
	{ code: "BD", name: "Bangladesh" },
	{ code: "BN", name: "Brunei" },
	{ code: "BF", name: "Burkina Faso" },
	{ code: "BI", name: "Burundi" },
	{ code: "CM", name: "Cameroon" },
	{ code: "TD", name: "Chad" },
	{ code: "KM", name: "Comoros" },
	{ code: "EG", name: "Egypt" },
	{ code: "ER", name: "Eritrea" },
	{ code: "ET", name: "Ethiopia" },
	{ code: "GM", name: "Gambia" },
	{ code: "GH", name: "Ghana" },
	{ code: "GD", name: "Grenada" },
	{ code: "GN", name: "Guinea" },
	{ code: "GY", name: "Guyana" },
	{ code: "ID", name: "Indonesia" },
	{ code: "IR", name: "Iran" },
	{ code: "IQ", name: "Iraq" },
	{ code: "JM", name: "Jamaica" },
	{ code: "KE", name: "Kenya" },
	{ code: "KI", name: "Kiribati" },
	{ code: "KW", name: "Kuwait" },
	{ code: "LB", name: "Lebanon" },
	{ code: "LR", name: "Liberia" },
	{ code: "LY", name: "Libya" },
	{ code: "MW", name: "Malawi" },
	{ code: "MY", name: "Malaysia" },
	{ code: "MV", name: "Maldives" },
	{ code: "ML", name: "Mali" },
	{ code: "MR", name: "Mauritania" },
	{ code: "MA", name: "Morocco" },
	{ code: "MM", name: "Myanmar" },
	{ code: "NE", name: "Niger" },
	{ code: "NG", name: "Nigeria" },
	{ code: "OM", name: "Oman" },
	{ code: "PK", name: "Pakistan" },
	{ code: "PS", name: "Palestine" },
	{ code: "PG", name: "Papua New Guinea" },
	{ code: "QA", name: "Qatar" },
	{ code: "VC", name: "Saint Vincent and the Grenadines" },
	{ code: "WS", name: "Samoa" },
	{ code: "SA", name: "Saudi Arabia" },
	{ code: "SN", name: "Senegal" },
	{ code: "SL", name: "Sierra Leone" },
	{ code: "SB", name: "Solomon Islands" },
	{ code: "SO", name: "Somalia" },
	{ code: "SS", name: "South Sudan" },
	{ code: "LK", name: "Sri Lanka" },
	{ code: "SD", name: "Sudan" },
	{ code: "SY", name: "Syria" },
	{ code: "TZ", name: "Tanzania" },
	{ code: "TG", name: "Togo" },
	{ code: "TO", name: "Tonga" },
	{ code: "TT", name: "Trinidad and Tobago" },
	{ code: "TN", name: "Tunisia" },
	{ code: "TM", name: "Turkmenistan" },
	{ code: "TV", name: "Tuvalu" },
	{ code: "UG", name: "Uganda" },
	{ code: "VE", name: "Venezuela" },
	{ code: "AE", name: "United Arab Emirates" },
	{ code: "UZ", name: "Uzbekistan" },
	{ code: "YE", name: "Yemen" },
	{ code: "ZM", name: "Zambia" },
	{ code: "ZW", name: "Zimbabwe" },
] as const satisfies ReadonlyArray<Country>;

/** Índice por código para cruces rápidos. */
export const BLOCKED_COUNTRY_CODES: ReadonlySet<string> = new Set(BLOCKED_COUNTRIES.map((c) => c.code));
