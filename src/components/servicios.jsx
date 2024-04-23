import imagen from "../assets/images/imagen.jpg";
import imagen1 from "../assets/images/imagen1.webp";
import imagen2 from "../assets/images/imagene2.webp";
import imagen3 from "../assets/images/imagen3.webp";
import imagen4 from "../assets/images/imagene4.webp";
import "../assets/css/servicios.css";

export function Servicios() {
    return (    
        <div id="servicios" className="card-container">
            <div className="title-card">
                <h2 className="title">EXPERTOS EN DESARROLLO A LA MEDIDA</h2>
            </div>
            <div className="cards-container">
                <div className="card">
                    <div className="face front">
                        <img src={imagen} />
                        <h3>Desarrollo de software</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de software</h3>
                        <p>
                            nos especializamos en el diseño y desarrollo de software a medida, adaptado a las
                            necesidades específicas de mis clientes.
                        </p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="face front">
                        <img src={imagen1} />
                        <h3>Desarrollo de aplicaciones web</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones web</h3>
                        <p>
                            Como desarrolladores web experimentados, nos apasiona crear aplicaciones web modernas y
                            receptivas.
                        </p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="face front">
                        <img src={imagen2} />
                        <h3>Desarrollo de aplicaciones moviles</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones moviles</h3>
                        <p>
                            Somos expertos en el desarrollo de aplicaciones móviles que están diseñadas para impulsar tu
                            negocio y mejorar la experiencia de tus usuarios.
                        </p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="face front">
                        <img src={imagen3} />
                        <h3>Expertos en desarrollo api</h3>
                    </div>
                    <div className="face back">
                        <h3>Expertos en desarrollo api</h3>
                        <p>
                            Como expertos en desarrollo API, diseño y construyo interfaces de programación de
                            aplicaciones sólidas y eficientes
                        </p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="face front">
                        <img src={imagen4} />
                        <h3>Desarrollo de codigo seguro</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de codigo seguro</h3>
                        <p>Nuestra especialidad es el desarrollo de código web seguro y confiable.</p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Servicios;
