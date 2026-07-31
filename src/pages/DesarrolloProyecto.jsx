import { Link } from "react-router-dom";
import { Header } from "../components/header.jsx";
import { Footer } from "../components/footer.jsx";
import "../assets/css/metodologia-detail.css";

const WHATSAPP_NUMBER = "573052384659";

export function DesarrolloProyecto() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero agendar una sesión técnica para conocer su proceso de desarrollo.")}`;
    return (
        <>
            <Header variant="metodologia" />
            <main className="metodologia-detail-page">
                <section className="metodologia-hero">
                    <div className="hero-content">
                        <h1>Desarrollo del Proyecto</h1>
                        <p className="hero-description">
                            Desarrollamos interfaces limpias y funcionales para la implementación de soluciones 
                            robustas y escalables. Código limpio, revisado por pares, testeado y documentado 
                            desde el primer commit.
                        </p>
                    </div>
                </section>

                <section className="metodologia-content">
                    <div className="content-grid">
                        <div className="content-main">
                            <article className="content-section">
                                <h2>¿Qué hacemos en esta fase?</h2>
                                <p>
                                    El desarrollo es donde la arquitectura cobra vida. Trabajamos en sprints 
                                    de 2 semanas con entregas incrementales, integración continua obligatoria 
                                    y revisión de código en cada PR. La calidad no se negocia.
                                </p>
                                
                                <h3>Actividades principales</h3>
                                <ul className="activity-list">
                                    <li>
                                        <strong>Setup de repositorios y estándares:</strong> Configuración 
                                        de ESLint, Prettier, Husky, commitlint, convenciones de naming 
                                        y estructura de carpetas por dominio.
                                    </li>
                                    <li>
                                        <strong>Desarrollo por features (Trunk-based):</strong> Ramas 
                                        cortas (máx 2 días), feature flags para deploy seguro, 
                                        integración diaria a main.
                                    </li>
                                    <li>
                                        <strong>Code Review obligatorio:</strong> Mínimo 2 aprobaciones, 
                                        checklist de seguridad, performance y mantenibilidad. 
                                        Pair programming en features críticas.
                                    </li>
                                    <li>
                                        <strong>Testing en pirámide:</strong> Unitarios ({'>'}80% cobertura), 
                                        integración (contratos API, BD), E2E (flujos críticos). 
                                        Tests corren en cada push.
                                    </li>
                                    <li>
                                        <strong>Documentación viva:</strong> Swagger/OpenAPI auto-generado, 
                                        ADRs para decisiones técnicas, README por módulo, 
                                        diagramas de arquitectura actualizados.
                                    </li>
                                    <li>
                                        <strong>Refactoring continuo:</strong> Boy Scout Rule, 
                                        gestión de deuda técnica en backlog, SonarQube quality gates 
                                        en pipeline.
                                    </li>
                                </ul>
                            </article>

                            <article className="content-section">
                                <h2>Nuestra aproximación diferenciadora</h2>
                                <div className="approach-grid">
                                    <div className="approach-card">
                                        <h3>Clean Architecture + DDD</h3>
                                        <p>Capas desacopladas (Domain, Application, Infrastructure), 
                                        bounded contexts, value objects, aggregates. Código que 
                                        habla el lenguaje del negocio.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Type Safety End-to-End</h3>
                                        <p>TypeScript estricto, Zod para validación runtime, 
                                        tipos generados de OpenAPI/GraphQL. Cero any en producción.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Developer Experience Primero</h3>
                                        <p>Entornos locales con Docker Compose, hot reload, 
                                        seeding de datos, debugging en IDE. Onboarding {'<'} 30 min.</p>
                                    </div>
                                    <div className="approach-card">
                                        <h3>Performance desde el Inicio</h3>
                                        <p>Query optimization, caching strategy, lazy loading, 
                                        bundle analysis. Budgets de performance en CI.</p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <aside className="content-sidebar">
                            <div className="sidebar-card">
                                <h3>Principio rector</h3>
                                <p className="sidebar-text">
                                    <strong>"Hazlo bien a la primera, pero hazlo simple."</strong> 
                                    Evitamos over-engineering. YAGNI y KISS guían cada decisión 
                                    técnica. La complejidad se gana, no se regala.
                                </p>
                            </div>

                            <div className="sidebar-card">
                                <h3>Velocidad sostenible</h3>
                                <div className="timeline-info">
                                    <div className="timeline-item">
                                        <span className="timeline-label">Sprint duration</span>
                                        <span className="timeline-value">2 semanas</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Deploy frequency</span>
                                        <span className="timeline-value">Diario a staging</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Lead time</span>
                                        <span className="timeline-value">&lt; 1 día</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">MTTR</span>
                                        <span className="timeline-value">&lt; 30 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card cta-card">
                                <h3>¿Quieres conocer nuestro proceso?</h3>
                                <p>Revisamos arquitectura, patrones y estándares en una llamada técnica.</p>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-btn">Sesión técnica →</a>
                            </div>

                            <nav className="sidebar-nav" aria-label="Metodología">
                                <h3>Nuestra Metodología</h3>
                                <ul>
                                    <li><Link to="/metodologia/analisis">1. Análisis de Requerimientos</Link></li>
                                    <li><Link to="/metodologia/planificacion">2. Planificación del Proyecto</Link></li>
                                    <li className="active"><Link to="/metodologia/desarrollo">3. Desarrollo del Proyecto</Link></li>
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

export default DesarrolloProyecto;