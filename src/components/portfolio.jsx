import imagen from "../assets/images/imagen.jpg";
import imagen1 from "../assets/images/imagen1.jpg";
import imagen2 from "../assets/images/imagen2.jpg";
import imagen3 from "../assets/images/imagen3.jpg";
import imagen4 from "../assets/images/imagen4.jpg";
import "../assets/css/portfolio.css";

export function Portfolio() {
    return (
        <div id="portafolio" className="portfolio">
            <h1 className="title-port">Portafolio</h1>
            <div className="wrapper">
                <div className="card-port">
                    <div className="poster">
                        <img src={imagen} />
                    </div>
                    <div className="details">
                        <h1>Location Unknown</h1>
                        <p className="desc">
                            Marco, a disillusioned backpacker in his late 20s, embarks on a solitary journey in search
                            for meaning.
                        </p>
                    </div>
                </div>
                <div className="card-port">
                    <div className="poster">
                        <img src={imagen1} />
                    </div>
                    <div className="details">
                        <h1>Air</h1>
                        <p className="desc">
                            Lily, the travel writer, and Nathan, the book editor, goes on a plane together to the alps.
                        </p>
                    </div>
                </div>
                <div className="card-port">
                    <div className="poster">
                        <img src={imagen2} />
                    </div>
                    <div className="details">
                        <h1>End Credits</h1>
                        <p className="desc">
                            Alex and his best friend goes on a road trip whilst experiencing friendship, self-discovery,
                            and the bittersweet transition to adulthood.
                        </p>
                    </div>
                </div>
                <div className="card-port">
                    <div className="poster">
                        <img src={imagen3} />
                    </div>
                    <div className="details">
                        <h1>End Credits</h1>
                        <p className="desc">
                            Alex and his best friend goes on a road trip whilst experiencing friendship, self-discovery,
                            and the bittersweet transition to adulthood.
                        </p>
                    </div>
                </div>
                <div className="card-port">
                    <div className="poster">
                        <img src={imagen4} />
                    </div>
                    <div className="details">
                        <h1>End Credits</h1>
                        <p className="desc">
                            Alex and his best friend goes on a road trip whilst experiencing friendship, self-discovery,
                            and the bittersweet transition to adulthood.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Portfolio;
