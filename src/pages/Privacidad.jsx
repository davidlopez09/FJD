import "../assets/css/legal.css";
import { LegalLayout } from "./LegalLayout";
import { Link } from "react-router-dom";

export function Privacidad() {
    return (
        <LegalLayout>
            <main className="doc">
                <div className="doc-head">
                    <h1>Política de Privacidad</h1>
                    <p className="doc-org">FJD GROUP S.A.S.</p>
                </div>

                <div className="meta">
                    <table>
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
                                <td><strong>Ámbito</strong></td>
                                <td>Sitio web corporativo, aplicaciones móviles, aplicaciones web, APIs y servicios SaaS de FJD GROUP S.A.S.</td>
                            </tr>
                            <tr className="odd">
                                <td><strong>URL de publicación</strong></td>
                                <td>https://fjdsas.com.co/politicas-privacidad.html</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <h2 id="quienes-somos">1. Quiénes somos</h2>
                <p>Somos <strong>FJD GROUP S.A.S.</strong>, sociedad comercial colombiana identificada con NIT <strong>901437071-8</strong>, con domicilio principal en la ciudad de <strong>Montería, departamento de Córdoba, República de Colombia</strong>.</p>
                <p>Desarrollamos y operamos software a la medida, plataformas de Software como Servicio (SaaS), software empresarial, aplicaciones web, aplicaciones móviles Android, APIs e integraciones con sistemas de terceros. Entre nuestras soluciones se encuentran productos y marcas de nuestra propiedad, tales como <strong>Conelec</strong>, así como desarrollos específicos contratados por nuestros clientes.</p>
                <p>Esta Política explica cómo tratamos la información personal en el marco de nuestra actividad, en cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong>, el <strong>Decreto Único Reglamentario 1074 de 2015</strong> y las demás normas concordantes del régimen colombiano de protección de datos personales.</p>
                <h3 id="datos-de-contacto">Datos de contacto</h3>
                <table>
                    <colgroup>
                        <col style={{width: '50%'}} />
                        <col style={{width: '50%'}} />
                    </colgroup>
                    <thead>
                        <tr className="header">
                            <th>Canal</th>
                            <th>Dato</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Domicilio</td>
                            <td>Montería, Córdoba, Colombia</td>
                        </tr>
                        <tr className="even">
                            <td>Correo general</td>
                            <td>administracion@fjdsas.com.co</td>
                        </tr>
                        <tr className="odd">
                            <td>Correo de soporte</td>
                            <td>servicioalcliente@fjdsas.com.co</td>
                        </tr>
                        <tr className="even">
                            <td><strong>Correo de protección de datos (Habeas Data)</strong></td>
                            <td><strong>analistaadministrativo@fjdsas.com.co</strong></td>
                        </tr>
                        <tr className="odd">
                            <td>Notificaciones judiciales</td>
                            <td>analistaadministrativo@fjdsas.com.co</td>
                        </tr>
                        <tr className="even">
                            <td>Teléfono</td>
                            <td>+57 301 778 8631</td>
                        </tr>
                        <tr className="odd">
                            <td>Horario de atención</td>
                            <td>Lunes a viernes, en horario de oficina</td>
                        </tr>
                    </tbody>
                </table>
                <p>El <strong>área de soporte</strong> es la dependencia designada internamente para atender las peticiones, consultas y reclamos relacionados con datos personales.</p>
                <hr />
                <h2 id="nuestro-doble-rol">2. Nuestro doble rol: cuándo somos Responsables y cuándo somos Encargados</h2>
                <p>Esta distinción es esencial para entender esta Política, porque determina quién decide sobre los datos y ante quién se ejercen los derechos.</p>
                <h3 id="actuamos-como-responsables">2.1. Actuamos como <strong>Responsables del Tratamiento</strong></h3>
                <p>Cuando decidimos directamente sobre la finalidad de los datos. Esto ocurre con:</p>
                <ul>
                    <li>La información de contacto que recibimos a través de nuestro sitio web corporativo.</li>
                    <li>Los datos de nuestros clientes potenciales y actuales, en su calidad de contrapartes comerciales.</li>
                    <li>Los datos de nuestros proveedores, aliados y contratistas.</li>
                    <li>Los datos de nuestro personal y de quienes aspiran a vincularse con nosotros.</li>
                </ul>
                <p>En estos casos, las solicitudes se dirigen directamente a <strong>analistaadministrativo@fjdsas.com.co</strong>.</p>
                <h3 id="actuamos-como-encargados">2.2. Actuamos como <strong>Encargados del Tratamiento</strong></h3>
                <p>Cuando tratamos información personal <strong>por cuenta y bajo las instrucciones de nuestros clientes</strong>, dentro de las plataformas que desarrollamos, alojamos o administramos para ellos.</p>
                <p>En esta modalidad:</p>
                <ul>
                    <li><strong>La información pertenece exclusivamente al cliente.</strong> No somos propietarios de los datos almacenados en sus plataformas.</li>
                    <li><strong>El cliente es el Responsable del Tratamiento.</strong> Es él quien define las finalidades, quien obtiene la autorización de los titulares y quien responde frente a ellos.</li>
                    <li><strong>Nosotros no usamos esa información para fines propios.</strong> No la comercializamos, no la cedemos, no la analizamos con fines comerciales ni la empleamos para construir perfiles.</li>
                    <li><strong>Aplicamos únicamente las instrucciones del cliente</strong>, salvo obligación legal en contrario.</li>
                </ul>
                <p>Esta relación se formaliza mediante el correspondiente contrato de prestación de servicios y su anexo de transmisión de datos personales, el cual aplica tanto a la modalidad SaaS como a la modalidad On Premise en la que prestemos servicios de administración técnica con acceso a datos personales del Cliente, conforme al artículo 25 del Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.</p>
                <p>Si usted es titular de datos alojados en una plataforma operada por nosotros para un cliente, la solicitud debe dirigirse <strong>al cliente titular de la plataforma</strong>. Aun así, si nos escribe directamente, la trasladaremos a quien corresponda y le informaremos que lo hemos hecho.</p>
                <hr />
                <h2 id="que-informacion-tratamos">3. Qué información tratamos</h2>
                <p>No todas nuestras soluciones tratan las mismas categorías de datos. Cada desarrollo incorpora únicamente las funcionalidades necesarias para su propósito. A continuación describimos, <strong>por funcionalidad</strong>, la información que puede tratarse en nuestras plataformas.</p>
                <h3 id="datos-de-identificacion">3.1. Datos de identificación y contacto</h3>
                <p>Nombres y apellidos, número de documento de identidad, código interno de usuario, técnico o funcionario, cargo, empresa a la que pertenece, correo electrónico, número de teléfono y dirección.</p>
                <h3 id="datos-de-autenticacion">3.2. Datos de autenticación y acceso</h3>
                <ul>
                    <li><strong>En nuestras aplicaciones web:</strong> identificador de usuario y contraseña.</li>
                    <li><strong>En nuestras aplicaciones móviles:</strong> código de usuario o de técnico y un <strong>código de verificación de segundo factor (2FA)</strong>. Las aplicaciones móviles <strong>no almacenan contraseñas</strong>.</li>
                    <li>Registros de inicio y cierre de sesión, dirección IP, fecha y hora de acceso.</li>
                    <li>Identificador técnico del dispositivo autorizado.</li>
                </ul>
                <p>Las contraseñas se almacenan exclusivamente mediante <strong>funciones criptográficas de hash irreversible (bcrypt)</strong>. En ningún caso conservamos contraseñas en texto legible, y ningún miembro de nuestro equipo puede recuperarlas o consultarlas.</p>
                <h3 id="datos-operativos">3.3. Datos operativos y de negocio</h3>
                <p>Registros propios de la actividad de cada cliente: órdenes de trabajo, inspecciones, formatos de calidad y seguridad, novedades, inventarios, gastos, costos, kilometrajes, placas de vehículos, mediciones, censos, peticiones, quejas y reclamos, y demás información funcional del sistema contratado.</p>
                <h3 id="datos-de-geolocalizacion">3.4. Datos de geolocalización</h3>
                <p>Coordenadas de latitud y longitud del dispositivo, capturadas para georreferenciar operaciones de campo y evidencias.</p>
                <p>La ubicación se obtiene <strong>únicamente mientras la aplicación está abierta y en uso activo por el usuario</strong>. No realizamos seguimiento de ubicación en segundo plano ni cuando la aplicación está cerrada.</p>
                <h3 id="imagenes-fotografias">3.5. Imágenes, fotografías y firma manuscrita</h3>
                <p>Fotografías capturadas como evidencia operativa y firmas manuscritas trazadas en la pantalla del dispositivo. Según el desarrollo, estas imágenes pueden incorporar una marca de agua con fecha, hora, ubicación y nombre del usuario que las captura.</p>
                <blockquote>
                    <p><strong>La imagen de una persona y su firma manuscrita pueden constituir datos sensibles</strong> conforme al artículo 5 de la Ley 1581 de 2012. Cuando actuamos como Encargados, la obtención de la autorización previa, expresa e informada para tratarlos corresponde al cliente Responsable, quien nos garantiza contractualmente haberla obtenido válidamente.</p>
                </blockquote>
                <h3 id="archivos-y-documentos">3.6. Archivos y documentos</h3>
                <p>Documentos adjuntos cargados por los usuarios en el marco de la operación: soportes, facturas, certificados, formatos y anexos.</p>
                <h3 id="datos-tecnicos">3.7. Datos técnicos del dispositivo y de uso</h3>
                <p>Modelo de dispositivo, versión del sistema operativo, versión de la aplicación, identificador técnico de instalación, idioma, y datos de diagnóstico como registros de errores y cierres inesperados.</p>
                <h3 id="datos-de-terceros">3.8. Datos de terceros aportados por nuestros clientes</h3>
                <p>Nuestras plataformas permiten que el cliente registre información de personas que <strong>no son usuarias de la aplicación</strong>: trabajadores vinculados o en proceso de vinculación, técnicos, contratistas, y ciudadanos que presentan peticiones, quejas o reclamos ante entidades prestadoras de servicios públicos.</p>
                <p>Frente a estos datos actuamos siempre como <strong>Encargados</strong>. La legitimación para tratarlos, incluida la autorización del titular, corresponde íntegramente al cliente Responsable.</p>
                <hr />
                <h2 id="que-no-hacemos">4. Qué <strong>no</strong> hacemos</h2>
                <p>Lo declaramos de forma expresa porque forma parte del diseño de nuestros productos:</p>
                <ul>
                    <li><strong>No vendemos, arrendamos ni comercializamos</strong> datos personales.</li>
                    <li><strong>No mostramos publicidad</strong> dentro de nuestras aplicaciones.</li>
                    <li><strong>No recopilamos identificadores publicitarios</strong> ni el identificador de publicidad de Android.</li>
                    <li><strong>No elaboramos perfiles</strong> de los titulares ni adoptamos decisiones automatizadas con efectos jurídicos sobre ellos.</li>
                    <li><strong>No accedemos</strong> al micrófono, a la agenda de contactos, al calendario, a los mensajes ni al historial de navegación de los dispositivos.</li>
                    <li><strong>No permitimos el registro público de cuentas.</strong> Ninguna de nuestras aplicaciones permite que una persona se cree una cuenta por sí misma.</li>
                    <li><strong>No dirigimos</strong> nuestras aplicaciones a menores de edad.</li>
                </ul>
                <hr />
                <h2 id="para-que-tratamos">5. Para qué tratamos la información</h2>
                <table>
                    <colgroup>
                        <col style={{width: '50%'}} />
                        <col style={{width: '50%'}} />
                    </colgroup>
                    <thead>
                        <tr className="header">
                            <th>Finalidad</th>
                            <th>Categorías de datos involucradas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Autenticar usuarios y controlar el acceso autorizado a las plataformas</td>
                            <td>Identificación, autenticación, dispositivo</td>
                        </tr>
                        <tr className="even">
                            <td>Prestar y ejecutar el servicio contratado por el cliente</td>
                            <td>Datos operativos, imágenes, archivos, ubicación</td>
                        </tr>
                        <tr className="odd">
                            <td>Georreferenciar operaciones de campo y sus evidencias</td>
                            <td>Ubicación, imágenes</td>
                        </tr>
                        <tr className="even">
                            <td>Soportar documentalmente las actividades ejecutadas</td>
                            <td>Imágenes, firma, archivos</td>
                        </tr>
                        <tr className="odd">
                            <td>Garantizar la seguridad, trazabilidad y auditoría de las operaciones</td>
                            <td>Registros de acceso, identificadores técnicos</td>
                        </tr>
                        <tr className="even">
                            <td>Prestar soporte técnico y atender incidencias</td>
                            <td>Identificación, contacto, datos técnicos y de diagnóstico</td>
                        </tr>
                        <tr className="odd">
                            <td>Medir el desempeño técnico de las aplicaciones y corregir fallos</td>
                            <td>Datos técnicos y de diagnóstico</td>
                        </tr>
                        <tr className="even">
                            <td>Gestionar la relación comercial y contractual</td>
                            <td>Identificación, contacto</td>
                        </tr>
                        <tr className="odd">
                            <td>Atender solicitudes recibidas por el sitio web corporativo</td>
                            <td>Identificación, contacto</td>
                        </tr>
                        <tr className="even">
                            <td>Cumplir obligaciones legales, contables y contractuales</td>
                            <td>Identificación, datos contractuales</td>
                        </tr>
                    </tbody>
                </table>
                <p>Cuando actuamos como Encargados, estas finalidades se enmarcan siempre dentro de las instrucciones y las finalidades definidas por el cliente Responsable.</p>
                <hr />
                <h2 id="con-quien-compartimos">6. Con quién compartimos la información</h2>
                <p>No compartimos información personal con terceros con fines comerciales, publicitarios ni de perfilamiento. Únicamente intervienen los siguientes actores:</p>
                <table>
                    <colgroup>
                        <col style={{width: '33%'}} />
                        <col style={{width: '33%'}} />
                        <col style={{width: '33%'}} />
                    </colgroup>
                    <thead>
                        <tr className="header">
                            <th>Destinatario</th>
                            <th>Información involucrada</th>
                            <th>Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td><strong>El cliente Responsable</strong> de la plataforma</td>
                            <td>La información alojada en su sistema</td>
                            <td>Es el propietario de la información y quien decide sobre ella</td>
                        </tr>
                        <tr className="even">
                            <td><strong>Nuestros proveedores de infraestructura tecnológica</strong>, ubicados en Colombia</td>
                            <td>Información alojada en los servicios SaaS</td>
                            <td>Alojamiento y operación de las plataformas</td>
                        </tr>
                        <tr className="odd">
                            <td><strong>Google LLC</strong></td>
                            <td>Datos técnicos y de diagnóstico de las aplicaciones móviles: modelo de dispositivo, versión del sistema operativo, identificador técnico de instalación, registros de errores y cierres inesperados</td>
                            <td>Medición del desempeño técnico y reporte de fallos, con el fin exclusivo de mejorar la estabilidad del servicio</td>
                        </tr>
                        <tr className="even">
                            <td><strong>Meta Platforms, Inc. (WhatsApp)</strong></td>
                            <td>Número de teléfono del usuario y el código de verificación enviado</td>
                            <td>Envío del código de segundo factor de autenticación (2FA)</td>
                        </tr>
                        <tr className="odd">
                            <td><strong>Proveedores de servicios de mapas y geolocalización</strong></td>
                            <td>Coordenadas de ubicación</td>
                            <td>Prestación de la funcionalidad de mapas dentro de las aplicaciones</td>
                        </tr>
                        <tr className="even">
                            <td><strong>Autoridades competentes</strong></td>
                            <td>La información requerida</td>
                            <td>Cumplimiento de órdenes judiciales o administrativas legalmente expedidas</td>
                        </tr>
                    </tbody>
                </table>
                <p>Por razones de seguridad de la información, no divulgamos públicamente la identidad, la ubicación específica ni la configuración de los proveedores que soportan nuestra infraestructura. Esta información se pone a disposición de cada cliente en el marco de su relación contractual, bajo acuerdo de confidencialidad.</p>
                <hr />
                <h2 id="transferencia-internacional">7. Transferencia internacional de datos</h2>
                <p>Nuestra infraestructura de servicios SaaS se encuentra alojada <strong>en territorio colombiano</strong>.</p>
                <p>No obstante, algunos de los proveedores tecnológicos enumerados en el numeral anterior —concretamente los servicios de diagnóstico técnico de aplicaciones móviles y el canal de envío del código de segundo factor— procesan información en <strong>Estados Unidos de América</strong>.</p>
                <p>Estas transferencias son lícitas: la <strong>Superintendencia de Industria y Comercio</strong>, mediante la Circular Externa 005 de 2017 incorporada al Capítulo Tercero del Título V de la Circular Única, incluyó a <strong>Estados Unidos de América</strong> en el listado de países que ofrecen un <strong>nivel adecuado de protección de datos personales</strong>, en los términos del artículo 26 de la Ley 1581 de 2012. En consecuencia, la transferencia no requiere autorización adicional del titular.</p>
                <p>Si en el futuro incorporamos proveedores ubicados en países no incluidos en dicho listado, adoptaremos previamente alguno de los mecanismos de legitimación previstos en la ley.</p>
                <hr />
                <h2 id="como-protegemos">8. Cómo protegemos la información</h2>
                <p>Aplicamos medidas técnicas, humanas y administrativas razonables para preservar la confidencialidad, integridad y disponibilidad de la información. Entre ellas:</p>
                <ul>
                    <li><strong>Cifrado en tránsito:</strong> todas las comunicaciones entre las aplicaciones y nuestros servidores se realizan sobre HTTPS con protocolo TLS.</li>
                    <li><strong>Contraseñas irreversibles:</strong> almacenadas mediante hash bcrypt.</li>
                    <li><strong>Doble factor de autenticación</strong> en el acceso a nuestras aplicaciones móviles.</li>
                    <li><strong>Protección del almacenamiento local</strong> de credenciales y datos operativos en los dispositivos móviles.</li>
                    <li><strong>Control de acceso bajo el principio de mínimo privilegio:</strong> únicamente el personal expresamente autorizado accede a los entornos productivos.</li>
                    <li><strong>Registros de auditoría</strong> de los accesos y operaciones sensibles.</li>
                    <li><strong>Copias de seguridad diarias</strong> de los entornos productivos.</li>
                    <li><strong>Prácticas de desarrollo seguro</strong> alineadas con las recomendaciones de OWASP, incluida la gestión de secretos fuera del repositorio de código y la protección del código distribuido.</li>
                    <li><strong>Acuerdos de confidencialidad</strong> suscritos por todo nuestro personal.</li>
                </ul>
                <p>El detalle completo de estos controles se encuentra en nuestra <a href="/legal/seguridad-de-la-informacion">Política de Seguridad de la Información</a>.</p>
                <p>Ninguna medida de seguridad es infalible. Si llegara a producirse un incidente que comprometa información personal, activaremos nuestro procedimiento de gestión de incidentes, notificaremos al cliente Responsable afectado y, cuando corresponda, a la Superintendencia de Industria y Comercio.</p>
                <hr />
                <h2 id="por-cuanto-tiempo">9. Por cuánto tiempo conservamos la información</h2>
                <table>
                    <colgroup>
                        <col style={{width: '50%'}} />
                        <col style={{width: '50%'}} />
                    </colgroup>
                    <thead>
                        <tr className="header">
                            <th>Tipo de información</th>
                            <th>Plazo de conservación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Información alojada en plataformas SaaS de clientes</td>
                            <td>Durante la vigencia del contrato y hasta la supresión ordenada por el cliente al cierre definitivo del servicio</td>
                        </tr>
                        <tr className="even">
                            <td>Copias de seguridad</td>
                            <td>30 días en rotación</td>
                        </tr>
                        <tr className="odd">
                            <td>Registros de acceso y auditoría</td>
                            <td>12 meses</td>
                        </tr>
                        <tr className="even">
                            <td>Datos de contacto comercial y solicitudes del sitio web</td>
                            <td>2 años desde el último contacto efectivo</td>
                        </tr>
                        <tr className="odd">
                            <td>Información contable, tributaria y contractual</td>
                            <td>10 años, conforme a la legislación comercial y tributaria colombiana</td>
                        </tr>
                        <tr className="even">
                            <td>Información de entidades públicas</td>
                            <td>El plazo que determine la tabla de retención documental de la entidad cliente</td>
                        </tr>
                    </tbody>
                </table>
                <p>Cumplido el plazo, la información se suprime de forma segura o se anonimiza de manera irreversible.</p>
                <hr />
                <h2 id="derechos-de-los-titulares">10. Derechos de los titulares</h2>
                <p>Como titular de datos personales, usted tiene derecho a:</p>
                <ol>
                    <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales.</li>
                    <li><strong>Solicitar prueba de la autorización</strong> otorgada, salvo en los casos exceptuados por la ley.</li>
                    <li><strong>Ser informado</strong> sobre el uso que se ha dado a sus datos.</li>
                    <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio por infracciones al régimen de protección de datos.</li>
                    <li><strong>Revocar la autorización y solicitar la supresión</strong> de sus datos, cuando no exista un deber legal o contractual que imponga conservarlos.</li>
                    <li><strong>Acceder de forma gratuita</strong> a sus datos personales.</li>
                </ol>
                <h3 id="como-ejercerlos">Cómo ejercerlos</h3>
                <p>Escríbanos a <strong>analistaadministrativo@fjdsas.com.co</strong> indicando su nombre completo, número de documento, la plataforma o servicio al que se refiere, la descripción de su solicitud y un canal de respuesta.</p>
                <p><strong>Plazos legales de respuesta:</strong></p>
                <ul>
                    <li><strong>Consultas:</strong> máximo <strong>diez (10) días hábiles</strong>, prorrogables por <strong>cinco (5) días hábiles</strong> más, informándole los motivos de la prórroga.</li>
                    <li><strong>Reclamos:</strong> máximo <strong>quince (15) días hábiles</strong>, prorrogables por <strong>ocho (8) días hábiles</strong> más, informándole los motivos de la prórroga.</li>
                </ul>
                <p>Si su solicitud se refiere a información alojada en la plataforma de uno de nuestros clientes, se la trasladaremos dentro de los dos (2) días hábiles siguientes y se lo comunicaremos, ya que la decisión corresponde al Responsable.</p>
                <p>El procedimiento detallado, incluyendo el trámite de reclamos incompletos, se encuentra en nuestra <a href="/legal/tratamiento-de-datos-personales">Política de Tratamiento de Datos Personales</a>.</p>
                <hr />
                <h2 id="eliminacion-de-cuentas">11. Eliminación de cuentas y datos</h2>
                <p>Nuestras aplicaciones no permiten la creación autónoma de cuentas: estas son creadas y administradas por el cliente, por un administrador autorizado o por nuestro personal. Por la misma razón, tampoco pueden eliminarse desde la aplicación.</p>
                <p>El procedimiento completo para solicitar la eliminación de una cuenta y de los datos asociados —incluyendo qué se elimina, qué debe conservarse por mandato legal y en qué plazos— está descrito en nuestra <a href="/legal/eliminacion-de-datos">Política de Eliminación de Cuenta y Datos</a>, accesible públicamente sin necesidad de instalar ninguna aplicación.</p>
                <hr />
                <h2 id="permisos-solicitados">12. Permisos solicitados por nuestras aplicaciones móviles</h2>
                <p>Nuestras aplicaciones solicitan únicamente los permisos estrictamente necesarios para las funcionalidades contratadas, en tiempo de ejecución y con explicación previa de su finalidad:</p>
                <table>
                    <colgroup>
                        <col style={{width: '33%'}} />
                        <col style={{width: '33%'}} />
                        <col style={{width: '33%'}} />
                    </colgroup>
                    <thead>
                        <tr className="header">
                            <th>Permiso</th>
                            <th>Finalidad</th>
                            <th>Alcance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Ubicación precisa y aproximada</td>
                            <td>Georreferenciar operaciones y evidencias de campo</td>
                            <td><strong>Solo con la aplicación en uso.</strong> No se utiliza ubicación en segundo plano</td>
                        </tr>
                        <tr className="even">
                            <td>Cámara</td>
                            <td>Captura de fotografías de evidencia</td>
                            <td>Solo a solicitud expresa del usuario</td>
                        </tr>
                        <tr className="odd">
                            <td>Almacenamiento de archivos</td>
                            <td>Guardar y adjuntar evidencias y documentos</td>
                            <td>Limitado al espacio propio de la aplicación</td>
                        </tr>
                        <tr className="even">
                            <td>Acceso a la red</td>
                            <td>Comunicación con nuestros servidores</td>
                            <td>Permanente durante el uso</td>
                        </tr>
                    </tbody>
                </table>
                <p>El usuario puede revocar estos permisos en cualquier momento desde los ajustes de su dispositivo. Algunas funcionalidades dejarán de estar disponibles si lo hace.</p>
                <hr />
                <h2 id="menores-de-edad">13. Menores de edad</h2>
                <p>Nuestras plataformas son herramientas corporativas dirigidas a usuarios adultos autorizados por nuestros clientes. <strong>No están dirigidas a menores de edad</strong> y no recopilamos conscientemente información de menores.</p>
                <p>Si detectamos que hemos tratado información de un menor sin la autorización de su representante legal, procederemos a su supresión.</p>
                <hr />
                <h2 id="cookies">14. Cookies y tecnologías similares</h2>
                <p>Nuestro sitio web corporativo y nuestras aplicaciones utilizan cookies y mecanismos de almacenamiento local con fines exclusivamente técnicos y de sesión. No empleamos cookies publicitarias ni de analítica de terceros en el sitio web.</p>
                <p>El detalle está en nuestra <a href="/legal/cookies">Política de Cookies</a>.</p>
                <hr />
                <h2 id="cambios">15. Cambios en esta Política</h2>
                <p>Podemos actualizar esta Política para reflejar cambios normativos, tecnológicos u operativos. La versión vigente estará siempre disponible en la URL indicada al inicio, con su número de versión y fecha de entrada en vigor.</p>
                <p>Cuando los cambios sean sustanciales y afecten las finalidades del tratamiento, lo comunicaremos a los titulares y a nuestros clientes por los canales habituales antes de su entrada en vigor.</p>
                <hr />
                <h2 id="ley-aplicable">16. Ley aplicable y autoridad de control</h2>
                <p>Esta Política se rige por la legislación de la <strong>República de Colombia</strong>, en particular por la Ley Estatutaria 1581 de 2012, el Decreto 1074 de 2015 y las normas que los modifiquen o sustituyan.</p>
                <p>La autoridad de control competente es la <strong>Superintendencia de Industria y Comercio</strong>, ante la cual los titulares pueden presentar quejas una vez agotado el trámite de consulta o reclamo ante nosotros.</p>
                <hr />
                <p><em>Documento aprobado por FJD GROUP S.A.S. — Versión 1.0, vigente desde el 27 de julio de 2026.</em></p>
            </main>
        </LegalLayout>
    );
}
export default Privacidad;
