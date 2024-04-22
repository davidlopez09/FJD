import "../assets/css/footer.css";
import logo from "../assets/images/logofjd.png";

export function Footer() {
    return (
        <footer className="contefoot">
            <div className="container-foo">
                <div className="contenelogo">
                    <div className="img-social">
                        <div className="imag">
                            <img className="image" src={logo} alt="logo" />
                        </div>
                        <div className="icon-content">
                            <i className="bx bxl-whatsapp"></i>
                            <i className="bx bxl-facebook-square"></i>
                            <i className="bx bxl-instagram"></i>
                            <i className="bx bxl-linkedin-square"></i>
                            <i className="bx bxl-twitter"></i>
                        </div>
                    </div>
                    <div className="iconos-content">
                        <h2 className="footitu">Contáctanos</h2>
                        <div className="contac">
                            <div className="direcc">
                                <i className="bx bxs-map dire"></i>
                                <div className="dir">
                                    <a className="span5" href="https://maps.app.goo.gl/YLv9vYrXy8tVF2Y67" target="_blank">
                                        <span>Cr 7 W 36-30 Barrio Juan XXIII </span>
                                    </a>
                                    <a className=" span5" href="https://maps.app.goo.gl/YLv9vYrXy8tVF2Y67" target="_blank">
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
                    <p className="parrafo-copy">&copy; 2024 Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
