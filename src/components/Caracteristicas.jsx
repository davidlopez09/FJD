import "../assets/css/Caracteristicas.css";
import imagen from "./Svg/Caracteristicas.svg";

export function Caracteristicas() {
    const features = [
        "Desarrollo de aplicaciones según tus requisitos específicos",
        "Soporte continuo y actualizaciones para garantizar el correcto funcionamiento",
        "Código seguro por diseño con cumplimiento OWASP y DevSecOps",
        "Entrega continua con metodología ágil y despliegues automatizados",
        "Integración total con tus sistemas actuales: ERP, CRM, APIs, bases de datos",
        "Arquitectura escalable cloud-native preparada para crecer sin límites"
    ];

    return (
        <section className="nuestro-servicio" aria-labelledby="porque-titulo">
            <div className="servicio-header">
                <h1 id="porque-titulo" className="porque">¿Por qué elegir nuestro servicio de software?</h1>
                <p className="nuestro">
                    Nuestro equipo crea soluciones a la medida que se adaptan perfectamente a tus necesidades específicas.
                    No vendemos horas, entregamos resultados medibles.
                </p>
            </div>

            <div className="servicio-content">
                <div className="servicio-image">
                    <img src={imagen} alt="Equipo de desarrollo creando software a medida" loading="lazy" />
                </div>
                <div className="servicio-list-wrapper">
                    <h2 className="list-title">Características especiales</h2>
                    <ul className="feature-list">
                        {features.map((feature, index) => (
                            <li key={index} className="feature-item">
                                <span className="bullet" aria-hidden="true"></span>
                                <span className="feature-text">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="servicio-cta">
                <p className="cta-text">¿Listo para transformar tu idea en software real?</p>
                <a href="#contactanos" className="cta-btn">
                    Hablemos de tu proyecto →
                </a>
            </div>
        </section>
    );
}

export default Caracteristicas;