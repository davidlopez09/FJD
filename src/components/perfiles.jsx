import { useState } from "react";
import "../assets/css/perfiles.css";
import desarrolloproyectos from "../assets/images/perfil1.jpg";
import analisisrequerimiento from "../assets/images/perfil2.jpg";
import blogs from "../assets/images/perfil3.jpg";
import imagen from "../assets/images/perfil4.jpg";


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
            nombre: "Soy Maria",
            cargo: "Diseñadora",
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
            imagen: blogs,
            saludo: "¡Hola!",
            nombre: "Soy Luis",
            cargo: "Programador Junior",
        },
    ];

    const [perfilPrincipalIndex, setPerfilPrincipalIndex] = useState(0);
    const perfilesVisibles = 5; // Número de perfiles secundarios visibles inicialmente
    const totalPerfiles = perfilesSecundarios.length;

    const cambiarPerfil = (direccion) => {
        let newIndex = perfilPrincipalIndex;

        if (direccion === "izquierda") {
            newIndex = (perfilPrincipalIndex - 1 + totalPerfiles) % totalPerfiles;
        } else {
            newIndex = (perfilPrincipalIndex + 1) % totalPerfiles;
        }

        setPerfilPrincipalIndex(newIndex);
    };

    // Calcular los índices de los perfiles secundarios visibles alrededor del perfil principal
    const halfVisibles = Math.floor(perfilesVisibles / 2);
    let startIndex = perfilPrincipalIndex - halfVisibles;
    if (startIndex < 0) {
        startIndex += totalPerfiles; // Ajustar para manejar índices negativos
    }

    const visiblePerfiles = [];
    for (let i = 0; i < perfilesVisibles; i++) {
        const index = (startIndex + i) % totalPerfiles;
        visiblePerfiles.push(perfilesSecundarios[index]);
    }

    return (
        <div className="container-perfil">
            <h1 className="perfil-equipo">Nuestro equipo</h1>
            <div className="perfiles">
                <div className="perfil-principal">
                    <div className="img-forma">
                        <img className="img-perfil" src={perfilesSecundarios[perfilPrincipalIndex].imagen} alt="" />
                    </div>
                    <div className="desc-perfil">
                        <h1 className="saludo">{perfilesSecundarios[perfilPrincipalIndex].saludo}</h1>
                        <h1 className="nombre">{perfilesSecundarios[perfilPrincipalIndex].nombre}</h1>
                        <p className="cargo">{perfilesSecundarios[perfilPrincipalIndex].cargo}</p>
                    </div>
                </div> 

                <div className="perfil-secundario">
                   <i className="bx bxs-chevron-left-circle icon-perfil"
                        onClick={() => cambiarPerfil("izquierda")}></i>
                    {visiblePerfiles.map((perfil, index) => (
                        <div
                            key={index}
                            className={`sec-perfil ${index === halfVisibles ? "selected" : ""}`}
                            onClick={() => setPerfilPrincipalIndex((startIndex + index) % totalPerfiles)}>
                            <img className="img-sec" src={perfil.imagen} alt="" />
                        </div>
                    ))}
                    <i className="bx bxs-chevron-right-circle icon-perfil" onClick={() => cambiarPerfil("derecha")}></i>
                </div>
            </div>
        </div>
    );
}

export default Perfiles;
