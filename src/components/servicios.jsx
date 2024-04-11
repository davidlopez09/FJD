import imagen from "../assets/images/imagen.jpg";
import imagen1 from "../assets/images/imagen1.jpg";
import imagen2 from "../assets/images/imagen2.jpg";
import imagen3 from "../assets/images/imagen3.jpg";
import imagen4 from "../assets/images/imagen4.jpg";
import "../assets/css/servicios.css";

export function Servicios() {
    // Definimos una matriz de objetos que contiene la imagen y el texto asociado
    const imagenesConTexto = [
        { imagen: imagen, texto: "Desarrollo de software" },
        { imagen: imagen1, texto: "Desarrollo de aplicaciones web" },
        { imagen: imagen2, texto: "Desarrollo de aplicaciones móviles" },
        { imagen: imagen3, texto: "Expertos en desarrollo API" },
        { imagen: imagen4, texto: "Desarrollo de código seguro" },
    ];

    return (
        <div id="servicios" className="servicios">
            <h2>EXPERTOS EN DESARROLLO A LA MEDIDA</h2>
            {/* Renderizamos cada imagen con su texto y botón asociado */}
            <div className="images-container">
                {imagenesConTexto.map((item, index) => (
                    <div key={index} className="img-container">
                        <div className="text-overlay">
                            <h4>{item.texto}</h4>
                            <div className="bton">
                                <a href="/">
                                    <button>Ver más</button>
                                </a>
                            </div>
                        </div>
                        <img src={item.imagen} alt={`Imagen ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Servicios;
