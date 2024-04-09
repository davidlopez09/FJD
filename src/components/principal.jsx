import inicio from "../assets/videos/home.mp4"; 


export function Principal() {
    return (
        <div className="bgContainer">
            <div className="overPlay">
                <video className="video" src={inicio} autoPlay loop muted />
                <div className="container">
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
