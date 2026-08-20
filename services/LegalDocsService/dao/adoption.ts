import { LEGAL_ADOPTION_CACHE_SECONDS, type LegalAdoption } from "@common/types/legal/index.ts";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.ts";
import type { IUserManager } from "@common/types/identity/managers.ts";
import type { ILogger } from "@interfaces/utils/ILogger.js";

/**
 * Cifras de aceptación de la versión vigente.
 *
 * Se cachean porque contar cuentas es un `$group` sobre la colección de usuarios y la pantalla se
 * refresca a mano: sin caché, cada `Refrescar` del panel lo dispara de nuevo. La ventana es corta
 * (5 min) y el dato se muestra con su `computedAt`, así que nadie lee un número creyéndolo del
 * instante.
 */

/** Clave compartida entre nodos: el agregado es el mismo para todos. */
const CACHE_KEY = "adoption:v1";

interface RedisLike {
	get(key: string): Promise<string | null>;
	set(key: string, value: string, ttlSeconds?: number): Promise<void>;
}

export class AdoptionCounter {
	readonly #redis: RedisLike | null;
	readonly #logger: ILogger;

	constructor(redis: RedisLike | null, logger: ILogger) {
		this.#redis = redis;
		this.#logger = logger;
	}

	/**
	 * `null` si no hay de dónde sacarlas (identidad ausente o el agregado falló): el resto de la
	 * pantalla —estados, deriva, PDFs— sirve igual sin esto y es lo que más se consulta.
	 */
	async read(users: IUserManager | null, token?: string): Promise<LegalAdoption | null> {
		// La re-aceptación no se exige antes de la vigencia: la más tardía de las dos manda.
		const enforcedFrom =
			LEGAL_DOCUMENTS.terms.effectiveFrom > LEGAL_DOCUMENTS.privacy.effectiveFrom
				? LEGAL_DOCUMENTS.terms.effectiveFrom
				: LEGAL_DOCUMENTS.privacy.effectiveFrom;
		const versions = {
			termsVersion: LEGAL_DOCUMENTS.terms.version,
			privacyVersion: LEGAL_DOCUMENTS.privacy.version,
			effectiveFrom: enforcedFrom,
		};

		const cached = await this.#readCache(versions.termsVersion, versions.privacyVersion);
		if (cached) return cached;
		if (!users) return null;

		try {
			const counts = await users.countLegalAcceptance(versions, token);
			const snapshot: LegalAdoption = {
				...counts,
				computedAt: new Date().toISOString(),
				termsVersion: versions.termsVersion,
				privacyVersion: versions.privacyVersion,
				enforcedFrom,
			};
			await this.#writeCache(snapshot);
			return snapshot;
		} catch (err: any) {
			this.#logger.logWarn(`[LegalDocs] No se pudieron contar las aceptaciones: ${err?.message || err}`);
			return null;
		}
	}

	async #readCache(termsVersion: string, privacyVersion: string): Promise<LegalAdoption | null> {
		if (!this.#redis) return null;
		try {
			const raw = await this.#redis.get(CACHE_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw) as LegalAdoption;
			// Un bump de versión invalida el número aunque el TTL siga vivo: mide otra cosa.
			if (parsed.termsVersion !== termsVersion || parsed.privacyVersion !== privacyVersion) return null;
			return parsed;
		} catch {
			return null;
		}
	}

	async #writeCache(snapshot: LegalAdoption): Promise<void> {
		if (!this.#redis) return;
		try {
			await this.#redis.set(CACHE_KEY, JSON.stringify(snapshot), LEGAL_ADOPTION_CACHE_SECONDS);
		} catch {
			/* la caché es una optimización, no una dependencia */
		}
	}
}
