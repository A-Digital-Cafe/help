import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { CONTACTS } from "../data/contact";

export function CookiesPage() {
	return (
		<PageShell
			title="Cookies y tecnologías similares"
			subtitle="Qué guarda el sitio en tu dispositivo, para qué, cuánto dura y qué terceros pueden intervenir."
			standards={["Ley 25.326", "GDPR / ePrivacy"]}
			declaration="policy"
			lastUpdated="2026-08-06"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Cookies" }]}
		>
			<h2 id="alcance">1. Qué cubre esta página</h2>
			<p>
				Las cookies no son la única forma de guardar información en tu equipo. El art. 5(3) de la Directiva ePrivacy y las Directrices
				2/2023 del Comité Europeo de Protección de Datos cubren <strong>cualquier</strong> técnica de almacenar o leer datos en tu
				dispositivo, con independencia de la tecnología. Por eso acá declaramos también lo que guardamos con{" "}
				<code>localStorage</code>, <code>sessionStorage</code>, <code>IndexedDB</code> y la caché del Service Worker.
			</p>
			<adc-callout tone="info" role="note">
				Nada de lo que se lista en esta página se usa para publicidad, perfilado ni medición de terceros. No hay cookies de analítica, ni
				píxeles, ni identificadores publicitarios.
			</adc-callout>

			<h2 id="cookies-necesarias">2. Cookies necesarias</h2>
			<p>
				Son imprescindibles para iniciar sesión, mantener tu sesión, prevenir CSRF y garantizar la seguridad básica del sitio. Todas son{" "}
				<strong>propias</strong> (dominio del sitio, <code>.adigitalcafe.com</code> en producción) y todas son <code>HttpOnly</code>: el
				JavaScript de la página no puede leerlas. En producción viajan sólo por HTTPS. Sin ellas, partes esenciales no funcionarían. La
				relación con datos de sesión y seguridad se explica en <a href="/privacy#que-datos-tratamos">privacidad</a>.
			</p>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Cookie</th>
							<th>Para qué</th>
							<th>Duración</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>access_token</code>
							</td>
							<td>Te mantiene con la sesión iniciada mientras navegás.</td>
							<td>
								<strong>15 minutos</strong>, y se renueva sola mientras seguís usando el sitio.
							</td>
						</tr>
						<tr>
							<td>
								<code>refresh_token</code>
							</td>
							<td>Renueva la sesión sin volver a pedirte la contraseña. Sólo se envía a la ruta de renovación.</td>
							<td>
								<strong>30 días</strong>, o hasta que cierres sesión o se revoque.
							</td>
						</tr>
						<tr>
							<td>
								<code>adc_csrf</code>
							</td>
							<td>Evita que otro sitio dispare acciones en tu nombre (protección CSRF).</td>
							<td>
								<strong>2 horas</strong>.
							</td>
						</tr>
						<tr>
							<td>
								<code>oauth_state</code>
							</td>
							<td>Protege el ida y vuelta del login con Discord contra manipulación.</td>
							<td>
								<strong>10 minutos</strong>.
							</td>
						</tr>
						<tr>
							<td>
								<code>oauth_return_url</code>
							</td>
							<td>Recuerda a qué página volver cuando termina el login.</td>
							<td>
								<strong>10 minutos</strong> (5 si estás vinculando una cuenta ya existente).
							</td>
						</tr>
						<tr>
							<td>
								<code>oauth_pending_link</code>
							</td>
							<td>Sostiene el paso intermedio de vincular una cuenta externa a la tuya.</td>
							<td>
								<strong>5 minutos</strong>.
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2 id="cookies-de-preferencia">3. Cookies de preferencia</h2>
			<p>Se crean sólo cuando vos elegís algo en la interfaz, y podés cambiarlo desde el mismo lugar donde lo elegiste.</p>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Cookie</th>
							<th>Para qué</th>
							<th>Duración</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>theme</code>
							</td>
							<td>
								Recuerda si elegiste tema claro u oscuro. Se fija cuando cambiás el tema desde tu cuenta, en el dominio{" "}
								<code>.adigitalcafe.com</code> para que valga en todos los subdominios. No es <code>HttpOnly</code> (la escribe la
								propia página) y <strong>se guarda además en el almacenamiento local</strong>: borrar cookies no alcanza para
								olvidarla.
							</td>
							<td>
								<strong>365 días</strong>.
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2 id="almacenamiento-local">4. Otro almacenamiento en tu navegador</h2>
			<p>
				No son cookies —no viajan al servidor en cada pedido—, pero sí son información guardada en tu equipo, así que la declaramos igual.
				Se agrupa por para qué sirve.
			</p>

			<h3 id="almacenamiento-sesion">4.1 Funcionamiento de la sesión</h3>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Clave</th>
							<th>Dónde</th>
							<th>Para qué</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>adc-auth-expires-at</code>
							</td>
							<td>localStorage</td>
							<td>Marca de tiempo del vencimiento de la sesión, para renovarla antes de que caiga y no cortarte a mitad de algo.</td>
						</tr>
						<tr>
							<td>
								<code>adc-auth-user</code>
							</td>
							<td>localStorage</td>
							<td>
								Huella no reversible de tu identificador de usuario. Sirve para detectar en otras pestañas si la sesión cambió;{" "}
								<strong>no guarda tu identificador real</strong>.
							</td>
						</tr>
						<tr>
							<td>
								<code>adc-auth-event</code>
							</td>
							<td>localStorage</td>
							<td>Último evento de sesión (login o logout) con su marca de tiempo, para sincronizar las pestañas abiertas.</td>
						</tr>
						<tr>
							<td>
								<code>adc-avatar-event</code>
							</td>
							<td>localStorage</td>
							<td>Último cambio de foto de perfil, para que las otras pestañas la refresquen sin recargar.</td>
						</tr>
						<tr>
							<td>
								<code>adc-subscriptions:checkout:…</code>
							</td>
							<td>sessionStorage</td>
							<td>
								Durante un pago, recuerda <strong>2 minutos</strong> el enlace de checkout emitido por la pasarela, para que volver
								con el botón “atrás” no genere una segunda orden. Se borra al cerrar la pestaña.
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 id="almacenamiento-preferencias">4.2 Preferencias de interfaz</h3>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Clave</th>
							<th>Dónde</th>
							<th>Para qué</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>language</code>
							</td>
							<td>localStorage</td>
							<td>El idioma que elegiste. Si no hay ninguno, se usa el del navegador.</td>
						</tr>
						<tr>
							<td>
								<code>theme</code>
							</td>
							<td>localStorage</td>
							<td>Copia de la preferencia de tema, para aplicarla apenas carga la página y evitar el parpadeo.</td>
						</tr>
						<tr>
							<td>
								<code>editor:view</code>
							</td>
							<td>localStorage</td>
							<td>Si preferís la vista de escritorio o la de móvil en el editor.</td>
						</tr>
						<tr>
							<td>
								<code>adc-drive:view</code>
							</td>
							<td>localStorage</td>
							<td>Si mirás tus archivos en lista o en grilla.</td>
						</tr>
						<tr>
							<td>
								<code>adc-ie-leftW</code>, <code>adc-ie-rightW</code>
							</td>
							<td>localStorage</td>
							<td>Ancho de los paneles laterales del editor de imágenes.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 id="almacenamiento-trabajo">4.3 Trabajo en curso y caché sin conexión</h3>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Qué</th>
							<th>Dónde</th>
							<th>Para qué</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<code>adc-image-editor</code>
							</td>
							<td>IndexedDB</td>
							<td>
								Borrador del proyecto que tenés abierto en el editor de imágenes: la escena, el historial de deshacer/rehacer y dónde
								quedó guardado en Drive. Es lo que te permite recuperar el trabajo tras recargar o iniciar sesión. Queda hasta que
								borres los datos del sitio.
							</td>
						</tr>
						<tr>
							<td>
								<code>adc-drive-tunnel</code>
							</td>
							<td>IndexedDB</td>
							<td>
								Sólo si usás el túnel de dispositivos de Drive: los permisos de las carpetas locales que autorizaste y las carpetas
								que sincronizás. Guarda las referencias del sistema de archivos, no el contenido de tus archivos.
							</td>
						</tr>
						<tr>
							<td>
								<code>adc-drive:tunnel-device-id</code>
							</td>
							<td>localStorage</td>
							<td>Identificador del dispositivo que registraste en ese túnel, para reconocerlo entre sesiones.</td>
						</tr>
						<tr>
							<td>Cachés cuyo nombre empieza con {"adc-"}</td>
							<td>Cache Storage (Service Worker)</td>
							<td>
								Copias de la propia interfaz —HTML, JavaScript, hojas de estilo y tipografías— para que el sitio cargue
								rápido y siga andando sin conexión. No se cachean las llamadas a la API ni las imágenes, y las versiones viejas se
								borran solas cuando publicamos una nueva.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				Existe además una clave <code>adc:debug</code> que sube el detalle de los mensajes en la consola del navegador. El sitio nunca la
				escribe: sólo la lee, y únicamente aparece si la creás vos a mano para diagnosticar algo.
			</p>

			<h2 id="analitica">5. Analítica</h2>
			<p>
				Usamos <strong>Cloudflare Web Analytics</strong>, que mide tráfico de forma agregada <strong>sin instalar cookies</strong> en tu
				navegador y sin tracking publicitario. La métrica se basa en señales del proxy de Cloudflare, descrito también en{" "}
				<a href="/privacy#infraestructura-y-subprocesadores">infraestructura y subprocesadores</a>. No cargamos ningún script de medición
				en la página; de hecho, nuestra política de seguridad de contenido no autoriza scripts de analítica.
			</p>

			<h2 id="terceros">6. Terceros que tu navegador puede contactar</h2>
			<p>
				Aunque no instalen cookies, pedirle un archivo a un servidor ajeno le muestra a ese tercero tu dirección IP y datos de tu
				navegador. Esta es la lista completa de lo que puede pasar en nuestras páginas:
			</p>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Tercero</th>
							<th>Cuándo se lo contacta</th>
							<th>Qué recibe</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>YouTube (Google)</td>
							<td>
								<strong>Sólo si apretás reproducir.</strong> Antes de ese clic el video se muestra con una portada dibujada por
								nosotros, sin ninguna petición de red. Recién al reproducir se carga el reproductor desde{" "}
								<code>youtube-nocookie.com</code>, la variante sin cookies de seguimiento.
							</td>
							<td>Tu IP, tu navegador y el video que pediste, más lo que YouTube haga en ese modo durante la reproducción.</td>
						</tr>
						<tr>
							<td>CDN de Discord</td>
							<td>
								<strong>Sin que hagas nada</strong>, cuando una página muestra la foto de perfil de alguien que vinculó su cuenta de
								Discord (por ejemplo en un comentario). La imagen se pide directamente a <code>cdn.discordapp.com</code>.
							</td>
							<td>Tu IP, tu navegador y la página desde la que se pidió la imagen.</td>
						</tr>
						<tr>
							<td>
								CDN de módulos (<code>esm.sh</code>)
							</td>
							<td>
								Nuestras páginas declaran que las librerías de React pueden resolverse desde ese CDN público. Según cómo cargue cada
								app, tu navegador puede descargarlas de ahí al abrir la página.
							</td>
							<td>Tu IP y tu navegador. No instala cookies ni identificadores.</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				Los <strong>avatares por defecto</strong> (los que ves cuando alguien no subió foto) no involucran a ningún tercero: son un
				puñado de dibujos propios, guardados con el resto del sitio, y se elige uno de forma fija a partir del identificador de la
				cuenta. No se genera nada ni se consulta a nadie.
			</p>
			<adc-callout tone="warning" role="note">
				De esa lista, dos pueden contactarse sin que vos hagas nada: el CDN de Discord, siempre que la página muestre una de esas fotos, y
				el CDN de módulos, según cómo cargue cada app. YouTube, en cambio, no se contacta hasta que apretás reproducir. Servir esas
				fotos desde nuestra propia infraestructura, como ya hacemos con los avatares por defecto, y auto-hospedar las librerías de
				React son trabajos pendientes que se siguen en el{" "}
				<a href="/roadmap#capa-de-transparencia-operaciones">roadmap</a>.
			</adc-callout>

			<h2 id="cookies-opcionales">7. Cookies opcionales</h2>
			<p>
				En la fase actual del sitio principal no se incorporan cookies analíticas, de marketing ni de terceros que requieran
				consentimiento; por eso no vas a ver un banner de consentimiento. El subdominio <code>games</code> incorporará publicidad; si esa
				publicidad usa cookies, identificadores o proveedores de medición, se publicará un aviso específico y se solicitará consentimiento
				cuando corresponda antes de activarlos. La regla de subdominios con avisos propios está en los{" "}
				<a href="/terms#subdominios-con-reglas-propias">términos</a> y el trabajo pendiente se sigue en el{" "}
				<a href="/roadmap#capa-de-transparencia-operaciones">roadmap</a>.
			</p>

			<h2 id="gestion">8. Cómo lo gestionás</h2>
			<p>
				Podés borrar las cookies desde tu navegador cuando quieras, pero tené en cuenta que{" "}
				<strong>
					borrar las cookies del navegador no elimina lo que el sitio guarda en el almacenamiento local; para eso hay que borrar los
					datos del sitio
				</strong>{" "}
				(la opción suele llamarse “datos de sitios” o “datos almacenados”). Es el caso, por ejemplo, del tema
				visual: vive en una cookie y también en el almacenamiento local.
			</p>
			<ul>
				<li>
					<strong>Cerrar sesión</strong> elimina las cookies de sesión y limpia el marcador de sesión del almacenamiento local.
				</li>
				<li>
					<strong>Borrar los datos del sitio</strong> también borra el borrador que tengas abierto en el editor de imágenes y los
					permisos de carpetas locales del túnel de Drive. Lo que ya guardaste en Drive no se toca.
				</li>
				<li>
					<strong>Bloquear las cookies</strong> del sitio impide iniciar sesión: las cookies de la sección 2 no son opcionales para que
					el login funcione.
				</li>
				<li>
					En <strong>navegación privada</strong> todo lo anterior se descarta al cerrar la ventana.
				</li>
			</ul>
			<p>
				Para dudas, contactanos desde los <a href="/contact#canales">canales publicados</a>:{" "}
				<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a> o vía Discord{" ("}
				<a href={CONTACTS.discordUrl} rel="noreferrer">
					{CONTACTS.discordHandle}
				</a>
				{")."}
			</p>
		</PageShell>
	);
}
