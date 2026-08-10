import "@ui-library/utils/react-jsx";
import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";

/** Una entrada de `licenses.json`, tal como la emite `scripts/build-license-notices.mjs`. */
interface LicenseEntry {
	name: string;
	version: string;
	license: string;
	author: string;
	homepage: string;
	text: string;
}

/**
 * Aviso de licencias del software de terceros que la plataforma sirve al navegador.
 *
 * Los datos no viven en el repositorio: los genera el build a partir del árbol de
 * dependencias instalado y los deja en `common/public`, que UIFederationService sirve
 * en la raíz de todas las apps. Versionar el listado sólo garantizaría que quede viejo.
 */
export function LicensesPage() {
	const [entries, setEntries] = useState<LicenseEntry[] | null>(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		let active = true;
		fetch("/licenses.json")
			.then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
			.then((data: LicenseEntry[]) => active && setEntries(Array.isArray(data) ? data : []))
			.catch(() => active && setFailed(true));
		return () => {
			active = false;
		};
	}, []);

	return (
		<PageShell
			title="Licencias de terceros"
			subtitle="El software de código abierto que viaja en el bundle que descarga tu navegador."
			declaration="informational"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Licencias" }]}
		>
			<p>
				Cuando abrís una app de ADC, tu navegador descarga un archivo que <strong>contiene copias</strong> de las librerías listadas
				abajo. Servir ese archivo es distribuirlas, y las licencias permisivas bajo las que se publican (MIT, BSD, ISC) lo autorizan con
				una condición: conservar el aviso de copyright y el texto de la licencia. Eso es esta página.
			</p>
			<p>
				El minificador borra los comentarios del bundle, incluidos los avisos de licencia que traen los paquetes. Por eso el aviso se
				genera aparte, en cada build, desde el árbol de dependencias instalado: así no puede quedar desactualizado respecto de lo que
				realmente se está sirviendo. La versión en texto plano está en{" "}
				<a href="/licenses.txt">/licenses.txt</a>.
			</p>
			<p>
				Los titulares de cada paquete conservan todos sus derechos. Nada de lo que sigue forma parte de la licencia del código propio de
				ADC, que se rige por su propio <a href="/terms">acuerdo</a>.
			</p>

			{failed && (
				<adc-callout tone="warning" role="note">
					No se pudo cargar el listado de licencias. Probá con el archivo en texto plano: <a href="/licenses.txt">/licenses.txt</a>.
				</adc-callout>
			)}

			{!entries && !failed && <adc-skeleton variant="rectangular" height="320px" />}

			{entries && (
				<>
					<h2 id="paquetes">Paquetes incluidos ({entries.length})</h2>
					{entries.map((entry) => (
						<details key={`${entry.name}@${entry.version}`} className="border-b border-border/50 py-2">
							<summary className="cursor-pointer">
								<strong>{entry.name}</strong> <span className="opacity-70">{entry.version}</span> —{" "}
								<adc-badge color="blue">{entry.license}</adc-badge>
							</summary>
							<div className="mt-2">
								{entry.author && (
									<p className="text-sm opacity-80">
										Autoría: {entry.author}
									</p>
								)}
								{entry.homepage && (
									<p className="text-sm opacity-80">
										Origen: <a href={entry.homepage} rel="noreferrer">{entry.homepage}</a>
									</p>
								)}
								<pre className="whitespace-pre-wrap text-xs p-3 rounded bg-surface">
									{entry.text || `El paquete no publica el texto de la licencia; se declara como "${entry.license}".`}
								</pre>
							</div>
						</details>
					))}
				</>
			)}
		</PageShell>
	);
}
