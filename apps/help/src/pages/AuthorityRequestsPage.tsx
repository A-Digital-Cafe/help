import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { CONTACTS, OPERATOR } from "../data/contact";

export function AuthorityRequestsPage() {
	return (
		<PageShell
			title="Respuesta a autoridades"
			subtitle="Cómo recibimos, verificamos y respondemos requerimientos de autoridades públicas."
			standards={["Ley 25.326", "Paso B (marco propio)", "Derechos humanos"]}
			declaration="policy"
			lastUpdated="2026-08-09"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Valores", href: "/values" }, { label: "Autoridades" }]}
		>
			<p>
				Esta página es el procedimiento que seguimos cuando una autoridad judicial, administrativa o regulatoria nos requiere datos, la
				preservación de información, el retiro de contenido o la suspensión de una cuenta. Es el Paso B del{" "}
				<a href="/values#marco-gni">marco GNI</a>. Describe lo que hacemos, no lo que nos gustaría hacer.
			</p>

			<adc-callout tone="info" role="note">
				<strong>Un requerimiento informal no se procesa.</strong> Un llamado telefónico, un mensaje o un correo sin instrumento reciben
				una respuesta cortés que explica este procedimiento, y nada más. No es obstruccionismo: sin un documento no hay forma de
				verificar quién pide, con qué facultad y con qué alcance, y entregar datos personales sin eso sería la infracción, no la
				colaboración.
			</adc-callout>

			<section className="mt-8">
				<h2 id="alcance" className="text-2xl font-heading mb-3">
					Qué solicitudes cubre
				</h2>
				<ul>
					<li>
						<strong>Datos de personas usuarias.</strong> Sólo con instrumento escrito y sobre una cuenta o un contenido identificado.
					</li>
					<li>
						<strong>Preservación.</strong> Congelar información sin entregarla, mientras se verifica la orden de fondo. Ver{" "}
						<a href="#preservacion">preservación</a>.
					</li>
					<li>
						<strong>Retiro de contenido.</strong> Se tramita con las mismas garantías que un reclamo de un particular (aviso a quien
						publicó y derecho a responder), salvo prohibición legal expresa.
					</li>
					<li>
						<strong>Bloqueo o suspensión de una cuenta.</strong> Medida excepcional: sólo con orden que la disponga expresamente.
					</li>
					<li>
						<strong>Información de seguridad.</strong> Pedidos de un CERT o de un organismo de ciberseguridad sobre un incidente; se
						responden por este mismo canal y quedan registrados igual.
					</li>
					<li>
						<strong>Contacto informal.</strong> Se responde explicando este procedimiento. No se entrega nada.
					</li>
				</ul>
			</section>

			<section className="mt-10">
				<h2 id="canal" className="text-2xl font-heading mb-3">
					Por dónde entra
				</h2>
				<p>
					Por un ticket de tipo <strong>“Autoridades”</strong> en{" "}
					<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>.{" "}
					<strong>No hace falta tener cuenta.</strong> El sistema devuelve un identificador de ticket en el acto: ése es el número con
					el que se sigue el trámite. Si el formulario no está disponible, el respaldo es{" "}
					<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>, y el pedido se carga igual en el registro.
				</p>
				<p>Para que podamos actuar, el requerimiento tiene que incluir:</p>
				<ul>
					<li>
						<strong>organismo y unidad</strong> que requiere;
					</li>
					<li>
						<strong>carátula y número</strong> de expediente o actuación;
					</li>
					<li>
						<strong>la norma</strong> que faculta el requerimiento;
					</li>
					<li>
						<strong>funcionario/a firmante, cargo y una forma de contacto oficial</strong> (dominio institucional, no una casilla
						personal);
					</li>
					<li>
						<strong>el alcance exacto</strong>: cuenta, URL o rango temporal. No “todo lo que tenga esa persona”: sin una delimitación
						concreta no hay nada que podamos identificar sin entregar de más;
					</li>
					<li>
						<strong>el plazo</strong> de respuesta requerido;
					</li>
					<li>
						si existe <strong>prohibición de notificar</strong> a la persona titular, la norma y el plazo que la fundan.
					</li>
				</ul>
				<p>
					Si el requerimiento está incompleto te lo decimos indicando qué falta, y el plazo empieza a correr cuando lo completás. El
					mismo criterio que usamos con los reclamos de particulares en <a href="/terms#reclamos-propiedad-intelectual">Términos § 6.1</a>
					.
				</p>
			</section>

			<section className="mt-10">
				<h2 id="verificacion-de-legitimidad" className="text-2xl font-heading mb-3">
					Verificación de legitimidad
				</h2>
				<p>
					<strong>No se entrega nada antes de completar estos cuatro pasos.</strong> Acusamos recibo dentro de los{" "}
					<strong>5 días hábiles</strong>.
				</p>
				<ol>
					<li>
						<strong>Instrumento escrito.</strong> Nunca una llamada, nunca un mensaje. El documento tiene que poder archivarse.
					</li>
					<li>
						<strong>Verificación del emisor por un canal que no salga del propio oficio.</strong> Se contacta a la mesa de entradas o
						al sitio oficial del organismo con los datos publicados por ese organismo, no con los que trae el documento. Un oficio
						falsificado trae, por definición, un teléfono falsificado.
					</li>
					<li>
						<strong>Competencia.</strong> {OPERATOR.legalName || "El responsable del tratamiento"} está establecido en{" "}
						{OPERATOR.country || "Argentina"}, así que un requerimiento de una autoridad extranjera se encauza por la vía de asistencia
						jurídica internacional (exhorto o el tratado aplicable) —con una excepción: un pedido de <em>preservación</em> se atiende
						de inmediato, porque preservar no es entregar y esperar destruiría la prueba.
					</li>
					<li>
						<strong>Identificación del firmante</strong> y de su facultad para requerir en ese expediente.
					</li>
				</ol>
			</section>

			<section className="mt-10">
				<h2 id="necesidad-y-proporcionalidad" className="text-2xl font-heading mb-3">
					Necesidad y proporcionalidad
				</h2>
				<p>Verificada la legitimidad, se evalúa el pedido en sí:</p>
				<ul>
					<li>que sea <strong>específico</strong> y esté vinculado a una actuación concreta, no exploratorio;</li>
					<li>que pida el <strong>dato mínimo</strong> necesario para esa finalidad;</li>
					<li>que esté <strong>acotado en el tiempo</strong>;</li>
					<li>
						que su efecto previsible no sea perseguir a alguien por su identidad, su orientación o su expresión (ver{" "}
						<a href="/values#geofiltro-activo">valores</a>).
					</li>
				</ul>
				<p>
					Si el pedido no pasa este test, <strong>primero pedimos que se reformule más acotado</strong> y recién después lo rechazamos.
					Un requerimiento demasiado amplio suele ser un error de redacción, no un abuso.
				</p>
			</section>

			<section className="mt-10">
				<h2 id="minimizacion" className="text-2xl font-heading mb-3">
					Qué se entrega y qué no existe
				</h2>
				<p>Se entrega exactamente lo requerido, al canal oficial del organismo, nunca a una casilla personal. Además:</p>
				<ul>
					<li>
						los <strong>registros del borde</strong> (logs HTTP, IPs de acceso) los conserva nuestro proveedor de red y{" "}
						<strong>no guardamos copia</strong>: ver <a href="/privacy#infraestructura-y-subprocesadores">Privacidad § 7</a>;
					</li>
					<li>
						lo que ya fue eliminado o venció su plazo de conservación <strong>no existe</strong>: ver{" "}
						<a href="/privacy#conservacion">Privacidad § 5</a>;
					</li>
					<li>
						lo que la persona usuaria <strong>cifró con su propia frase de paso</strong> no lo podemos abrir. No es una negativa: no
						tenemos la clave.
					</li>
				</ul>
			</section>

			<section className="mt-10">
				<h2 id="preservacion" className="text-2xl font-heading mb-3">
					Preservación
				</h2>
				<p>
					Un pedido de preservación se atiende <strong>de inmediato</strong>: la información queda congelada —fuera del alcance de los
					borrados automáticos y de la purga por baja de cuenta— sin entregarse a nadie, mientras se verifica la orden de fondo. La
					preservación es por un plazo acotado y <strong>se levanta si la orden no llega</strong>, porque conservar indefinidamente “por
					las dudas” es exactamente lo que la minimización prohíbe.
				</p>
			</section>

			<section className="mt-10">
				<h2 id="notificacion-a-personas-afectadas" className="text-2xl font-heading mb-3">
					Aviso a la persona afectada
				</h2>
				<p>
					<strong>Avisamos siempre antes de entregar</strong>, salvo prohibición legal expresa o riesgo inminente para la vida o la
					integridad de alguien. Si hubo prohibición, avisamos al vencer y registramos por qué no se avisó antes.
				</p>
				<p>
					Si los datos pertenecen a una organización, quien decide es esa organización como responsable del tratamiento y el aviso va a
					ella: es lo que ya nos comprometimos a hacer en el <a href="/dpa#instrucciones">DPA</a>.
				</p>
			</section>

			<section className="mt-10">
				<h2 id="registro" className="text-2xl font-heading mb-3">
					Registro auditable
				</h2>
				<p>Cada requerimiento deja constancia en dos lugares, y la diferencia importa:</p>
				<ul>
					<li>
						En el <strong>registro de auditoría administrativa</strong>, que sólo admite identificadores y valores acotados:
						identificador del ticket, fecha, jurisdicción, tipo de solicitud, decisión adoptada, quién decidió, si se avisó a la
						persona afectada y si ese aviso se difirió. Se conserva <strong>2 años</strong> y sólo lo consultan los roles de
						administración global (ver <a href="/privacy#conservacion">Privacidad § 5</a>).
					</li>
					<li>
						En el <strong>ticket</strong>, cuyo acceso ya está acotado: el oficio, la norma invocada, el alcance exacto de lo
						entregado, los datos de contacto del organismo y el fundamento de cada decisión.
					</li>
				</ul>
				<p>
					El registro de auditoría <strong>no guarda texto libre</strong> —ni el contenido entregado, ni la carátula, ni los datos del
					funcionario—: es deliberado, para que el rastro de las decisiones no se convierta él mismo en un archivo de datos
					personales. Lo que prueba es <em>que</em> se decidió, <em>cuándo</em> y <em>quién</em>; el <em>por qué</em> vive en el
					expediente del ticket, ligado por su identificador.
				</p>
			</section>

			<section className="mt-10">
				<h2 id="escalado-y-rechazo" className="text-2xl font-heading mb-3">
					Escalado y rechazo
				</h2>
				<p>
					Decide y firma {OPERATOR.legalName || "la persona responsable del tratamiento"}. No hay un comité: decirlo es más honesto que
					inventar una estructura que no existe.
				</p>
				<p>Se rechaza por escrito y con fundamento:</p>
				<ul>
					<li>lo manifiestamente incompetente o sin instrumento;</li>
					<li>lo masivo o exploratorio;</li>
					<li>
						todo requerimiento cuyo efecto previsible sea perseguir a alguien por su identidad, su orientación o su expresión (ver{" "}
						<a href="/ethics">ética</a>).
					</li>
				</ul>
				<p>Los rechazos se publican de forma agregada en el reporte de transparencia.</p>
			</section>

			<section className="mt-10">
				<h2 id="relacion-con-transparencia" className="text-2xl font-heading mb-3">
					Relación con transparencia
				</h2>
				<p>
					El <a href="/transparency">reporte de transparencia</a> publica, por período, cuántos requerimientos se recibieron y cuántos se
					aceptaron, se cumplieron parcialmente o se rechazaron, desagregados por tipo y jurisdicción. Cuando el detalle pueda
					identificar a una persona o ponerla en riesgo, se publica agregado.
				</p>
			</section>

			<adc-callout tone="info" role="note">
				<strong>Bajo qué ley actuamos.</strong> La Ley 25.326 admite la cesión de datos a autoridades públicas en el ejercicio directo de
				sus funciones y dentro de su competencia. {OPERATOR.legalName || "El responsable"} está establecido en{" "}
				{OPERATOR.country || "Argentina"} y responde ante la jurisdicción argentina; los requerimientos de autoridades de otros países se
				canalizan por asistencia jurídica internacional. Las citas normativas concretas de cada caso se evalúan al recibirlo: esta página
				describe el procedimiento, no sustituye el análisis del requerimiento.
			</adc-callout>
		</PageShell>
	);
}
