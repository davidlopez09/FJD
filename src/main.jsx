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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Header />
        <Principal />
        <Servicios />
        <Caracteristicas />
        <Portfolio />
        <Metodologia />
        <Qsomos />
        <Button />
    </React.StrictMode>
);
