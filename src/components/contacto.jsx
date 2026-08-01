import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import colombiaData from "../data/colombia.json"; // Importamos el JSON
import "../assets/css/contacto.css";

export function Contactanos() {
    const [countries, setCountries] = useState(["Colombia"]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        // Inicialmente, solo cargamos el país Colombia
        setStates(colombiaData[0].departamentos);
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        if (selectedCountry === "Colombia") {
            setStates(colombiaData[0].departamentos);
            setCities([]);
        }
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        const departamento = states.find((d) => d.departamento === selectedState);
        setCities(departamento ? departamento.ciudades : []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const tel = form.tel.value.trim();
        const country = form.country.value.trim();
        const state = form.state.value.trim();
        const city = form.city.value.trim();
        const empresa = form.empresa.value.trim();
        const proyectocotizar = form.proyectocotizar.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (!name || !email || !tel || !country || !state || !city || !empresa || !proyectocotizar || !mensaje) {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos antes de enviar.",
                icon: "error",
            });
            return;
        }

        emailjs.sendForm("service_o2dookt", "template_h52zqce", form, "1QvvX7cuRjnzmult9").then(
            (result) => {
                console.log(result.text);
                Swal.fire({
                    title: "Envio exitoso!",
                    text: "Mensaje enviado exitosamente",
                    icon: "success",
                });
                form.reset();
                setStates([]);
                setCities([]);
            },
            (error) => {
                console.log(error.text);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al enviar el mensaje, intenta nuevamente",
                    icon: "error",
                });
            }
        );
    };

    return (
        <section id="contactanos" className="contacto" aria-labelledby="contacto-titulo">
            <div className="contacto-header">
                <h1 id="contacto-titulo" className="contacto-titulo">Contáctanos</h1>
                <p className="parrafo-contacto">¡Cuéntanos en que podemos ayudarte hoy!</p>
            </div>

            <div className="contacto-grid">
                {/* Columna izquierda: mapa y datos de contacto */}
                <aside className="contacto-info">
                    <ul className="contacto-datos">
                        <li className="dato">
                            <span className="dato-icono" aria-hidden="true">
                                <i className="bx bxs-map"></i>
                            </span>
                            <div className="dato-texto">
                                <span className="dato-label">Dirección</span>
                                <a
                                    href="https://maps.app.goo.gl/ATx3btnMtZRuBgSz9"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Cl. 37a #11-24, Montería - Colombia
                                </a>
                            </div>
                        </li>
                        <li className="dato">
                            <span className="dato-icono" aria-hidden="true">
                                <i className="bx bxs-envelope"></i>
                            </span>
                            <div className="dato-texto">
                                <span className="dato-label">Correo</span>
                                <a href="mailto:servicioalcliente@fjdsas.com.co">servicioalcliente@fjdsas.com.co</a>
                            </div>
                        </li>
                        <li className="dato">
                            <span className="dato-icono" aria-hidden="true">
                                <i className="bx bx-phone-call"></i>
                            </span>
                            <div className="dato-texto">
                                <span className="dato-label">Teléfonos</span>
                                <a href="tel:+573017788631">+(57) 301 778 86 31</a>
                                <a href="tel:+573203754909">+(57) 320 375 49 09</a>
                            </div>
                        </li>
                    </ul>

                    <div className="contacto-mapa">
                        <iframe
                            className="mapa"
                            title="Ubicación de FJD GROUP SAS en Montería, Córdoba"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312.6757001276244!2d-75.87670604586755!3d8.757274038469344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fc29c55fa81%3A0x60fb0b58f964909e!2zQ2wuIDM3YSAjMTEtMjQsIE1vbnRlcsOtYSwgQ8OzcmRvYmE!5e0!3m2!1ses!2sco!4v1727209694687!5m2!1ses!2sco"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen></iframe>
                    </div>
                </aside>

                {/* Columna derecha: formulario */}
                <div className="contacto-form-card">
                    <form className="contacto-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-grid">
                            <div className="campo">
                                <label htmlFor="contacto-name">Nombre</label>
                                <input id="contacto-name" type="text" name="name" autoComplete="name" />
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-email">Email</label>
                                <input id="contacto-email" type="email" name="email" autoComplete="email" />
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-tel">Teléfono</label>
                                <input id="contacto-tel" type="tel" name="tel" autoComplete="tel" />
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-empresa">Empresa</label>
                                <input id="contacto-empresa" type="text" name="empresa" autoComplete="organization" />
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-country">País</label>
                                <select id="contacto-country" name="country" onChange={handleCountryChange}>
                                    <option value="">País:</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-state">Departamento</label>
                                <select id="contacto-state" name="state" onChange={handleStateChange}>
                                    <option value="">Departamento:</option>
                                    {states.map((state) => (
                                        <option key={state.id} value={state.departamento}>
                                            {state.departamento}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-city">Ciudad</label>
                                <select id="contacto-city" name="city">
                                    <option value="">Ciudad:</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="campo">
                                <label htmlFor="contacto-solicitud">Tipo de solicitud</label>
                                <input
                                    id="contacto-solicitud"
                                    type="text"
                                    className="proyectocotizar"
                                    name="proyectocotizar"
                                />
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="contacto-mensaje">Mensaje</label>
                                <textarea id="contacto-mensaje" name="mensaje" rows="5" />
                            </div>
                        </div>

                        <div className="btn-cont">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contactanos;
