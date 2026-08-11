import "@ui-library/utils/react-jsx";
import PageShell from "../components/PageShell";
import { LEGAL_DOCUMENTS } from "@common/utils/legal-docs.js";
import { CONTACTS, OPERATOR } from "../data/contact";

export function DpaPage() {
	return (
		<PageShell
			title="Acuerdo de Tratamiento de Datos (DPA)"
			subtitle="Condiciones bajo las que ADC trata datos personales por cuenta de una organización con plan de equipo."
			standards={["Ley 25.326", "GDPR art. 28 (alineación voluntaria)"]}
			declaration="policy"
			lastUpdated={LEGAL_DOCUMENTS.dpa.version}
			legalDocId="dpa"
			breadcrumb={[{ label: "Inicio", href: "/" }, { label: "DPA" }]}
		>
			<h2 id="partes-y-aplicacion">1. Partes y aplicación automática</h2>
			<p>
				Este acuerdo se celebra entre la <strong>organización que contrata un plan de equipo</strong> (la “Organización”, responsable
				del tratamiento) y <strong>{OPERATOR.legalName}</strong>, CUIT <strong>{OPERATOR.taxId}</strong>, con domicilio en{" "}
				<strong>{OPERATOR.address ? `${OPERATOR.address}, ${OPERATOR.country}` : OPERATOR.country}</strong>, operadora de la plataforma
				bajo el nombre comercial Abby's Digital Cafe (“ADC”, encargada del tratamiento). Complementa los{" "}
				<a href="/terms">Términos y Condiciones</a> y la <a href="/privacy">Política de Privacidad</a>; en lo que respecta al
				tratamiento de datos personales por cuenta de la Organización, prevalece este acuerdo.
			</p>
			<p>
				<strong>Se aplica de forma automática (“deemed executed”) desde el momento en que la Organización contrata un plan de
				equipo</strong>, sin necesidad de firma separada: la contratación del plan implica la celebración de este acuerdo en la versión
				vigente a esa fecha. Somos un servicio de autoservicio y no firmamos contratos bilaterales a medida; preferimos decirlo a
				aparentar lo contrario. Si tu organización necesita constancia documental, este acuerdo se publica versionado, con su hash y su
				PDF congelado descargable al pie de la página.
			</p>
			<adc-callout tone="warning" role="note">
				<strong>Disponibilidad geográfica.</strong> Este acuerdo, y el plan de equipo al que acompaña,{" "}
				<strong>no están disponibles para organizaciones establecidas en el Espacio Económico Europeo</strong>, ni para el
				tratamiento de datos de personas que se encuentren allí. ADC opera desde Argentina y no ha designado representante en la
				Unión en los términos del art. 27 del RGPD. Al contratar, la Organización <strong>declara y garantiza</strong> que no está
				establecida en el EEE y que no usará la plataforma para tratar datos de personas que se encuentren allí; si esa declaración
				deja de ser exacta, debe comunicárnoslo, y ADC puede resolver el acuerdo. La Organización mantendrá indemne a ADC frente a
				los perjuicios que se deriven de la inexactitud de esa declaración.
			</adc-callout>
			<p>
				<strong>Si tu organización está en el EEE y aun así quiere contratar, escribinos</strong> a{" "}
				<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>. La designación del representante del art. 27 le corresponde a ADC
				y no puede trasladarse por contrato —una cláusula reparte obligaciones entre las partes, no cambia a quién le reclama una
				autoridad de control—, pero sí podemos evaluar designarlo caso por caso, con su costo a cargo de quien lo solicita. Hasta que
				esa designación exista, la contratación no está habilitada. Preferimos decir que hoy no llegamos antes que aceptar un
				contrato que no podríamos sostener.
			</p>
			<adc-callout tone="info" role="note">
				<strong>Qué cubre y qué no.</strong> Este acuerdo cubre los datos que la Organización administra dentro de la plataforma:
				su espacio de trabajo, sus miembros en cuanto tales y el contenido de sus proyectos. Las <strong>cuentas personales</strong> de
				cada miembro (su perfil, su Drive personal, su correo personal) siguen bajo la relación directa de cada persona con ADC como
				responsable, descrita en la <a href="/privacy">Política de Privacidad</a>.
			</adc-callout>

			<h2 id="objeto-naturaleza-fines">2. Objeto, naturaleza y fines del tratamiento</h2>
			<p>
				El objeto es la prestación de la plataforma ADC a la Organización según el plan contratado. La naturaleza del tratamiento es el{" "}
				<strong>almacenamiento, organización, consulta, comunicación interna y supresión</strong> de los datos que la Organización y sus
				miembros cargan en el servicio: alojamiento de archivos y correo, gestión de proyectos y tickets, membresías y roles, y las
				operaciones técnicas auxiliares (copia de seguridad, cifrado, entrega por red). Los fines son exclusivamente los del servicio
				contratado: ADC <strong>no usa los datos de la Organización para fines propios</strong>, no los vende ni los alquila, y no hace
				perfilado sobre ellos.
			</p>

			<h2 id="duracion">3. Duración</h2>
			<p>
				Este acuerdo rige mientras la Organización tenga un plan de equipo vigente y, terminado el servicio, durante el período de
				supresión descrito en <a href="#supresion-devolucion">§9</a>. Las obligaciones de confidencialidad sobreviven a la terminación.
			</p>

			<h2 id="datos-e-interesados">4. Tipos de datos y categorías de interesados</h2>
			<ul>
				<li>
					<strong>Interesados:</strong> miembros y administradores de la Organización; terceros cuyos datos aparezcan en el contenido
					que la Organización o sus miembros suban (bajo responsabilidad de quien los sube).
				</li>
				<li>
					<strong>Tipos de datos:</strong> identificadores de cuenta y membresía (usuario, email, roles y permisos dentro de la
					Organización), contenido cargado en el espacio de la Organización (archivos y sus metadatos, correo del dominio de la
					Organización, proyectos, tickets, comentarios y adjuntos), datos de facturación del plan (los describe{" "}
					<a href="/privacy#que-datos-tratamos">§2 de la Política de Privacidad</a>) y metadatos técnicos de uso necesarios para
					seguridad y operación.
				</li>
				<li>
					<strong>Categorías especiales:</strong> la plataforma no está diseñada para tratar categorías especiales de datos (art. 9
					RGPD; datos sensibles del art. 2, Ley 25.326). Si la Organización decide cargarlas dentro de su contenido, es su
					responsabilidad contar con una base legal válida; para ADC son contenido cifrado que no inspecciona.
				</li>
			</ul>

			<h2 id="instrucciones">5. Tratamiento sólo bajo instrucciones documentadas</h2>
			<p>
				ADC trata los datos de la Organización <strong>únicamente siguiendo sus instrucciones documentadas</strong>. En un servicio de
				autoservicio, esas instrucciones son: la contratación y configuración del plan, las acciones que la Organización y sus
				administradores ejecutan por la interfaz o la API (crear, compartir, borrar, invitar, revocar) y las solicitudes que nos hagan
				por los canales de <a href="/contact#canales">contacto</a>. No tratamos esos datos para nada que la Organización no haya
				instruido, salvo que una norma nos lo exija; en ese caso se lo informamos antes del tratamiento, a menos que esa norma prohíba
				avisar. Si una instrucción nos parece contraria a la Ley 25.326 o al RGPD, se lo advertimos a la Organización sin demora.
			</p>

			<h2 id="confidencialidad">6. Confidencialidad</h2>
			<p>
				Las personas autorizadas a tratar datos de la Organización —hoy, el equipo reducido que opera ADC— están comprometidas a la
				confidencialidad y acceden sólo para operar el servicio e investigar incidentes. El acceso administrativo está restringido por
				roles y las acciones sensibles quedan asentadas en el registro de auditoría descrito en{" "}
				<a href="/privacy#conservacion">§5 de la Política de Privacidad</a>.
			</p>

			<h2 id="seguridad">7. Medidas de seguridad</h2>
			<p>
				Aplicamos las medidas técnicas y organizativas descritas en <a href="/privacy#seguridad">§6 de la Política de Privacidad</a>:
				hashing de contraseñas, control de sesión por tokens, rate limiting, protección CSRF, cabeceras CSP, cifrado en tránsito y
				cifrado en reposo de archivos y credenciales (AES-256-GCM con claves por usuario). Evaluamos su adecuación de forma continua
				teniendo en cuenta el estado de la técnica y los riesgos del tratamiento; la cobertura frente a OWASP ASVS forma parte del{" "}
				<a href="/roadmap#capa-de-blindaje-seguridad">roadmap</a> público.
			</p>

			<h2 id="subencargados">8. Subencargados autorizados</h2>
			<p>
				La Organización autoriza, con carácter general, los subencargados que ADC usa para prestar el servicio. Hoy son dos, los mismos
				que lista <a href="/privacy#infraestructura-y-subprocesadores">§7 de la Política de Privacidad</a> con su función, jurisdicción
				y garantía:
			</p>
			<ul>
				<li>
					<strong>Cloudflare, Inc.</strong> — CDN, proxy inverso, WAF y analítica sin cookies (EE. UU. y red global de borde).
				</li>
				<li>
					<strong>MongoDB, Inc. (Atlas)</strong> — base de datos gestionada (región del clúster contratado).
				</li>
			</ul>
			<p>
				A cada subencargado le imponemos, por su DPA, obligaciones de protección de datos equivalentes a las de este acuerdo, y ADC
				responde ante la Organización por su cumplimiento. <strong>Cualquier alta o baja de subencargados se anuncia por los canales de
				aviso de la cuenta antes de entrar en vigor</strong>, igual que el resto de los cambios de esa tabla; si la Organización objeta
				el cambio y no encontramos alternativa razonable, puede terminar el plan antes de que el cambio rija. Los proveedores que
				intervienen sólo por elección de cada persona (Discord, Google, los medios de pago) son responsables autónomos, no
				subencargados de este acuerdo.
			</p>

			<h2 id="asistencia-derechos">9. Asistencia para los derechos de los interesados</h2>
			<p>
				Si un interesado ejerce ante la Organización derechos de acceso, rectificación, supresión, limitación, oposición o portabilidad
				sobre datos que ADC trata por su cuenta, la asistimos con las herramientas del servicio: exportación de datos, controles de
				administración de miembros y contenido, y —para lo que no tenga control propio— respuesta por los canales de{" "}
				<a href="/contact#canales">contacto</a> dentro de plazos compatibles con los que la Organización debe cumplir (los de la Ley
				25.326, más breves que los del RGPD, descritos en <a href="/privacy#tus-derechos">§4 de la Política de Privacidad</a>). Si un
				interesado nos reclama directamente por datos de los que la Organización es responsable, le informamos esa condición y damos
				traslado a la Organización sin demora.
			</p>

			<h2 id="incidentes">10. Notificación de incidentes</h2>
			<p>
				Si sufrimos una violación de seguridad que afecte datos personales tratados por cuenta de la Organización, se la notificamos{" "}
				<strong>sin dilación indebida</strong> desde que tengamos constancia, con la información disponible: naturaleza del incidente,
				categorías y volumen aproximado de datos e interesados afectados, consecuencias probables, y medidas adoptadas o propuestas. Si
				no tenemos todo el cuadro, notificamos igual con lo que sabemos y completamos después. Nuestro procedimiento general de
				incidentes, incluidos los plazos frente a la autoridad de control, está en{" "}
				<a href="/privacy#incidentes">§11 de la Política de Privacidad</a>.
			</p>

			<h2 id="supresion-devolucion">11. Supresión o devolución al terminar el servicio</h2>
			<p>
				Al terminar el plan, la Organización elige: <strong>exportar sus datos</strong> con las herramientas del servicio (archivos por
				Drive, exportaciones de contenido) antes de la baja, o pedirnos asistencia para hacerlo. Después de la terminación, ADC{" "}
				<strong>suprime</strong> los datos tratados por cuenta de la Organización según los plazos de{" "}
				<a href="/privacy#conservacion">§5 de la Política de Privacidad</a>, salvo aquello que una norma nos obligue a conservar —los
				registros fiscales de la contratación, por el plazo del art. 33 de la Ley 11.683— que queda archivado, separado y fuera de uso
				operativo hasta su eliminación automática.
			</p>

			<h2 id="auditorias">12. Auditorías</h2>
			<p>
				ADC pone a disposición de la Organización la información necesaria para demostrar el cumplimiento de este acuerdo: esta
				documentación pública versionada, el detalle de subencargados y garantías de{" "}
				<a href="/privacy#infraestructura-y-subprocesadores">§7</a>, y respuestas razonables a cuestionarios de seguridad por los
				canales de <a href="/contact#canales">contacto</a>. La Organización puede realizar auditorías <strong>con alcance
				razonable</strong>: previa coordinación, sobre la documentación y los controles pertinentes a su tratamiento, sin acceso a
				datos de otros clientes ni a secretos que comprometan la seguridad de la plataforma, y a su costo. Somos un servicio pequeño de
				autoservicio y este formato de auditoría es el que podemos sostener; lo decimos acá y no en la letra chica.
			</p>

			<h2 id="transferencias">13. Transferencias internacionales</h2>
			<p>
				ADC está establecida en <strong>Argentina</strong>, país con nivel adecuado de protección reconocido por la Comisión Europea
				(Decisión 2003/490/CE): los datos pueden fluir desde el Espacio Económico Europeo hacia ADC como si fuera una transferencia
				intracomunitaria. Cuando ADC transfiere datos a sus subencargados en países sin nivel adecuado según la normativa argentina
				(Cloudflare y MongoDB, en EE. UU.), la transferencia se ampara en las <strong>garantías contractuales</strong> que admiten el
				art. 12 de la Ley 25.326 y su reglamentación, con la equivalencia de los DPA de esos proveedores documentada y revisada
				internamente — el detalle honesto de cómo lo hacemos está en{" "}
				<a href="/privacy#transferencias-internacionales">§8 de la Política de Privacidad</a> y aplica igual a este acuerdo.
			</p>

			<h2 id="ley-y-jurisdiccion">14. Ley aplicable y jurisdicción</h2>
			<p>
				Este acuerdo se rige por el <strong>derecho argentino</strong> —incluida la Ley 25.326— y, en lo que resulte aplicable al
				tratamiento por cuenta de una organización alcanzada por el RGPD, se interpreta de forma compatible con su art. 28. Toda
				controversia se somete a los <strong>tribunales ordinarios de la República Argentina</strong> competentes en el domicilio del
				operador, salvo norma imperativa en contrario. Para consultas sobre este acuerdo:{" "}
				<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>.
			</p>

			<h2 id="cambios">15. Cambios a este acuerdo</h2>
			<p>
				Las modificaciones se publican versionadas en esta página con al menos <strong>30 días</strong> de antelación a su entrada en
				vigor para las organizaciones con plan vigente, y se anuncian por los canales de aviso de la cuenta. La versión que rige para
				una contratación es la vigente a la fecha de cada período de servicio.
			</p>
		</PageShell>
	);
}
