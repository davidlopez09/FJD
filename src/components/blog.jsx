import { Link } from "react-router-dom";
import "../assets/css/blogs.css";
import blogs from "../components/Svg/Blog.svg"
import ComoDesarrollan from "./Svg/ComoDesarrollan.svg";
import QueNecesito from "./Svg/QueNecesito.svg";
import ComoFunciona from "./Svg/ComoFunciona.svg";
import ConsejosVitales from "./Svg/ConsejosVitales.svg";

// Array de objetos con la información de cada proyecto.
// `enlace`: pendiente de recibir las URLs. Mientras esté vacío no se
// muestra el "Leer más". Acepta ruta interna ("/blog/...") o URL externa.
const proyectos = [
    {
        imagen: ComoDesarrollan,
        titulo: "¿Cómo se desarrollan las aplicaciones en Colombia?",
        descripcion:
            "El desarrollo de aplicaciones en Colombia está en auge, con un enfoque en soluciones innovadoras y personalizadas, impulsado por la transformación digital y una comunidad de desarrolladores activa.",
        enlace: "",
    },
    {
        imagen: QueNecesito,
        titulo: "¿Qué necesito para desarrollar aplicaciones móviles en Colombia?",
        descripcion:
            "Desarrollar aplicaciones móviles en Colombia requiere conocimientos técnicos en programación, herramientas de desarrollo como IDEs, cumplimiento de normativas locales y acceso a internet y dispositivos para pruebas.",
        enlace: "",
    },
    {
        imagen: ComoFunciona,
        titulo: "¿Qué es y como funciona el desarrollo de aplicaciones móviles?",
        descripcion:
            "El desarrollo de aplicaciones móviles, según IBM, abarca diseñar y codificar apps, integrarlas con servicios en la nube, probarlas, lanzarlas en tiendas de aplicaciones y mantenerlas con actualizaciones periódicas.",
        enlace: "",
    },
    {
        imagen: ConsejosVitales,
        titulo: "9 consejos vitales para el desarrollo de software a medida",
        descripcion:
            "Para desarrollar software a medida, establece objetivos claros, selecciona un buen equipo, comunica bien, usa metodologías ágiles, y asegura calidad, presupuesto, pruebas, escalabilidad y soporte continuo.",
        enlace: "",
    },
];

function LeerMas({ enlace, titulo }) {
    if (!enlace) return null;

    const contenido = (
        <>
            Leer más <span className="blog-link-arrow">→</span>
        </>
    );
    const etiqueta = `Leer más sobre ${titulo}`;

    if (enlace.startsWith("/")) {
        return (
            <Link to={enlace} className="blog-card-link" aria-label={etiqueta}>
                {contenido}
            </Link>
        );
    }

    return (
        <a
            href={enlace}
            className="blog-card-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={etiqueta}
        >
            {contenido}
        </a>
    );
}

export function Blogs() {
    return (
        <div id="blog" className="blogs">
            <div className="blogs-title">
                <div className="blog-noticias">
                    <h1 className="titublogs">Blogs y noticias sobre el desarrollo de software</h1>
                    <p className="subtiblogs">Entérate de las últimas noticias sobre el desarrollo de software</p>
                </div>
                <img className="img-blogs" src={blogs} alt="#" />
            </div>

            <div className="blogs-grid">
                {proyectos.map((proyecto, index) => (
                    <article key={index} className="blog-card">
                        <div className="blog-card-media">
                            <img
                                src={proyecto.imagen}
                                alt={proyecto.titulo}
                                className="blog-card-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="blog-card-body">
                            <h2 className="blog-card-title">{proyecto.titulo}</h2>
                            <p className="blog-card-text">{proyecto.descripcion}</p>
                            <LeerMas enlace={proyecto.enlace} titulo={proyecto.titulo} />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Blogs;
