import "@ui-library/utils/react-jsx";
import { useEffect, useRef, useState } from "react";
import { router } from "@common/utils/router.js";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CookiesPage } from "./pages/CookiesPage";
import { DpaPage } from "./pages/DpaPage";
import { TermsPage } from "./pages/TermsPage";
import { ValuesPage } from "./pages/ValuesPage";
import { EthicsPage } from "./pages/EthicsPage";
import { HriaPage } from "./pages/HriaPage";
import { AuthorityRequestsPage } from "./pages/AuthorityRequestsPage";
import { TransparencyPage } from "./pages/TransparencyPage";
import { ContactPage } from "./pages/ContactPage";
import { AcknowledgmentsPage } from "./pages/AcknowledgmentsPage";
import { LicensesPage } from "./pages/LicensesPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { TeamPage } from "./pages/TeamPage";
import { TutorialsPage } from "./pages/TutorialsPage";
import { TutorialArticlePage } from "./pages/TutorialArticlePage";

// Espejo de `uiModule.spaRoutes` en config.json: lo que no esté ahí lo sirve el kernel con 404.
// Agregar una ruta acá sin agregarla allá la deja inalcanzable (404 + NotFoundPage).
const HELP_ROUTES = new Set([
	"/",
	"/privacy",
	"/cookies",
	"/dpa",
	"/terms",
	"/values",
	"/ethics",
	"/hria",
	"/authority-requests",
	"/transparency",
	"/contact",
	"/acknowledgments",
	"/licenses",
	"/team",
	"/roadmap",
	"/tutorials",
]);

/** Rutas internas: las estáticas del set o cualquier subruta de tutoriales. */
function isHelpRoute(pathname: string): boolean {
	return HELP_ROUTES.has(pathname) || pathname.startsWith("/tutorials/");
}

const TUTORIAL_ARTICLE_RE = /^\/tutorials\/([^/]+)\/([^/]+)$/;

interface RouteState {
	path: string;
	hash: string;
}

function readRouteFromLocation(): RouteState {
	return { path: globalThis.location?.pathname || "/", hash: globalThis.location?.hash || "" };
}

function parseRoute(path: string): RouteState {
	const [pathname, fragment] = path.split("#");
	return { path: pathname || "/", hash: fragment ? `#${fragment}` : "" };
}

function scrollToHash(hash: string) {
	if (!hash) {
		globalThis.scrollTo?.({ top: 0, left: 0 });
		return;
	}

	const targetId = decodeURIComponent(hash.slice(1));
	globalThis.requestAnimationFrame(() => {
		globalThis.document?.getElementById(targetId)?.scrollIntoView({ block: "start" });
	});
}

function renderPage(path: string) {
	const tutorialArticle = TUTORIAL_ARTICLE_RE.exec(path);
	if (tutorialArticle) return <TutorialArticlePage appId={tutorialArticle[1]} slug={tutorialArticle[2]} />;
	// `/tutorials` y `/tutorials/:appId` muestran el hub (anclas por app).
	if (path === "/tutorials" || path.startsWith("/tutorials/")) return <TutorialsPage />;

	switch (path) {
		case "/":
			return <HomePage />;
		case "/privacy":
			return <PrivacyPage />;
		case "/cookies":
			return <CookiesPage />;
		case "/dpa":
			return <DpaPage />;
		case "/terms":
			return <TermsPage />;
		case "/values":
			return <ValuesPage />;
		case "/ethics":
			return <EthicsPage />;
		case "/hria":
			return <HriaPage />;
		case "/authority-requests":
			return <AuthorityRequestsPage />;
		case "/transparency":
			return <TransparencyPage />;
		case "/contact":
			return <ContactPage />;
		case "/acknowledgments":
			return <AcknowledgmentsPage />;
		case "/licenses":
			return <LicensesPage />;
		case "/team":
			return <TeamPage />;
		case "/roadmap":
			return <RoadmapPage />;
		default:
			// El kernel ya contestó 404 (ver `uiModule.spaRoutes` en config.json); esto es lo que se ve.
			return (
				<adc-not-found
					actions={JSON.stringify([
						{ label: "Centro de ayuda", href: "/" },
						{ label: "Roadmap", href: "/roadmap" },
					])}
				/>
			);
	}
}

export default function App() {
	const [currentRoute, setCurrentRoute] = useState(readRouteFromLocation);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const syncFromLocation = () => setCurrentRoute(readRouteFromLocation());
		const stopRouter = router.setOnRouteChange((path) => setCurrentRoute(parseRoute(path)));

		globalThis.addEventListener("popstate", syncFromLocation);
		globalThis.addEventListener("hashchange", syncFromLocation);

		return () => {
			stopRouter();
			globalThis.removeEventListener("popstate", syncFromLocation);
			globalThis.removeEventListener("hashchange", syncFromLocation);
		};
	}, []);

	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		const handleInternalLinkClick = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			if (!(event.target instanceof Element)) return;

			const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
			if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

			const url = new URL(anchor.href, globalThis.location?.href);
			if (url.origin !== globalThis.location?.origin || !isHelpRoute(url.pathname)) return;

			event.preventDefault();
			if (globalThis.location?.pathname !== url.pathname || globalThis.location?.hash !== url.hash) {
				globalThis.history?.pushState({}, "", `${url.pathname}${url.hash}`);
			}
			setCurrentRoute({ path: url.pathname, hash: url.hash });
		};

		content.addEventListener("click", handleInternalLinkClick);
		return () => content.removeEventListener("click", handleInternalLinkClick);
	}, []);

	useEffect(() => {
		scrollToHash(currentRoute.hash);
	}, [currentRoute]);

	return (
		<adc-layout>
			<div ref={contentRef} className="px-6 sm:px-8 mt-8">
				<div className="animate-slide-in" key={currentRoute.path}>
					{renderPage(currentRoute.path)}
				</div>
			</div>
		</adc-layout>
	);
}
