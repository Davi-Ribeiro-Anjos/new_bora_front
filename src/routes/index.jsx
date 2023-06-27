import React from "react";
import { Route, Routes } from "react-router-dom";

import { ChoicesClientesProvider } from "../providers/choicesClientePrividers";

import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Settings from "../pages/settings";
import Erro404 from "../pages/erros/erro404";

import PaletesFiliais from "../pages/paletes/paletesFiliais";
import PaletesClientes from "../pages/paletes/paletesClientes";

import Demissoes from "../pages/rh/demissoes"
import Funcionarios from "../pages/rh/funcionarios"

import Compras from "../pages/ferramentas/compras";

import Justificativa from "../pages/comercial/justificativa";
import { ChoicesFuncionariosProvider } from "../providers/choicesFuncionarioProviders";


const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/paletes/filiais" element={<PaletesFiliais />} exact />
            <Route path="/paletes/clientes" element={
                <ChoicesClientesProvider>
                    <PaletesClientes />
                </ChoicesClientesProvider>
            } exact />
            <Route path="/demissoes" element={<Demissoes />} />
            <Route path="/funcionarios" element={
                <ChoicesFuncionariosProvider>

                    <Funcionarios />
                </ChoicesFuncionariosProvider>
            } />
            <Route path="/compras" element={<Compras />} exact />
            <Route path="/justificativa" element={<Justificativa />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<Erro404 />} />
        </Routes>
    )
}

export default RoutesMain;