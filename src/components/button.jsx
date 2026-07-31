import { useState, useEffect } from "react";
import "../assets/css/button.css";

const WHATSAPP_NUMBER = "573052384659";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Button() {
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        setShowBubble(true);
        const timer = setTimeout(() => setShowBubble(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const openWhatsApp = (e) => {
        e.preventDefault();
        window.open(WHATSAPP_URL, "_blank");
    };

    return (
        <div className="whatsapp-wrapper">
            <a
                id="contactos"
                className="btn-wsp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
            >
                <i className="bx bxl-whatsapp"></i>
            </a>
            {showBubble && (
                <div className="whatsapp-bubble" onClick={openWhatsApp}>
                    <span>Contáctanos</span>
                    <div className="bubble-arrow"></div>
                </div>
            )}
        </div>
    );
}

export default Button;