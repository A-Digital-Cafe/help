import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { OPERATOR } from "../data/contact";
import { AGE_RULES } from "../data/age-rules";

export function TermsPage() {
	return (
		<PageShell
			title="Términos y Condiciones"
			subtitle="Reglas básicas de uso del sitio y la comunidad."
			declaration="policy"
			lastUpdated={LEGAL_DOCUMENTS.terms.version}
			legalDocId="terms"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Términos" }]}
		>
			<h2 id="quien-ofrece-el-servicio">0. Quién ofrece el servicio</h2>
			<p>
				El servicio lo ofrece <strong>{OPERATOR.legalName}</strong>, CUIT {OPERATOR.taxId}
				{OPERATOR.taxStatus ? `, ${OPERATOR.taxStatus}` : ""}, con domicilio en{" "}
				<strong>{OPERATOR.address ? `${OPERATOR.address}, ${OPERATOR.country}` : OPERATOR.country}</strong>, bajo el nombre comercial{" "}
				<strong>Abby's Digital Cafe (ADC)</strong>. Los datos completos de identificación y contacto están en{" "}
				<a href="/privacy#responsable">Privacidad § 1 Responsable</a>. Al contratar o usar la plataforma, contratás con esa persona.
			</p>

			<h2 id="uso-aceptable">1. Uso aceptable</h2>
			<p>
				Al usar el sitio te comprometes a no realizar actividades ilegales, abusivas, fraudulentas o que dañen a otras personas usuarias
				o a la plataforma.
			</p>

			<h2 id="conductas-prohibidas">2. Conductas prohibidas</h2>
			<p>No está permitido usar ADC para:</p>
			<ul>
				<li>acosar, amenazar, doxxear, discriminar o promover discurso de odio;</li>
				<li>publicar malware, spam, phishing, estafas o contenido ilegal;</li>
				<li>suplantar identidades o falsear afiliaciones;</li>
				<li>
					evadir límites de tasa, <a href="/values#geofiltro-activo">geofiltros</a>, medidas antiabuso o controles de seguridad;
				</li>
				<li>extraer datos de forma masiva sin autorización o afectar la disponibilidad del servicio;</li>
				<li>publicar contenido que vulnere derechos de terceros.</li>
			</ul>

			<h2 id="edad-minima">3. Edad mínima</h2>
			<p>
				La edad mínima es de <strong>13 años</strong>, o la que fije la ley de tu país si es mayor. La edad se declara al crear la
				cuenta y <strong>no la verificamos con documentación</strong>, así que la declaración es responsabilidad de quien se registra.
			</p>
			<p>
				<strong>Para contratar un plan pago</strong> tenés que ser mayor de edad o contar con la autorización de quien ejerza tu
				responsabilidad parental, y al contratar declarás ser titular del medio de pago que uses.
			</p>
			<p>
				Quien ejerza la responsabilidad parental o la tutela de un menor puede pedir la eliminación de su cuenta o el retiro de un
				contenido <strong>sin necesidad de tener cuenta en ADC</strong>: el canal, qué informar y los plazos están en la{" "}
				<a href="/privacy#menores">política de privacidad</a>.
			</p>
			<details>
				<summary>Ver a título informativo algunas edades mínimas por país</summary>
				<div className="mt-3 space-y-4">
					<p className="text-sm">
						Esta lista es <strong>orientativa</strong> y no sustituye a la regla de arriba: si tu país fija una edad mayor, rige
						esa aunque no figure acá. La armamos tomando como referencia el criterio público de plataformas comparables, no es
						exhaustiva y no verificamos la edad de nadie con documentación.
					</p>
					{AGE_RULES.map((group) => (
						<section key={group.region}>
							<h3>{group.region}</h3>
							<ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 text-sm">
								{group.entries.map((entry) => (
									<li key={entry.code}>
										<strong>{entry.place}:</strong> {entry.age}
										{entry.note ? ` (${entry.note})` : ""}
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			</details>

			<h2 id="cuentas">4. Cuentas</h2>
			<p>
				Eres responsable de la actividad de tu cuenta y de mantener tus credenciales seguras. Podemos suspender cuentas que violen estos
				términos o el <a href="/ethics">código de ética</a>.
			</p>

			<h3 id="suspension-de-cuentas">4.1. Cómo aplicamos una restricción o una suspensión</h3>
			<p>Sólo tomamos medidas sobre una cuenta por causas concretas:</p>
			<ul>
				<li>
					incumplir el <a href="#uso-aceptable">uso aceptable</a> o alguna de las{" "}
					<a href="#conductas-prohibidas">conductas prohibidas</a>, o el <a href="/ethics">código de ética</a>;
				</li>
				<li>un riesgo de seguridad activo: cuenta comprometida, campaña de spam o phishing en curso, abuso automatizado;</li>
				<li>contenido ilegal o que vulnere derechos de terceros, cuando corresponde retirarlo;</li>
				<li>una orden de autoridad competente, en los términos de la <a href="/authority-requests">política de solicitudes</a>.</li>
			</ul>
			<p>
				<strong>Vamos de menor a mayor.</strong> El orden normal es aviso, restricción de la función involucrada, suspensión de la cuenta
				y, como último paso, la baja. Saltamos escalones sólo cuando hay riesgo inmediato para otras personas o para la plataforma —
				material manifiestamente ilegal, una cuenta tomada por un tercero, un abuso en curso —, y en ese caso la explicación va junto con
				la medida, no después.
			</p>
			<adc-callout tone="warning" role="note">
				<strong>Siempre te decimos por qué.</strong> Cuando bloqueamos una cuenta, al intentar entrar vas a ver el motivo que escribió
				quien moderó y, si el bloqueo es por tiempo determinado, hasta cuándo dura. Nos comprometemos además a explicarte la regla
				concreta que se aplicó si nos lo pedís. Si creés que nos equivocamos, pedí una revisión abriendo un ticket en{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link> o
				escribiendo a los <a href="/contact#canales">canales de contacto</a>: la revisa una persona y te contestamos por el mismo canal.
				Si la medida no correspondía, la levantamos.
			</adc-callout>
			<p id="retiro-automatico">
				<strong>Un caso se resuelve sin intervención humana: la coincidencia exacta de huella digital.</strong> Cuando un archivo se
				retira —por una notificación fundada o por figurar en una base pública de programas maliciosos— guardamos su{" "}
				<strong>huella criptográfica</strong> (un SHA-256 del contenido), no el archivo. Un proceso en segundo plano calcula esa misma
				huella sobre el contenido ya alojado y, si coincide <strong>byte por byte</strong> con una de la lista, retira el acceso a ese
				archivo y te avisa en el acto con el motivo. También se rechaza la subida de un archivo cuya huella ya esté en la lista.
			</p>
			<p>
				Es automático porque no hay nada que juzgar: no se analiza de qué trata el archivo, no se lo clasifica ni se lo interpreta —
				sólo se compara un número con una lista. Alcanza al <strong>archivo</strong>, nunca a la cuenta: una coincidencia no suspende
				tu cuenta ni cuenta como antecedente para la <a href="#contenido">política de reincidencia de § 6</a>. Y tenés la
				misma revisión que cualquier otra medida: si creés que hubo un error, pedila por los canales de esta sección y la mira una
				persona. Es lo que el art. 22 del RGPD llama derecho a la intervención humana, y acá aplica aunque el retiro haya sido
				automático.
			</p>
			<p>
				Una cuenta restringida o suspendida <strong>no pierde datos</strong> y no deja de tener derechos: mientras dure la medida podés
				pedir una copia de tus datos, su rectificación o su supresión por los <a href="/contact#canales">canales de contacto</a>, con los
				plazos de <a href="/privacy#tus-derechos">Privacidad § 4</a>, y podés dar de baja la cuenta como se explica en{" "}
				<a href="#baja-y-exportacion">§ 5</a>.
			</p>

			<h2 id="baja-y-exportacion">5. Baja de cuenta y exportación de datos</h2>
			<p>
				Podés dar de baja tu cuenta cuando quieras, desde <strong>Mi cuenta → Administración → Eliminar cuenta</strong>. Al confirmarla,
				la cuenta queda inhabilitada y se cierran todas tus sesiones <strong>de inmediato</strong>, y los datos se eliminan de forma
				definitiva <strong>a los 30 días</strong>. Si tenés un plan pago, la baja <strong>también cancela el débito recurrente</strong>,
				sin que tengas que hacer nada más (ver <a href="#cobro-y-renovacion">§ 11.2</a>).
			</p>
			<p>
				Ese plazo no es una demora administrativa: existe para que una cuenta tomada por un tercero no sirva para borrar la vida digital
				de alguien sin dejar rastro ni margen de reacción, y para completar la purga en las copias de respaldo. Durante esos 30 días la
				cuenta no es utilizable por nadie. <strong>Si te arrepentís, escribinos antes de que venza</strong> por los{" "}
				<a href="/contact#canales">canales de contacto</a>: mientras no se haya purgado, podemos reactivarla.
			</p>
			<p>
				<strong>Exportación de tus datos.</strong> Podés pedir una copia de los datos asociados a tu cuenta escribiendo a los canales de
				contacto o abriendo un ticket de tipo <strong>“Datos”</strong> en{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>. Hoy la
				atendemos de <strong>forma manual</strong>: todavía no hay un botón de descarga en la interfaz. Que no exista la función no
				reduce ni el derecho ni el plazo — respondemos dentro de los que fija la Ley 25.326 (10 días corridos para acceso, 5 días
				hábiles para rectificación o supresión), detallados en <a href="/privacy#tus-derechos">Privacidad § 4</a>, y el ejercicio es
				gratuito.
			</p>
			<p>
				<strong>Qué sobrevive a la baja.</strong> Borrar la cuenta elimina tu perfil, tu contenido en Drive (incluido el que estuviera en
				papelera o en retención) y tu buzón de correo. No se elimina, porque no podemos o no debemos:
			</p>
			<ul>
				<li>
					los <strong>comprobantes fiscales</strong> y registros contables, que la normativa fiscal argentina obliga a conservar por un
					plazo mayor al de la cuenta;
				</li>
				<li>
					si la baja ocurre con una <strong>sanción vigente</strong>, el registro del bloqueo descrito en{" "}
					<a href="/privacy#conservacion">Privacidad § 5</a>: los hashes unidireccionales de la lista anti-evasión —que no contienen
					tu email ni tu IP, sino su hash— y el resto del registro, que se minimiza al levantarse el bloqueo y se elimina entero a
					los 6 meses;
				</li>
				<li>
					los <strong>tickets de soporte</strong> que hayas abierto: no se borran, se anonimizan. Se van tus emails, el vínculo con tu
					cuenta y el handle de crédito; quedan el título, la descripción tal como los escribiste, los adjuntos y los comentarios (
					<a href="/privacy#conservacion">Privacidad § 5</a>);
				</li>
				<li>
					las <strong>solicitudes de creación de organización</strong> que hayas hecho: también se anonimizan. Se van tu identificador
					de cuenta, el email de sesión y la IP desde la que las pediste; quedan los datos de la organización;
				</li>
				<li>
					el contenido que hayas <strong>compartido con otras personas</strong> y que ellas hayan guardado en su propio espacio: es
					suyo a partir de ahí, y no podemos borrarlo por vos;
				</li>
				<li>
					lo que sea necesario conservar para <strong>atender un reclamo o una obligación legal en curso</strong>, y sólo mientras dure.
				</li>
			</ul>

			<h2 id="contenido">6. Contenido</h2>
			<p>
				Conservas los derechos sobre el contenido que publicas. Nos otorgas una licencia limitada para mostrarlo dentro de la plataforma
				con la finalidad para la que lo publicaste, incluyendo copias técnicas necesarias para operar el servicio.
			</p>
			<p>
				<strong>Archivos subidos y compartidos (Drive y adjuntos):</strong> sos responsable del contenido que subís, almacenás o compartís
				(incluido el compartido por enlace público), y declarás contar con los derechos necesarios. No está permitido usar el
				almacenamiento para material ilegal, que infrinja derechos de terceros o que viole las{" "}
				<a href="#conductas-prohibidas">conductas prohibidas</a>. El espacio disponible depende de tu plan o del de tu organización.
				Podemos suspender el acceso a contenido reportado mientras se evalúa una solicitud de retiro: cualquier persona puede reportar
				contenido con el botón <em>“Reportar este contenido”</em> de la página del enlace público, o mediante un ticket de tipo{" "}
				<strong>“Datos”</strong> en{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link>{" "}
				(ver <a href="/privacy#contenido-de-usuarios-y-solicitudes-de-terceros">política de privacidad</a>).
			</p>
			<p>
				<strong>Qué pasa cuando suspendemos algo tuyo.</strong> La suspensión es preventiva y dura lo que dura la evaluación: te avisamos
				por los canales de tu cuenta indicando el motivo y el ticket, y podés responder por ese mismo ticket. Si el reporte no prospera,
				restablecemos el acceso y la suspensión no cuenta para nada. Suspender una carpeta suspende también su contenido.
			</p>
			<p>
				<strong>Reincidencia.</strong> <strong>Tres suspensiones firmes</strong> —es decir, que no se hayan levantado tras tu descargo—
				en <strong>12 meses</strong> habilitan la suspensión de la cuenta, con el mismo derecho de revisión de{" "}
				<a href="#suspension-de-cuentas">§ 4.1</a>. Contamos suspensiones firmes, no reportes recibidos: un reporte infundado no te
				perjudica.
			</p>
			<h3 id="reclamos-propiedad-intelectual">6.1. Reclamos por derechos de autor y propiedad intelectual</h3>
			<p>
				Si sos titular de un derecho de autor, una marca u otro derecho de propiedad intelectual —o actuás en su representación— y creés
				que alguien subió a la plataforma contenido que lo vulnera, podés pedirnos que lo retiremos. No hace falta que tengas cuenta.
			</p>
			<p>
				<strong>Cómo notificar.</strong> Por el botón <em>“Reportar este contenido”</em> de la página del enlace público, por un ticket de
				tipo <strong>“Datos”</strong> en{" "}
				<adc-platform-link href="https://status.adigitalcafe.com/status/tickets">status.adigitalcafe.com</adc-platform-link> o por los{" "}
				<a href="/contact#canales">canales de contacto</a>. Para que podamos actuar, la notificación tiene que incluir:
			</p>
			<ul>
				<li>
					<strong>qué obra o derecho invocás</strong> y en qué te basás para ser su titular o representarlo;
				</li>
				<li>
					<strong>el enlace exacto</strong> al contenido que pedís retirar —no “todo lo que suba esa cuenta”: sin una ubicación concreta
					no hay nada que podamos identificar ni, por lo tanto, conocimiento efectivo que atribuirnos—;
				</li>
				<li>
					<strong>por qué</strong> entendés que ese contenido vulnera tu derecho;
				</li>
				<li>
					<strong>tus datos de contacto</strong>, para responderte y para trasladarlos a quien subió el contenido según el párrafo
					siguiente;
				</li>
				<li>
					una <strong>declaración de buena fe</strong> de que la información es veraz y de que el uso denunciado no está autorizado por
					vos, por la ley ni por un límite al derecho que invocás.
				</li>
			</ul>
			<p>
				<strong>Nuestros plazos.</strong> Acusamos recibo dentro de los <strong>5 días hábiles</strong> y resolvemos dentro de los{" "}
				<strong>30 días corridos</strong> desde que la notificación está completa. Mientras evaluamos podemos suspender preventivamente el
				acceso al contenido, con las reglas de esta misma sección. Si la notificación está incompleta te lo decimos indicando qué falta, y
				el plazo empieza a correr cuando lo completás.
			</p>
			<p id="contranotificacion">
				<strong>Si el contenido reportado es tuyo, tenés derecho a defenderlo.</strong> Retirar algo por el solo pedido de un tercero, sin
				oír a quien lo publicó, convierte este canal en una herramienta para silenciar a otro — y las notificaciones equivocadas,
				exageradas o de mala fe existen. Por eso:
			</p>
			<ul>
				<li>
					<strong>Te decimos qué se reclamó y quién lo reclamó</strong>, no sólo que retiramos algo. Te trasladamos el contenido de la
					notificación y la identidad de quien la hizo, porque sin saber qué se te imputa no podés responder. Quien notifica lo sabe de
					antemano: está dicho en el propio formulario.
				</li>
				<li>
					<strong>Podés contranotificar</strong> dentro de los <strong>10 días hábiles</strong> del aviso, por el mismo ticket, con tus
					argumentos y —si los tenés— los elementos que acrediten tu autoría, tu licencia o el límite legal que te ampara (cita, parodia,
					uso educativo, obra en dominio público).
				</li>
				<li>
					<strong>Si contranotificás, restablecemos el acceso</strong>, salvo que de tu propia respuesta o de los elementos del caso surja
					que el reclamo era fundado, o que quien notificó acredite haber iniciado una acción judicial sobre ese contenido. Que
					restablezcamos no resuelve quién tiene razón: no somos un tribunal, y la disputa de fondo se dirime entre ustedes.
				</li>
				<li>
					<strong>Un retiro revertido no cuenta como antecedente</strong> para la política de reincidencia de esta sección.
				</li>
			</ul>
			<p>
				<strong>Reincidencia y abuso del canal.</strong> Las suspensiones firmes por propiedad intelectual cuentan para el régimen de{" "}
				<strong>tres suspensiones en 12 meses</strong> descrito arriba. Y la regla vale para los dos lados: quien use este canal de forma
				sistemática para pedir retiros infundados o para hostigar a otra persona usuaria pierde el acceso a él, y podemos exigirle que
				acredite su titularidad antes de tramitar futuras notificaciones.
			</p>
			<adc-callout tone="info" role="note">
				<strong>Bajo qué ley actuamos.</strong> Aplicamos la <strong>Ley 11.723</strong> de propiedad intelectual y el estándar que fijó la
				Corte Suprema argentina en <em>Rodríguez c/ Google</em> (2014): un intermediario no responde por el contenido de terceros{" "}
				<strong>hasta que toma conocimiento efectivo</strong> de que es ilícito, y desde ese momento sí responde si no actúa. Eso es lo que
				estos plazos existen para cumplir. <strong>No operamos bajo la DMCA</strong> ni tenemos agente designado ante la Oficina de
				Derechos de Autor de EE. UU.: el responsable está establecido en Argentina y no tiene activos allá, así que una notificación
				redactada como DMCA la vamos a tratar igual, pero según las reglas de esta sección.
			</adc-callout>
			<p>
				<strong>Transferencias entre dispositivos y unidades remotas:</strong> el mismo régimen de responsabilidad aplica al contenido que
				transfieras en vivo entre tus dispositivos con el túnel de Drive (que la plataforma retransmite sin almacenar) y al de las unidades
				remotas (S3/WebDAV) que conectes, que vive en tu proveedor y no en ADC. Sos responsable de las credenciales de esos servicios, de
				contar con autorización para usarlos y de cumplir sus propias condiciones; si elegís protegerlas con passphrase, su custodia es
				exclusivamente tuya y ADC no puede recuperarlas.
			</p>

			<h2 id="enlaces-y-servicios-externos">7. Enlaces y servicios externos</h2>
			<p>
				ADC puede enlazar o integrarse con servicios externos como Discord, Cloudflare, MongoDB Atlas u otros proveedores operativos.
				Esos servicios pueden tener sus propias condiciones y políticas. Cuando un tercero trate datos en nombre de ADC, se documentará
				en la <a href="/privacy#infraestructura-y-subprocesadores">política de privacidad</a> o en el{" "}
				<a href="/roadmap#capa-etica-legal-cimientos">roadmap</a> correspondiente.
			</p>

			<h2 id="subdominios-con-reglas-propias">8. Subdominios con reglas propias</h2>
			<p>
				Algunos subdominios pueden tener condiciones, avisos o políticas adicionales por su función. Esas condiciones{" "}
				<strong>sólo pueden sumar</strong> a estos Términos: ningún subdominio puede reducir por su cuenta los derechos, los plazos ni los
				compromisos que acá se asumen.
			</p>
			<p>
				El subdominio <code>games</code> <strong>todavía no está en servicio</strong> y hoy sólo publica un aviso de construcción. Cuando
				se lance incorporará publicidad y tendrá documentación propia sobre proveedores,{" "}
				<a href="/cookies#cookies-opcionales">cookies</a>, identificadores y consentimiento. Lo que ya está decidido —y no queda librado a
				esa documentación futura— son los cuatro límites de{" "}
				<a href="/privacy#publicidad-en-games">Privacidad § 3.2</a>: nada de publicidad personalizada a menores, los datos de tu cuenta de
				ADC no se comparten con proveedores publicitarios, ningún identificador publicitario sin consentimiento previo con rechazo
				igual de accesible, y cada proveedor publicado antes de activarse.
			</p>

			<h2 id="disponibilidad">9. Disponibilidad</h2>
			<p>
				La plataforma se ofrece "tal cual". Trabajamos en un programa de SLA/SLO público que se incorporará en futuras fases (ver{" "}
				<a href="/roadmap#capa-de-transparencia-operaciones">Roadmap</a>). Ese "tal cual" tiene los límites que fija la{" "}
				<a href="#limitacion-de-responsabilidad">§ 10</a>: no es una renuncia general a responder.
			</p>
			<p id="degradacion-de-planes">
				<strong>Degradación de límites ante una incidencia.</strong> Los límites de tu plan los resuelve un servicio interno de planes.
				Si ese servicio no está disponible, las aplicaciones <strong>no se caen</strong>: siguen funcionando aplicando los límites del{" "}
				<strong>plan base</strong> (el gratuito) hasta que se restablezca. Es una decisión deliberada de seguridad — preferimos quedar
				cortos antes que liberar recursos sin control —, por lo que durante ese lapso una cuenta con plan pago puede ver límites
				menores a los contratados de forma temporal.
			</p>
			<p>
				Lo que esa degradación <strong>sí</strong> hace es frenar el consumo nuevo: mientras dure, puede rechazarse una subida que con
				tu plan entraría sin problema. Lo que <strong>no</strong> hace es tocar lo que ya tenés: todo tu contenido sigue accesible,
				descargable y compartible aunque supere el límite base, y nada se borra ni se recorta por estar por encima. No implica pérdida
				del plan ni de datos: al restablecerse el servicio, los límites vuelven solos. Cuando esto ocurre, las pantallas de
				almacenamiento lo indican en vez de mostrar una cuota recortada sin explicación, y la incidencia se publica en la{" "}
				<a href="https://status.adigitalcafe.com">página de estado</a>.
			</p>

			<h2 id="limitacion-de-responsabilidad">10. Limitación de responsabilidad</h2>
			<p>
				Esta sección delimita hasta dónde llega nuestra responsabilidad. Dos reglas la acotan y prevalecen sobre todo lo que sigue:
			</p>
			<ul>
				<li>
					<strong>No dispensamos anticipadamente el dolo ni la culpa grave.</strong> El artículo 1743 del Código Civil y Comercial
					declara inválidas las cláusulas que eximen anticipadamente de responsabilidad por dolo o por culpa grave. Si un daño proviene
					de una conducta deliberada nuestra o de una negligencia grosera, respondemos, y nada de este documento lo cambia.
				</li>
				<li>
					<strong>Frente a consumidores, las cláusulas abusivas son nulas.</strong> Si usás la plataforma como consumidor o usuario
					final, el artículo 37 de la Ley 24.240 tiene por no escritas las cláusulas que desnaturalicen las obligaciones o limiten la
					responsabilidad por daños. En esa medida, esta limitación simplemente no se te aplica.
				</li>
			</ul>
			<p>
				Dentro de esos límites y de lo que la ley permite, <strong>no respondemos</strong> por: interrupciones o degradaciones del
				servicio que no dependan de nosotros; el contenido que suban, compartan o transfieran las personas usuarias; los servicios de
				terceros que conectes por tu cuenta (unidades remotas S3/WebDAV, proveedores de identidad); la pérdida de credenciales cuya
				custodia es exclusivamente tuya —como la <em>passphrase</em> de una unidad remota, que no podemos recuperar—; ni el lucro
				cesante o los daños indirectos derivados del uso o de la imposibilidad de uso del servicio.
			</p>
			<p>
				En los <strong>usos no destinados al consumo final</strong> (organizaciones y planes de equipo), y siempre con la salvedad del
				dolo y la culpa grave, nuestra responsabilidad por daños directos se limita al importe efectivamente abonado por el servicio en
				los <strong>doce meses</strong> anteriores al hecho que los originó.
			</p>
			<p>
				Y hay cosas de las que <strong>sí respondemos</strong>, porque son las que dependen de nosotros: aplicar las medidas de seguridad
				descritas en <a href="/privacy#seguridad">Privacidad § 6</a>, respetar los plazos de conservación y de ejercicio de derechos que
				publicamos, avisar de los incidentes de seguridad que te afecten —con los plazos concretos de{" "}
				<a href="/privacy#incidentes">Privacidad § 11</a>: 72 horas a la autoridad de control y sin dilación indebida a vos cuando el
				riesgo sea alto— y avisar de los cambios que recorten beneficios de tu plan con la antelación comprometida en{" "}
				<a href="#reevaluacion-anual">§ 11</a>.
			</p>

			<h2 id="planes-y-beneficios">11. Planes, beneficios y su revisión</h2>
			<p>
				Los planes pagos incluyen límites concretos (almacenamiento, <strong>volumen de descarga mensual</strong>, envíos de correo,
				proyectos, etc.) que se publican en la página de planes, agrupados por la aplicación a la que pertenecen. Cómo se calcula el
				precio y cómo se cobra está en <a href="#precio-y-moneda">§ 11.1</a> y <a href="#cobro-y-renovacion">§ 11.2</a>. Si contratás un
				plan pago,{" "}
				<strong>
					tenés <a href="#derecho-de-revocacion">10 días corridos para arrepentirte y recuperar todo lo pagado</a>
				</strong>{" "}
				(§ 11.3).
			</p>
			<p id="volumen-de-descarga">
				<strong>Volumen de descarga.</strong> Los archivos cifrados se descifran en nuestros servidores para servírtelos, así que la
				descarga consume recursos propios y tiene un cupo mensual publicado en cada plan. Al agotarlo dejan de autorizarse descargas
				nuevas hasta el mes siguiente: <strong>no se borra ni se bloquea nada</strong>, tus archivos siguen ahí y podés seguir subiendo,
				compartiendo y trabajando. El cupo se mide al autorizar cada descarga, por el tamaño del archivo.
			</p>
			<p id="minimo-de-asientos">
				<strong>Mínimo de asientos en los planes de equipo.</strong> El plan de equipo tiene un mínimo de asientos contratados, y sus
				límites son un pool compartido dimensionado para ese grupo. Si la cantidad de asientos pagos baja del mínimo, la organización
				deja de reunir las condiciones del plan y pasa al plan gratuito de organización en la siguiente renovación, con los límites que
				correspondan. Es la contracara del precio por asiento reducido: se sostiene porque el grupo se sostiene. Avisamos antes de que
				ocurra y no se pierde ningún dato por este motivo.
			</p>
			<p id="reevaluacion-anual">
				<strong>Reevaluación financiera anual.</strong> Una vez al año publicamos un informe con los costos reales de infraestructura y
				el margen de cada plan. Sirve para que cualquier ajuste de beneficios esté justificado con números y no sea una sorpresa: si el
				costo de almacenamiento o de tráfico se dispara, ahí se va a ver. <strong>Todo cambio que reduzca los beneficios de un plan
				vigente se anuncia con al menos un mes de anticipación</strong>, y durante ese plazo podés dar de baja sin cargo y sin
				penalidad. Los cambios que <em>amplían</em> beneficios pueden aplicarse de inmediato.
			</p>
			<p id="ampliacion-de-organizacion">
				<strong>Ampliaciones del plan de organización.</strong> El plan de equipo admite solicitar una ampliación de sus límites
				compartidos. Se pide por ticket, indicando qué es la organización y a qué compromisos adhiere. La otorgamos a nuestro criterio
				según esos antecedentes y la capacidad disponible, y <strong>podemos revocarla si detectamos un uso que perjudique al resto de
				las personas usuarias</strong> (por ejemplo, envío masivo no solicitado o reventa del servicio). La ampliación no cambia el
				precio, no agrega asientos y su revocación no afecta la suscripción ni los datos: sólo devuelve los límites a los del plan
				contratado. Si te la revocamos, te explicamos el motivo y podés pedir una revisión por el mismo canal.
			</p>
			<p id="planes-a-medida">
				<strong>Planes a medida.</strong> A partir de cierto tamaño, los límites se acuerdan caso por caso por escrito y se revisan cada
				tres meses. Ninguna revisión reduce lo acordado durante el período en curso.
			</p>

			<h3 id="precio-y-moneda">11.1. Precio, moneda y tipo de cambio</h3>
			<p>
				Los planes se publican y se cobran en <strong>pesos argentinos</strong>: el importe que ves en la página de planes es el que se
				debita, calculado con la cotización vigente al confirmar la contratación. Cuando el precio de lista de un plan está expresado en
				dólares estadounidenses, la conversión a pesos se hace <strong>antes</strong> de generar el cobro, no después.
			</p>
			<p>
				Esa conversión usa la <strong>cotización oficial del Banco Central de la República Argentina (BCRA)</strong> para el dólar
				estadounidense. Junto al precio mostramos siempre la fuente y la fecha de la cotización aplicada, y guardamos esa misma cotización
				junto a tu contratación, para que puedas verificar con qué número se calculó lo que se te cobró. Consultamos al BCRA como mucho una
				vez por hora, así que entre una consulta y la siguiente el precio se mantiene estable. Tené en cuenta que el BCRA publica en días
				hábiles: un fin de semana o un feriado, la cotización aplicable es la del último día publicado, y esa es la fecha que vas a ver.
			</p>
			<p>
				Si el BCRA no responde, seguimos operando con la última cotización oficial válida que tengamos, aunque sea de días anteriores;
				nunca usamos un valor propio ni estimado. Y si no tenemos ninguna cotización, el plan no se puede contratar: se muestra como no
				disponible, sin precio y con la contratación deshabilitada, hasta que podamos expresarlo en pesos.
			</p>
			<p>
				<strong>Impuestos.</strong> El precio que ves es <strong>final</strong>: no se le suma nada al confirmar. Quien presta el
				servicio está adherido al <strong>Régimen Simplificado (Monotributo)</strong>, así que el IVA no se discrimina —ya está
				comprendido en la cuota del régimen— y el régimen de transparencia fiscal de la Ley 27.743 no alcanza a esos comprobantes.
				Tampoco aplicamos percepciones ni recargos de ningún tipo. Los cargos que pueda aplicar tu banco o tu medio de pago no los
				percibimos nosotros ni dependen de nosotros.
			</p>
			<p>
				<strong>Comprobante.</strong> Qué comprobante te emitimos depende de tu <strong>país de residencia fiscal</strong>, que
				declarás al contratar y podés corregir: Argentina lleva <strong>Factura C</strong>; cualquier otro país convierte la
				operación en una <strong>exportación de servicios</strong> y lleva <strong>Factura E</strong>. El importe que pagás es el
				mismo en los dos casos, y lo dicho arriba sobre impuestos vale para ambos. La Factura E no admite consumidor final: ARCA
				exige identificar a quien compra, y por eso ahí —y sólo ahí— te pedimos nombre y domicilio. Si tributás fuera de Argentina,
				tu propio país puede gravar la operación por su cuenta: eso no lo cobramos ni lo liquidamos nosotros. Si ejercés el
				arrepentimiento sobre un período ya facturado, emitimos la <strong>nota de crédito</strong> que lo deja sin efecto.
			</p>
			<p>
				<strong>Si cambia nuestra condición fiscal.</strong> Lo anterior describe la condición vigente hoy. Si dejáramos el Monotributo
				y pasáramos a un régimen que obligue a discriminar impuestos, actualizaríamos esta sección y, si eso implicara un aumento del
				importe que pagás, regiría el preaviso de <a href="#modificaciones">§ 13</a>: nunca vas a ver un impuesto nuevo sumado a un
				precio ya contratado sin habértelo avisado antes.
			</p>

			<h3 id="cobro-y-renovacion">11.2. Cobro, renovación y baja</h3>
			<p>
				Los planes pagos se cobran <strong>por período mensual y por adelantado</strong>: cada pago aprobado habilita el plan por 31 días.
				La contratación se hace por débito recurrente, así que{" "}
				<strong>se renueva y se cobra automáticamente cada mes hasta que la canceles</strong>: no hace falta que hagas nada para que siga.
				En los planes de equipo, el importe de cada período es el precio por asiento multiplicado por los asientos contratados, sin
				prorrateo — cambiar la cantidad de asientos es una contratación nueva.
			</p>
			<p>
				<strong>Cómo se cancela.</strong> Por el mismo medio por el que contrataste y con la misma facilidad: hay un botón de baja en la
				aplicación de suscripciones, disponible en cualquier momento, sin dar motivos, sin escribirle a nadie y sin esperar autorización
				(art. 10 ter de la Ley 24.240). La baja deja de renovar; <strong>el período que ya abonaste se respeta</strong>, conservás el plan
				hasta que termine y después la cuenta vuelve al plan gratuito, sin perder datos. Fuera del plazo del{" "}
				<a href="#derecho-de-revocacion">§ 11.3</a>, la baja no da lugar a la devolución del período en curso. Si por un fallo de la
				pasarela llegara un cobro posterior a la baja, escribinos y te lo devolvemos.
			</p>
			<p>
				<strong>Baja de la cuenta.</strong> Dar de baja la cuenta (<a href="#baja-y-exportacion">§ 5</a>) cancela también el débito
				recurrente: no tenés que cancelar la suscripción por separado. La cancelación la pedimos a la pasarela en ese mismo momento, pero
				la ejecuta ella: si por un fallo suyo llegara un cobro posterior a la baja, escribinos por los{" "}
				<a href="/contact#canales">canales de contacto</a> y te lo devolvemos. La suscripción de una organización es de la organización:
				no se da de baja porque se vaya una de las personas que la integran.
			</p>

			<h3 id="derecho-de-revocacion">11.3. Derecho de revocación (arrepentimiento)</h3>
			<adc-callout tone="warning" role="note">
				<strong>Podés arrepentirte dentro de los 10 días corridos y te devolvemos todo lo que pagaste.</strong> El plazo corre desde que
				contratás o, si es posterior, desde que se confirma el primer pago de esa contratación. Se ejerce desde la aplicación de
				suscripciones, con un botón propio que aparece destacado mientras el plazo está abierto: sin dar explicaciones, sin costo y por el
				mismo medio por el que contrataste. Es un derecho irrenunciable (arts. 1110 y 1111 del Código Civil y Comercial y art. 34 de la
				Ley 24.240).
			</adc-callout>
			<p>En el mismo momento en que apretás ese botón:</p>
			<ul>
				<li>
					se cancela el débito recurrente, así que no vuelve a cobrarse nada — y si por un fallo de la pasarela llegara igual un cobro
					posterior, escribinos y te lo devolvemos;
				</li>
				<li>
					pedimos a la pasarela el reintegro <strong>íntegro</strong> de cada pago aprobado de esa contratación, sin retención,
					descuento ni gasto administrativo, y por el mismo medio de pago con el que se cobró;
				</li>
				<li>queda una constancia con la fecha, los pagos alcanzados, el importe devuelto y el estado del reintegro.</li>
			</ul>
			<p>
				La acreditación del dinero la ejecutan la pasarela y el emisor de tu medio de pago: el pedido lo emitimos en el acto, pero cuánto
				tarda en aparecer en tu resumen no lo controlamos. Si la pasarela rechaza el reintegro,{" "}
				<strong>la revocación no se pierde</strong>: queda asentada como pendiente y la completamos a mano.
			</p>
			<p>
				Dos precisiones: cada contratación abre su propio plazo de 10 días —también una recontratación o un cambio de asientos—, y sobre
				una misma contratación el arrepentimiento se ejerce una sola vez. Ejercerlo tampoco te corta el servicio de golpe: si ya había un
				pago aprobado, conservás el plan hasta que venza el período que ese pago había habilitado, aunque el dinero ya te haya sido
				devuelto.
			</p>

			<h2 id="jurisdiccion-y-ley-aplicable">12. Jurisdicción y ley aplicable</h2>
			<p>
				Estos términos se interpretan bajo la ley aplicable de la República Argentina, sin perjuicio de los derechos de protección al
				consumidor o datos personales que puedan corresponder en tu país de residencia.
			</p>

			<h2 id="modificaciones">13. Modificaciones</h2>
			<p>
				Podemos actualizar estos términos y la <a href="/privacy">política de privacidad</a>. Cada documento lleva al pie su fecha de
				publicación, y nos comprometemos a publicar toda versión nueva con <strong>al menos 30 días de anticipación</strong> a la fecha
				desde la cual rige para las cuentas que ya existían. Quien se registra después de la publicación acepta, en el alta, la versión
				vigente en ese momento.
			</p>
			<p>
				<strong>Cómo te avisamos.</strong> Al publicar una versión nueva mandamos un aviso a todas las cuentas activas por la campana de
				notificaciones de la plataforma, diciendo qué documento cambió, desde cuándo rige y con enlace al texto. Ese aviso no se puede
				silenciar desde las preferencias de notificación, justamente para que no te lo pierdas; recibir además el mismo aviso por correo
				sí es opcional.
			</p>
			<p>
				<strong>Qué pasa si no aceptás.</strong> No tomamos tu silencio como aceptación. Desde la fecha de entrada en vigor, al entrar a
				la plataforma te pedimos aceptar la versión nueva marcando una casilla que aparece desmarcada, y hasta que lo hagas no vas a poder
				usar las aplicaciones. Sin aceptar nada podés igual leer los documentos acá, gestionar tu cuenta, cerrar sesión, pedir una copia
				de tus datos o su supresión por los <a href="/contact#canales">canales de contacto</a> y{" "}
				<a href="#baja-y-exportacion">dar de baja tu cuenta</a>. No desactivamos ni borramos ninguna cuenta por no aceptar.
			</p>
			<p>
				<strong>Podés rechazar el cambio.</strong> Si la versión nueva no te convence, podés rescindir: dar de baja la suscripción y la
				cuenta <strong>sin cargo ni penalidad</strong>, durante el plazo de preaviso o después. Si el cambio recorta beneficios de un plan
				vigente, rige además el compromiso de <a href="#reevaluacion-anual">§ 11</a>. Los cambios que sólo amplían tus derechos o
				beneficios pueden aplicarse de inmediato.
			</p>
		</PageShell>
	);
}
