import "../assets/css/blogs.css";
import "../assets/css/metodologia.css";
import blogs from "../components/Svg/Blog.svg"
import ComoDesarrollan from "./Svg/ComoDesarrollan.svg";
import QueNecesito from "./Svg/QueNecesito.svg";
import ComoFunciona from "./Svg/ComoFunciona.svg";
import ConsejosVitales from "./Svg/ConsejosVitales.svg";
import { useState } from "react";

// Array de objetos con la información de cada proyecto
const proyectos = [
    {
        imagen: ComoDesarrollan,
        titulo: "¿Cómo se desarrollan las aplicaciones en Colombia?",
        descripcion:
            "El desarrollo de aplicaciones en Colombia está en auge, con un enfoque en soluciones innovadoras y personalizadas, impulsado por la transformación digital y una comunidad de desarrolladores activa.",
    },
    {
        imagen: QueNecesito,
        titulo: "¿Qué necesito para desarrollar aplicaciones móviles en Colombia?",
        descripcion:
            "Desarrollar aplicaciones móviles en Colombia requiere conocimientos técnicos en programación, herramientas de desarrollo como IDEs, cumplimiento de normativas locales y acceso a internet y dispositivos para pruebas.",
    },
    {
        imagen: ComoFunciona,
        titulo: "¿Qué es y como funciona el desarrollo de aplicaciones móviles?",
        descripcion:
            "El desarrollo de aplicaciones móviles, según IBM, abarca diseñar y codificar apps, integrarlas con servicios en la nube, probarlas, lanzarlas en tiendas de aplicaciones y mantenerlas con actualizaciones periódicas.",
    },
    {
        imagen: ConsejosVitales,
        titulo: "9 consejos vitales para el desarrollo de software a medida",
        descripcion:
            "Para desarrollar software a medida, establece objetivos claros, selecciona un buen equipo, comunica bien, usa metodologías ágiles, y asegura calidad, presupuesto, pruebas, escalabilidad y soporte continuo.",
    },
];

export function Blogs() {
           const [expandedIndex, setExpandedIndex] = useState(null);

           const toggleDescription = (index) => {
               setExpandedIndex(expandedIndex === index ? null : index);
           };
    return (
        <div id="blog" className="blogs">
            <div className="blogs-title">
                <div className="blog-noticias">
                    <h1 className="titublogs">Blogs y noticias sobre el desarrollo de software</h1>
                    <p className="subtiblogs">Entérate de las últimas noticias sobre el desarrollo de software</p>
                </div>
                <img className="img-blogs" src={blogs} alt="#" />
            </div>

            <div className="card-blogs">
                <div className="card-cont">
                    {proyectos.map((proyecto, index) => (
                        <div key={index} className="card-meto">
                            <img src={proyecto.imagen} alt="Imagen" className="card-image" />
                            <h2 className="card-title">{proyecto.titulo}</h2>
                            <p className={`card-des ${expandedIndex === index ? "expanded" : ""}`}>
                                {proyecto.descripcion}
                            </p>
                            <button className="btn-vm" onClick={() => toggleDescription(index)}>
                                {expandedIndex === index ? "Ver menos" : "Ver más"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Blogs;
