import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from "./components/header.jsx";
import { Principal } from "./components/principal.jsx";
import { Servicios} from "./components/servicios.jsx";
import { Button } from "./components/button.jsx";
import {Qsomos} from "./components/qsomos.jsx";
import {Caracteristicas} from "./components/Caracteristicas.jsx";
import {Portfolio} from "./components/portfolio.jsx";
import { Metodologia } from "./components/metodologia.jsx";
import { Blogs } from "./components/blog.jsx";
import { Contactanos } from "./components/contacto.jsx";
import { Footer } from "./components/footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
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
    </React.StrictMode>
);
