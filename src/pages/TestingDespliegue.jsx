import { Link } from "react-router-dom";
import { Header } from "../components/header.jsx";
import { Footer } from "../components/footer.jsx";
import "../assets/css/metodologia-detail.css";

const WHATSAPP_NUMBER = "573052384659";

export function TestingDespliegue() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero solicitar una auditoría DevOps de testing, CI/CD y observabilidad.")}`;
    return (
        <>
            <Header variant="metodologia" />
            <main className="metodologia-detail-page">
                <section className="metodologia-hero">
                    <div className="hero-content">
                        <h1>Testing y Despliegue</h1>
                        <p className="hero-description">
                            Analizamos y hacemos seguimiento del código de manera exhaustiva, garantizando 
                            la calidad del producto final y realizando despliegues continuos para una 
                            entrega rápida y segura al cliente.
                        </p>
                    </div>
                </section>

                <section className="metodologia-content">
                    <div className="content-grid">
                        <div className="content-main">
                            <article className="content-section">
                                <h2>¿Qué hacemos en esta fase?</h2>
                                <p>
                                    Testing no es una fase final, es un proceso continuo. Desplegamos 
                                    múltiples veces al día a staging, validamos con tests automatizados 
                                    y manuales, y promovemos a producción con estrategias zero-downtime. 
                                    La confianza en el deploy nace de la automatización.
                                </p>
                                
                                <h3>Actividades principales</h3>
                                <ul className="activity-list">
                                    <li>
                                        <strong>Pipeline de calidad (Quality Gates):</strong> 
                                        Static analysis (SonarQube), SAST/DAST, dependency scanning, 
                                        container scanning, license compliance. Bloquea merge si falla.
                                    </li>
                                    <li>
                                        <strong>Testing automatizado en capas:</strong> 
                                        Unitarios (Jest/Vitest, &gt;85% coverage), Integración (Testcontainers,
                                        Pact para contratos), E2E (Playwright/Cypress, flujos críticos), 
                                        Performance (k6, budgets), Accessibility (axe-core).
                                    </li>
                                    <li>
                                        <strong>Testing en staging realista:</strong>
                                        Datos sintéticos representativos de escenarios reales (sin
                                        información real de clientes, conforme a nuestra política de
                                        separación de entornos), feature flags para canary releases,
                                        chaos engineering (Litmus), smoke tests post-deploy.
                                    </li>
                                    <li>
                                        <strong>Estrategias de despliegue zero-downtime:</strong> 
                                        Blue-Green, Rolling updates, Canary con Istio/Flagger, 
                                        feature flags para rollback instantáneo. Health checks 
                                        obligatorios.
                                    </li>
                                    <li>
                                        <strong>Observabilidad en producción:</strong> 
                                        SLIs/SLOs definidos, alertas accionables (no ruido), 
                                        runbooks automáticos, postmortems sin culpa (blameless).
                                    </li>
                                    <li>
                                        <strong>Validación de aceptación (UAT):</strong> 
                                        Entorno dedicado para cliente, scripts de prueba guiados, 
                                        firma formal antes de go-live, período de hipercuidado (2 semanas).
                                    </li>
                                </ul>
                            </article>
                        </div>

                        <aside className="content-sidebar">
                            <div className="sidebar-card">
                                <h3>Métricas clave</h3>
                                <p className="sidebar-text">
                                    <strong>DORA Metrics</strong> nos guían: Deployment
                                    Frequency (diario), Lead Time (&lt; 1 día), MTTR (&lt; 30 min),
                                    Change Failure Rate (&lt; 5%). Excelencia operacional medible.
                                </p>
                            </div>

                            <div className="sidebar-card">
                                <h3>Estrategias de Deploy</h3>
                                <div className="timeline-info">
                                    <div className="timeline-item">
                                        <span className="timeline-label">Canary</span>
                                        <span className="timeline-value">5% → 25% → 100%</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Blue-Green</span>
                                        <span className="timeline-value">Instant switch</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Feature Flags</span>
                                        <span className="timeline-value">Runtime toggle</span>
                                    </div>
                                    <div className="timeline-item">
                                        <span className="timeline-label">Rollback</span>
                                        <span className="timeline-value">&lt; 60 segundos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-card cta-card">
                                <h3>¿Quieres deployar con confianza?</h3>
                                <p>Implementamos CI/CD, testing y observabilidad en tu stack actual.</p>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-btn">Auditoría DevOps →</a>
                            </div>

                            <nav className="sidebar-nav" aria-label="Metodología">
                                <h3>Nuestra Metodología</h3>
                                <ul>
                                    <li><Link to="/metodologia/analisis">1. Análisis de Requerimientos</Link></li>
                                    <li><Link to="/metodologia/planificacion">2. Planificación del Proyecto</Link></li>
                                    <li><Link to="/metodologia/desarrollo">3. Desarrollo del Proyecto</Link></li>
                                    <li className="active"><Link to="/metodologia/testing">4. Testing y Despliegue</Link></li>
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

export default TestingDespliegue;