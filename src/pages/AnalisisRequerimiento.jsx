import { Link } from "react-router-dom";
import { Header } from "../components/header.jsx";
import { Footer } from "../components/footer.jsx";
import "../assets/css/metodologia-detail.css";

const WHATSAPP_NUMBER = "573052384659";

export function AnalisisRequerimiento() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero agendar una sesión de descubrimiento para analizar los requerimientos de mi proyecto.")}`;
    return (
        <>
            <Header variant="metodologia" />
            <main className="metodologia-detail-page">
                <section className="metodologia-hero">
                    <div className="hero-content">
                        <h1>Análisis de Requerimientos</h1>
                        <p className="hero-description">
                            Comprendemos de forma ágil y analítica la necesidad del cliente para ofrecer 
                            soluciones efectivas y personalizadas. Esta fase es la base sobre la que se 
                            construye todo el proyecto.
                        </p>
                    </div>
                </section>

                <section className="metodologia-content">
                    <div className="content-grid">
                        <div className="content-main">
                            <article className="content-section">
                                <h2>¿Qué hacemos en esta fase?</h2>
                                <p>
                                    El análisis de requerimientos es el proceso de descubrir, documentar y 
                                    gestionar las necesidades y expectativas de los stakeholders. No solo 
                                    escuchamos lo que el cliente dice que quiere, sino que investigamos 
                                    lo que realmente necesita.
                                </p>
                                
                                <h3>Actividades principales</h3>
                                <ul className="activity-list">
                                    <li>
                                        <strong>Entrevistas con stakeholders:</strong> Reuniones estructuradas 
                                        con usuarios finales, patrocinadores y equipos técnicos para entender 
                                        el contexto del negocio.
                                    </li>
                                    <li>
                                        <strong>Workshops de descubrimiento:</strong> Sesiones colaborativas 
                                        para mapear procesos actuales, identificar puntos de dolor y 
                                        definir el alcance del proyecto.
                                    </li>
                                    <li>
                                        <strong>Análisis de documentación existente:</strong> Revisión de 
                                        manuales, sistemas legacy, reportes y normativas aplicables.
                                    </li>
                                    <li>
                                        <strong>Definición de casos de uso y user stories:</strong> 
                                        Traducción de necesidades en requerimientos funcionales y no 
                                        funcionales trazables y testeables.
                                    </li>
                                    <li>
                                        <strong>Priorización MoSCoW:</strong> Clasificación de requerimientos 
                                        en Must have, Should have, Could have y Won't have.
                                    </li>
                                    <li>
                                        <strong>Validación y firma:</strong> Revisión conjunta con el cliente 
                                        para asegurar alineación antes de iniciar la planificación.
                                    </li>
                                </ul>
                            </article>

                            <article className="content-section">
                                <h2>Entregables</h2>
                                <div className="deliverables-grid">
                                    <div className="deliverable-card">
                                        <div>
                                            <h4>Documento de Requerimientos (SRS)</h4>
                                            <p>Especificación completa, estructurada y versionada</p>
                                        </div>
                                    </div>
                                    <div className="deliverable-card">
                                        <div>
                                            <h4>Mapa de Procesos (AS-IS / TO-BE)</h4>
                                            <p>Visualización del estado actual y futuro del negocio</p>
                                        </div>
                                    </div>
                                    <div className="deliverable-card">
                                        <div>
                                            <h4>Backlog Priorizado</h4>
                                            <p>User stories con criterios de aceptación y estimaciones</p>
                                        </div>
                                    </div>
                                    <div className="deliverable-card">
                                        <div>
                                            <h4>Matriz de Trazabilidad</h4>
                                            <p>Vinculación requerimiento → caso de prueba → código</p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article className="content-section">
                                <h2>Nuestra aproximación diferenciadora</h2>
                                <div className="approach-grid">
                                    <div className="approach-card">
                                        <h3>Pensamiento de Diseño</h3>
                                        <p>Aplicamos Design Thinking desde el día uno: empatizar, definir, idear, prototipar y testar. No asumimos, validamos.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Arquitectura desde el inicio</h3>
                                        <p>Involucramos arquitectos en la fase de análisis para detectar restricciones técnicas temprano y evitar retrabajo costoso.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Prototipado Rápido</h3>
                                        <p>Entregamos wireframes y mockups navegables en la primera semana para que el cliente "toque" la solución antes de invertir en desarrollo.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Gestión de Cambios Ágil</h3>
                                        <p>Los requerimientos evolucionan. Nuestro proceso de change control evalúa impacto, esfuerzo y valor en 48h máximo.</p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <aside className="content-sidebar">
                            <div className="sidebar-card">
                                <h3>¿Por qué es crítico?</h3>
                                <p className="sidebar-text">
                                    Estudios del PMI indican que <strong>el 37% de los proyectos fallan</strong> 
                                    por requerimientos mal definidos. Invertir en análisis reduce hasta 
                                    10x el costo de corrección en etapas posteriores.
                                </p>
                            </div>

                            <div className="sidebar-card">
                                <h3>Duración típica</h3>
                                <div className="timeline-info">
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos pequeños</span>
                                        <span className="timeline-value">2-3 semanas</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos medianos</span>
                                        <span className="timeline-value">4-6 semanas</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Proyectos grandes</span>
                                        <span className="timeline-value">8-12 semanas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card cta-card">
                                <h3>¿Listo para empezar?</h3>
                                <p>Agenda una sesión de descubrimiento sin compromiso.</p>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-btn">Hablar con un experto →</a>
                            </div>

                            <nav className="sidebar-nav" aria-label="Metodología">
                                <h3>Nuestra Metodología</h3>
                                <ul>
                                    <li className="active"><Link to="/metodologia/analisis">1. Análisis de Requerimientos</Link></li>
                                    <li><Link to="/metodologia/planificacion">2. Planificación del Proyecto</Link></li>
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

export default AnalisisRequerimiento;