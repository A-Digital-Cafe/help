import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { CONTACTS } from "../data/contact";

export function CookiesPage() {
	return (
		<PageShell
			title="Cookies y tecnologías similares"
			subtitle="Qué guarda el sitio en tu dispositivo, para qué, cuánto dura y qué terceros pueden intervenir."
			standards={["Ley 25.326", "GDPR / ePrivacy (alineación voluntaria)"]}
			declaration="policy"
			lastUpdated={LEGAL_DOCUMENTS.cookies.version}
			legalDocId="cookies"
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
				Nada de lo que se lista en esta página se usa para publicidad ni perfilado. No hay cookies de analítica, ni píxeles, ni
				identificadores publicitarios. La única medición es la analítica sin estado de <a href="#analitica">§ 5</a>, que no guarda nada en
				tu dispositivo.
			</adc-callout>

			<h2 id="cookies-necesarias">2. Cookies necesarias</h2>
			<p>
				Son imprescindibles para iniciar sesión, mantener tu sesión, prevenir CSRF, servirte la interfaz completa y garantizar la
				seguridad básica del sitio. Todas son{" "}
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
						<tr>
							<td>
								<code>adc_build</code>
							</td>
							<td>
								<strong>Sólo si el sitio está corriendo en más de un servidor.</strong> Anota con qué versión de la interfaz cargaste la
								página, para que el resto de sus archivos te lleguen de ese mismo servidor y no te queden pantallas a medio cargar.
								Guarda un número de compilación y nada más: no te identifica, no registra por dónde navegás ni sale del sitio. Hoy
								funcionamos con un solo servidor, así que todavía no se crea.
							</td>
							<td>
								<strong>Lo que dure la sesión de navegación</strong>: se borra al cerrar el navegador.
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
							<td>
								<code>adc-generators:*</code>
							</td>
							<td>localStorage</td>
							<td>
								Lo que tenés a medio hacer en los generadores del subdominio <code>gen</code>: el último texto que escribiste, la
								paleta en curso y las preferencias de cada herramienta. Se guarda para que no pierdas el trabajo al recargar, no se
								envía a nuestros servidores y se borra desde el propio generador o borrando los datos del sitio. Funciona sin cuenta
								y no lleva ningún identificador que permita seguirte entre visitas.
							</td>
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
				navegador y sin tracking publicitario. Cloudflare está descrito también en{" "}
				<a href="/privacy#infraestructura-y-subprocesadores">infraestructura y subprocesadores</a>.
			</p>
			<p>
				Para medir, nuestras páginas incluyen un pequeño script de Cloudflare (<code>static.cloudflareinsights.com</code>) que reporta la
				visita. Es analítica <strong>sin estado</strong>: no escribe cookies ni ninguna otra clave en tu equipo, no crea un identificador
				que te siga entre visitas y no alimenta perfiles publicitarios. Por no guardar nada en tu dispositivo, no entra en el supuesto de
				consentimiento previo del art. 5.3 de la Directiva ePrivacy. Si bloqueás scripts de terceros con una extensión, el sitio funciona
				igual: la medición simplemente no ocurre.
			</p>
			<p>
				<strong>Respetamos Global Privacy Control (GPC).</strong> Si tu navegador —o una extensión— envía la señal <code>Sec-GPC</code>, no
				insertamos ese script: la visita no se mide y Cloudflare no recibe nada. Lo decide nuestro servidor en cada pedido, así que no hace
				falta que configures nada acá ni que aceptes o rechaces un cartel. Publicamos esa declaración, como pide la especificación, en{" "}
				<a href="/.well-known/gpc.json">
					<code>/.well-known/gpc.json</code>
				</a>
				.
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
							<td>Cloudflare (analítica)</td>
							<td>
								<strong>Sin que hagas nada</strong>, en todas las páginas: incluimos su script de medición desde{" "}
								<code>static.cloudflareinsights.com</code> y éste reporta la visita a <code>cloudflareinsights.com</code>.{" "}
								<strong>No ocurre si tu navegador envía la señal GPC</strong> (ver <a href="#analitica">analítica</a>).
							</td>
							<td>
								Tu IP, tu navegador y la página visitada, más métricas de rendimiento de la carga. No escribe cookies ni ningún
								identificador persistente en tu equipo.
							</td>
						</tr>
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
							<td>Google (servidor STUN)</td>
							<td>
								<strong>Sólo si abrís una transferencia entre tus dispositivos</strong> en la sección Dispositivos del Drive. Para que
								los dos equipos se encuentren, tu navegador consulta <code>stun.l.google.com</code> con qué dirección pública lo ve tu
								router.
							</td>
							<td>
								Tu IP y el puerto que le asigna tu router. No recibe el contenido que transferís ni nada de tu cuenta, y no escribe nada
								en tu equipo.
							</td>
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
				De esa lista, sólo la analítica de Cloudflare se contacta sin que vos hagas nada: YouTube no se contacta hasta que apretás
				reproducir, y el servidor STUN sólo si abrís una transferencia entre tus dispositivos. La lista se acortó: las <strong>librerías de React</strong> y las <strong>fotos de perfil de Discord</strong> ya no
				están. Las librerías se sirven desde nuestra propia infraestructura, y la foto de quien vincula una cuenta de Discord se
				descarga <strong>una sola vez desde nuestro servidor</strong> al vincularla y se guarda con el resto de los archivos: tu
				navegador nunca le pide nada al CDN de Discord. Si esa descarga falla, la cuenta usa el avatar por defecto —nunca se enlaza la
				imagen remota—.
			</adc-callout>

			<h2 id="cookies-opcionales">7. Cookies opcionales</h2>
			<p>
				En la fase actual del sitio principal no se incorporan cookies ni identificadores de marketing, ni ninguna tecnología que guarde
				datos en tu equipo y requiera consentimiento previo —la analítica de <a href="#analitica">§ 5</a> no guarda nada—; por eso no vas
				a ver un banner de consentimiento. El subdominio <code>games</code> incorporará publicidad; si esa
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
