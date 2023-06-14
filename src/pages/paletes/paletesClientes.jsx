import { Message, useToaster } from "rsuite";
import CheckIcon from '@rsuite/icons/Check';

import { useContext, useState } from "react";

import { api } from "../../services/api";
import { UsuarioContext } from "../../providers/usuarioProviders";

import { MainPanel } from "../../components/panel";
import PainelPalete from "../../components/paletes/filiais/painelPalete";
import FiltroPalete from "../../components/paletes/filiais/filtroPalete";
import ConfirmarPalete from "../../components/paletes/filiais/confirmarPalete";
import MainTable from "../../components/table";


const PaletesFiliais = () => {
    const { auth } = useContext(UsuarioContext)
    const toaster = useToaster();

    const [filtro, setFiltro] = useState({})
    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    //Data
    const [dado, setDado] = useState([])
    const buscaDados = async () => {
        await api.get('paletes-movimentos/', { params: { ...filtro } }).then((response) => {
            setDado(response.data)
        }).catch((error) => {
            let mensagem = (
                < Message showIcon type="error" closable >
                    Erro - Ocorreu um erro ao buscar os dados.
                </ Message>
            )
            toaster.push(mensagem, { placement: 'topEnd', duration: 4000 })
        })
    }

    //Confirmar
    const [abrirConfirmar, setAbrirConfirmar] = useState(false);
    const modalConfirmar = () => setAbrirConfirmar(true);
    const dadoConfirmar = (linha) => {
        modalConfirmar()
    }

    //Table
    const colunas = {
        'Nº Solicitação': { dataKey: 'solicitacao', width: 150 },
        'Nº de Paletes': { dataKey: 'quantidade_paletes', width: 150 },
        'Dt Solicitação': { dataKey: 'data_solicitacao', width: 170 },
        'Origem': { dataKey: 'origem.sigla', width: 140 },
        'Destino': { dataKey: 'destino.sigla', width: 120 },
        'Placa Veiculo': { dataKey: 'placa_veiculo', width: 170 },
        'Autor': { dataKey: 'autor.username', width: 170 },
        'Código de barras': { dataKey: 'codigo_barras', width: 170 },
        'Confirmar Recebimento': { dataKey: "botao", width: 170, fixed: "right", click: dadoConfirmar, icon: CheckIcon, needAuth: true, auth: auth }
    };

    return (
        <MainPanel>
            <PainelPalete inverteUpdate={inverteUpdate} />

            <FiltroPalete />

            <MainTable dado={dado} setDado={setDado} colunas={colunas} buscaDados={buscaDados} />

            <ConfirmarPalete abrirConfirmar={abrirConfirmar} setAbrirConfirmar={setAbrirConfirmar} />
        </MainPanel>
    )
}

export default PaletesFiliais;