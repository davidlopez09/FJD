import "../assets/css/qsomos.css";

export function Qsomos() {
    return (
        <div id="quienesSomos" className="quienesSomos">
            <h1 className="quienes">¿Quiénes somos?</h1>
            <div className="cont-mv">
                <p className="parrafo-mv">
                    FJD GROUP SAS es una empresa que se encarga de realizar y desarrollar software a la medida que se
                    adapte a la necesidad de nuestro cliente.
                </p>
                <div className="mision-vision">
                    <ul className="lista-mv">
                        <div className="card-1">
                            <li className="card2" style={{ "--accent-color": "#078BCE" }}>
                                <div className="icon">
                                    <i className="bx bx-rocket"></i>
                                </div>
                                <div className="title">Misión</div>
                                <div className="content">Creamos tecnologías personalizadas para cada necesidad.</div>
                            </li>
                        </div>
                        <div className="card-2">
                            <li className="card2" style={{ "--accent-color": "#9c9a9a" }}>
                                <div className="icon">
                                    <i className="bx bx-show-alt"></i>
                                </div>
                                <div className="title">Visión</div>
                                <div className="content">
                                    Consolidarnos como empresa líder de mercados donde operamos, logrando crecimientos
                                    en los diferentes ámbitos y realizando el trabajo con calidad, seguridad y cuidando
                                    del medio ambiente.
                                </div>
                            </li>
                        </div>
                    </ul>
                    <p className="parrafo-mv">
                        Brindando el desarrollo a medida que tu empresa necesita para alcanzar nuevas metas
                        corporativas.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Qsomos;
