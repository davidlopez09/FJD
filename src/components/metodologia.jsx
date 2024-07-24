import { useState } from "react";
import "../assets/css/metodologia.css";
import analisisrequerimiento from "../assets/images/analisis.png";
import planificacionproyectos from "../assets/images/planificacion.png";
import desarrolloproyectos from "../assets/images/desarrollo.png";
import testing from "../assets/images/tester.png";

// Array de objetos con la información de cada proyecto
const proyectos = [
    {
        imagen: analisisrequerimiento,
        titulo: "Analisis de requerimiento",
        descripcion:
            "Comprendemos de forma ágil y analítica la necesidad del cliente para ofrecer soluciones efectivas y personalizadas.",
    },
    {
        imagen: planificacionproyectos,
        titulo: "Planificación del proyecto",
        descripcion:
            "Elegimos las mejores tecnologías y procesos para garantizar el éxito del proyecto, cumpliendo con los plazos y presupuestos establecidos.",
    },
    {
        imagen: desarrolloproyectos,
        titulo: "Desarrollo del proyecto",
        descripcion:
            "Desarrollamos interfaces limpias y funcionales para la implementación de soluciones robustas y escalables que satisfagan las necesidades del usuario.",
    },
    {
        imagen: testing,
        titulo: "Testing y Despliegue",
        descripcion:
            "Analizamos y hacemos seguimiento del código de manera exhaustiva, garantizando la calidad del producto final y realizando despliegues continuos para una rápida entrega al cliente.",
    },

];

 export function Metodologia() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleDescription = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="metodologia">
            <h1 className="titumeto">Utilizamos una metodología para nuestros proyectos</h1>
            <div className="subtitu">
                <p className="sub-somos">Somos un equipo enfocado a resultados y usamos la tegnologia como herramienta de creciemiento</p>
            </div>
            <div className="centered-container">
                <div className="card-cont">
                    {/* Iterar sobre el array de proyectos */}
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

export default Metodologia;
