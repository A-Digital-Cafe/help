import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { CONTACTS, OPERATOR } from "../data/contact";

export function PrivacyPage() {
	return (
		<PageShell
			title="Política de Privacidad"
			subtitle="Datos personales, infraestructura y subprocesadores."
			standards={["Ley 25.326", "GDPR"]}
			declaration="policy"
			lastUpdated={LEGAL_DOCUMENTS.privacy.version}
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Privacidad" }]}
		>
			<h2 id="responsable">1. Responsable</h2>
			<p>
				El sitio es operado por <strong>{OPERATOR.legalName}</strong>, CUIT: <strong>{OPERATOR.taxId}</strong>, {OPERATOR.country},{" "}
				<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>, <a href={OPERATOR.phoneHref}>{OPERATOR.phone}</a> bajo el nombre
				comercial <strong>Abby's Digital Cafe (ADC)</strong>. Para consultas sobre privacidad o ejercicio de derechos puedes escribir a{" "}
				<strong>
					<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
				</strong>{" "}
				o contactar a <strong>{CONTACTS.discordHandle}</strong> en{" "}
				<a href={CONTACTS.discordUrl} rel="noreferrer">
					Discord
				</a>
				{"."}
			</p>

			<h2 id="que-datos-tratamos">2. Qué datos tratamos</h2>
			<ul>
				<li>Datos de cuenta (identificador, email si aplica, credenciales hasheadas).</li>
				<li>
					Dirección IP, asociada a:
					<ul className="list-disc list-inside">
						<li>tokens de inicio de sesión activos,</li>
						<li>registro de intentos de login (incluidos los fallidos),</li>
						<li>aplicación de límites de tasa (rate limiting) en Redis.</li>
					</ul>
				</li>
				<li>Metadatos técnicos mínimos necesarios para autenticación, sesión y seguridad.</li>
				<li>Contenido que decides publicar (artículos, comentarios, archivos adjuntos).</li>
				<li>
					Lo que escribís en un <strong>ticket de soporte</strong> (queja, sugerencia o reporte de seguridad): título, descripción,
					adjuntos y comentarios, más el email de contacto que indiques y el de tu sesión.
				</li>
				<li>
					Lo que enviás al <strong>solicitar la creación de una organización</strong>: sus datos (nombre, email, sitio, redes) y, para
					prevenir abuso del alta, tu identificador de cuenta, el email de tu sesión y <strong>la dirección IP</strong> desde la que
					hacés la solicitud.
				</li>
				<li>
					<strong>Datos de la contratación de un plan</strong> (si contratás uno): plan y asientos, precio de lista, importe
					efectivamente cobrado y su moneda, la cotización oficial aplicada para expresarlo en pesos, los identificadores que la
					pasarela asigna a cada pago y, si ejercés el arrepentimiento, la constancia de esa revocación. <strong>No recibimos ni
					almacenamos los datos de tu tarjeta</strong>: los trata la pasarela de pago.
				</li>
				<li>
					<strong>Datos fiscales de la contratación</strong> (si contratás un plan): el país de residencia fiscal que declarás,
					porque determina qué comprobante corresponde emitir, y —sólo si ese país no es Argentina— el nombre y el domicilio que
					ARCA exige para la factura de exportación, más tu identificación fiscal si querés que figure. Junto a tu declaración
					guardamos el país que dedujo la red de distribución a partir de tu IP, como constancia de la operación; no decide nada y
					una diferencia entre ambos no te bloquea la compra.
				</li>
				<li>
					<strong>Dispositivos vinculados a Drive</strong> (si usás la sección Dispositivos): nombre que les des, tipo
					(navegador o agente CLI), fecha de última conexión y, para agentes CLI, un token de acceso del que sólo
					almacenamos el hash. Podés renombrarlos o revocarlos cuando quieras.
				</li>
				<li>
					<strong>Credenciales de unidades remotas</strong> (si conectás un S3 o WebDAV propio): se guardan únicamente{" "}
					<em>cifradas</em> — con tu clave de usuario o, si elegís el modo passphrase, cifradas de punta a punta en tu
					dispositivo de forma que ADC no puede leerlas. La plataforma nunca se conecta a esos servicios: la conexión la
					inicia siempre tu dispositivo, y el contenido de esas unidades no se almacena en ADC.
				</li>
			</ul>

			<h2 id="finalidades">3. Para qué usamos esos datos (base legal y finalidad)</h2>
			<ul>
				<li>
					<strong>Ejecución del servicio que solicitas</strong> (art. 6.1.b RGPD; art. 5.2, inc. d) de la Ley 25.326, tratamiento
					derivado de una relación contractual): registro y alta de cuenta, autenticación y sesión, almacenamiento de tus archivos y
					correo, dispositivos vinculados, soporte y gestión de tu plan.
				</li>
				<li>
					<strong>Obligación legal</strong> (art. 6.1.c RGPD): emisión y conservación de comprobantes fiscales, constancia de los
					arrepentimientos de compra y su reintegro, y tramitación de las solicitudes de derechos dentro de los plazos que fija la ley.
				</li>
				<li>
					<strong>Consentimiento explícito</strong> para usos opcionales (
					<a href="/cookies#cookies-opcionales">cookies no esenciales</a>, comunicaciones a las que te suscribas).
				</li>
				<li>
					<strong>Interés legítimo</strong> (art. 6.1.f RGPD), detallado abajo.
				</li>
			</ul>

			<h3 id="intereses-legitimos">3.1. Qué intereses legítimos invocamos</h3>
			<p>
				Cuando decimos “interés legítimo” no lo usamos como comodín. Son cinco finalidades concretas, cada una con el dato mínimo que
				necesita y con la razón por la que entendemos que no desplaza tus derechos:
			</p>
			<ul>
				<li>
					<strong>Seguridad y prevención del abuso.</strong> Frenar fuerza bruta, automatización abusiva y ataques contra la
					plataforma. Tratamos tu IP, contadores de intentos fallidos y metadatos de la petición. Sin esto, cualquier cuenta —incluida
					la tuya— queda expuesta a que la tomen por asalto. Es el caso que el propio considerando 49 del RGPD reconoce como interés
					legítimo del responsable.
				</li>
				<li>
					<strong>Moderación y prevención de evasión de baneos.</strong> Hacer cumplir los <a href="/terms">Términos</a> y evitar que
					una cuenta sancionada vuelva creando otra. Deliberadamente lo hacemos con <em>hashes unidireccionales</em> del email y de la
					IP en lugar de guardar esos datos en claro: es la opción menos invasiva que sirve para la finalidad. Qué guarda exactamente
					cada bloqueo, y por cuánto tiempo, está en <a href="#conservacion">§5</a>.
				</li>
				<li>
					<strong>Diagnóstico y disponibilidad del servicio.</strong> Depurar errores, medir disponibilidad y dimensionar capacidad.
					Son metadatos técnicos (ruta, código de estado, latencia, módulo) con redacción automática de datos sensibles, y los registros
					de aplicación <strong>no se persisten</strong> (ver <a href="#conservacion">§5</a>).
				</li>
				<li>
					<strong>Medición agregada del tráfico.</strong> Saber cuánta gente usa el sitio y detectar anomalías, con{" "}
					<a href="/cookies#analitica">analítica sin cookies</a>: sin identificadores en tu dispositivo, sin perfilado y sin envío a
					redes publicitarias. Al no escribir nada en tu equipo, tampoco requiere consentimiento bajo ePrivacy.
				</li>
				<li>
					<strong>Novedades del propio servicio</strong> a personas que ya son usuarias: cambios relevantes, funciones nuevas y avisos
					de mantenimiento. Nunca comunicaciones de terceros. Podés desactivarlas por categoría en las preferencias de notificación de
					tu cuenta, y cada envío incluye cómo hacerlo.
				</li>
			</ul>
			<p>
				El “interés legítimo” es una figura del RGPD que la <strong>Ley 25.326 no tiene</strong>: su art. 5.1 exige consentimiento y su
				art. 5.2 enumera excepciones cerradas, sin una cláusula abierta equivalente. Por eso, bajo la ley argentina, estas finalidades se
				apoyan en el <strong>art. 5.2, inc. d)</strong>, por derivar de la relación contractual que tenés con nosotros. Para quienes
				visitan el sitio sin tener cuenta no hay relación contractual ni base equivalente al interés legítimo: por eso limitamos ese
				tratamiento a lo estrictamente imprescindible para la seguridad del sistema —la IP de la petición y sus metadatos técnicos— y a
				métricas de tráfico agregadas, sin identificadores en tu dispositivo y sin perfilado.
			</p>
			<adc-callout tone="info" role="note">
				<strong>Derecho de oposición.</strong> Podés oponerte a cualquiera de estos tratamientos (art. 21 RGPD) escribiendo a los
				canales de <a href="#responsable">contacto</a>. Si te oponés a las novedades del servicio, dejamos de enviarlas sin más. Si te
				oponés a los tratamientos de seguridad y moderación, evaluamos tu situación particular, pero anticipamos que no podremos dejar de
				aplicarlos sin dejar de prestar el servicio de forma segura: son la condición para que la plataforma siga en pie.
			</adc-callout>

			<adc-callout tone="info" role="note">
				No utilizamos los datos personales del sitio principal para tracking publicitario, ni los vendemos o alquilamos a terceros, ni
				hacemos perfilado para terceros. El subdominio <code>games</code> incorporará publicidad y no queda cubierto por esta afirmación
				sobre el sitio principal; sus <a href="/cookies#cookies-opcionales">proveedores, cookies o identificadores</a> se documentarán
				por separado antes de activarlos.
			</adc-callout>

			<h2 id="tus-derechos">4. Tus derechos</h2>
			<p>
				Puedes ejercer derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad escribiendo a los canales
				indicados en <a href="#responsable">§1</a>. El ejercicio de estos derechos es <strong>gratuito</strong>.
			</p>
			<p>
				Como el responsable está establecido en Argentina, aplicamos los plazos de la{" "}
				<strong>Ley 25.326 de Protección de los Datos Personales</strong>, que son más breves que los del RGPD:
			</p>
			<ul>
				<li>
					<strong>Acceso: 10 días corridos</strong> desde que recibimos la solicitud (art. 14, inc. 2 de la Ley 25.326).
				</li>
				<li>
					<strong>Rectificación, actualización o supresión: 5 días hábiles</strong> desde que recibimos la solicitud (art. 16, inc. 2 de
					la Ley 25.326).
				</li>
			</ul>
			<p>
				Cuando el RGPD también resulte aplicable a tu caso, se aplica el plazo que te resulte más favorable —que en la práctica es
				siempre el argentino, frente al mes que fija el art. 12.3 del RGPD—.
			</p>
			<p>
				Si considerás que no respetamos alguno de estos derechos, podés reclamar ante la{" "}
				<strong>Agencia de Acceso a la Información Pública (AAIP)</strong>, órgano de control de la Ley 25.326 en Argentina —Av. Pte.
				Julio A. Roca 710, piso 2°, CABA;{" "}
				<a href="https://www.argentina.gob.ar/aaip" rel="noreferrer">
					argentina.gob.ar/aaip
				</a>
				—. Si residís en la Unión Europea, podés además acudir a la autoridad de control de tu país.
			</p>

			<h2 id="conservacion">5. Conservación</h2>
			<p>Conservamos cada dato sólo el tiempo necesario para la finalidad para la que fue recogido. Los plazos concretos son:</p>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Categoría</th>
							<th>Plazo</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Datos de cuenta</td>
							<td>Mientras la cuenta esté activa.</td>
						</tr>
						<tr>
							<td>Sesión: token de acceso</td>
							<td>
								<strong>15 minutos</strong>.
							</td>
						</tr>
						<tr>
							<td>Sesión: token de refresco</td>
							<td>
								<strong>30 días</strong>, o hasta que cierres sesión o se revoque.
							</td>
						</tr>
						<tr>
							<td>Contador de intentos de login fallidos</td>
							<td>
								<strong>24 horas</strong> desde el último intento.
							</td>
						</tr>
						<tr>
							<td>Bloqueo temporal por fuerza bruta</td>
							<td>
								<strong>1 hora</strong>; el registro de un bloqueo permanente, <strong>30 días</strong>.
							</td>
						</tr>
						<tr>
							<td>Hash de IP asociado al inicio de sesión</td>
							<td>
								<strong>3 horas</strong> desde el último intento (alimenta la lista anti-evasión descrita abajo).
							</td>
						</tr>
						<tr>
							<td>Ventanas de límite de tasa (rate limiting)</td>
							<td>La duración de la propia ventana (por ejemplo, 1 hora para el alta de cuentas).</td>
						</tr>
						<tr>
							<td>Registros (logs) de aplicación</td>
							<td>
								<strong>No se persisten.</strong> Viven en un buffer en memoria de 5.000 entradas, con redacción automática de
								datos sensibles al escribirse, y se pierden al reiniciar el proceso.
							</td>
						</tr>
						<tr>
							<td>Muestras de disponibilidad por módulo</td>
							<td>Se toman cada 3 horas y alimentan la página de estado pública; no contienen datos personales.</td>
						</tr>
						<tr>
							<td>Solicitudes de creación de organización</td>
							<td>
								<strong>Sin plazo fijo</strong>: son el respaldo del alta de una organización que puede seguir existiendo después
								de que te vayas. Al eliminarse la cuenta se anonimizan igual que los tickets: se borran tu identificador de
								cuenta, el email de sesión y <strong>la dirección IP</strong> desde la que hiciste la solicitud, y esas líneas
								pasan a decir “(cuenta eliminada)”. Sobreviven los datos de la organización que pediste crear.
							</td>
						</tr>
						<tr>
							<td>Tickets de soporte y su contenido</td>
							<td>
								<strong>Sin plazo fijo</strong>: son el registro de qué se reportó y cómo se resolvió. Al eliminarse la cuenta el
								ticket <strong>no se borra, se anonimiza</strong>: se eliminan el email de contacto, el email de sesión, el vínculo
								con tu cuenta y el handle con el que hubieras pedido crédito público, y esas líneas se reemplazan en el cuerpo por
								“(cuenta eliminada)”. Sobreviven el título y la descripción tal como los escribiste, la severidad, el estado, los
								adjuntos y los comentarios —y, en reportes de seguridad, el hash de la descripción original—. Si escribiste datos
								personales dentro de ese texto libre, se conservan.
							</td>
						</tr>
						<tr>
							<td>Contratación, pagos y constancia de arrepentimiento</td>
							<td>
								Mientras la suscripción esté vigente y luego, como respaldo de la operación, junto con los comprobantes de la fila
								siguiente. Incluye el plan, el precio de lista, el importe cobrado, la cotización oficial aplicada con su fuente y
								fecha, los identificadores de pago de la pasarela y —si ejercés el arrepentimiento— fecha, quién lo pidió, pagos
								reintegrados, importe, moneda y estado del reintegro.
							</td>
						</tr>
						<tr>
							<td>Comprobantes fiscales y registros contables</td>
							<td>El plazo que exige la normativa fiscal argentina, que sobrevive a la baja de la cuenta.</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				Los registros de acceso HTTP del borde los conserva <strong>Cloudflare</strong> según sus propios plazos, descritos en{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a>; ADC no guarda copia propia de ellos.
			</p>
			<p>
				<strong>Contenido en Drive y adjuntos:</strong> los archivos que eliminás pasan a la papelera, de la que se quitan
				automáticamente a los <strong>30 días</strong>. A partir de ahí entran en un período de retención de hasta <strong>3 meses</strong>{" "}
				en el que ya no son accesibles para vos ni cuentan contra tu cuota, pero un administrador todavía puede restaurarlos ante un borrado
				accidental o un incidente. Cumplido ese plazo —o al borrarse la cuenta— el binario se elimina de forma definitiva del almacenamiento.
				Ese período de gracia tiene, además, una <strong>capacidad limitada</strong>: como no consume tu cuota, conservamos como mucho tanto
				volumen retenido como espacio tenés contratado, y al superarlo se eliminan definitivamente los archivos retenidos más antiguos.
				Es una salvaguarda de capacidad, no una retención más corta: <strong>no acorta los 3 meses de nada que puedas seguir usando</strong>.
			</p>
			<p>
				<strong>Transferencias entre dispositivos (túnel de Drive):</strong> el contenido que movés en vivo entre tus
				dispositivos (carpetas montadas y unidades remotas) <strong>no se almacena</strong> en la plataforma: el servidor sólo
				lo retransmite en tránsito, y cuando la conexión es directa entre navegadores (P2P) ni siquiera pasa por nuestros
				servidores — sólo intercambiamos la señalización para establecerla. De las <strong>carpetas de transferencia</strong>{" "}
				guardamos el archivo (con las reglas normales de Drive) y un registro de qué dispositivos tuyos confirmaron la
				descarga; si activás el <em>autoborrado</em>, el archivo se elimina <strong>definitivamente y sin pasar por la
				papelera</strong> cuando todos tus dispositivos suscritos lo descargaron o al vencer el plazo que configures — es una
				excepción, elegida por vos, a la retención descrita arriba. Los dispositivos vinculados, sus registros de entrega y
				las unidades remotas se eliminan junto con la cuenta.
			</p>
			<p>
				<strong>Cuentas baneadas o eliminadas:</strong> se conservan durante <strong>30 días</strong> desde el evento (ban o solicitud de
				borrado) y luego se eliminan automáticamente.
			</p>
			<p>
				<strong>Lista anti-evasión.</strong> Para que una cuenta sancionada no vuelva creando otra, cada bloqueo deja un registro que,{" "}
				<em>mientras está vigente</em>, guarda: <strong>hashes HMAC-SHA256</strong> del email normalizado y de las IPs usadas en las{" "}
				<strong>3 horas</strong> previas al bloqueo, una máscara del email del tipo <code>gp***@g***.com</code>, el identificador interno
				de la cuenta si lo conocemos, la fecha del último inicio de sesión conocido, el motivo que escribió quien modera, las fechas de
				bloqueo y de vencimiento, y de dónde salió la sanción (manual, modlogs de Discord, API o el propio sistema) junto con la
				referencia opaca del evento externo que la originó —que es lo que nos permite revertirla si la fuente original la revoca—. El
				email y la IP <strong>nunca</strong> se guardan en claro, en ningún estado del registro, y los hashes completos no se devuelven
				por ninguna API: el panel de moderación, accesible sólo para la administración global, ve contadores, la máscara y un prefijo de
				12 caracteres del hash.
			</p>
			<p>
				Un hash con clave es <strong>seudonimización, no anonimización</strong>: no se puede revertir, pero sí permite comprobar si un
				email o una IP determinados están en la lista. Por eso lo tratamos como dato personal y le ponemos plazos.
			</p>
			<p>
				<strong>Cuando el bloqueo se levanta</strong> —a mano, porque venció, porque la fuente externa lo revocó o porque se eliminó la
				cuenta— el registro deja de tener efecto (ninguna verificación mira bloqueos levantados) y en ese mismo momento se borran de la
				base de datos la <strong>máscara del email</strong>, la <strong>fecha del último inicio de sesión</strong> y el{" "}
				<strong>motivo del bloqueo</strong>. Sólo queda lo mínimo para poder dar cuenta de la decisión: los hashes, el identificador
				interno de la cuenta, las fechas de bloqueo, de vencimiento y de levantamiento, el origen con su referencia opaca y el motivo del
				levantamiento. A los{" "}
				<strong>6 meses del levantamiento</strong> el registro completo se elimina de forma automática; el borrado lo ejecuta el motor de
				la base de datos en barridos periódicos, así que puede haber minutos de diferencia con el cumplimiento exacto del plazo. Los
				bloqueos temporales dejan de aplicarse en el instante en que vencen, y un proceso que corre cada 6 horas los marca como levantados
				y les aplica esa misma limpieza. Los bloqueos que siguen vigentes no tienen plazo: se conservan mientras lo estén.
			</p>

			<h2 id="seguridad">6. Seguridad</h2>
			<p>
				Aplicamos hashing de contraseñas (PBKDF2), control de sesión basado en tokens, rate limiting, protección CSRF y cabeceras CSP. Los
				archivos de Drive y las credenciales de unidades remotas se cifran en reposo (AES-256-GCM con claves por usuario; en el modo
				passphrase de unidades remotas el cifrado ocurre en tu dispositivo y ADC no puede descifrarlas). La cobertura completa frente a
				OWASP ASVS y el detalle de controles forman parte del <a href="/roadmap#capa-de-blindaje-seguridad">roadmap</a> público.
			</p>

			<h2 id="infraestructura-y-subprocesadores">7. Infraestructura y subprocesadores</h2>
			<p>Estos son todos los proveedores que pueden tratar datos personales en nuestro nombre o por su propia cuenta:</p>
			<div className="overflow-x-auto">
				<table>
					<thead>
						<tr>
							<th>Proveedor</th>
							<th>Función</th>
							<th>Qué datos toca</th>
							<th>Jurisdicción</th>
							<th>Garantía aplicada</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<strong>Cloudflare, Inc.</strong>
							</td>
							<td>CDN y proxy inverso, WAF, protección DDoS, geofiltro por país y Web Analytics sin cookies.</td>
							<td>IP, metadatos de la conexión (ruta, agente de usuario, país) y métricas agregadas de tráfico.</td>
							<td>EE. UU. y red global de nodos de borde.</td>
							<td>Encargado de tratamiento. DPA y cláusulas contractuales tipo del proveedor.</td>
						</tr>
						<tr>
							<td>
								<strong>MongoDB, Inc. (Atlas)</strong>
							</td>
							<td>Base de datos gestionada donde se persisten los datos de la plataforma.</td>
							<td>Datos de cuenta, metadatos de archivos y correo, tickets, suscripciones, registros de moderación.</td>
							<td>Región del clúster contratado.</td>
							<td>Encargado de tratamiento. DPA y cláusulas contractuales tipo del proveedor.</td>
						</tr>
						<tr>
							<td>
								<strong>Almacenamiento de objetos</strong>
							</td>
							<td>Guarda el binario de los archivos de Drive y los adjuntos de correo.</td>
							<td>Contenido de tus archivos, cifrado en reposo.</td>
							<td>Operado por ADC.</td>
							<td>No es un tercero: cifrado AES-256-GCM con claves por usuario.</td>
						</tr>
						<tr>
							<td>
								<strong>Servidor de correo (MTA)</strong>
							</td>
							<td>Recepción y envío del correo de plataforma.</td>
							<td>Remitente, destinatario, asunto, cuerpo, adjuntos y cabeceras SMTP.</td>
							<td>Operado por ADC.</td>
							<td>No es un tercero: DKIM, TLS en tránsito cuando el par lo soporta y límites antiabuso propios.</td>
						</tr>
						<tr>
							<td>
								<strong>Discord, Inc.</strong>
							</td>
							<td>Proveedor de identidad opcional (inicio de sesión federado) y comunidad donde se originan algunos baneos.</td>
							<td>Identificador de cuenta de Discord y, para baneos, un identificador opaco del evento externo.</td>
							<td>EE. UU.</td>
							<td>Responsable autónomo: sólo interviene si elegís ese acceso, y se rige por sus propias políticas.</td>
						</tr>
						<tr>
							<td>
								<strong>Google LLC</strong>
							</td>
							<td>Proveedor de identidad opcional (inicio de sesión federado).</td>
							<td>Identificador de cuenta de Google y email verificado.</td>
							<td>EE. UU.</td>
							<td>Responsable autónomo: sólo interviene si elegís ese acceso, y se rige por sus propias políticas.</td>
						</tr>
						<tr>
							<td>
								<strong>Mercado Pago</strong>
							</td>
							<td>Procesamiento de pagos, débito recurrente de los planes y reintegros por arrepentimiento.</td>
							<td>
								Datos del medio de pago e importes. ADC no recibe ni almacena números de tarjeta. El reintegro se ordena sobre el
								pago original, así que vuelve por el mismo medio con el que se cobró.
							</td>
							<td>Argentina y región.</td>
							<td>Responsable autónomo del medio de pago. Webhooks con verificación de firma.</td>
						</tr>
						<tr>
							<td>
								<strong>PayPal</strong>
							</td>
							<td>Vía de pago alternativa, cuando se habilite.</td>
							<td>Datos del medio de pago e importes. ADC no recibe ni almacena números de tarjeta.</td>
							<td>EE. UU.</td>
							<td>Responsable autónomo del medio de pago.</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p>
				Cualquier alta o baja en esta lista se refleja aquí y se anuncia por los canales de aviso de la cuenta antes de entrar en
				vigor.
			</p>
			<p>
				Para expresar los precios en pesos consultamos la <strong>cotización oficial del Banco Central de la República Argentina</strong>{" "}
				(BCRA). Es una consulta pública que hace nuestro servidor a la API del BCRA: no viajan en ella datos personales tuyos —ni tu IP—,
				por eso el BCRA no figura en la tabla como subprocesador. De esa consulta guardamos, junto a tu contratación, el valor de la
				cotización, su fuente y su fecha, para que puedas verificar con qué tipo de cambio se calculó el importe.
			</p>

			<h2 id="transferencias-internacionales">8. Transferencias internacionales</h2>
			<p>
				El responsable del tratamiento está establecido en <strong>Argentina</strong>, y eso cambia el punto de partida. Mediante la{" "}
				<strong>
					<a href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32003D0490" rel="noreferrer">
						Decisión 2003/490/CE
					</a>
				</strong>
				, la Comisión Europea reconoce que Argentina garantiza un <strong>nivel adecuado de protección</strong> de datos personales.
				Argentina es uno de la quincena escasa de países del mundo con ese estatus. En la práctica:{" "}
				<strong>
					los datos personales pueden fluir desde el Espacio Económico Europeo hacia ADC sin cláusulas contractuales tipo, sin normas
					corporativas vinculantes y sin evaluación de impacto de la transferencia
				</strong>
				. La transferencia se trata como si fuera intracomunitaria.
			</p>
			<p>
				Es una diferencia deliberada: un operador establecido en Estados Unidos necesitaría firmar cláusulas tipo, evaluar la
				legislación de vigilancia aplicable y documentar medidas suplementarias para recibir los mismos datos. Nosotros no.
			</p>
			<p>
				Lo que sí implica transferencia internacional es el uso de los proveedores listados en{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a> que operan fuera de Argentina —Cloudflare, MongoDB Atlas y, si elegís usarlos,
				Discord, Google o PayPal—. Cada uno figura en la tabla con su jurisdicción y la garantía concreta que aplica: DPA y cláusulas
				contractuales tipo para quienes actúan como encargados nuestros, y sus propias políticas para quienes son responsables autónomos.
			</p>

			<h2 id="geofiltro-por-pais">9. Geofiltro por país</h2>
			<p>
				Aplicamos un filtro a nivel Cloudflare que <strong>bloquea el acceso desde ciertos países</strong> y aplica un{" "}
				<em>Managed Challenge</em> a bots o dispositivos desconocidos. La motivación, el alcance y la lista actual están descritos en{" "}
				<a href="/values#geofiltro-activo">Valores y Espacio Seguro</a>.
			</p>

			<h2 id="incidentes">10. Incidentes</h2>
			<p>
				Trabajamos en formalizar un proceso interno de respuesta a incidentes que afecten datos personales. Hasta entonces, si detectas o
				sufres un incidente, repórtalo por los canales de <a href="/contact#canales">contacto</a>.
			</p>

			<h2 id="contenido-de-usuarios-y-solicitudes-de-terceros">11. Contenido subido por usuarios y solicitudes de terceros</h2>
			<p>
				Las apps de la plataforma (Drive, adjuntos de proyectos y artículos, correo) permiten subir y compartir archivos. Ese contenido es{" "}
				<strong>responsabilidad de quien lo sube</strong>: nosotros lo almacenamos por cuenta del usuario y no lo revisamos de forma
				previa. Los archivos eliminados pasan por una papelera y, una vez vencida la retención (ver{" "}
				<a href="/privacy#conservacion">§5 Conservación</a>), se borran definitivamente, incluido el binario en el almacenamiento.
			</p>
			<p>
				Si sos un <strong>tercero</strong> y considerás que un archivo compartido (por ejemplo, mediante un enlace público de Drive) afecta
				tus datos personales o tus derechos, podés solicitar su revisión o retiro creando un ticket de tipo <strong>“Datos”</strong> en la
				sección <em>Tickets de Soporte</em> de{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>{" "}
				incluyendo el enlace al contenido y el motivo. Tratamos estas solicitudes en un plazo máximo de <strong>30 días</strong>;
				mientras se evalúan podemos suspender preventivamente el acceso al contenido reportado. Esto también canaliza solicitudes GDPR de
				acceso, rectificación o supresión sobre datos tratados por terceros dentro de la plataforma.
			</p>
		</PageShell>
	);
}
