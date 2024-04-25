import { useState } from "react";
import imagen from "../assets/images/imagen.jpg";
import imagen1 from "../assets/images/imagen1.webp";
import imagen2 from "../assets/images/imagene2.webp";
import imagen3 from "../assets/images/imagen3.webp";
import imagen4 from "../assets/images/imagene4.webp";
import "../assets/css/servicios.css";

export function Servicios() {
    const [flippedCards, setFlippedCards] = useState(Array(5).fill(false));

    const handleCardClick = (index) => {
        const newFlippedCards = [...flippedCards];
        newFlippedCards[index] = !newFlippedCards[index];
        setFlippedCards(newFlippedCards);
    };

    return (
        <div id="servicios" className="card-container">
            <div className="title-card">
                <h2 className="title">EXPERTOS EN DESARROLLO A LA MEDIDA</h2>
            </div>
            <div className="cards-container">
                <div className={`card ${flippedCards[0] ? "flipped" : ""}`} onClick={() => handleCardClick(0)}>
                    <div className="face front">
                        <img src={imagen} alt="imagen" />
                        <h3>Desarrollo de software</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de software</h3>
                        <p>
                            Nos especializamos en el diseño y desarrollo de software a medida, adaptado a las
                            necesidades específicas de nuestros clientes.
                        </p>
                        <div className="link">
                            <a href="https://www.ibm.com/es-es/topics/software-development">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className={`card ${flippedCards[1] ? "flipped" : ""}`} onClick={() => handleCardClick(1)}>
                    <div className="face front">
                        <img src={imagen1} alt="imagen1" />
                        <h3>Desarrollo de aplicaciones web</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones web</h3>
                        <p>
                            Como desarrolladores web experimentados, nos apasiona crear aplicaciones web modernas y
                            receptivas.
                        </p>
                        <div className="link">
                            <a href="https://appmaster.io/es/blog/desarrollo-de-aplicaciones-web">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className={`card ${flippedCards[2] ? "flipped" : ""}`} onClick={() => handleCardClick(2)}>
                    <div className="face front">
                        <img src={imagen2} alt="imagen2" />
                        <h3>Desarrollo de aplicaciones móviles</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones móviles</h3>
                        <p>
                            Somos expertos en el desarrollo de aplicaciones móviles que están diseñadas para impulsar tu
                            negocio y mejorar la experiencia de tus usuarios.
                        </p>
                        <div className="link">
                            <a href="https://www.ibm.com/mx-es/topics/mobile-application-development">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className={`card ${flippedCards[3] ? "flipped" : ""}`} onClick={() => handleCardClick(3)}>
                    <div className="face front">
                        <img src={imagen3} alt="imagen3" />
                        <h3>Expertos en desarrollo API</h3>
                    </div>
                    <div className="face back">
                        <h3>Expertos en desarrollo API</h3>
                        <p>
                            Como expertos en desarrollo API, diseñamos y construimos interfaces de programación de
                            aplicaciones sólidas y eficientes.
                        </p>
                        <div className="link">
                            <a href="#">Ver más</a>
                        </div>
                    </div>
                </div>

                <div className={`card ${flippedCards[4] ? "flipped" : ""}`} onClick={() => handleCardClick(4)}>
                    <div className="face front">
                        <img src={imagen4} alt="imagen4" />
                        <h3>Desarrollo de código seguro</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de código seguro</h3>
                        <p>Nuestra especialidad es el desarrollo de código web seguro y confiable.</p>
                        <div className="link">
                            <a href="https://www.omatech.com/blog/2022/11/30/buenas-practicas-para-un-desarrollo-seguro/#:~:text=El%20desarrollo%20seguro%20es%20la,con%20distintos%20niveles%20de%20complejidad.">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Servicios;
