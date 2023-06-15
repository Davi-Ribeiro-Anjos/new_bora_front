import { Message, useToaster } from "rsuite";
import CheckIcon from '@rsuite/icons/Check';

import { useContext, useState } from "react";

import { dataParaString } from "../../services/data";
import { UsuarioContext } from "../../providers/usuarioProviders";
import { ApiContext } from '../../providers/apiProviders';

import { MainPanel } from "../../components/panel";
import PainelPaleteCliente from "../../components/paletes/cliente/painelPaleteCliente";
import FiltroPaleteCliente from "../../components/paletes/cliente/filtroPaleteCliente";
import MainTable from "../../components/table";


const PaletesClientes = () => {
    const { auth } = useContext(UsuarioContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [mostrarRecebimento, setMostrarRecebimento] = useState(false)

    const [filtro, setFiltro] = useState({ recebido: false })
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
    const [formConfirmar, setFormConfirmar] = useState({});
    const modalConfirmar = () => setAbrirConfirmar(true);
    const dadoConfirmar = (linha) => {
        const dataAtual = new Date()

        linha['data_recebimento'] = dataParaString(dataAtual, true, true)
        linha['quantidadeInicial'] = linha.quantidade_paletes

        setFormConfirmar(linha)
        modalConfirmar()
    }

    //Table
    const colunas = {
        'Nº Solicitação': { dataKey: 'solicitacao', width: 160 },
        'Nº de Paletes': { dataKey: 'quantidade_paletes', width: 110 },
        'Dt Solicitação': { dataKey: 'data_solicitacao', width: 170 },
        'Origem': { dataKey: 'origem.sigla', width: 100 },
        'Destino': { dataKey: 'destino.sigla', width: 100 },
        'Placa Veiculo': { dataKey: 'placa_veiculo', width: 130 },
        'Autor': { dataKey: 'autor.username', width: 140 },
        'Código de barras': { dataKey: 'codigo_barras', width: 170 },
        'Confirmar Recebimento': { dataKey: "botao", width: 160, fixed: "right", click: dadoConfirmar, icon: CheckIcon, needAuth: true, auth: auth }
    };

    const colunasConcluido = {
        'Nº Solicitação': { dataKey: 'solicitacao', width: 160 },
        'Nº de Paletes': { dataKey: 'quantidade_paletes', width: 110 },
        'Dt Solicitação': { dataKey: 'data_solicitacao', width: 170 },
        'Dt Recebimento': { dataKey: 'data_recebimento', width: 170 },
        'Origem': { dataKey: 'origem.sigla', width: 100 },
        'Destino': { dataKey: 'destino.sigla', width: 100 },
        'Placa Veiculo': { dataKey: 'placa_veiculo', width: 130 },
        'Autor': { dataKey: 'autor.username', width: 140 },
    };

    return (
        <MainPanel>
            <PainelPaleteCliente update={update} inverteUpdate={inverteUpdate} />

            <FiltroPaleteCliente filtro={filtro} setFiltro={setFiltro} setDado={setDado} setMostrarRecebimento={setMostrarRecebimento} />

            <MainTable update={update} dado={dado} setDado={setDado} colunas={mostrarRecebimento ? colunasConcluido : colunas} buscaDados={buscaDados} />

        </MainPanel>
    )
}

export default PaletesClientes;