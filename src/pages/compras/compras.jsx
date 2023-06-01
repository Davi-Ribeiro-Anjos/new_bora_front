import { IconButton } from 'rsuite';
import ListIcon from '@rsuite/icons/List';
import PlusIcon from '@rsuite/icons/Plus';
import EditIcon from '@rsuite/icons/Edit';

import { useContext, useState } from 'react';

import { api } from '../../services/api';
import { somaDia } from '../../services/data';
import { UsuarioContext } from '../../providers/usuarioProviders';
import { MainPanel, MainPanelCollapsible } from "../../components/panel";
import MainTable from '../../components/table';
import MainModalForm from '../../components/modal';
import EditarCompraForm from '../../components/compras/editarCompraForm';
import CriarCompraForm from '../../components/compras/criarCompraForm';
import EntradaCompra from '../../components/compras/entradaCompra';
import FiltroCompra from '../../components/compras/filtroCompra';


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}

const Compras = () => {
    const { usuarios, auth } = useContext(UsuarioContext)
    const [update, setUpdate] = useState(false)

    //Data
    const [dado, setDado] = useState([]);
    const loadData = async () => {
        await api.get('solicitacoes-compras/').then((response) => {
            setDado(response.data)
        }).catch((error) => {
            console.log(error)
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
            console.log(error)
        })

        modalEntradas()
    }

    // Edit
    const [abrirEdit, setAbrirEdit] = useState(false);
    const [formEdit, setFormEdit] = useState({});
    const modalEdit = () => setAbrirEdit(true);
    const dadosEditar = (rowData) => {
        if (rowData.filial) rowData.filial = rowData.filial.sigla;
        if (rowData.responsavel) rowData.responsavel = rowData.responsavel.username;
        if (rowData.data_vencimento_boleto) rowData.data_vencimento_boleto = somaDia(rowData.data_vencimento_boleto, true)
        if (rowData.data_solicitacao_bo) rowData['data_solicitacao'] = somaDia(rowData.data_solicitacao_bo)

        setFormEdit(rowData)

        modalEdit()
    }
    const enviarEdit = () => {
        setAbrirEdit(false);

        delete formEdit.filial
        delete formEdit.autor
        delete formEdit.data_solicitacao_bo
        delete formEdit.numero_solicitacao

        for (let index = 0; index < usuarios.length; index++) {
            if (usuarios[index].username === formEdit.responsavel) {
                formEdit.responsavel = usuarios[index].id;
                break;
            }
        }

        const date = formEdit.data_vencimento_boleto
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        let day;
        day = String(date.getDate()).padStart(2, '0');

        formEdit.data_vencimento_boleto = `${year}-${month}-${day}`;

        let data_post = { ...formEdit, ultima_atualizacao: 1 }
        api.patch(`solicitacoes-compras/${formEdit.id}/`, { ...data_post }).then(
            (response) => { console.log(response) }
        )

        setFormEdit({})

        setUpdate(!update)
    }

    // Create
    const [abrirCriar, setAbrirCriar] = useState(false);
    const [formCriar, setFormCriar] = useState({
        filial: '',
        numero_solicitacao: '',
        anexo: '',
    });
    const modalCriar = () => setAbrirCriar(true);
    const enviarCriar = () => {
        setAbrirCriar(false);

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        today.setHours(today.getHours() - 3)

        let data_post = { ...formCriar, data_solicitacao_bo: today.toISOString(), status: "ABERTO", autor: 1, ultima_atualizacao: 1 }
        api.post('solicitacoes-compras/', { ...data_post }).then((response) => console.log(response))

        setFormCriar({
            filial: '',
            numero_solicitacao: '',
            anexo: '',
        })

        setUpdate(!update)
    }

    //Table
    const tableColumns = {
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

    const close = () => {
        setUpdate(!update)
    }

    return (
        <>
            <MainPanel>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Painel Compras</h2>
                    <div>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCriar()} />
                    </div>
                </div>
                <MainModalForm title="Adicionar Solicitação" nomeBotao="Criar" open={abrirCriar} setOpen={setAbrirCriar}
                    form={formCriar} send={enviarCriar}>
                    <CriarCompraForm form={formCriar} setForm={setFormCriar} />
                </MainModalForm>

                <MainPanelCollapsible title="Filtros">
                    <FiltroCompra setDado={setDado} />
                </MainPanelCollapsible>

                <MainTable update={update} dado={dado} setDado={setDado} loadData={loadData} tableColumns={tableColumns} />
                <MainModalForm title="Entradas" view={true} open={abrirEntradas} setOpen={setAbrirEntradas}
                    size='md'>
                    <EntradaCompra entradas={entradas} />
                </MainModalForm>
                <MainModalForm title={formEdit.numero_solicitacao ? `Editar a Solicitação ${formEdit.numero_solicitacao}` : 'Editar a Solicitação'} nomeBotao="Editar" size='md' open={abrirEdit} setOpen={setAbrirEdit}
                    send={enviarEdit} close={close} >
                    <EditarCompraForm formEdit={formEdit} setFormEdit={setFormEdit} />
                </MainModalForm>
            </MainPanel >
        </>
    )
}

export default Compras;