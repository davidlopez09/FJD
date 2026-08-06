import { Link } from "react-router-dom";
import "../assets/css/legal.css";
import { LegalLayout } from "./LegalLayout";

export function LegalHub() {
    return (
        <LegalLayout>
            <main className="doc">
                <div className="doc-head">
                    <h1>Centro Legal</h1>
                    <p className="doc-org">FJD GROUP S.A.S.</p>
                </div>

                <div className="meta"><table>
                    <tbody>
                        <tr className="odd">
                            <td><strong>Última actualización</strong></td>
                            <td>27 de julio de 2026</td>
                        </tr>
                        <tr className="even">
                            <td><strong>URL de publicación</strong></td>
                            <td>https://fjdsas.com.co/legal/</td>
                        </tr>
                    </tbody>
                </table></div>
                <hr />
                <h2 id="transparencia-sobre-cómo-trabajamos">Transparencia sobre cómo trabajamos</h2>
                <p>Desarrollamos y operamos software que sostiene la actividad diaria de empresas y entidades. Esa posición nos obliga a ser explícitos sobre tres cosas: <strong>qué hacemos con la información</strong>, <strong>cómo la protegemos</strong> y <strong>qué derechos tiene quien nos la confía</strong>.</p>
                <p>En esta sección publicamos, de forma completa y accesible, los documentos que rigen nuestra actividad. Todos se rigen por la legislación de la República de Colombia.</p>
                <hr />
                <h2 id="documentos-vigentes">Documentos vigentes</h2>
                <h3 id="política-de-privacidad"><Link to="/politicas-privacidad">Política de Privacidad</Link></h3>
                <p>Qué información tratamos, con qué finalidad, con quién la compartimos, cuánto tiempo la conservamos y qué derechos le asisten como titular. Aplica a nuestro sitio web, aplicaciones móviles, aplicaciones web y plataformas SaaS. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <h3 id="términos-y-condiciones-de-servicio"><Link to="/legal/terminos-y-condiciones">Términos y Condiciones de Servicio</Link></h3>
                <p>El marco contractual de nuestros servicios: modalidades de prestación, propiedad intelectual, licencia de uso, obligaciones de las partes, soporte, responsabilidad y terminación. Dirigidos a las empresas y entidades que nos contratan. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <h3 id="política-de-eliminación-de-cuenta-y-datos"><Link to="/legal/eliminacion-de-datos">Política de Eliminación de Cuenta y Datos</Link></h3>
                <p>Cómo solicitar la eliminación de una cuenta y de los datos asociados, qué se elimina, qué debe conservarse por mandato legal y en qué plazos respondemos. Acceso público, sin necesidad de instalar ninguna aplicación. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <h3 id="política-de-tratamiento-de-datos-personales"><Link to="/legal/tratamiento-de-datos-personales">Política de Tratamiento de Datos Personales</Link></h3>
                <p>Nuestro manual interno de políticas y procedimientos conforme a la Ley 1581 de 2012: principios, bases de datos, autorización, derechos de los titulares y procedimiento de consultas y reclamos. Incluye el Aviso de Privacidad. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <h3 id="política-de-seguridad-de-la-información"><Link to="/legal/seguridad-de-la-informacion">Política de Seguridad de la Información</Link></h3>
                <p>Los controles técnicos, humanos y administrativos con que protegemos la información: control de acceso, criptografía, desarrollo seguro, copias de seguridad, auditoría y gestión de incidentes. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <h3 id="política-de-cookies-y-tecnologías-de-almacenamiento"><Link to="/legal/cookies">Política de Cookies y Tecnologías de Almacenamiento</Link></h3>
                <p>Qué cookies y mecanismos de almacenamiento utilizamos y por qué no empleamos publicidad, analítica de terceros ni perfilamiento. <em>Versión 1.0 · Vigente desde el 27 de julio de 2026</em></p>
                <hr />
                <h2 id="lo-esencial-en-cuatro-puntos">Lo esencial, en cuatro puntos</h2>
                <p><strong>La información de nuestros clientes es de nuestros clientes.</strong> Cuando operamos una plataforma por cuenta de una empresa o entidad, actuamos como Encargados del Tratamiento. No somos propietarios de esa información, no la usamos para fines propios y no la comercializamos.</p>
                <p><strong>No hacemos publicidad ni perfilamiento.</strong> Nuestras aplicaciones no muestran anuncios, no recopilan identificadores publicitarios y no construyen perfiles de comportamiento.</p>
                <p><strong>Nuestras aplicaciones no permiten registro público.</strong> Las cuentas son creadas y administradas por el cliente o por su administrador autorizado. El acceso siempre requiere autenticación.</p>
                <p><strong>Publicamos lo que efectivamente hacemos.</strong> Los controles que declaramos son controles implementados. Cuando algo se encuentre en proceso de implementación, no lo declaramos como vigente.</p>
                <hr />
                <h2 id="canales-de-contacto">Canales de contacto</h2>
                <table>
                    <thead>
                        <tr className="header">
                            <th>Asunto</th>
                            <th>Canal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd">
                            <td>Consultas generales</td>
                            <td>administracion@fjdsas.com.co</td>
                        </tr>
                        <tr className="even">
                            <td>Soporte técnico</td>
                            <td>servicioalcliente@fjdsas.com.co</td>
                        </tr>
                        <tr className="odd">
                            <td><strong>Protección de datos personales y Habeas Data</strong></td>
                            <td><strong>analistaadministrativo@fjdsas.com.co</strong></td>
                        </tr>
                        <tr className="even">
                            <td>Reporte de incidentes o vulnerabilidades de seguridad</td>
                            <td>servicioalcliente@fjdsas.com.co</td>
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
                            <td>Lunes a viernes, horario de oficina</td>
                        </tr>
                    </tbody>
                </table>
                <p><strong>FJD GROUP S.A.S.</strong> NIT 901437071-8 Montería, Córdoba, República de Colombia</p>
                <hr />
                <p><em>Autoridad de control competente en materia de protección de datos personales: Superintendencia de Industria y Comercio de Colombia.</em></p>

            </main>
        </LegalLayout>
    );
}
export default LegalHub;
