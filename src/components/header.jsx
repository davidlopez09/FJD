import { useState } from "react";
import logofjd from "../assets/images/logofjd.png";
import "../assets/css/header.css";

export function Header() {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const handleMenuClick = () => {
        // Cierra el menú al hacer clic en un enlace del menú
        setMenu(false);
    };

    return (
        <div className="container">
            <header className="nav">
                <div className="page-header">
                    <div className="logo">
                        <a href="index.html">
                            <img src={logofjd} alt="Logo FJD" />
                        </a>
                    </div>
                    <div className={`icon nav-icon-5 ${menu ? "open" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`Cabecera-nav ${menu ? "isActive" : ""}`}>
                        <nav className="navbar">
                            
                            <ul className="Cabecera-ul">
                                <li className="Cabecera-li">
                                    <a href="#home" className="nav-link" onClick={handleMenuClick}>
                                        Inicio
                                    </a>
                                </li>
                                <li className="Cabecera-li">
                                    <a href="#servicios" className="nav-link" onClick={handleMenuClick}>
                                        Servicios
                                    </a>
                                </li>
                                <li className="Cabecera-li">
                                    <a href="#portafolio" className="nav-link" onClick={handleMenuClick}>
                                        Portafolio
                                    </a>
                                </li>
                                <li className="Cabecera-li">
                                    <a href="#quienesSomos" className="nav-link" onClick={handleMenuClick}>
                                        ¿Quiénes Somos?
                                    </a>
                                </li>
                                <li className="Cabecera-li">
                                    <a href="#blog" className="nav-link" onClick={handleMenuClick}>
                                        Blog
                                    </a>
                                </li>
                                <li className="Cabecera-li">
                                    <a href="#contactanos" className="nav-link" onClick={handleMenuClick}>
                                        Contáctanos
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <a href="#" className="button">
                            <i className="bx bx-help-circle"></i>
                            <span>Ayuda</span>
                        </a>
                    </div>
                </div>
            </header>
            <br />
            <br />
            <br />
        </div>
    );
}

export default Header;
