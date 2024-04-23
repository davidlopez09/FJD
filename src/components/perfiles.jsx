import { useState, useEffect } from "react";
import "../assets/css/perfiles.css";
import desarrolloproyectos from "../assets/images/perfil1.webp";
import analisisrequerimiento from "../assets/images/perfil2.webp";
import blogs from "../assets/images/perfil3.webp";
import imagen from "../assets/images/perfil4.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

export function Perfiles() {
    const perfilesSecundarios = [
        { imagen: desarrolloproyectos, nombre: "Ana", cargo: "Desarrolladora de Proyectos" },
        { imagen: analisisrequerimiento, nombre: "Carlos", cargo: "Tester" },
        { imagen: blogs, nombre: "Juan", cargo: "Contador" },
        { imagen: imagen, nombre: "Ada", cargo: "Diseñadora" },
        { imagen: imagen, nombre: "Maria", cargo: "Diseñadora" },
        { imagen: analisisrequerimiento, nombre: "Carlos", cargo: "Tester" },
        { imagen: blogs, nombre: "Juan", cargo: "Contador" },
        { imagen: blogs, nombre: "Luis", cargo: "Programador Junior" },
    ];

    const [perfilPrincipalIndex, setPerfilPrincipalIndex] = useState(0);
    const [perfilSecundarioSeleccionado, setPerfilSecundarioSeleccionado] = useState(null);

    // Función para manejar el cambio de perfil secundario
    const cambiarPerfil = (index) => {
        setPerfilPrincipalIndex(index);
        setPerfilSecundarioSeleccionado(index);
        localStorage.setItem("perfilSecundarioSeleccionado", index.toString());
    };

    // Cargar el perfil secundario seleccionado del localStorage al cargar el componente
    useEffect(() => {
        const storedIndex = localStorage.getItem("perfilSecundarioSeleccionado");
        if (storedIndex !== null) {
            const index = parseInt(storedIndex);
            setPerfilPrincipalIndex(index);
            setPerfilSecundarioSeleccionado(index);
        }
    }, []); // Se ejecuta solo al montar el componente

    // Mostrar el perfil principal basado en el perfil secundario seleccionado
    useEffect(() => {
        if (perfilSecundarioSeleccionado !== null) {
            setPerfilPrincipalIndex(perfilSecundarioSeleccionado);
        }
    }, [perfilSecundarioSeleccionado]); // Se ejecuta cuando cambia perfilSecundarioSeleccionado

    return (
        <div className="container-perfil">
            <h1 className="perfil-equipo">Nuestro equipo</h1>
            <div className="perfiles">
                <div className="perfil-principal">
                    <div className="img-forma">
                        <img className="img-perfil" src={perfilesSecundarios[perfilPrincipalIndex].imagen} alt="" />
                    </div>
                    <div className="desc-perfil">
                        <h1 className="saludo">¡Hola!</h1>
                        <h1 className="nombre">{perfilesSecundarios[perfilPrincipalIndex].nombre}</h1>
                        <p className="cargo">{perfilesSecundarios[perfilPrincipalIndex].cargo}</p>
                    </div>
                </div>

                <div className="perfil-secundario">
                    <Swiper
                        className="wrapper"
                        breakpoints={{
                            340: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            700: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}>
                        {perfilesSecundarios.map((perfil, index) => (
                            <SwiperSlide className="swiper-slide" key={index}>
                                <div
                                    className={`sec-perfil ${perfilSecundarioSeleccionado === index ? "selected" : ""}`}
                                    onClick={() => cambiarPerfil(index)}>
                                    <img className="img-sec" src={perfil.imagen} alt="" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Perfiles;
