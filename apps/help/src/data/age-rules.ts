import { BLOCKED_COUNTRY_CODES } from "./blocked-countries";

/**
 * Edades mínimas por país o región, tomando como referencia el criterio público de
 * plataformas comparables.
 *
 * **La lista publicada excluye los países bloqueados por geofiltro**: anunciar una edad
 * mínima para un país al que no se puede entrar es contradictorio, y mantener el dato a
 * mano en dos lugares garantiza que tarde o temprano digan cosas distintas. El cruce se
 * hace por código ISO contra `BLOCKED_COUNTRIES`, así que cuando un país entra o sale del
 * geofiltro la tabla se ajusta sola.
 *
 * El dato **no se borra** de `ALL_AGE_RULES`: si el bloqueo se levanta, la fila reaparece
 * con su edad correcta sin tener que reconstruirla.
 */

export interface AgeRuleEntry {
	/** ISO 3166-1 alpha-2. Es la clave del cruce con el geofiltro. */
	readonly code: string;
	readonly place: string;
	readonly age: string;
	readonly note?: string;
}

export interface AgeRuleGroup {
	readonly region: string;
	readonly entries: ReadonlyArray<AgeRuleEntry>;
}

/** Dato completo, incluidos los países hoy bloqueados. No filtrar acá: ver `AGE_RULES`. */
const ALL_AGE_RULES = [
	{
		region: "Asia",
		entries: [
			{ code: "KR", place: "Corea del Sur", age: "14+" },
			{ code: "VN", place: "Vietnam", age: "15+" },
		],
	},
	{
		region: "Caribe",
		entries: [
			{ code: "AW", place: "Aruba", age: "16+" },
			{ code: "BQ", place: "Caribe Neerlandés", age: "16+" },
			{ code: "CW", place: "Curaçao", age: "16+" },
			{ code: "SX", place: "Sint Maarten", age: "16+" },
		],
	},
	{
		region: "Europa",
		entries: [
			{ code: "AT", place: "Austria", age: "14+" },
			{ code: "BG", place: "Bulgaria", age: "14+" },
			{ code: "HR", place: "Croacia", age: "16+" },
			{ code: "CY", place: "Chipre", age: "14+" },
			{ code: "CZ", place: "República Checa", age: "15+" },
			{ code: "FR", place: "Francia", age: "15+" },
			{ code: "DE", place: "Alemania", age: "16+" },
			{ code: "GR", place: "Grecia", age: "15+" },
			{ code: "HU", place: "Hungría", age: "16+" },
			{ code: "IE", place: "Irlanda", age: "16+" },
			{ code: "IT", place: "Italia", age: "14+" },
			{ code: "LT", place: "Lituania", age: "14+" },
			{ code: "LU", place: "Luxemburgo", age: "16+" },
			{ code: "NL", place: "Países Bajos", age: "16+" },
			{ code: "PL", place: "Polonia", age: "16+" },
			{ code: "RO", place: "Rumania", age: "16+" },
			{ code: "SM", place: "San Marino", age: "16+" },
			{ code: "RS", place: "Serbia", age: "15+" },
			{ code: "SK", place: "Eslovaquia", age: "16+" },
			{ code: "SI", place: "Eslovenia", age: "16+" },
			{ code: "ES", place: "España", age: "14+" },
		],
	},
	{
		region: "Sudamérica",
		entries: [
			{ code: "CL", place: "Chile", age: "14+" },
			{ code: "CO", place: "Colombia", age: "14+" },
			{ code: "PE", place: "Perú", age: "14+" },
			{ code: "VE", place: "Venezuela", age: "14+" },
		],
	},
] as const satisfies ReadonlyArray<AgeRuleGroup>;

/** Lo que se publica en /terms: sin los geofiltrados y sin regiones que queden vacías. */
export const AGE_RULES: ReadonlyArray<AgeRuleGroup> = ALL_AGE_RULES.map((group) => ({
	region: group.region,
	entries: group.entries.filter((entry) => !BLOCKED_COUNTRY_CODES.has(entry.code)),
})).filter((group) => group.entries.length > 0);

/** Países con edad mínima propia que hoy además están bloqueados por geofiltro. */
export const AGE_RULES_HIDDEN_BY_GEOFILTER: ReadonlyArray<AgeRuleEntry> = ALL_AGE_RULES.flatMap((group) =>
	group.entries.filter((entry) => BLOCKED_COUNTRY_CODES.has(entry.code))
);
