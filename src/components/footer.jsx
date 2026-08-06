import { Link } from "react-router-dom";
import "../assets/css/footer.css";
import logo from "../assets/images/logo.png";

export function Footer() {
    // para actualizar el año
    const currentYear = new Date().getFullYear();
    return (
        <footer className="contefoot">
            <div className="container-foo">
                <div className="contenelogo">
                    <div className="img-social">
                        <div className="imag">
                            <img className="image" src={logo} alt="logo" />
                        </div>
                        <div className="icon-content">
                            <a className="icons-a" href="https://wa.me/573052384659" target="_blank">
                                <i className="bx bxl-whatsapp"></i>
                            </a>
                            <a
                                className="icons-a"
                                href="https://www.instagram.com/fjddesarrollodesoftware/"
                                target="_blank">
                                <i className="bx bxl-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <div className="iconos-content">
                        <h2 className="footitu">Políticas</h2>
                        <div className="contac legal-links">
                            <Link className="span5" to="/legal">Centro Legal</Link>
                            <Link className="span5" to="/politicas-privacidad">Política de Privacidad</Link>
                            <Link className="span5" to="/legal/terminos-y-condiciones">Términos y Condiciones de Servicio</Link>
                            <Link className="span5" to="/legal/eliminacion-de-datos">Eliminación de Cuenta y Datos</Link>
                            <Link className="span5" to="/legal/tratamiento-de-datos-personales">Tratamiento de Datos Personales</Link>
                            <Link className="span5" to="/legal/seguridad-de-la-informacion">Seguridad de la Información</Link>
                            <Link className="span5" to="/legal/cookies">Política de Cookies</Link>
                        </div>
                    </div>
                    <div className="iconos-content">
                        <h2 className="footitu">Contáctanos</h2>
                        <div className="contac">
                            <div className="direcc">
                                <i className="bx bxs-map dire"></i>
                                <div className="dir">
                                    <a
                                        className="span5"
                                        href="https://maps.app.goo.gl/ATx3btnMtZRuBgSz9"
                                        target="_blank">
                                        <span>Cl. 37a #11-24</span> <br />
                                        <span> Montería- Colombia</span>
                                    </a>
                                </div>
                            </div>
                            <div className="direcc">
                                <i className="bx bxs-envelope dire"> </i>
                                <div className="direcc">
                                    <div className="dir">
                                        <a className="span5" href="mailto:servicioalcliente@fjdsas.com.co">
                                            servicioalcliente@fjdsas.com.co
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="direcc">
                                <i className="bx bx-phone-call dire"></i>
                                <div className="dir">
                                    <span>+(57) 301 778 86 31 </span>
                                    <span>+(57) 320 375 49 09</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy">
                    <hr />
                    <p className="parrafo-copy">&copy; {currentYear} Todos los derchos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
