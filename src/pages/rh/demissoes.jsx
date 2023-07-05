import { useState } from "react";

import { MainPanel } from "../../components/panel";
import FiltroDemissao from "../../components/rh/demissao/filtroDemissao";
import PainelDemissao from "../../components/rh/demissao/painelDemissao";

const Demissoes = () => {

    // Filtro
    const [filtro, setFiltro] = useState({})
    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    //Data
    const [dado, setDado] = useState([])

    return (
        <MainPanel>
            <PainelDemissao />
            <FiltroDemissao filtro={filtro} setFiltro={setFiltro} setDado={setDado} />
        </MainPanel>
    )


}

export default Demissoes;