import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Justificativa from "../pages/justificativa/justificativa";
import Settings from "../pages/settings";
import NotFound from "../pages/notFound";
import Compras from "../pages/compras/compras";
import Paletes from "../pages/paletes/paletes";
// import TransferenciaAndamento from "../pages/paletes/transferenciaAndamento";


const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/paletes-filiais" element={<Paletes />} exact />
            {/* <Route path="/transferencia-andamento" element={<TransferenciaAndamento />} exact /> */}
            <Route path="/compras" element={<Compras />} exact />
            <Route path="/justificativa" element={<Justificativa />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesMain;