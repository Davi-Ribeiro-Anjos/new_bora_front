import { Message, useToaster } from 'rsuite';
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useState } from "react";

import { stringParaData } from '../../services/data';
import { ApiContext } from "../../providers/apiProviders";

import { MainPanel } from "../../components/panel";
import MainTable from "../../components/table";
import PainelFuncionario from "../../components/rh/funcionario/painelFuncionario";
import FiltroFuncionario from "../../components/rh/funcionario/filtroFuncionario";
import EditarFuncionario from "../../components/rh/funcionario/editarFuncionario";
import ServicoFuncionario from "../../components/rh/funcionario/servicoFuncionario";

const Funcionarios = () => {
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [filtro, setFiltro] = useState({
        funcionario: null,
        filial: null,
    })

    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    const [abrirServicos, setAbrirServicos] = useState(false);
    const modalServicos = () => setAbrirServicos(true);
    const dadosServicos = async (rowData) => {
        // await api.get(`solicitacoes-entradas/${rowData.id}/`).then((response) => {
        //     setServicos(response.data)
        // }).catch((error) => {
        //     let mensagem = (
        //         < Message showIcon type="error" closable >
        //             Erro - Ocorreu um erro ao buscar as Servicos.
        //         </ Message>
        //     )
        //     toaster.push(mensagem, { placement: "topEnd", duration: 4000 })
        // })

        modalServicos()
    }

    const [abrirEditar, setAbrirEditar] = useState(false);
    const [formEditar, setFormEditar] = useState({});
    const modalEditar = () => setAbrirEditar(true);
    const dadosEditar = (linha) => {

        if (linha.data_admissao) linha.data_admissao = stringParaData(linha.data_admissao, true)

        if (linha.user) {
            linha.email = linha.user.email
        }

        if (linha.filial) linha.filial = linha.filial.id

        if (linha.pj_complementos.salario) {
            linha['salario'] = linha.pj_complementos.salario
            linha['faculdade'] = linha.pj_complementos.faculdade
            linha['ajuda_custo'] = linha.pj_complementos.ajuda_custo
            linha['auxilio_moradia'] = linha.pj_complementos.auxilio_moradia
            linha['credito_convenio'] = linha.pj_complementos.credito_convenio
            linha['outros_creditos'] = linha.pj_complementos.outros_creditos
            linha['adiantamento'] = linha.pj_complementos.adiantamento
            linha['desconto_convenio'] = linha.pj_complementos.desconto_convenio
            linha['outros_descontos'] = linha.pj_complementos.outros_descontos
        }

        setFormEditar(linha)

        modalEditar()
    }

    const [dado, setDado] = useState([]);
    const buscaDados = async () => {
        await api.get("funcionarios/", { params: { ...filtro } }).then((response) => {
            let data = response.data

            for (const linha in data) {
                if (Object.hasOwnProperty.call(data, linha)) {
                    const elemento = data[linha];

                    elemento["dados_bancarios"] = `BCO: ${elemento.banco} | AG: ${elemento.agencia} | CC: ${elemento.conta}`
                }
            }

            setDado(data)
        }).catch((error) => {
            let mensagem = (
                < Message showIcon type="error" closable >
                    Erro - Ocorreu um erro ao buscar os dados.
                </ Message>
            )
            toaster.push(mensagem, { placement: "topEnd", duration: 4000 })
        })
    }

    const colunas = {
        "Nome": { dataKey: "nome", width: 250 },
        "Filial": { dataKey: "filial.sigla", width: 120 },
        "CNPJ": { dataKey: "cnpj", width: 150 },
        "Dados Bancários": { dataKey: "dados_bancarios", width: 300 },
        "Serviços": { dataKey: "botao", width: 130, click: dadosServicos, icon: ListIcon },
        "Editar": { dataKey: "botao", width: 130, click: dadosEditar, icon: EditIcon }
    };

    return (
        <MainPanel>
            <PainelFuncionario inverteUpdate={inverteUpdate} />

            <FiltroFuncionario filtro={filtro} setFiltro={setFiltro} setDado={setDado} />

            <MainTable update={update} dado={dado} setDado={setDado} buscaDados={buscaDados} colunas={colunas} />

            <ServicoFuncionario abrir={abrirServicos} setAbrir={setAbrirServicos} />

            <EditarFuncionario form={formEditar} setForm={setFormEditar} abrir={abrirEditar} setAbrir={setAbrirEditar} inverteUpdate={inverteUpdate} />

        </MainPanel>
    )
}

export default Funcionarios;