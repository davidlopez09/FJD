import "../assets/css/Caracteristicas.css";
import imagen from "./Svg/Caracteristicas.svg";
// ul
export function Caracteristicas() {
    return (
        <div className="nuestro-servicio">
            <h1 className="porque">¿Por qué elegir nuestro servicio de software?</h1>
            <div className="txt">
                <p className="nuestro">
                    Nuestro equipo de desarrollo de aplicaciones está aquí para crear soluciones a la medida que se
                    adaptan perfectamente a tus necesidades específicas.
                </p>
            </div>
            <div className="img-sub">
                <div className="img_ft">
                    <img src={imagen} alt="#" />
                </div>
                <div className="subti">
                    <h2 className="carcter">Caracteristicas especiales</h2>
                    <ul className="carac">
                        <li className="li2">Desarrollo de aplicaciones según tus requisitos</li>
                        <li className="li2">Soporte continuo y actualizaciones para garantizar</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Caracteristicas;
