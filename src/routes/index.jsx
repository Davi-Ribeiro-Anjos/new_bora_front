import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Justificativa from "../pages/justification";
import Settings from "../pages/settings";
import NotFound from "../pages/notFound";
import Compras from "../pages/compras/compras";
import SolicitarTransferencia from "../pages/paletes/solicitarTranferencia";
import TransferenciaAndamento from "../pages/paletes/transferenciaAndamento";
import EditCompra from "../pages/compras/editCompra";

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/solicitar-transferencia" element={<SolicitarTransferencia />} exact />
            <Route path="/transferencia-andamento" element={<TransferenciaAndamento />} exact />
            <Route path="/compras" element={<Compras />} exact />
            <Route path="/compras/:id" element={<EditCompra />} />
            <Route path="/justificativa" element={<Justificativa />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesMain;