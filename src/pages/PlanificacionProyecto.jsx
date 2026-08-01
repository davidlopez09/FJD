import { Link } from "react-router-dom";
import { Header } from "../components/header.jsx";
import { Footer } from "../components/footer.jsx";
import "../assets/css/metodologia-detail.css";

const WHATSAPP_NUMBER = "573052384659";

export function PlanificacionProyecto() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero solicitar la planificación de mi proyecto: arquitectura, cronograma y riesgos.")}`;
    return (
        <>
            <Header variant="metodologia" />
            <main className="metodologia-detail-page">
                <section className="metodologia-hero">
                    <div className="hero-content">
                        <h1>Planificación del Proyecto</h1>
                        <p className="hero-description">
                            Elegimos las mejores tecnologías, arquitectura y procesos para garantizar el éxito 
                            del proyecto, cumpliendo con los plazos, presupuestos y estándares de calidad 
                            establecidos.
                        </p>
                    </div>
                </section>

                <section className="metodologia-content">
                    <div className="content-grid">
                        <div className="content-main">
                            <article className="content-section">
                                <h2>¿Qué hacemos en esta fase?</h2>
                                <p>
                                    La planificación transforma los requerimientos en una hoja de ruta ejecutable. 
                                    Definimos arquitectura, stack tecnológico, equipo, cronograma, riesgos y 
                                    métricas de éxito. Una buena planificación es la diferencia entre un 
                                    proyecto que entrega valor y uno que solo consume presupuesto.
                                </p>
                                
                                <h3>Actividades principales</h3>
                                <ul className="activity-list">
                                    <li>
                                        <strong>Definición de arquitectura:</strong> Selección de patrones 
                                        (microservicios, monolito modular, serverless), bases de datos, 
                                        estrategia de APIs y estándares de seguridad.
                                    </li>
                                    <li>
                                        <strong>Selección de stack tecnológico:</strong> Evaluación objetiva 
                                        de frameworks, lenguajes, nube y herramientas basada en requerimientos 
                                        no funcionales (escalabilidad, latencia, compliance).
                                    </li>
                                    <li>
                                        <strong>Diseño de base de datos y modelos:</strong> Modelado 
                                        entidad-relación, definición de migraciones, índices y estrategia 
                                        de particionado.
                                    </li>
                                    <li>
                                        <strong>Plan de sprints y roadmap:</strong> Descomposición en 
                                        épicas, features y user stories con estimaciones (Planning Poker), 
                                        definición de MVP y releases incrementales.
                                    </li>
                                    <li>
                                        <strong>Análisis de riesgos y mitigación:</strong> Matriz de 
                                        riesgos técnicos, operativos y de negocio con planes de contingencia 
                                        y dueños asignados.
                                    </li>
                                    <li>
                                        <strong>Configuración de infraestructura y CI/CD:</strong> 
                                        Provisionamiento de entornos (dev, staging, prod), pipelines de 
                                        build, test, security scan y deploy automatizado.
                                    </li>
                                </ul>
                            </article>

                        </div>

                        <aside className="content-sidebar">
                            <div className="sidebar-card">
                                <h3>Clave del éxito</h3>
                                <p className="sidebar-text">
                                    <strong>El 68% de los proyectos</strong> que fallan no tienen una 
                                    planificación realista. Nosotros planificamos con buffers, 
                                    riesgos cuantificados y métricas de salud semanales.
                                </p>
                            </div>

                            <div className="sidebar-card">
                                <h3>Duración típica</h3>
                                <div className="timeline-info">
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos pequeños</span>
                                        <span className="timeline-value">1-2 semanas</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos medianos</span>
                                        <span className="timeline-value">2-3 semanas</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos grandes</span>
                                        <span className="timeline-value">3-4 semanas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card cta-card">
                                <h3>¿Necesitas planificar tu proyecto?</h3>
                                <p>Te ayudamos a definir arquitectura, cronograma y riesgos.</p>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-btn">Solicitar planificación →</a>
                            </div>

                            <nav className="sidebar-nav" aria-label="Metodología">
                                <h3>Nuestra Metodología</h3>
                                <ul>
                                    <li><Link to="/metodologia/analisis">1. Análisis de Requerimientos</Link></li>
                                    <li className="active"><Link to="/metodologia/planificacion">2. Planificación del Proyecto</Link></li>
                                    <li><Link to="/metodologia/desarrollo">3. Desarrollo del Proyecto</Link></li>
                                    <li><Link to="/metodologia/testing">4. Testing y Despliegue</Link></li>
                                </ul>
                            </nav>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default PlanificacionProyecto;