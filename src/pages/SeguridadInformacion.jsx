import "../assets/css/legal.css";
import { LegalLayout } from "./LegalLayout";

export function SeguridadInformacion() {
    return (
        <LegalLayout>
            <main className="doc">
<div className="doc-head">
<h1>Política de Seguridad
de la Información</h1>
<p className="doc-org">FJD GROUP S.A.S.</p>
</div>

<div className="meta"><table>
<colgroup>
<col style={{width: '50%'}} />
<col style={{width: '50%'}} />
</colgroup>
<tbody>
<tr className="odd">
<td><strong>Versión</strong></td>
<td>1.0</td>
</tr>
<tr className="even">
<td><strong>Fecha de entrada en vigor</strong></td>
<td>27 de julio de 2026</td>
</tr>
<tr className="odd">
<td><strong>Última actualización</strong></td>
<td>27 de julio de 2026</td>
</tr>
<tr className="even">
<td><strong>Marco de referencia</strong></td>
<td>ISO/IEC 27001 · OWASP · Ley 1581 de 2012</td>
</tr>
<tr className="odd">
<td><strong>URL de publicación</strong></td>
<td>https://fjdsas.com.co/legal/seguridad-de-la-informacion.html</td>
</tr>
</tbody>
</table></div>
<hr />
<h2 id="declaración-de-la-dirección">1. Declaración de la Dirección</h2>
<p>En FJD GROUP S.A.S. la seguridad de la información no es un requisito
accesorio: es una condición del servicio que prestamos. Operamos
plataformas que soportan la actividad diaria de nuestros clientes y
custodiamos información que les pertenece. Esa responsabilidad guía
nuestras decisiones técnicas y organizativas.</p>
<p>La Dirección adopta, respalda y financia esta Política, y se
compromete a revisarla y mejorarla de forma continua.</p>
<p><strong>Nota sobre el marco de referencia.</strong> Adoptamos los
lineamientos de la norma <strong>ISO/IEC 27001</strong> y las
recomendaciones del proyecto <strong>OWASP</strong> como marco de
referencia para el diseño de nuestros controles. Esta adopción es
voluntaria y orientadora: <strong>no declaramos contar con certificación
en ninguna de estas normas.</strong></p>
<hr />
<h2 id="objetivo-y-alcance">2. Objetivo y alcance</h2>
<p><strong>Objetivo.</strong> Preservar la
<strong>confidencialidad</strong>, la <strong>integridad</strong> y la
<strong>disponibilidad</strong> de la información propia y de la
información que nos confían nuestros clientes, y garantizar el
cumplimiento del régimen colombiano de protección de datos
personales.</p>
<p><strong>Alcance.</strong> Esta Política cubre:</p>
<ul>
<li>El ciclo completo de desarrollo de nuestro software.</li>
<li>La infraestructura y los entornos productivos que
administramos.</li>
<li>Las aplicaciones móviles, aplicaciones web, APIs y plataformas SaaS
que operamos.</li>
<li>Los equipos, cuentas y accesos de nuestro personal.</li>
<li>La información en cualquier soporte, físico o electrónico.</li>
</ul>
<p>Vincula a la totalidad de nuestro personal, sin excepción de cargo o
antigüedad.</p>
<hr />
<h2 id="principios">3. Principios</h2>
<ol type="1">
<li><strong>Mínimo privilegio.</strong> Cada persona accede únicamente a
lo estrictamente necesario para desempeñar su función.</li>
<li><strong>Necesidad de conocer.</strong> El acceso a la información de
un cliente se concede solo a quien participa en su operación.</li>
<li><strong>Defensa en profundidad.</strong> Los controles se establecen
en capas; ninguno se asume infalible por sí solo.</li>
<li><strong>Seguridad desde el diseño.</strong> Los requisitos de
seguridad se incorporan desde la concepción del software, no al
final.</li>
<li><strong>Trazabilidad.</strong> Las operaciones sensibles quedan
registradas y son auditables.</li>
<li><strong>Confidencialidad permanente.</strong> El deber de reserva
subsiste tras la terminación del vínculo laboral o contractual.</li>
<li><strong>Divulgación restringida de la arquitectura.</strong> No
publicamos la identidad, ubicación específica ni configuración de
nuestra infraestructura, por constituir información sensible desde el
punto de vista de la seguridad.</li>
</ol>
<hr />
<h2 id="organización-de-la-seguridad">4. Organización de la
seguridad</h2>
<p>La responsabilidad general recae en la Dirección de la sociedad. La
ejecución operativa está a cargo del <strong>Área de Soporte</strong>,
que actúa como punto único de contacto para asuntos de seguridad de la
información y de protección de datos personales, y coordina:</p>
<ul>
<li>La administración de accesos y credenciales.</li>
<li>El monitoreo de los entornos productivos.</li>
<li>La gestión de incidentes de seguridad.</li>
<li>La atención de consultas y reclamos de titulares de datos.</li>
<li>La verificación del cumplimiento de esta Política.</li>
</ul>
<p>Canal de contacto en materia de seguridad:
<strong>servicioalcliente@fjdsas.com.co</strong> ·
<strong>analistaadministrativo@fjdsas.com.co</strong></p>
<hr />
<h2 id="control-de-acceso">5. Control de acceso</h2>
<ul>
<li>El acceso a los entornos productivos está <strong>restringido al
personal expresamente autorizado</strong>, mediante cuentas nominativas
e individuales. No se emplean cuentas compartidas para operaciones
administrativas.</li>
<li>Los privilegios se asignan conforme al <strong>principio de mínimo
privilegio</strong> y se revisan periódicamente.</li>
<li>Los accesos se <strong>revocan de forma inmediata</strong> al
terminar la vinculación de una persona o al cesar la necesidad funcional
que los justificó.</li>
<li>El acceso a la información de un cliente se limita al personal que
interviene en su operación.</li>
<li>Las aplicaciones móviles exigen <strong>doble factor de
autenticación (2FA)</strong> en el inicio de sesión.</li>
<li>Las sesiones se invalidan por inactividad y ante el cierre de sesión
del usuario.</li>
</ul>
<hr />
<h2 id="criptografía-y-protección-de-credenciales">6. Criptografía y
protección de credenciales</h2>
<table>
<colgroup>
<col style={{width: '50%'}} />
<col style={{width: '50%'}} />
</colgroup>
<thead>
<tr className="header">
<th>Ámbito</th>
<th>Control</th>
</tr>
</thead>
<tbody>
<tr className="odd">
<td>Comunicaciones</td>
<td>Todo el tráfico entre aplicaciones y servidores se transmite sobre
<strong>HTTPS con TLS</strong>. No se admiten conexiones en texto
plano</td>
</tr>
<tr className="even">
<td>Contraseñas</td>
<td>Almacenadas exclusivamente mediante <strong>funciones de hash
irreversible (bcrypt)</strong>. No son recuperables ni consultables por
ningún miembro del equipo</td>
</tr>
<tr className="odd">
<td>Credenciales en dispositivos móviles</td>
<td>Los tokens de sesión y las credenciales se almacenan en el
<strong>espacio protegido de la aplicación, mediante mecanismos de
almacenamiento cifrado</strong> provistos por la plataforma</td>
</tr>
<tr className="even">
<td>Datos operativos en el dispositivo</td>
<td>La base de datos local de las aplicaciones móviles se protege
mediante cifrado</td>
</tr>
<tr className="odd">
<td>Certificados</td>
<td>Los certificados TLS se mantienen vigentes y se renuevan antes de su
expiración</td>
</tr>
</tbody>
</table>
<hr />
<h2 id="desarrollo-seguro-de-software">7. Desarrollo seguro de
software</h2>
<p>Aplicamos las siguientes prácticas a lo largo del ciclo de
desarrollo, tomando como referencia las recomendaciones de OWASP:</p>
<ul>
<li><strong>Gestión de secretos fuera del repositorio.</strong> Las
claves de API, tokens y credenciales de servicios se gestionan mediante
archivos de configuración local y variables de entorno excluidos del
control de versiones. <strong>Ninguna credencial productiva se versiona
en el repositorio de código.</strong></li>
<li><strong>Rotación de credenciales</strong> ante cualquier sospecha de
exposición.</li>
<li><strong>Ausencia de registros sensibles en producción.</strong> Las
compilaciones de producción no registran credenciales, tokens de sesión,
códigos de verificación ni cuerpos de peticiones de autenticación.</li>
<li><strong>Protección del código distribuido.</strong> Las
compilaciones de producción de nuestras aplicaciones móviles se generan
con <strong>ofuscación y reducción de código activadas</strong>.</li>
<li><strong>Firma de artefactos.</strong> Las aplicaciones se firman con
claves custodiadas fuera del repositorio.</li>
<li><strong>Validación de entradas</strong> y protección frente a las
categorías de vulnerabilidad más comunes: inyección, autenticación
defectuosa, exposición de datos sensibles y control de acceso roto.</li>
<li><strong>Frontera de autenticación en el servidor.</strong> La
validación del segundo factor y la emisión de credenciales de sesión son
decisiones del servidor; el cliente no determina el estado de
autenticación.</li>
<li><strong>Separación de entornos.</strong> Los entornos de desarrollo
y prueba están separados de los productivos y no contienen información
real de clientes.</li>
<li><strong>Revisión de dependencias.</strong> Las bibliotecas de
terceros se mantienen en versiones soportadas y se retiran las obsoletas
o redundantes.</li>
<li><strong>Solicitud mínima de permisos.</strong> Nuestras aplicaciones
móviles declaran únicamente los permisos que efectivamente utilizan, y
los solicitan en tiempo de ejecución explicando su finalidad.</li>
</ul>
<hr />
<h2 id="infraestructura-y-operación">8. Infraestructura y operación</h2>
<ul>
<li>Nuestros servicios productivos se alojan en <strong>infraestructura
ubicada en territorio colombiano</strong>, administrada bajo acuerdos
que incluyen obligaciones de seguridad y confidencialidad.</li>
<li>Disponemos adicionalmente de infraestructura propia destinada a
desarrollo y servicios internos, en instalaciones de acceso físico
controlado.</li>
<li><strong>Por razones de seguridad no divulgamos públicamente la
identidad de nuestros proveedores, la ubicación específica de los
equipos ni los detalles de la arquitectura.</strong> Esta información se
comparte con cada cliente en el marco de su relación contractual y bajo
acuerdo de confidencialidad.</li>
<li>Los cambios en producción se realizan de forma controlada, por
personal autorizado y con posibilidad de reversión.</li>
</ul>
<hr />
<h2 id="copias-de-seguridad">9. Copias de seguridad</h2>
<ul>
<li>Se ejecutan <strong>copias de seguridad diarias</strong> de los
entornos productivos.</li>
<li>La retención es de <strong>treinta (30) días en
rotación</strong>.</li>
<li>Las copias se conservan protegidas y con acceso restringido al
personal autorizado.</li>
<li>La capacidad de restauración se verifica periódicamente.</li>
<li>Al suprimirse información a solicitud de un cliente o de un titular,
la eliminación en copias de seguridad se completa al expirar el ciclo de
rotación.</li>
</ul>
<hr />
<h2 id="registro-monitoreo-y-auditoría">10. Registro, monitoreo y
auditoría</h2>
<ul>
<li>Se registran los <strong>eventos de acceso y las operaciones
sensibles</strong> sobre los sistemas: inicios de sesión, intentos
fallidos, cambios de configuración y operaciones administrativas.</li>
<li>Los registros se conservan durante <strong>doce (12)
meses</strong>.</li>
<li>Los registros están protegidos frente a alteración y su consulta se
limita al personal autorizado.</li>
<li>Se revisan ante la detección de anomalías o en el curso de la
investigación de un incidente.</li>
</ul>
<hr />
<h2 id="gestión-de-incidentes-de-seguridad">11. Gestión de incidentes de
seguridad</h2>
<p>Todo evento que comprometa o pueda comprometer la confidencialidad,
integridad o disponibilidad de la información se gestiona conforme al
siguiente procedimiento:</p>
<p><strong>1. Reporte.</strong> Cualquier miembro del equipo, cliente o
tercero puede reportar un incidente a
<strong>servicioalcliente@fjdsas.com.co</strong>. El reporte es obligatorio para
todo nuestro personal y no admite demora.</p>
<p><strong>2. Registro y clasificación.</strong> El Área de Soporte
registra el incidente y lo clasifica según su criticidad y según si
involucra o no datos personales.</p>
<p><strong>3. Contención.</strong> Se adoptan de inmediato las medidas
necesarias para limitar el alcance: revocación de accesos, rotación de
credenciales, aislamiento de componentes o suspensión temporal de
servicios.</p>
<p><strong>4. Erradicación y recuperación.</strong> Se elimina la causa
raíz y se restablece la operación, acudiendo a las copias de seguridad
cuando sea necesario.</p>
<p><strong>5. Notificación.</strong></p>
<ul>
<li>Al <strong>cliente Responsable</strong> afectado, <strong>dentro de
las cuarenta y ocho (48) horas</strong> siguientes a la confirmación del
incidente, informando su naturaleza, la información involucrada, las
medidas adoptadas y las recomendaciones aplicables.</li>
<li>A la <strong>Superintendencia de Industria y Comercio</strong>,
cuando se presenten violaciones a los códigos de seguridad o existan
riesgos en la administración de la información de los titulares,
conforme al deber legal previsto en la Ley 1581 de 2012.</li>
<li>A los <strong>titulares afectados</strong>, cuando así lo determine
el cliente Responsable o lo exija la autoridad.</li>
</ul>
<p><strong>6. Documentación y lecciones aprendidas.</strong> Todo
incidente se documenta con su cronología, causa raíz, impacto y acciones
correctivas. Las conclusiones se incorporan a los controles.</p>
<hr />
<h2 id="gestión-de-vulnerabilidades">12. Gestión de
vulnerabilidades</h2>
<ul>
<li>Realizamos <strong>diagnósticos técnicos periódicos</strong> sobre
nuestras aplicaciones y su configuración, orientados a identificar
debilidades de seguridad.</li>
<li>Los hallazgos se priorizan según severidad e impacto, y su
<strong>mitigación se incorpora al plan de desarrollo</strong> como
trabajo formalmente planificado.</li>
<li>Las vulnerabilidades críticas se atienden con prioridad sobre
cualquier otro desarrollo en curso.</li>
<li>Mantenemos actualizadas las dependencias de terceros y retiramos las
que han alcanzado su fin de vida.</li>
<li>Recibimos reportes de vulnerabilidades de terceros en
<strong>servicioalcliente@fjdsas.com.co</strong>, y agradecemos su divulgación
responsable.</li>
</ul>
<hr />
<h2 id="seguridad-del-personal">13. Seguridad del personal</h2>
<ul>
<li><strong>Todo nuestro personal suscribe cláusulas de
confidencialidad</strong> en sus contratos, cuya vigencia se extiende
más allá de la terminación del vínculo.</li>
<li><strong>No empleamos subcontratistas, freelancers ni personal
externo con acceso a la información de nuestros clientes.</strong></li>
<li>Los accesos se otorgan al inicio de la vinculación conforme al rol y
se revocan íntegramente a su terminación.</li>
<li>El personal recibe orientación sobre sus obligaciones en materia de
seguridad de la información y protección de datos personales.</li>
<li>El incumplimiento de esta Política constituye falta disciplinaria y
puede dar lugar a las sanciones laborales y legales que
correspondan.</li>
</ul>
<hr />
<h2 id="relación-con-clientes-y-terceros">14. Relación con clientes y
terceros</h2>
<ul>
<li>Las obligaciones de seguridad y confidencialidad se incorporan a los
contratos con clientes y proveedores.</li>
<li>Cuando actuamos como Encargados del Tratamiento, operamos
exclusivamente conforme a las instrucciones documentadas del cliente
Responsable.</li>
<li>No transferimos información de clientes a terceros distintos de los
proveedores tecnológicos estrictamente necesarios para la prestación del
servicio, identificados en nuestra Política de Privacidad.</li>
<li>Los clientes pueden solicitar información detallada sobre nuestros
controles de seguridad en el marco de su relación contractual y bajo
acuerdo de confidencialidad.</li>
</ul>
<hr />
<h2 id="continuidad">15. Continuidad</h2>
<p>Las copias de seguridad diarias, la separación de entornos y los
procedimientos de restauración constituyen nuestra base de continuidad
operativa. Ante una interrupción significativa, la prioridad de
restablecimiento es: integridad de los datos, disponibilidad de los
servicios productivos y, por último, servicios internos.</p>
<hr />
<h2 id="cumplimiento-y-revisión">16. Cumplimiento y revisión</h2>
<ul>
<li>Esta Política se <strong>revisa anualmente</strong>, y de forma
extraordinaria ante cambios normativos, incidentes significativos o
modificaciones relevantes en la infraestructura o en la arquitectura de
nuestros productos.</li>
<li>Las declaraciones contenidas en esta Política reflejan controles
efectivamente implementados. <strong>Cuando un control se encuentre en
proceso de implementación, no se declara como vigente.</strong></li>
<li>El cumplimiento de los controles se verifica en el marco de los
diagnósticos técnicos periódicos.</li>
</ul>
<hr />
<h2 id="contacto">17. Contacto</h2>
<table>
<thead>
<tr className="header">
<th>Asunto</th>
<th>Canal</th>
</tr>
</thead>
<tbody>
<tr className="odd">
<td>Reporte de incidentes y vulnerabilidades</td>
<td>servicioalcliente@fjdsas.com.co</td>
</tr>
<tr className="even">
<td>Protección de datos personales</td>
<td>analistaadministrativo@fjdsas.com.co</td>
</tr>
<tr className="odd">
<td>Consultas generales</td>
<td>administracion@fjdsas.com.co</td>
</tr>
<tr className="even">
<td>Teléfono</td>
<td>+57 301 778 8631</td>
</tr>
</tbody>
</table>
<p><strong>FJD GROUP S.A.S.</strong> — NIT 901437071-8 — Montería,
Córdoba, Colombia</p>
<hr />
<p><em>Documento aprobado por la Dirección de FJD GROUP S.A.S. — Versión
1.0, vigente desde el 27 de julio de 2026.</em></p>

            </main>
        </LegalLayout>
    );
}
export default SeguridadInformacion;
