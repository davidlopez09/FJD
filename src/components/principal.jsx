import Monteria from "../assets/images/monteria.webp";
import "../assets/css/Principal.css";

const WHATSAPP_NUMBER = "573052384659";

export function Principal() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hola, quiero empezar un proyecto de desarrollo de software con FJD GROUP."
    )}`;

    return (
        <section id="home" className="hero-tech-container">
            {/* Capa de Fondo */}
            <div className="hero-bg-layer">
                <img className="hero-image" src={Monteria} alt="Fondo Ciudad" />
                {/* Degradado lateral oscuro a transparente */}
                <div className="hero-gradient-overlay"></div>
            </div>
            
            {/* Capa de Contenido Alineada a la Izquierda */}
            <div className="hero-content-wrapper">
                <div className="hero-text-content">
                    {/* Etiqueta Digital / Código */}
                    <div className="tech-badge slide-in-left">
                        <span className="tech-icon">&lt;/&gt;</span> 
                        <span className="tech-badge-text">TECH EXPERTS</span>
                    </div>
                    
                    <h2 className="tech-emp slide-in-left delay-1">
                        EMPRESA DE <br/>
                        <span className="highlight-text">DESARROLLO DE SOFTWARE</span>
                    </h2>
                    
                    <p className="tech-descrip slide-in-left delay-2">
                        Escuchamos y empatizamos con nuestros clientes, para la creación de estrategias de desarrollo de
                        software innovadoras y disruptivas, a través de las cuales nos hemos posicionado como un
                        referente en este mercado.
                    </p>
                    
                    <div className="tech-actions slide-in-left delay-3">
                        <a
                            className="btn-glow"
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Escribirnos por WhatsApp para empezar tu proyecto">
                            Empecemos tu Proyecto
                            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Principal;
