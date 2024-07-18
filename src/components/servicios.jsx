import { useState } from "react";
import imagen from "../assets/images/imagen.png";
import imagen1 from "../assets/images/imagen1.png";
import imagen2 from "../assets/images/imagene2.png";
import imagen3 from "../assets/images/imagen3.png";
import imagen4 from "../assets/images/imagen4.png";
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
                        <h3 className="texto">Desarrollo de software</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de software</h3>
                        <p>
                            Nos especializamos en el diseño y desarrollo de software a medida, adaptado a las
                            necesidades específicas de nuestros clientes.
                        </p>
                        <div></div>
                    </div>
                </div>

                <div className={`card ${flippedCards[1] ? "flipped" : ""}`} onClick={() => handleCardClick(1)}>
                    <div className="face front">
                        <img src={imagen1} alt="imagen1" />
                        <h3 className="texto">Desarrollo de aplicaciones web</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones web</h3>
                        <p>
                            Como desarrolladores web experimentados, nos apasiona crear aplicaciones web modernas y
                            receptivas.
                        </p>
                        <div></div>
                    </div>
                </div>

                <div className={`card ${flippedCards[2] ? "flipped" : ""}`} onClick={() => handleCardClick(2)}>
                    <div className="face front">
                        <img src={imagen2} alt="imagen2" />
                        <h3 className="texto">Desarrollo de aplicaciones móviles</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de aplicaciones móviles</h3>
                        <p>
                            Somos expertos en el desarrollo de aplicaciones móviles que están diseñadas para impulsar tu
                            negocio y mejorar la experiencia de tus usuarios.
                        </p>
                        <div></div>
                    </div>
                </div>

                <div className={`card ${flippedCards[3] ? "flipped" : ""}`} onClick={() => handleCardClick(3)}>
                    <div className="face front">
                        <img src={imagen3} alt="imagen3" />
                        <h3 className="texto">Expertos en desarrollo API</h3>
                    </div>
                    <div className="face back">
                        <h3>Expertos en desarrollo API</h3>
                        <p>
                            Como expertos en desarrollo API, diseñamos y construimos interfaces de programación de
                            aplicaciones sólidas y eficientes.
                        </p>
                        <div></div>
                    </div>
                </div>

                <div className={`card ${flippedCards[4] ? "flipped" : ""}`} onClick={() => handleCardClick(4)}>
                    <div className="face front">
                        <img src={imagen4} alt="imagen4"/>
                        <h3 className="texto">Desarrollo de código seguro</h3>
                    </div>
                    <div className="face back">
                        <h3>Desarrollo de código seguro</h3>
                        <p>Nuestra especialidad es el desarrollo de código web seguro y confiable.</p>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Servicios;
