import React from "react";
import { Route, Routes } from "react-router-dom";

import { ChoicesClientesProvider } from "../providers/choicesClientePrividers";

import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Justificativa from "../pages/comercial/justificativa";
import Settings from "../pages/settings";
import NotFound from "../pages/notFound";
import Compras from "../pages/ferramentas/compras";
import PaletesFiliais from "../pages/paletes/paletesFiliais";
import PaletesClientes from "../pages/paletes/paletesClientes";


const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/paletes-filiais" element={<PaletesFiliais />} exact />
            <Route path="/paletes-clientes" element={
                <ChoicesClientesProvider>
                    <PaletesClientes />
                </ChoicesClientesProvider>
            } exact />
            <Route path="/compras" element={<Compras />} exact />
            <Route path="/justificativa" element={<Justificativa />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesMain;