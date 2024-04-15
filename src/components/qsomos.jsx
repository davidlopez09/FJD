import "../assets/css/qsomos.css";

export function Qsomos() {
    return (
        <div id="quienesSomos" className="quienesSomos">
            <h1 className="quienes">¿Quiénes somos?</h1>
            <div className="cont-mv">
                <p className="parrafo-mv">
                    FJD GROUP S.A.S es una empresa que se encarga de realizar y desarrollar software a la medida que se
                    adapte a la necesidad de nuestro cliente, optimizando y mejorando sus
                </p>
                <div className="mision-vision">
                    <ul className="lista-mv">
                        <div className="card-1">
                            <li className="card2" style={{ "--accent-color": "#078BCE" }}>
                                <div className="icon">
                                    <i className="bx bx-rocket"></i>
                                </div>
                                <div className="title">Misión</div>
                                <div className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium mi eros, non
                                    egestas urna suscipit sed.
                                </div>
                            </li>
                        </div>
                        <div className="card-2">
                            <li className="card2" style={{ "--accent-color": "#9c9a9a" }}>
                                <div className="icon">
                                    <i className="bx bx-show-alt"></i>
                                </div>
                                <div className="title">Visión</div>
                                <div className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium mi eros, non
                                    egestas urna suscipit sed.
                                </div>
                            </li>
                        </div>
                    </ul>
                    <p className="parrafo-mv">
                        Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industrys standard dummy text ever since the 1500s Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Qsomos;
