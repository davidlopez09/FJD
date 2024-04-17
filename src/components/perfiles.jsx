import { useState } from "react";
import "../assets/css/perfiles.css";
import desarrolloproyectos from "../assets/images/desarrolloproyectos.jpg";
import analisisrequerimiento from "../assets/images/analisisrequerimiento.jpg";
import blogs from "../assets/images/blogs.png";
import imagen from "../assets/images/imagen.jpg";

export function Perfiles() {
    const perfilesSecundarios = [
        {
            imagen: desarrolloproyectos,
            saludo: "¡Hola!",
            nombre: "Soy Ana",
            cargo: "Desarrolladora de Proyectos",
        },
        {
            imagen: analisisrequerimiento,
            saludo: "¡Hola!",
            nombre: "Soy Carlos",
            cargo: "Tester",
        },
        {
            imagen: blogs,
            saludo: "¡Hola!",
            nombre: "Soy Juan",
            cargo: "Contador",
        },
        {
            imagen: imagen,
            saludo: "¡Hola!",
            nombre: "Soy Ada",
            cargo: "Diseñadora",
        },
        {
            imagen: imagen,
            saludo: "¡Hola!",
            nombre: "Soy Ada",
            cargo: "Diseñadora",
        },
    ];

    const [perfilPrincipal, setPerfilPrincipal] = useState({
        imagen: desarrolloproyectos,
        saludo: "¡Hola!",
        nombre: "Soy Ana",
        cargo: "Desarrolladora de Proyectos",
    });

    const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);

    const handleClickPerfilSecundario = (perfil, index) => {
        setPerfilPrincipal(perfil);
        setPerfilSeleccionado(index);
    };

    return (
        <div className="container-perfil">
            <h1 className="perfil-equipo">Nuestro equipo</h1>
            <div className="perfiles">
                <div className="perfil-principal">
                    <div className="img-forma">
                        <img className="img-perfil" src={perfilPrincipal.imagen} alt="" />
                    </div>
                    <div className="desc-perfil">
                        <h1 className="saludo">{perfilPrincipal.saludo}</h1>
                        <h1 className="nombre">{perfilPrincipal.nombre}</h1>
                        <p className="cargo">{perfilPrincipal.cargo}</p>
                    </div>
                </div>
                <div className="perfil-secundario">
                    {perfilesSecundarios.map((perfil, index) => (
                        <div
                            key={index}
                            className={`sec-perfil ${perfilSeleccionado === index ? "selected" : ""}`}
                            onClick={() => handleClickPerfilSecundario(perfil, index)}>
                            <img className="img-sec" src={perfil.imagen} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Perfiles;
