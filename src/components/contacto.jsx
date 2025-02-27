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
        <div id="contactanos" className="titi-cont">
            <h1>Contáctanos</h1>
            <div className="map">
                <iframe
                    className="mapa"
                    width="90%"
                    height="250"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312.6757001276244!2d-75.87670604586755!3d8.757274038469344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fc29c55fa81%3A0x60fb0b58f964909e!2zQ2wuIDM3YSAjMTEtMjQsIE1vbnRlcsOtYSwgQ8OzcmRvYmE!5e0!3m2!1ses!2sco!4v1727209694687!5m2!1ses!2sco"></iframe>

                <p className="parrafo-contacto">¡Cuéntanos en que podemos ayudarte hoy!</p>
            </div>
            <div className="conten">
                <form onSubmit={handleSubmit}>
                    <div className="input-contact">
                        <input type="text" name="name" placeholder="Nombre: " />
                        <input type="email" name="email" placeholder="Email: " />
                        <input type="tel" name="tel" placeholder="Teléfono: " />

                        <select name="country" onChange={handleCountryChange}>
                            <option value="">País:</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>

                        <select name="state" onChange={handleStateChange}>
                            <option value="">Departamento:</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.departamento}>
                                    {state.departamento}
                                </option>
                            ))}
                        </select>

                        <select name="city">
                            <option value="">Ciudad:</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <input type="text" name="empresa" placeholder="Empresa: " />
                        <input
                            type="text"
                            className="proyectocotizar"
                            name="proyectocotizar"
                            placeholder="Tipo de solicitud: "
                        />
                        <textarea name="mensaje" rows="4.5" cols="20" placeholder="Mensaje: " />

                        <div className="btn-cont">
                            <button type="submit">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contactanos;
