
import Monteria from "../assets/images/monteria.webp";
import "../assets/css/Principal.css";


export function Principal() {
    return (
        <div id="home" className="bgContainer">
            <div className="overPlay">
                <img className="img" src={Monteria} alt="" />
                <div className="descripcion">
                    <h2 className="emp">EMPRESA DE DESARROLLO DE SOFTWARE</h2>
                    <h1 className="descrip">
                        Escuchamos y empatizamos con nuestros clientes, para la creación de estrategias de desarrollo de
                        software innovadoras y disruptivas, a través de las cuales nos hemos posicionado como un
                        referente en este mercado.
                    </h1>
                </div>
            </div>
        </div>
    );
}
export default Principal;
