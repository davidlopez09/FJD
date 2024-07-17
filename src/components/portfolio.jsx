import { useState } from "react";
import imagen from "../assets/images/alumbrado.jpeg";
import imagen1 from "../assets/images/Espiral3.png";
import imagen2 from "../assets/images/censoarboreo.jpeg";
import imagen3 from "../assets/images/perdidas.png";
import "../assets/css/portfolio.css";

export function Portfolio() {
    const [flippedCards, setFlippedCards] = useState(Array(5).fill(false));

    const handleCardClick = (index) => {
        const newFlippedCards = [...flippedCards];
        newFlippedCards[index] = !newFlippedCards[index];
        setFlippedCards(newFlippedCards);
    };
    return (
        <div id="portafolio" className="portfolio">
            <h1 className="title-port">Portafolio</h1>
            <center>
                <p className="subti-porta">Nuestros ultimos proyectos.</p>
            </center>
            <div className="wrapper">
                <div className={`card-port ${flippedCards[0] ? "flipped" : ""}`} onClick={() => handleCardClick(0)}>
                    <div className="poster">
                        <img className="alumbrado" src={imagen} />
                    </div>
                    <div className="details">
                        <h1>Alumbrado Público</h1>
                        <p className="desc">
                            Marco, a disillusioned backpacker in his late 20s
                        </p>
                    </div>
                </div>
                <div className={`card-port ${flippedCards[1] ? "flipped" : ""}`} onClick={() => handleCardClick(1)}>
                    <div className="poster">
                        <img src={imagen1} />
                    </div>
                    <div className="details">
                        <h1>Espiral</h1>
                        <p className="desc">
                            Lily, the travel writer, and Nathan, the book editor, goes on a plane together to the alps.
                        </p>
                    </div>
                </div>
                <div className={`card-port ${flippedCards[2] ? "flipped" : ""}`} onClick={() => handleCardClick(2)}>
                    <div className="poster">
                        <img src={imagen2} />
                    </div>
                    <div className="details">
                        <h1>Censo arboreo</h1>
                        <p className="desc">
                            Alex and his best friend goes on a road trip whilst experiencing friendship.
                        </p>
                    </div>
                </div>
                <div className={`card-port ${flippedCards[3] ? "flipped" : ""}`} onClick={() => handleCardClick(3)}>
                    <div className="poster">
                        <img src={imagen3} />
                    </div>
                    <div className="details">
                        <h1>Perdidas</h1>
                        <p className="desc">
                            Alex and his best friend goes on a road trip whilst experiencing friendship.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Portfolio;
