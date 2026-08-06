import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { Header } from "./components/header.jsx";
import { Principal } from "./components/principal.jsx";
import { Servicios} from "./components/servicios.jsx";
import { Button } from "./components/button.jsx";
import { Qsomos } from "./components/qsomos.jsx";
import { Caracteristicas } from "./components/Caracteristicas.jsx";
import { Portfolio } from "./components/portfolio.jsx";
import { Metodologia } from "./components/metodologia.jsx";
import { Blogs } from "./components/blog.jsx";
import { Contactanos } from "./components/contacto.jsx";
import { Footer } from "./components/footer.jsx";
import { LegalHub } from "./pages/LegalHub.jsx";
import { Privacidad } from "./pages/Privacidad.jsx";
import { Terminos } from "./pages/Terminos.jsx";
import { EliminacionDatos } from "./pages/EliminacionDatos.jsx";
import { TratamientoDatos } from "./pages/TratamientoDatos.jsx";
import { SeguridadInformacion } from "./pages/SeguridadInformacion.jsx";
import { Cookies } from "./pages/Cookies.jsx";
import { AnalisisRequerimiento } from "./pages/AnalisisRequerimiento.jsx";
import { PlanificacionProyecto } from "./pages/PlanificacionProyecto.jsx";
import { DesarrolloProyecto } from "./pages/DesarrolloProyecto.jsx";
import { TestingDespliegue } from "./pages/TestingDespliegue.jsx";

function HomePage() {
    return (
        <>
            <Header />
            <Principal />
            <Servicios />
            <Caracteristicas />
            <Portfolio />
            <Metodologia />
            <Qsomos />
            <Blogs />
            <Contactanos />
            <Button />
            <Footer />
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/politicas-privacidad" element={<Privacidad />} />
                <Route path="/legal" element={<LegalHub />} />
                <Route path="/legal/terminos-y-condiciones" element={<Terminos />} />
                <Route path="/legal/eliminacion-de-datos" element={<EliminacionDatos />} />
                <Route path="/legal/tratamiento-de-datos-personales" element={<TratamientoDatos />} />
                <Route path="/legal/seguridad-de-la-informacion" element={<SeguridadInformacion />} />
                <Route path="/legal/cookies" element={<Cookies />} />
                <Route path="/metodologia/analisis" element={<AnalisisRequerimiento />} />
                <Route path="/metodologia/planificacion" element={<PlanificacionProyecto />} />
                <Route path="/metodologia/desarrollo" element={<DesarrolloProyecto />} />
                <Route path="/metodologia/testing" element={<TestingDespliegue />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

