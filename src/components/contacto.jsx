import { useState, useEffect } from "react";
import "../assets/css/contacto.css";

export function Contactanos() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        // Obtener token de acceso
        fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "api-token": "5UXYB_2_tzLLZZN2Ba17PfEuyX4h5smVrOeVUljKWB5WnsUM4271PLWR_INuJEw34To",
                "user-email": "mariotiradotovar@gmail.com",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAccessToken(data.auth_token);
                // Obtener países
                fetch("https://www.universal-tutorial.com/api/countries", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${data.auth_token}`,
                        Accept: "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setCountries(data);
                    })
                    .catch((error) => console.error("Error:", error));
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        // Obtener departamentos del país seleccionado
        fetch(`https://www.universal-tutorial.com/api/states/${selectedCountry}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setStates(data);
            })
            .catch((error) => console.error("Error al obtener departamentos:", error));
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        // Obtener ciudades del departamento seleccionado
        fetch(`https://www.universal-tutorial.com/api/cities/${selectedState}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCities(data);
            })
            .catch((error) => console.error("Error al obtener ciudades:", error));
    };

    return (
        <div id="contactanos" className="titi-cont">
            <h1>Contáctanos</h1>
            <div className="map">
                <iframe
                    className="mapa"
                    width="90%"
                    height="250"
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3943.185471982326!2d-75.890436!3d8.768614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNDYnMDcuMCJOIDc1wrA1MycyNS42Ilc!5e0!3m2!1ses!2sco!4v1713296345732!5m2!1ses!2sco"></iframe>

                <p className="parrafo-contacto">¡Cuéntanos en que podemos ayudarte hoy!</p>
            </div>
            <div className="conten">
                <label className="label">
                    <div className="input-contact">
                        <input type="text" name="name" placeholder="Nombre: " />
                        <input type="email" name="email" placeholder="Email: " />
                        <input type="tel" name="tel" placeholder="Telefono: " />
                        <select onChange={handleCountryChange}>
                            <option value="">País</option>
                            {countries.map((country) => (
                                <option key={country.country_name} value={country.country_name}>
                                    {country.country_name}
                                </option>
                            ))}
                        </select>
                        <select onChange={handleStateChange}>
                            <option value="">Departamento</option>
                            {states.map((state) => (
                                <option key={state.state_name} value={state.state_name}>
                                    {state.state_name}
                                </option>
                            ))}
                        </select>
                        <select>
                            <option value="">Ciudad</option>
                            {cities.map((city) => (
                                <option key={city.city_name} value={city.city_name}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                        <label className="label2">
                            <input type="text" name="empresa" placeholder="Empresa: " />
                            <input
                                type="text"
                                className="proyectocotizar"
                                name="proyectocotizar"
                                placeholder="Tipo de solicitud: "
                            />
                            <textarea name="textarea" rows="4.5" cols="20" placeholder="Mensaje: " />
                            <div className="btn-cont">
                                <button type="submit">Enviar</button>
                            </div>
                        </label>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Contactanos;
