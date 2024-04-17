import  { useState } from "react";
import "../assets/css/perfiles.css";
import desarrolloproyectos from "../assets/images/desarrolloproyectos.jpg";
import analisisrequerimiento from "../assets/images/analisisrequerimiento.jpg";
import blogs from "../assets/images/blogs.png";
import imagen from "../assets/images/imagen.jpg";

export function Perfiles() {
    const [perfilesSecundarios] = useState([
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
    ]);

    // Imágenes adicionales que se mostrarán al hacer clic en las flechas
    const imagenesEscondidas = [imagen, imagen];

    const [perfilPrincipal, setPerfilPrincipal] = useState(perfilesSecundarios[0]);
    const [perfilSeleccionado, setPerfilSeleccionado] = useState(0);

    const handleClickPerfilSecundario = (perfil, index) => {
        setPerfilPrincipal(perfil);
        setPerfilSeleccionado(index);
    };

    const cambiarPerfil = (direccion) => {
        let nuevoIndex;
        const totalPerfiles = perfilesSecundarios.length;
        if (direccion === "izquierda") {
            nuevoIndex = perfilSeleccionado === 0 ? totalPerfiles - 1 : perfilSeleccionado - 1;
        } else {
            nuevoIndex = perfilSeleccionado === totalPerfiles - 1 ? 0 : perfilSeleccionado + 1;
        }
        setPerfilPrincipal(perfilesSecundarios[nuevoIndex]);
        setPerfilSeleccionado(nuevoIndex);
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
                <div className="icon-perfil">
                    <i className='bx bxs-chevron-left-circle' onClick={() => cambiarPerfil("izquierda")}></i> 
                    <i className='bx bxs-chevron-right-circle' onClick={() => cambiarPerfil("derecha")}></i>
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
                    {/* Agrega las imágenes escondidas */}
                    {imagenesEscondidas.map((imagen, index) => (
                        <div key={index} className="sec-perfil">
                            <img className="img-sec" src={imagen} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Perfiles;
