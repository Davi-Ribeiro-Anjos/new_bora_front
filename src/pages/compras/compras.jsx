import { Message, useToaster } from 'rsuite';
import ListIcon from '@rsuite/icons/List';
import EditIcon from '@rsuite/icons/Edit';

import { useContext, useState } from 'react';

import { api } from '../../services/api';
import { stringParaData } from '../../services/data';
import { UsuarioContext } from '../../providers/usuarioProviders';

import { MainPanel } from "../../components/panel";
import MainTable from '../../components/table';
import EditarCompra from '../../components/compra/editarCompra';
import EntradaCompra from '../../components/entrada/entrada';
import FiltroCompra from '../../components/compra/filtroCompra';
import { criarMensagemInfo } from '../../services/mensagem';
import PainelCompra from '../../components/compra/painelCompra';

const Compras = () => {
    const { auth } = useContext(UsuarioContext)
    const toaster = useToaster();

    const [filtro, setFiltro] = useState({})
    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    //Data
    const [dado, setDado] = useState([]);
    const buscaDados = async () => {
        await api.get('solicitacoes-compras/', { params: { ...filtro } }).then((response) => {
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

    // Entradas
    const [abrirEntradas, setAbrirEntradas] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const modalEntradas = () => setAbrirEntradas(true);
    const dadosEntradas = async (rowData) => {
        await api.get(`solicitacoes-entradas/${rowData.id}/`).then((response) => {
            setEntradas(response.data)
        }).catch((error) => {
            let mensagem = (
                < Message showIcon type="error" closable >
                    Erro - Ocorreu um erro ao buscar as Entradas.
                </ Message>
            )
            toaster.push(mensagem, { placement: 'topEnd', duration: 4000 })
        })

        modalEntradas()
    }

    // Editar
    const [abrirEdit, setAbrirEdit] = useState(false);
    const [formEdit, setFormEdit] = useState({});
    const modalEdit = () => setAbrirEdit(true);
    const dadosEditar = (rowData) => {

        if (rowData.filial) rowData.filial = rowData.filial.sigla;
        if (rowData.responsavel) rowData.responsavel = rowData.responsavel.username;
        if (rowData.data_vencimento_boleto) rowData.data_vencimento_boleto = stringParaData(rowData.data_vencimento_boleto, true)
        if (rowData.data_solicitacao_bo) rowData['data_solicitacao'] = stringParaData(rowData.data_solicitacao_bo)

        setFormEdit(rowData)

        modalEdit()

        if (rowData.data_vencimento_boleto && rowData.pago === false) {
            const hoje = new Date()
            const diferencaTempo = rowData.data_vencimento_boleto.getTime() - hoje.getTime()
            const diferencaDia = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

            if (diferencaDia > 1) {
                criarMensagemInfo(`O boleto vence em ${diferencaDia - 1} dias.`, toaster)
            } else if (diferencaDia < 1) {
                criarMensagemInfo(`O boleto venceu faz ${(diferencaDia - 1) * -1} dias.`, toaster)
            } else {
                criarMensagemInfo("O boleto vence hoje!", toaster)
            }
        }
    }

    //Table
    const colunas = {
        'Nº Solicitação': { dataKey: 'numero_solicitacao', width: 150 },
        'Dt Solicitação': { dataKey: 'data_solicitacao_bo', width: 170 },
        'Status': { dataKey: 'status', width: 140 },
        'Filial': { dataKey: 'filial.sigla', width: 120 },
        'Departamento': { dataKey: 'departamento', width: 170 },
        'Solicitante': { dataKey: 'solicitante.username', width: 170 },
        'Responsável': { dataKey: 'responsavel.username', width: 170 },
        'Entradas': { dataKey: "botao", width: 130, fixed: "right", click: dadosEntradas, icon: ListIcon },
        'Editar': { dataKey: "botao", width: 130, fixed: "right", click: dadosEditar, icon: EditIcon, needAuth: true, auth: auth }
    };

    return (
        <MainPanel>
            <PainelCompra inverteUpdate={inverteUpdate} setUpdate={setUpdate} />

            <FiltroCompra filtro={filtro} setFiltro={setFiltro} setDado={setDado} />

            <MainTable update={update} dado={dado} setDado={setDado} buscaDados={buscaDados} colunas={colunas} />

            <EntradaCompra entradas={entradas} abrirEntradas={abrirEntradas} setAbrirEntradas={setAbrirEntradas} />

            <EditarCompra form={formEdit} setForm={setFormEdit} abrir={abrirEdit} setAbrir={setAbrirEdit} inverteUpdate={inverteUpdate} setUpdate={setUpdate} />

        </MainPanel >
    )
}

export default Compras;