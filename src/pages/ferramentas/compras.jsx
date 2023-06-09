import { Message, useToaster } from 'rsuite';
import ListIcon from '@rsuite/icons/List';
import EditIcon from '@rsuite/icons/Edit';

import { useContext, useState } from 'react';

import { stringParaData } from '../../services/data';
import { criarMensagemInfo } from '../../services/mensagem';
import { UsuarioContext } from '../../providers/usuarioProviders';
import { ApiContext } from '../../providers/apiProviders';

import { MainPanel } from "../../components/panel";
import MainTable from '../../components/table';
import EditarCompra from '../../components/compra/editarCompra';
import EntradaCompra from '../../components/compra/entrada/entrada';
import FiltroCompra from '../../components/compra/filtroCompra';
import PainelCompra from '../../components/compra/painelCompra';

const Compras = () => {
    const { auth } = useContext(UsuarioContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [filtro, setFiltro] = useState({
        numero_solicitacao: null,
        data_solicitacao_bo: null,
        status: null,
        filial: null,
        solicitante: null,
    })
    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    //Data
    const [dado, setDado] = useState([]);
    const buscaDados = async () => {
        await api.get('solicitacoes-compras/', { params: { ...filtro } }).then((response) => {
            let data = response.data

            for (const linha in data) {
                if (Object.hasOwnProperty.call(data, linha)) {
                    const elemento = data[linha];

                    elemento.data_solicitacao_bo = elemento.data_solicitacao_bo.split(' ')[0]
                }
            }

            setDado(data)
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
    const dadosEditar = (linha) => {

        if (linha.filial) linha.filial = linha.filial.sigla;
        if (linha.responsavel) linha.responsavel = linha.responsavel.username;
        if (linha.data_vencimento_boleto) linha.data_vencimento_boleto = stringParaData(linha.data_vencimento_boleto, true)
        if (linha.data_solicitacao_bo) linha['data_solicitacao'] = stringParaData(linha.data_solicitacao_bo)

        setFormEdit(linha)

        modalEdit()

        if (linha.data_vencimento_boleto && linha.pago === false) {
            const hoje = new Date()
            const diferencaTempo = linha.data_vencimento_boleto.getTime() - hoje.getTime()
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
        'Nº Solicitação': { dataKey: 'numero_solicitacao', width: 130 },
        'Dt Solicitação': { dataKey: 'data_solicitacao_bo', width: 150 },
        'Status': { dataKey: 'status', width: 120 },
        'Filial': { dataKey: 'filial.sigla', width: 120 },
        'Departamento': { dataKey: 'departamento', width: 170 },
        'Solicitante': { dataKey: 'solicitante.username', width: 150 },
        'Responsável': { dataKey: 'responsavel.username', width: 150 },
        'Entradas': { dataKey: "botao", width: 130, click: dadosEntradas, icon: ListIcon },
        'Editar': { dataKey: "botao", width: 130, click: dadosEditar, icon: EditIcon, needAuth: true, auth: auth }
    };

    return (
        <MainPanel>
            <PainelCompra inverteUpdate={inverteUpdate} setUpdate={setUpdate} />

            <FiltroCompra filtro={filtro} setFiltro={setFiltro} setDado={setDado} />

            <MainTable update={update} dado={dado} setDado={setDado} buscaDados={buscaDados} colunas={colunas} />

            <EntradaCompra entradas={entradas} abrirEntradas={abrirEntradas} setAbrirEntradas={setAbrirEntradas} />

            <EditarCompra form={formEdit} setForm={setFormEdit} abrir={abrirEdit} setAbrir={setAbrirEdit} inverteUpdate={inverteUpdate} />

        </MainPanel >
    )
}

export default Compras;