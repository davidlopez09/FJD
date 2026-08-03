import { useState } from "react";
import imagen from "./Svg/AlumbradoPublico.svg";
import imagen1 from "./Svg/Espiral.svg";
import imagen2 from "../assets/images/censoarboreo.jpeg";
import imagen3 from "./Svg/PerdidasEnergia.svg";
import { MapaLuminarias } from "./ProjectVisuals/MapaLuminarias.jsx";
import "../assets/css/portfolio.css";

const VISUALS = {
    alumbrado: MapaLuminarias,
};

function ProjectVisual({ type, compact = false }) {
    const Visual = VISUALS[type];
    return <Visual compact={compact} />;
}

export function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            name: "Alumbrado Público",
            category: "Gobierno / Smart City",
            description: "Sistema de Información para Administración y control Operativo de Alumbrados Públicos.",
            image: imagen,
            visualType: "alumbrado",
            fullDescription: "Plataforma integral para la gestión, monitoreo y control operativo de redes de alumbrado público municipal. Permite la georreferenciación de cada punto de luz, programación de encendido/apagado por sectores, detección automática de fallas, gestión de mantenimiento preventivo y correctivo, y generación de reportes de consumo energético y ahorro.",
            highlights: [
                "Gestión de 50k+ luminarias en tiempo real",
                "Monitoreo IoT con sensores de consumo y estado",
                "Reportes automáticos de ahorro energético y fallas",
                "App móvil para cuadrillas de mantenimiento",
                "Integración con facturación eléctrica municipal",
                "Dashboard ejecutivo para toma de decisiones"
            ],
            metrics: [
                { label: "Luminarias gestionadas", value: "50,000+" },
                { label: "Reducción consumo", value: "35%" },
                { label: "Tiempo respuesta fallas", value: "< 2h" },
                { label: "Municipios activos", value: "12" }
            ],
            tech: ["React", "Node.js", "PostgreSQL", "PostGIS", "MQTT", "Docker"],
            duration: "8 meses",
            team: "5 desarrolladores + 2 QA"
        },
        {
            id: 2,
            name: "Espiral",
            category: "Comercial / Movilidad",
            description: "Aplicativo para Distribuidoras de ventas a través de dispositivos móviles.",
            image: imagen1,
            fullDescription: "Aplicación móvil offline-first diseñada para fuerzas de venta en campo de distribuidoras mayoristas. Permite gestión de catálogo de productos, toma de pedidos sin conexión, sincronización automática al recuperar conectividad, rutas de visita optimizadas, control de inventario en vehículo y generación de comprobantes electrónicos.",
            highlights: [
                "Modo offline-first con sincronización inteligente",
                "Catálogo dinámico con precios por cliente",
                "Rutas optimizadas con geolocalización",
                "Emisión de facturas/boletas en dispositivo",
                "Control de stock en vehículo en tiempo real",
                "Dashboards de rendimiento por vendedor"
            ],
            metrics: [
                { label: "Vendedores activos", value: "500+" },
                { label: "Pedidos/mes", value: "25,000+" },
                { label: "Tiempo sincronización", value: "< 3 seg" },
                { label: "Disponibilidad offline", value: "99.9%" }
            ],
            tech: ["Flutter", "Dart", "Firebase", "SQLite", "REST API", "Bloc"],
            duration: "6 meses",
            team: "4 desarrolladores + 1 UX"
        },
        {
            id: 3,
            name: "Censo Arbóreo",
            category: "Medio Ambiente / GIS",
            description: "Geolocalización y seguimiento de especies de árboles con todas sus características.",
            image: imagen2,
            fullDescription: "Sistema de información geográfica para la gestión integral del arbolado urbano. Permite el censo completo de ejemplares, fichas técnicas por especie (altura, DAP, estado fitosanitario, edad estimada), planificación de podas y tratamientos, alertas de riesgo de caída, histórico de intervenciones y generación de indicadores ambientales para planes de forestación.",
            highlights: [
                "10,000+ árboles georreferenciados con ficha completa",
                "Análisis fitosanitario con IA para detección temprana",
                "Planificador de podas por sectores y prioridad",
                "Alertas automáticas de riesgo de caída",
                "Dashboard ambiental con indicadores de cobertura",
                "App de campo para censistas con GPS de alta precisión"
            ],
            metrics: [
                { label: "Especies registradas", value: "85+" },
                { label: "Cobertura urbana", value: "12.5 m²/hab" },
                { label: "Intervenciones/año", value: "3,200+" },
                { label: "Precisión GPS", value: "< 1m" }
            ],
            tech: ["React Native", "Mapbox GL", "PostGIS", "Python", "TensorFlow", "Django"],
            duration: "10 meses",
            team: "6 desarrolladores + 2 GIS + 1 IA"
        },
        {
            id: 4,
            name: "Pérdidas de Energía",
            category: "Energía / Utilities",
            description: "Control operativo y comercial de clientes para detección de pérdidas técnicas y no técnicas.",
            image: imagen3,
            fullDescription: "Plataforma analítica para la detección y gestión de pérdidas de energía (técnicas y no técnicas) en redes de distribución eléctrica. Integra datos de medición inteligente, facturación, inspecciones de campo y variables de red para identificar anomalías de consumo, conexiones irregulares, errores de medición y deterioro de infraestructura.",
            highlights: [
                "Detección automática de anomalías por ML",
                "Balance energético por transformador/alimentador",
                "Gestión de inspecciones y regularizaciones",
                "Alertas inteligentes de consumo atípico",
                "Cálculo de pérdidas técnicas vs no técnicas",
                "Portal de denuncias ciudadanas integrado"
            ],
            metrics: [
                { label: "Clientes monitoreados", value: "200,000+" },
                { label: "Reducción pérdidas no técnicas", value: "28%" },
                { label: "Inspecciones/año", value: "15,000+" },
                { label: "Precisión modelo ML", value: "92%" }
            ],
            tech: ["Vue.js", "Spring Boot", "Oracle", "Apache Kafka", "Python", "Docker"],
            duration: "12 meses",
            team: "8 desarrolladores + 3 Data Scientists"
        }
    ];

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <section id="portafolio" className="portfolio" aria-labelledby="portfolio-title">
            <div className="portfolio-header">
                <h1 id="portfolio-title" className="title-port">Portafolio</h1>
                <p className="subti-porta">Nuestros últimos proyectos destacados</p>
                <div className="header-divider"></div>
            </div>

            <div className="projects-grid">
                {projects.map((project) => (
                    <article key={project.id} className="project-card">
                        <div className="project-image">
                            {project.visualType ? (
                                <ProjectVisual type={project.visualType} compact />
                            ) : (
                                <img src={project.image} alt={project.name} loading="lazy" />
                            )}
                        </div>
                        <div className="project-body">
                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-description">{project.description}</p>
                            <button
                                className="project-link"
                                onClick={() => openModal(project)}
                                aria-label={`Ver caso de estudio de ${project.name}`}
                            >
                                Ver caso de estudio →
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div className="portfolio-cta">
                <p>¿Tienes un proyecto en mente? <a href="#contactanos">Hablemos</a></p>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="modal-content">
                            <span className="modal-category">{selectedProject.category}</span>
                            <h2 id="modal-title" className="modal-title">{selectedProject.name}</h2>
                            <p className="modal-description">{selectedProject.fullDescription}</p>

                            <div className="modal-metrics">
                                {selectedProject.metrics.map((metric, i) => (
                                    <div key={i} className="metric">
                                        <span className="metric-value">{metric.value}</span>
                                        <span className="metric-label">{metric.label}</span>
                                    </div>
                                ))}
                            </div>

                            {selectedProject.visualType && (
                                <div className="modal-section">
                                    <h3>Visualización</h3>
                                    <ProjectVisual type={selectedProject.visualType} />
                                </div>
                            )}

                            <div className="modal-section">
                                <h3>Aspectos destacados</h3>
                                <ul className="modal-highlights">
                                    {selectedProject.highlights.map((highlight, i) => (
                                        <li key={i}>
                                            <span className="highlight-dot"></span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-section">
                                <h3>Stack tecnológico</h3>
                                <div className="modal-tech">
                                    {selectedProject.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Duración</span>
                                    <span className="meta-value">{selectedProject.duration}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Equipo</span>
                                    <span className="meta-value">{selectedProject.team}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Portfolio;