import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/css/header.css";

const WHATSAPP_NUMBER = "573052384659";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, quiero solicitar una asesoría para mi proyecto de software."
)}`;

const mainNav = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "¿Quiénes Somos?", href: "#quienesSomos" },
    { label: "Blog", href: "#blog" },
    { label: "Contáctanos", href: "#contactanos" },
];

const legalNav = [
    { label: "Inicio", href: "/" },
    { label: "Centro Legal", href: "/legal" },
    { label: "Privacidad", href: "/politicas-privacidad" },
    { label: "Términos", href: "/legal/terminos-y-condiciones" },
    { label: "Eliminación de datos", href: "/legal/eliminacion-de-datos" },
    { label: "Tratamiento de datos", href: "/legal/tratamiento-de-datos-personales" },
    { label: "Seguridad", href: "/legal/seguridad-de-la-informacion" },
    { label: "Cookies", href: "/legal/cookies" },
];

const metodologiaNav = [
    { label: "Inicio", href: "/" },
    { label: "Análisis de Requerimientos", href: "/metodologia/analisis" },
    { label: "Planificación del Proyecto", href: "/metodologia/planificacion" },
    { label: "Desarrollo del Proyecto", href: "/metodologia/desarrollo" },
    { label: "Testing y Despliegue", href: "/metodologia/testing" },
];

export function Header({ variant }) {
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    const isMainPage = location.pathname === "/";
    let navLinks;
    if (variant === "legal") {
        navLinks = legalNav;
    } else if (variant === "metodologia") {
        navLinks = metodologiaNav;
    } else {
        navLinks = mainNav;
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const handleMenuClick = () => {
        setMenu(false);
    };

    const renderNavLink = (link) => {
        const isHashLink = link.href.startsWith("#");
        if (isHashLink && isMainPage) {
            return (
                <a href={link.href} className="nav-link" onClick={handleMenuClick}>
                    {link.label}
                </a>
            );
        }
        if (isHashLink && !isMainPage) {
            return (
                <Link to={"/" + link.href} className="nav-link" onClick={handleMenuClick}>
                    {link.label}
                </Link>
            );
        }
        return (
            <Link to={link.href} className="nav-link" onClick={handleMenuClick}>
                {link.label}
            </Link>
        );
    };

    return (
        <div className="container">
            <header className="nav">
                <div className="page-header">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="Logo FJD" />
                        </Link>
                    </div>
                    <div className={`icon nav-icon-5 ${menu ? "open" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`Cabecera-nav ${menu ? "isActive" : ""}`}>
                        <nav className="navbar">
                            <ul className="Cabecera-ul">
                                {navLinks.map((link, i) => (
                                    <li className="Cabecera-li" key={i}>
                                        {renderNavLink(link)}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <a
                            href={WHATSAPP_URL}
                            className="button"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMenuClick}
                            aria-label="Solicitar asesoría por WhatsApp">
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
