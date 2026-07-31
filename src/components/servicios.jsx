import { useState } from "react";
import imagen from "./Svg/Software.svg";
import imagen1 from "./Svg/Web.svg";
import imagen2 from "./Svg/Movil.svg";
import imagen3 from "./Svg/Api.svg";
import imagen4 from "./Svg/CodigoSeguro.svg";
import imagen5 from "./Svg/Soporte2.svg";

import "../assets/css/servicios.css";

const WHATSAPP_NUMBER = "573052384659";

export function Servicios() {
    const [flippedCards, setFlippedCards] = useState(Array(6).fill(false));

    const handleCardClick = (index) => {
        const newFlippedCards = [...flippedCards];
        newFlippedCards[index] = !newFlippedCards[index];
        setFlippedCards(newFlippedCards);
    };

    const handleWhatsApp = (e, serviceName) => {
        e.stopPropagation();
        const message = `Hola, quiero más información sobre ${serviceName}. Me gustaría conocer características, precio y tiempo de desarrollo.`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const services = [
        {
            name: "Desarrollo de software",
            img: imagen,
            description: "Creamos soluciones a medida: ERP, CRM, sistemas de gestión, automatización de procesos y software empresarial escalable.",
            features: ["Java, Kotlin, Spring Boot", "C#, .NET Core, Python", "Go, Rust, Node.js", "Arquitectura limpia y hexagonal", "Bases de datos SQL/NoSQL"]
        },
        {
            name: "Desarrollo de aplicaciones web",
            img: imagen1,
            description: "Aplicaciones web modernas, reactivas y seguras. Desde portales corporativos hasta plataformas SaaS complejas.",
            features: ["React, Vue, Next.js, Astro", "PHP, Laravel, Node.js", "TypeScript, JavaScript, HTML5/CSS3", "Progressive Web Apps", "SEO optimizado"]
        },
        {
            name: "Desarrollo de aplicaciones móviles",
            img: imagen2,
            description: "Apps nativas e híbridas para iOS y Android. Experiencia de usuario fluida, rendimiento nativo y publicación en stores.",
            features: ["Flutter & Kotlin Multiplatform", "React Native, Expo", "Publicación App Store / Play Store", "Notificaciones push, modo offline"]
        },
        {
            name: "Expertos en desarrollo API",
            img: imagen3,
            description: "Diseñamos y construimos APIs REST/GraphQL robustas, documentadas y seguras para conectar tus sistemas y terceros.",
            features: ["Node.js, Express, Fastify", "Python, FastAPI, Django REST", "Java, Spring Boot", "Go, Gin, Fiber", "OpenAPI/Swagger, GraphQL, gRPC"]
        },
        {
            name: "Desarrollo de código seguro",
            img: imagen4,
            description: "Aplicamos DevSecOps, revisiones de código, pruebas de penetración y cumplimiento OWASP en cada entrega.",
            features: ["SAST/DAST (SonarQube, Checkmarx)", "SCA (Dependabot, Snyk)", "Contenedores seguros (Docker, K8s)", "OWASP Top 10, ASVS", "CI/CD seguro (GitLab, GitHub Actions)"]
        },
        {
            name: "Soporte y mantenimiento",
            img: imagen5,
            description: "Acompañamiento continuo: monitoreo 24/7, actualizaciones de seguridad, mejoras evolutivas y SLA garantizado.",
            features: ["Monitoreo (Datadog, Prometheus, Grafana)", "Logs centralizados (ELK, Loki)", "Respuesta < 4h criticidad alta", "Parches de seguridad mensuales", "Mejoras evolutivas y refactoring"]
        },
    ];

    return (
        <div id="servicios" className="card-container">
            <div className="title-card">
                <h2 className="title">EXPERTOS EN DESARROLLO A LA MEDIDA</h2>
                <p className="subtitle">Soluciones tecnológicas a la medida de tu negocio. Cada proyecto es único, nuestro enfoque también.</p>
            </div>
            <div className="cards-container">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`card ${flippedCards[index] ? "flipped" : ""}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="face front">
                            <div className="front-image">
                                <img src={service.img} alt={service.name} loading="lazy" />
                            </div>
                            <h3 className="front-title">{service.name}</h3>
                            <span className="flip-hint">Haz clic para ver más</span>
                        </div>
                        <div className="face back">
                            <h3 className="back-title">{service.name}</h3>
                            <p className="back-description">{service.description}</p>
                            <ul className="back-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className="feature-dot" aria-hidden="true"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mas-info-btn"
                                onClick={(e) => handleWhatsApp(e, service.name)}
                            >
                                Más información →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Servicios;