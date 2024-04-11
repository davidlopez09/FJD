import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from "./components/header.jsx";
import { Principal } from "./components/principal.jsx";
import { Servicios} from "./components/servicios.jsx";
 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Header />
        <Principal />
        <Servicios />
    </React.StrictMode>
);
