import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { CONTACTS, OPERATOR } from "../data/contact";

export function PrivacyPage() {
	return (
		<PageShell
			title="Política de Privacidad"
			subtitle="Datos personales, infraestructura y subprocesadores."
			standards={["Ley 25.326", "GDPR (alineación voluntaria)"]}
			declaration="policy"
			lastUpdated={LEGAL_DOCUMENTS.privacy.version}
			legalDocId="privacy"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Privacidad" }]}
		>
			<h2 id="responsable">1. Responsable</h2>
			<p>
				El sitio es operado por <strong>{OPERATOR.legalName}</strong>, CUIT: <strong>{OPERATOR.taxId}</strong>
				{OPERATOR.taxStatus ? `, ${OPERATOR.taxStatus}` : ""}, con domicilio en{" "}
				<strong>{OPERATOR.address ? `${OPERATOR.address}, ${OPERATOR.country}` : OPERATOR.country}</strong>,{" "}
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
			<p>
				El responsable está inscripto en el <strong>Registro Nacional de Bases de Datos Personales</strong> de la AAIP, que crea el
				art. 21 de la Ley 25.326, con el legajo <strong>RL-2026-76956060-APN-DNPDP#AAIP</strong>. Ahí quedan declaradas las bases de
				datos personales de la plataforma, con su finalidad, las categorías de datos que contienen, a quién se ceden, las
				transferencias internacionales que involucran y por cuánto tiempo se conservan — lo mismo que describe esta política, en el
				formato que pide el organismo.
			</p>
			<p>
				<strong>No hemos designado delegado de protección de datos</strong> por no concurrir los supuestos del art. 37 del RGPD; el punto
				de contacto para privacidad es el de arriba. <strong>Tampoco hemos designado representante en la Unión Europea</strong>: el
				servicio se presta desde Argentina, en español, con precios en dólares estadounidenses y sin dominios, moneda ni comunicaciones
				dirigidas a Estados miembros, de modo que no concurre la oferta de bienes o servicios del art. 3.2 del RGPD; y tampoco observamos
				el comportamiento de nadie —no hacemos perfilado ni publicidad basada en él—, que es la otra vía por la que ese artículo podría
				aplicar. Los planes de equipo <strong>no están disponibles para organizaciones establecidas en el Espacio Económico Europeo</strong>,
				como detalla el <a href="/dpa#partes-y-aplicacion">Acuerdo de Tratamiento de Datos</a>.
			</p>
			<p>
				Aplicamos voluntariamente los estándares del Reglamento porque nos parecen el mejor punto de referencia disponible, no porque nos
				resulte aplicable. Cuando esta política cita un artículo del RGPD lo hace como referencia: la norma que rige el tratamiento es la{" "}
				<strong>Ley 25.326</strong>, cuyos plazos de respuesta —10 días corridos y 5 días hábiles— son además más breves que los del
				Reglamento. Si el Reglamento resultara aplicable a tu caso, nada de lo que prometemos acá se reduce.
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
			<p>
				La base de cada tratamiento es la que fija la <strong>Ley 25.326</strong>, que es la norma que nos rige (ver{" "}
				<a href="#responsable">§1</a>). Los artículos del RGPD que aparecen abajo van como referencia, porque son el vocabulario más
				extendido para hablar de esto y porque aplicamos sus estándares por decisión propia — no porque el Reglamento nos resulte
				aplicable.
			</p>
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
				hacemos perfilado para terceros.
			</adc-callout>
			<h3 id="publicidad-en-games">3.2. Publicidad en el subdominio <code>games</code></h3>
			<p>
				El subdominio <code>games</code> <strong>todavía no está en servicio</strong>. Cuando se lance, incorporará publicidad — y eso lo
				convierte en el único rincón de la plataforma donde intervienen terceros con intereses propios sobre tus datos. Estos son los
				límites que asumimos <strong>ahora</strong>, antes de negociar con ningún proveedor, porque después son caros de sostener:
			</p>
			<ul>
				<li>
					<strong>Nada de publicidad personalizada a personas menores de edad.</strong> No perfilamos ni segmentamos anuncios en función
					de datos de una persona que declaró ser menor. La publicidad que vean, si la ven, será contextual: depende del juego que están
					mirando, no de quiénes son.
				</li>
				<li>
					<strong>Los datos de tu cuenta de ADC no se comparten con proveedores publicitarios.</strong> Tu identificador, tu email, tu
					plan, tu contenido y tu actividad en el resto de la plataforma se quedan de este lado. <code>games</code> no es una ventana a
					tu cuenta.
				</li>
				<li>
					<strong>Ninguna cookie ni identificador publicitario se activa sin tu consentimiento previo</strong>, pedido con un rechazo{" "}
					<strong>tan accesible como la aceptación</strong> —mismo lugar, mismo tamaño, mismo número de clics— y revocable después en
					cualquier momento. Hasta que aceptes, no se escribe nada en tu dispositivo más allá de lo estrictamente necesario para que la
					página funcione.
				</li>
				<li>
					<strong>Cada proveedor se publica antes de activarse</strong>, con su función y su jurisdicción, en la tabla de{" "}
					<a href="#infraestructura-y-subprocesadores">§7</a> y en la{" "}
					<a href="/cookies#cookies-opcionales">política de cookies</a> — no después, ni “en cuanto podamos”.
				</li>
			</ul>
			<p>
				Estos cuatro puntos son un <strong>compromiso propio</strong>, no una obligación que nos caiga encima: el art. 28.2 del
				Reglamento de Servicios Digitales europeo, que prohíbe la publicidad basada en perfilado dirigida a menores, exime a las
				empresas pequeñas por su art. 19.1. Los adoptamos igual, porque la alternativa —hacerlo porque se puede— es exactamente lo que
				el <a href="/ethics">código de ética</a> dice que no hacemos.
			</p>

			<h2 id="tus-derechos">4. Tus derechos</h2>
			<p>
				Puedes ejercer derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad escribiendo a los canales
				indicados en <a href="#responsable">§1</a>. El ejercicio de estos derechos es <strong>gratuito</strong>.
			</p>
			<p>Varios de estos derechos los podés ejercer directamente desde tu propia cuenta, sin escribirnos:</p>
			<ul>
				<li>
					<strong>Acceso y portabilidad</strong> (art. 14 Ley 25.326; arts. 15 y 20 RGPD): desde la configuración de tu cuenta podés
					descargar una copia de tus datos en un archivo <strong>JSON estructurado, de uso común y legible por máquina</strong>: perfil,
					sesiones activas, metadatos de tus archivos y carpetas, correo, tickets de soporte, notificaciones, suscripción y pagos, y
					contenido publicado. Los binarios —los archivos de Drive, los adjuntos de correo, las imágenes— no viajan dentro del JSON: se
					descargan desde cada aplicación, y el propio archivo lo declara en cada sección, igual que declara qué quedó fuera o truncado.
					Para prevenir abuso se puede generar como máximo un export por día.
				</li>
				<li>
					<strong>Rectificación</strong> (art. 16 Ley 25.326; art. 16 RGPD): el email, el nombre de usuario y los datos de facturación
					se corrigen desde la propia cuenta. El cambio de email se confirma desde la casilla nueva —así probamos que es tuya— y
					avisamos de inmediato a la anterior. Mientras no tengamos habilitado el envío de correo a otros proveedores sólo podemos
					verificar direcciones de la propia plataforma; si necesitás usar una casilla externa, pedilo por los canales de{" "}
					<a href="#responsable">§1</a> o con un ticket de tipo <strong>“Datos”</strong> y lo hacemos nosotros dentro de los plazos de
					más abajo. Cambiar el nombre de usuario cambia también tu dirección de correo de la plataforma, que se deriva de él:
					conservamos las direcciones anteriores de tu buzón —sólo la dirección y la fecha del cambio— para que un correo ya enviado
					siga siendo atribuible a su remitente, y se borran junto con tu cuenta. Los datos de facturación corregidos aplican sólo a
					los comprobantes futuros — los ya emitidos son inmutables por normativa fiscal—. Para todo lo que no tenga un control propio
					en la cuenta valen los canales de <a href="#responsable">§1</a>.
				</li>
			</ul>
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
				—. Si el RGPD resultara aplicable a tu caso pese al encuadre de <a href="#responsable">§1</a>, podrías además acudir a la
				autoridad de control de tu país de residencia.
			</p>
			<adc-callout tone="info" role="note">
				<strong>
					“LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución
					de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las
					normas vigentes en materia de protección de datos personales.”
				</strong>{" "}
				Leyenda incluida en cumplimiento del art. 3° de la Resolución AAIP 14/2018, que reemplazó a la Disposición DNPDP 10/2008.
			</adc-callout>

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
								<strong>No se persisten.</strong> Cada proceso de la plataforma mantiene un buffer en memoria de hasta 5.000
								entradas, con redacción automática de datos sensibles al escribirse. No se escriben a disco ni se envían a ningún
								servicio de terceros, y se pierden al reiniciar el proceso.
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
								El ticket es el registro de qué se reportó y cómo se resolvió, así que{" "}
								<strong>no se borra: se anonimiza</strong>. Al eliminarse la cuenta, y también{" "}
								<strong>por plazo desde que el ticket se resuelve</strong>, se eliminan el email de contacto, el email de sesión y
								el vínculo con tu cuenta, y esas líneas se reemplazan en el cuerpo por “(cuenta eliminada)”. El plazo depende del
								tipo: <strong>30 días</strong> para las solicitudes sobre un menor, <strong>90</strong> para los reportes de datos
								o de contenido de terceros, <strong>180</strong> para reclamos, sugerencias y ampliaciones, y{" "}
								<strong>365</strong> para reportes de seguridad y requerimientos de autoridades.
								<br />
								Las <strong>solicitudes sobre un menor</strong> son el único caso en que además se vacía el texto libre: su
								contenido es, por diseño del formulario, la identidad de un menor y su vínculo familiar. Esos tickets se eliminan
								por completo a los <strong>180 días</strong> de resueltos, y los reportes de datos a los <strong>730</strong>. Un
								pedido sobre un menor que nadie cierre entra igual al circuito de borrado <strong>al año</strong> de abierto.
								<br />
								En el resto de los tipos sobreviven el título y la descripción tal como los escribiste, la severidad, el estado,
								los adjuntos y los comentarios —y, en reportes de seguridad, el hash de la descripción original—. Si escribiste
								datos personales dentro de ese texto libre, se conservan. El agradecimiento público de un reporte de seguridad no
								caduca por plazo: se retira cuando quien lo reportó lo pide.
							</td>
						</tr>
						<tr>
							<td>Correo: mensajes del buzón</td>
							<td>
								Mientras los conserves. La <strong>papelera se vacía sola a los 30 días</strong> y el correo marcado como no deseado
								se elimina a los <strong>30 días</strong> de recibirse, junto con sus adjuntos y sin recuperación posible. Los
								mensajes de las demás carpetas (recibidos, enviados, borradores) no tienen borrado automático: se conservan hasta
								que los borres o hasta que se elimine la cuenta, momento en el que se elimina el buzón completo.
							</td>
						</tr>
						<tr>
							<td>Correo: adjuntos</td>
							<td>
								Con el mensaje al que pertenecen, y sólo cuando ningún otro mensaje los referencia. Un adjunto que se sube a un
								borrador y nunca se confirma se elimina a las <strong>24 horas</strong>.
							</td>
						</tr>
						<tr>
							<td>Correo: registro de envíos</td>
							<td>
								<strong>30 días</strong>. Guarda el identificador de la cuenta, el del buzón y la <strong>cantidad</strong> de
								destinatarios —ninguna dirección de correo— y sirve únicamente para aplicar el límite diario de envío de tu plan.
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
						<tr>
							<td>Datos fiscales de facturación (tras la baja)</td>
							<td>
								<strong>10 años</strong> desde la baja de la cuenta, por obligación fiscal (art. 33 Ley 11.683 y normativa de
								ARCA): el país de residencia fiscal que declaraste y, si correspondía factura de exportación, el nombre, el
								domicilio y la identificación fiscal que indicaste, junto con el país deducido por IP como constancia de la
								operación. Se archivan <strong>separados del resto de tus datos</strong>, sin acceso desde la aplicación, y se
								eliminan de forma automática al vencer el plazo.
							</td>
						</tr>
						<tr>
							<td>Constancia de aceptación de los documentos legales (tras la baja)</td>
							<td>
								<strong>5 años</strong> desde la baja, <strong>anonimizada</strong>: qué versión de los Términos y de esta política
								se aceptó, cuándo y por qué vía — sin email, sin nombre de usuario y sin IP; el vínculo con tu identidad se
								reemplaza por un código no reversible—. La base es la defensa ante reclamaciones mientras corre el plazo genérico
								de prescripción (art. 2560 CCyC), y el registro se elimina de forma automática al vencer.
							</td>
						</tr>
						<tr>
							<td>Registro de auditoría de acciones administrativas</td>
							<td>
								<strong>2 años</strong>. Las acciones sensibles sobre cuentas y datos —recuperaciones, bajas y reactivaciones,
								exports, cambios de email o de facturación— dejan constancia de quién hizo qué y cuándo, con identificadores y
								fechas pero sin emails ni IPs. Es accesible sólo para la administración global y se elimina de forma automática al
								vencer el plazo.
							</td>
						</tr>
						<tr>
							<td>Registro de violaciones de datos personales</td>
							<td>
								<strong>5 años desde que el incidente se cierra</strong>. Cada incidente deja constancia de qué pasó, cómo se
								evaluó el riesgo, a qué autoridad se notificó y a qué personas se avisó —o por qué se decidió no avisar—. Es la
								prueba de que esa decisión fue correcta, y por eso el plazo corre desde el cierre y no desde la detección:
								mientras el incidente sigue abierto no vence nada. Si estuviste entre las personas afectadas, tu identificador
								figura en esa constancia hasta que el plazo vence, aunque hayas dado de baja tu cuenta antes.
							</td>
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
				servidores — sólo intercambiamos la señalización para establecerla. Eso sí: <strong>armar esa conexión
					directa involucra a un tercero</strong>. Antes de conectarse, tu navegador le pregunta a un servidor <em>STUN</em> público de
					Google con qué dirección pública lo ve tu router, porque sin ese dato los dos dispositivos no pueden encontrarse. En esa
					consulta Google ve tu dirección IP; no ve el contenido que vas a transferir, ni tu identidad, ni nada de tu cuenta. Está
					declarado en <a href="#infraestructura-y-subprocesadores">§7</a>. De las <strong>carpetas de transferencia</strong>{" "}
				guardamos el archivo (con las reglas normales de Drive) y un registro de qué dispositivos tuyos confirmaron la
				descarga; si activás el <em>autoborrado</em>, el archivo se elimina <strong>definitivamente y sin pasar por la
				papelera</strong> cuando todos tus dispositivos suscritos lo descargaron o al vencer el plazo que configures — es una
				excepción, elegida por vos, a la retención descrita arriba. Los dispositivos vinculados, sus registros de entrega y
				las unidades remotas se eliminan junto con la cuenta.
			</p>
			<p>
				<strong>Cuentas baneadas o eliminadas:</strong> se conservan durante <strong>30 días</strong> desde el evento (ban o solicitud de
				borrado) y luego se eliminan automáticamente. Si la baja la pediste vos, durante esos 30 días podés{" "}
				<strong>arrepentirte y cancelarla</strong>, y no depende de que te llegue ningún correo:{" "}
				<strong>volver a iniciar sesión cancela la baja</strong>, con tu contraseña o con el proveedor que uses para entrar. También
				sirve el enlace incluido en el aviso que te enviamos al registrar el pedido; y si ese aviso no se pudo entregar, te mostramos el
				enlace en pantalla en ese mismo momento para que lo guardes. Registrar tu pedido de baja nunca queda condicionado a que podamos
				enviarte el aviso. Cancelada la baja, la cuenta se reactiva tal como estaba; si la cancelación llega justo cuando la
				eliminación ya comenzó, la cuenta se conserva pero lo ya eliminado no se restaura. Vencido el plazo, la eliminación es
				definitiva y sólo sobreviven los archivos con plazo propio de la tabla de arriba: la constancia de aceptación anonimizada y los
				datos fiscales.
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
				Aplicamos hashing de contraseñas con una función de derivación de clave lenta y con sal, de las recomendadas por la industria para este uso, que actualizamos cuando cambia el estado de la técnica; control de sesión basado en tokens, rate limiting, protección CSRF y cabeceras CSP. Los
				archivos de Drive y las credenciales de unidades remotas se cifran en reposo (AES-256-GCM con claves por usuario; en el modo
				passphrase de unidades remotas el cifrado ocurre en tu dispositivo y ADC no puede descifrarlas). La cobertura completa frente a
				OWASP ASVS y el detalle de controles forman parte del <a href="/roadmap#capa-de-blindaje-seguridad">roadmap</a> público.
			</p>
			<p>
				<strong>Réplicas y copias de seguridad.</strong> Para tolerar la caída de una máquina, la infraestructura puede estar replicada en
				más de un servidor propio. Las réplicas son <strong>copias vivas, no archivos congelados</strong>: cuando un dato se elimina
				—porque lo borraste, porque venció su plazo o porque se eliminó tu cuenta— la supresión se propaga a todas ellas. Aparte de las
				réplicas mantenemos <strong>copias de seguridad cifradas, con una retención de 30 días</strong>, cuyo único uso es restaurar el
				servicio ante un desastre: no se consultan para recuperar datos ya suprimidos y, si hubiera que restaurar una copia que todavía los
				contuviera, la supresión se vuelve a aplicar sobre lo restaurado. Réplicas y copias viven sobre la misma infraestructura propia en
				Argentina; si alguna vez pasaran a un proveedor externo sería un alta de encargado, con el aviso previo que promete la{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a>.
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
							<td>
								Encargado de tratamiento.{" "}
								<a href="https://www.cloudflare.com/cloudflare-customer-dpa/" rel="noreferrer">
									DPA del proveedor
								</a>{" "}
								con cláusulas contractuales de protección de datos — garantía contractual del art. 12, Ley 25.326 (ver{" "}
								<a href="#transferencias-internacionales">§8</a>).
							</td>
						</tr>
						<tr>
							<td>
								<strong>MongoDB, Inc. (Atlas)</strong>
							</td>
							<td>
								Base de datos gestionada donde se persiste <strong>únicamente el contenido publicado en la comunidad</strong>:
								artículos, comentarios, valoraciones y rutas de aprendizaje. El resto de las bases de la plataforma —cuentas,
								archivos, correo, tickets, suscripciones, moderación y auditoría— corre en infraestructura propia de ADC, en
								Argentina.
							</td>
							<td>Autoría, texto y metadatos del contenido que publicás en la comunidad.</td>
							<td>Región del clúster contratado.</td>
							<td>
								Encargado de tratamiento.{" "}
								<a href="https://www.mongodb.com/legal/data-processing-agreement" rel="noreferrer">
									DPA del proveedor
								</a>{" "}
								con cláusulas contractuales de protección de datos — garantía contractual del art. 12, Ley 25.326 (ver{" "}
								<a href="#transferencias-internacionales">§8</a>).
							</td>
						</tr>
						<tr>
							<td>
								<strong>Base de datos de la plataforma</strong>
							</td>
							<td>Persiste todo lo que no es contenido de comunidad: cuentas, sesiones, metadatos de archivos y correo, tickets, suscripciones, moderación y auditoría.</td>
							<td>Prácticamente todo lo descrito en <a href="#que-datos-tratamos">§2</a>, salvo los binarios y el contenido de comunidad.</td>
							<td>Operada por ADC, en Argentina.</td>
							<td>
								No es un tercero: infraestructura propia, sin proveedor gestionado de por medio y sin transferencia internacional.
								Puede estar distribuida y replicada en más de un servidor, todos en Argentina y bajo control exclusivo de ADC.
							</td>
						</tr>
						<tr>
							<td>
								<strong>Almacenamiento de objetos</strong>
							</td>
							<td>Guarda el binario de los archivos de Drive y los adjuntos de correo.</td>
							<td>Contenido de tus archivos, cifrado en reposo.</td>
							<td>Operado por ADC, en Argentina.</td>
							<td>
								No es un tercero: cifrado AES-256-GCM con claves por usuario. Puede estar distribuido y replicado en más de un
								servidor, todos en Argentina y bajo control exclusivo de ADC.
							</td>
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
								<strong>Google LLC</strong> (servidor STUN)
							</td>
							<td>
								Descubrimiento de la dirección pública del dispositivo para establecer una transferencia directa entre tus propios
								dispositivos en Drive.
							</td>
							<td>
								La dirección IP pública del dispositivo y el puerto que le asigna tu router. No recibe el contenido transferido, ni tu
								identidad, ni ningún dato de tu cuenta.
							</td>
							<td>EE. UU.</td>
							<td>
								Responsable autónomo. A diferencia del acceso federado, esta consulta no la elegís vos: la inicia la aplicación, y sólo
								ocurre cuando abrís una transferencia entre dispositivos.
							</td>
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
				<strong>Si tu organización contrata un plan de equipo</strong>, los datos que ella administra en la plataforma los tratamos como{" "}
				<strong>encargado de tratamiento</strong> por cuenta de la organización. Las condiciones de ese encargo —instrucciones,
				subencargados autorizados, seguridad, incidentes, auditorías y supresión al terminar— están en el{" "}
				<a href="/dpa">Acuerdo de Tratamiento de Datos (DPA)</a>, que se aplica automáticamente al contratar el plan, sin firma
				separada.
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
				Esto describe la posición jurídica de Argentina como país de destino, no una oferta dirigida al mercado europeo:{" "}
				<a href="#responsable">§1</a> explica por qué entendemos que el Reglamento no nos resulta aplicable y que los planes de equipo
				no están disponibles para organizaciones del Espacio Económico Europeo. Lo decimos acá porque quien llega a esta sección suele
				estar comparando proveedores, y la adecuación argentina es un dato relevante aunque no vengas de la Unión.
			</p>
			<p>
				Lo que sí implica transferencia internacional es el uso de los proveedores listados en{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a> que operan fuera de Argentina —Cloudflare, MongoDB Atlas y, si elegís usarlos,
				Discord, Google o PayPal—. Cada uno figura en la tabla con su jurisdicción y la garantía concreta que aplica.
			</p>
			<p>
				<strong>El grueso de tus datos no sale del país.</strong> La base de datos de la plataforma —cuentas, sesiones, metadatos de
				archivos y correo, tickets, suscripciones, moderación y auditoría— y el almacenamiento de los binarios corren en infraestructura
				propia en Argentina. La única base alojada en un proveedor gestionado del exterior es la del{" "}
				<strong>contenido publicado en la comunidad</strong>, en MongoDB Atlas. Esa infraestructura propia puede crecer en número de
				servidores —y replicarse entre ellos— sin que eso cambie nada de lo anterior, porque todos están en Argentina y bajo nuestro
				control exclusivo. <strong>Si alguna vez ubicáramos infraestructura propia fuera del país</strong>, dejaría de ser cierto: lo
				anunciaríamos por los canales de aviso de la cuenta antes de que rija, actualizaríamos la tabla de{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a> con la nueva jurisdicción y su garantía, y lo declararíamos ante el Registro
				Nacional de Bases de Datos Personales.
			</p>
			<p>
				Cuando enviamos datos desde Argentina a encargados nuestros radicados en países que la normativa argentina no considera de nivel
				adecuado (<strong>Cloudflare, Inc.</strong> y <strong>MongoDB, Inc.</strong>, en EE. UU.), la transferencia se ampara en la vía de{" "}
				<strong>garantías contractuales</strong> que admiten el art. 12 de la Ley 25.326 y su reglamentación (Decreto 1558/2001): el
				acuerdo de tratamiento de datos (DPA) vigente con cada proveedor —enlazado en la tabla de{" "}
				<a href="#infraestructura-y-subprocesadores">§7</a>—, que incorpora cláusulas contractuales de protección de datos cuya
				equivalencia con los modelos aprobados por la autoridad argentina (Disposición DNPDP 60-E/2016 y Resolución AAIP 198/2023)
				documentamos y revisamos internamente. No usamos el texto literal de esos modelos: los proveedores de autoservicio no firman
				contratos bilaterales a medida, y preferimos decirlo a aparentar lo contrario.
			</p>
			<p>
				Discord, Google y PayPal no tratan datos por nuestra cuenta: son <strong>responsables autónomos</strong> que sólo intervienen si
				elegís ese acceso o ese medio de pago. En esos casos la transferencia la iniciás vos con tu elección, y se rige por las políticas
				de cada proveedor.
			</p>

			<h2 id="geofiltro-por-pais">9. Geofiltro por país</h2>
			<p>
				Aplicamos un filtro a nivel Cloudflare que <strong>bloquea el acceso desde ciertos países</strong> y aplica un{" "}
				<em>Managed Challenge</em> a bots o dispositivos desconocidos. La motivación, el alcance y la lista actual están descritos en{" "}
				<a href="/values#geofiltro-activo">Valores y Espacio Seguro</a>.
			</p>

			<h2 id="menores">10. Menores de edad</h2>
			<p>
				La edad mínima general para tener una cuenta es de <strong>13 años</strong>. En varios países rige una edad mayor: la tabla
				país por país está en los <a href="/terms#edad-minima">Términos y Condiciones</a> y forma parte de lo que aceptás al
				registrarte. La edad se declara al crear la cuenta;{" "}
				<strong>no la verificamos con documentación</strong>, así que la declaración es responsabilidad de quien se registra.
			</p>
			<p>
				<strong>Si ejercés la responsabilidad parental o la tutela de un menor</strong> y querés que eliminemos su cuenta y sus datos,
				o que retiremos algo que publicó, podés pedirlo sin tener cuenta en ADC, por cualquiera de estas dos vías:
			</p>
			<ul>
				<li>
					un ticket de tipo <strong>“Menor de edad”</strong> en{" "}
					<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>, que no
					requiere iniciar sesión; o
				</li>
				<li>
					un email a <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>.
				</li>
			</ul>
			<p>
				Indicanos el usuario o el email de la cuenta, tu vínculo con el menor y qué pedís. Respondemos dentro de los plazos de{" "}
				<a href="#tus-derechos">§4</a> —10 días corridos para el acceso, 5 días hábiles para la supresión— contados desde que
				recibimos la solicitud. Podemos pedirte elementos que acrediten el vínculo antes de ejecutar una supresión, porque borrar la
				cuenta de otra persona sin verificar quién lo pide sería, en sí mismo, un riesgo para esa persona; ese pedido no suspende los
				plazos más de lo imprescindible y te lo hacemos por el mismo canal.
			</p>
			<p>
				<strong>Si detectamos una cuenta por debajo de la edad mínima aplicable</strong>, la suspendemos y damos un plazo razonable
				para que quien ejerza la responsabilidad parental se comunique. Si nadie lo hace, eliminamos la cuenta y sus datos con las
				reglas de <a href="#conservacion">§5</a>. No usamos los datos de una cuenta suspendida por esta causa para ninguna otra
				finalidad.
			</p>

			<h2 id="incidentes">11. Incidentes de seguridad que afectan datos personales</h2>
			<p>
				Un incidente es cualquier violación de la seguridad que provoque la destrucción, la pérdida, la alteración o el acceso no
				autorizado a datos personales. <strong>La obligación de avisar es nuestra</strong>: si pasa algo, no esperamos a que lo
				descubras vos. Estos son los compromisos concretos, con sus plazos.
			</p>
			<p>
				<strong>Aviso a la autoridad de control: 72 horas.</strong> Desde que tenemos constancia de un incidente que suponga un riesgo
				para tus derechos, lo notificamos dentro de las <strong>72 horas</strong> a la{" "}
				<strong>Agencia de Acceso a la Información Pública</strong> —y, cuando el caso quede alcanzado por el RGPD, a la autoridad de
				control europea que corresponda—. Si en ese plazo todavía no tenemos el cuadro completo, notificamos igual con lo que sabemos y
				completamos después: el plazo corre sobre el aviso, no sobre la investigación terminada. Si pasadas las 72 horas no habíamos
				notificado, la notificación va acompañada de los motivos de la demora.
			</p>
			<p>
				<strong>Aviso a las personas afectadas: sin dilación indebida.</strong> Cuando el incidente entrañe un{" "}
				<strong>riesgo alto</strong> para tus derechos, te avisamos <strong>a vos</strong>, en lenguaje claro y por los canales de aviso
				de tu cuenta. El aviso te dice, como mínimo: qué pasó y cuándo, qué categorías de datos tuyos están involucradas, qué
				consecuencias probables tiene, qué hicimos para contenerlo, qué te recomendamos hacer y a quién escribir para preguntar. No te
				vamos a avisar con un comunicado genérico si podemos identificar a quién le pasó.
			</p>
			<p>
				<strong>Las tres excepciones, dichas de frente.</strong> Podemos no avisarte individualmente si (a) los datos afectados estaban{" "}
				<strong>cifrados</strong> de forma que sigan siendo ininteligibles para quien accedió —el caso de los archivos de Drive y de las
				credenciales de unidades remotas, ver <a href="#seguridad">§6</a>—, (b) tomamos después medidas que hacen que el riesgo alto ya no
				pueda materializarse, o (c) hacerlo supone un esfuerzo desproporcionado, y en ese caso lo reemplazamos por una{" "}
				<strong>comunicación pública</strong> en{" "}
				<adc-platform-link href="https://status.adigitalcafe.com">status.adigitalcafe.com</adc-platform-link> igual de efectiva. Ninguna
				de las tres nos exime de notificar a la autoridad.
			</p>
			<p>
				<strong>Registro interno de incidentes.</strong> Documentamos <strong>todos</strong> los incidentes —también los que no llegan a
				notificarse— con los hechos, sus efectos y las medidas correctivas adoptadas. Ese registro existe para que la autoridad pueda
				verificar que el criterio con el que decidimos no avisar fue el correcto, y para que la decisión de no notificar tenga que
				escribirse en algún lado en vez de quedar en la cabeza de alguien.
			</p>
			<adc-callout tone="info" role="note">
				<strong>Por qué prometemos esto si la ley argentina no lo exige.</strong> La Ley 25.326 no impone un deber de notificar
				violaciones de datos: la <strong>Resolución AAIP 47/2018</strong> lo recomienda como medida de seguridad, no lo obliga. Los
				plazos y contenidos de arriba son los de los <strong>arts. 33 y 34 del RGPD</strong>, y los adoptamos como compromiso propio para
				todas las personas usuarias, vivan donde vivan. Nos parece que la alternativa —enterarte por un tercero— no es defendible aunque
				sea legal.
			</adc-callout>
			<p>
				<strong>Si el que detecta algo sos vos:</strong> reportalo por los <a href="/contact#canales">canales de contacto</a> o, si se
				trata de una vulnerabilidad, por el <adc-platform-link href="https://status.adigitalcafe.com/status/bounty">programa de
				divulgación responsable</adc-platform-link>. Ese canal es adicional a nuestro deber de avisar, no un reemplazo.
			</p>

			<h2 id="contenido-de-usuarios-y-solicitudes-de-terceros">12. Contenido subido por usuarios y solicitudes de terceros</h2>
			<p>
				Las apps de la plataforma (Drive, adjuntos de proyectos y artículos, correo) permiten subir y compartir archivos. Ese contenido es{" "}
				<strong>responsabilidad de quien lo sube</strong>: nosotros lo almacenamos por cuenta del usuario y no lo revisamos de forma
				previa. Los archivos eliminados pasan por una papelera y, una vez vencida la retención (ver{" "}
				<a href="/privacy#conservacion">§5 Conservación</a>), se borran definitivamente, incluido el binario en el almacenamiento.
			</p>
			<p>
				Si sos un <strong>tercero</strong> y considerás que un archivo compartido (por ejemplo, mediante un enlace público de Drive) afecta
				tus datos personales o tus derechos, podés solicitar su revisión o retiro <strong>sin tener cuenta</strong>: con el botón{" "}
				<em>“Reportar este contenido”</em> de la propia página del enlace, o creando un ticket de tipo <strong>“Datos”</strong> en la
				sección <em>Tickets de Soporte</em> de{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>{" "}
				incluyendo el enlace al contenido y el motivo. Tratamos estas solicitudes en un plazo máximo de <strong>30 días</strong>;
				mientras se evalúan podemos suspender preventivamente el acceso al contenido reportado. Esto también canaliza solicitudes de derechos (Ley
				25.326 / RGPD) de acceso, rectificación o supresión sobre datos tratados por terceros dentro de la plataforma.
			</p>
			<p>
				Si tu reclamo es por <strong>derechos de autor o propiedad intelectual</strong>, el procedimiento completo —qué debe contener la
				notificación, nuestros plazos de acuse y decisión, y el derecho de quien subió el contenido a contranotificar antes de que la
				decisión quede firme— está en{" "}
				<a href="/terms#reclamos-propiedad-intelectual">Términos § 6.1</a>.
			</p>

			<h2 id="datos-de-colaboradores">13. Datos de colaboradores</h2>
			<p>
				En <a href="/team">/team</a> publicamos a las personas que colaboran con el proyecto. No son personas usuarias: sus datos no
				salen del uso de la plataforma, así que merecen su propio apartado.
			</p>
			<ul>
				<li>
					<strong>Finalidad:</strong> dar crédito público a quien colabora y que el proyecto tenga una cara identificable en vez de una
					marca anónima.
				</li>
				<li>
					<strong>Base legal:</strong> <strong>consentimiento</strong> (art. 5.1 de la Ley 25.326; art. 6.1.a del RGPD), prestado por
					escrito y con fecha. No interés legítimo: publicar a alguien porque colabora con vos no es una necesidad del servicio.
				</li>
				<li>
					<strong>Qué publicamos:</strong> el nombre o alias que la persona eligió, su handle público, su rol, una descripción escrita
					por ella y un enlace a su sitio. Los avatares son ilustraciones propias salvo que la persona haya aportado una foto, y se
					sirven desde nuestra infraestructura: la página no hace ninguna petición a terceros.
				</li>
				<li>
					<strong>Destinatarios:</strong> nadie. Es una página pública, pero no se comparte con ningún tercero.
				</li>
				<li>
					<strong>Cómo se retira:</strong> por el mismo canal por el que se prestó el consentimiento —el servidor de Discord o el
					contacto directo—, o por los <a href="/contact#canales">canales de contacto</a>. Lo ejecutamos en un plazo máximo de{" "}
					<strong>5 días hábiles</strong>, los mismos que el art. 16 de la Ley 25.326 fija para la rectificación y que ya
					comprometemos en <a href="#tus-derechos">§4</a>. No pedimos motivos:
					retirar un consentimiento no se justifica.
				</li>
				<li>
					<strong>Conservación:</strong> la entrada se publica mientras dure el consentimiento. La constancia de que se prestó se archiva
					aparte —no en el repositorio público— mientras la publicación esté vigente y por el plazo de prescripción posterior.
				</li>
			</ul>
		</PageShell>
	);
}
