/**
 * Los avatares están **self-hosteados** en `public/avatars/`, no enlazados a su origen.
 * Enlazarlos filtraba la IP de cada visitante de /team a cuatro terceros (el CDN de Discord,
 * GitHub y dos sitios personales) sin base legal ni aviso. Al actualizar una foto hay que volver
 * a descargarla acá; a cambio, la página no hace ni una petición externa.
 *
 * Las entradas que no son la titular del proyecto se publican **con consentimiento fechado**
 * (`consentAt`/`consentChannel`), que es la base legal de publicar sus datos. La constancia —el
 * mensaje donde se prestó— **no vive en este repositorio**: se archiva fuera. Sin `consentAt` la
 * entrada no se pinta, así que el campo es la condición de publicación y no una anotación.
 */

type RoleColor = "text-accentorange" | "text-accentcyan" | "text-accentpurple";

/** Por dónde se prestó el consentimiento; es también la vía para retirarlo. */
type ConsentChannel = "discord" | "whatsapp" | "email";

export interface TeamMember {
	name: string;
	username?: string;
	role: string;
	description?: string;
	image?: string;
	href?: string;
	roleColor?: RoleColor;
	/** Fecha (ISO `YYYY-MM-DD`) del consentimiento a publicar estos datos. Ausente = no se publica. */
	consentAt?: string;
	consentChannel?: ConsentChannel;
}

export const FOUNDER: TeamMember = {
	name: "Abigail Palmero",
	username: "@abbytec",
	role: "Founder / CEO",
	roleColor: "text-accentorange",
	description: "No se que hago acá, me obligaron o algo así. Pero aguante el café, typescript y el sushi.",
	href: "https://abbytec.dev.ar",
	image: "/avatars/abigail-palmero.png",
};

export const DEV_MEMBER: TeamMember = {
	name: "Ailen Franco",
	role: "Dev Contributor",
	roleColor: "text-accentpurple",
	description: "Desarrolladora web apasionada por crear experiencias digitales únicas y funcionales.",
	href: "https://portfolio-wheat-mu-60.vercel.app/",
	image: "/avatars/def-avatar-morado.svg",
	consentAt: "2026-08-08",
	consentChannel: "whatsapp",
};

export const COMMUNITY_MEMBERS: TeamMember[] = [
	{
		name: "Salwa",
		username: "@SoySalwa",
		role: "Discord Moderator",
		roleColor: "text-accentcyan",
		description: "C++ Developer | C++ Enthusiast | C++ Content Creator | C++ Lover | C++ Advocate",
		href: "https://soysalwa.pages.dev/",
		image: "/avatars/def-avatar-celeste.svg",
		consentAt: "2026-08-08",
		consentChannel: "discord",
	},
	{
		name: "Hormiga Dev",
		username: "@HormigaDev",
		role: "Discord Moderator",
		roleColor: "text-accentcyan",
		description: "La aptitud te ayuda a empezar la carrera, la actitud determina la distancia que recorres y la huella que dejas.",
		href: "https://www.hormiga.dev/",
		image: "/avatars/def-avatar-azul.svg",
		consentAt: "2026-08-08",
		consentChannel: "discord",
	},
];
