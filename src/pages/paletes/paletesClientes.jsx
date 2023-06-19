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

    //Table
    const colunas = {
        'Filial': { dataKey: 'filial.sigla', width: 170 },
        'Saldo': { dataKey: 'saldo', width: 170 },
        'Razão Social/ Motorista': { dataKey: 'razao_social_motorista', width: 300 },
        'Status': { dataKey: 'status', width: 150 },
        'Documento': { dataKey: '', width: 150 },
    };

    return (
        <MainPanel>
            <PainelPaleteCliente update={update} inverteUpdate={inverteUpdate} />

            <FiltroPaleteCliente filtro={filtro} setFiltro={setFiltro} setDado={setDado} />

            <MainTable update={update} dado={dado} setDado={setDado} colunas={colunas} buscaDados={buscaDados} />

        </MainPanel>
    )
}

export default PaletesClientes;