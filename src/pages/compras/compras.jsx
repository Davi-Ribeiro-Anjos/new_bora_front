import { IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import 'rsuite/dist/rsuite.min.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainPanel, MainPanelCollapsible } from "../../components/panel";
import { api } from '../../services/api';
import MainTable from '../../components/table';
import MainModalForm from '../../components/modal';
import CreateSolicCompra from '../../components/forms/compras/createSoliciCompra';


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}

const Compras = () => {
    const navegate = useNavigate();
    const [data, setData] = useState([]);

    const loadData = async (setData) => {
        await api.get('solicitacoes-compras/').then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const form = {
        'Nº Solicitação': { dataKey: 'numero_solicitacao', width: 150, align: 'center' },
        'Dt Lançamento': { dataKey: 'data_solicitacao_bo', width: 170, align: 'center' },
        'Status': { dataKey: 'status', width: 130, align: 'center' },
        'Filial': { dataKey: 'filial.sigla', width: 130, align: 'center' },
        'Solicitante': { dataKey: 'solicitante.username', width: 170, align: 'center' },
        'Responsável': { dataKey: 'responsavel.username', width: 170, align: 'center' }
    };
    const handleOpen = (rowData) => {
        navegate(`/compras/${rowData.id}`)
    }


    const [openCreate, setOpenCreate] = useState(false);
    const [formCreate, setFormCreate] = useState({
        filial: '',
        numero_solicitacao: '',
        anexo: '',
    });
    const handleOpenCreate = () => setOpenCreate(true);

    const sendCreate = () => {
        setOpenCreate(false);

        let data_post = { ...formCreate, data_solicitacao_bo: "2023-05-09T13:34:32", status: "ABERTO", autor: 1, ultima_atualizacao: 1 }
        api.post('solicitacoes-compras/', { ...data_post }).then((response) => console.log(response))
        setFormCreate({
            filial: '',
            numero_solicitacao: '',
            anexo: '',
        })
        setData(loadData(setData))
    }

    return (
        <>
            <MainPanel>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Painel Compras</h2>
                    <div>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={handleOpenCreate} />
                    </div>
                </div>
                <MainModalForm title="Adicionar Solicitação" nameB="Criar" open={openCreate} setOpen={setOpenCreate}
                    form={formCreate} send={sendCreate}>
                    <CreateSolicCompra form={formCreate} setForm={setFormCreate} />
                </MainModalForm>
                <MainPanelCollapsible title="Filtros"></MainPanelCollapsible>
                <MainTable data={data} setData={setData} loadData={loadData} form={form} handleOpen={handleOpen} />
            </MainPanel >
        </>
    )
}

export default Compras;