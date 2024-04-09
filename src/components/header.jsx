import logofjd from "../assets/images/logofjd.png"; 

 export function Header() {
    return (
        <div className="container">
            <header className="nav">
                <div className="page-header">
                    <div className="logo">
                        <a href="index.html">
                            <img src={logofjd} alt="Logo FJD" />
                        </a>
                    </div>
                    <label className="mainicon">
                        <div className="menu">
                            <i className="bx bx-menu"></i>
                        </div>
                    </label>
                    <ul>
                        <li>
                            <a href="#home" className="nav-link">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="#servicios" className="nav-link">
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a href="#portafolio" className="nav-link">
                                Portafolio
                            </a>
                        </li>
                        <li>
                            <a href="#quienes" className="nav-link">
                                ¿Quiénes Somos?
                            </a>
                        </li>
                        <li>
                            <a href="#blog" className="nav-link">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#contactanos" className="nav-link">
                                Contáctanos
                            </a>
                        </li>
                    </ul>
                    <a href="#" className="button">
                        Ayuda?
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Header;


