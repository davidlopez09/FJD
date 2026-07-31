import { Link } from "react-router-dom";
import analisisrequerimiento from "./Svg/Analisisrequerimiento.svg";
import planificacionproyectos from "./Svg/Planificacionproyectos.svg";
import desarrolloproyectos from "./Svg/DesarrolloDelProyecto.svg";
import testing from "./Svg/TestingYDespliegue.svg";
import "../assets/css/metodologia.css";

const metodologiaItems = [
    {
        id: "analisis",
        title: "Análisis de Requerimientos",
        description: "Comprendemos de forma ágil y analítica la necesidad del cliente para ofrecer soluciones efectivas y personalizadas.",
        image: analisisrequerimiento,
        link: "/metodologia/analisis",
        badge: "Fase 1"
    },
    {
        id: "planificacion",
        title: "Planificación del Proyecto",
        description: "Elegimos las mejores tecnologías y procesos para garantizar el éxito del proyecto, cumpliendo con los plazos y presupuestos establecidos.",
        image: planificacionproyectos,
        link: "/metodologia/planificacion",
        badge: "Fase 2"
    },
    {
        id: "desarrollo",
        title: "Desarrollo del Proyecto",
        description: "Desarrollamos interfaces limpias y funcionales para la implementación de soluciones robustas y escalables que satisfagan las necesidades del usuario.",
        image: desarrolloproyectos,
        link: "/metodologia/desarrollo",
        badge: "Fase 3"
    },
    {
        id: "testing",
        title: "Testing y Despliegue",
        description: "Analizamos y hacemos seguimiento del código de manera exhaustiva, garantizando la calidad del producto final y realizando despliegues continuos.",
        image: testing,
        link: "/metodologia/testing",
        badge: "Fase 4"
    }
];

export function Metodologia() {
    return (
        <section className="metodologia" aria-labelledby="metodologia-title">
            <div className="metodologia-header">
                <h1 id="metodologia-title" className="titumeto">Utilizamos una metodología para nuestros proyectos</h1>
                <div className="subtitu">
                    <p className="sub-somos">Somos un equipo enfocado a resultados y usamos la tecnología como herramienta de crecimiento</p>
                </div>
            </div>
            <div className="metodologia-grid">
                {metodologiaItems.map((item) => (
                    <article key={item.id} className="metodologia-card">
                        <div className="card-image-wrapper">
                            <img src={item.image} alt={item.title} className="card-image" loading="lazy" />
                            <span className="card-badge">{item.badge}</span>
                        </div>
                        <div className="card-content">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-description">{item.description}</p>
                            <Link to={item.link} className="card-link">
                                Ver más <span className="link-arrow">→</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Metodologia;