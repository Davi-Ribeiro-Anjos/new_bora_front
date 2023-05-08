import { IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import 'rsuite/dist/rsuite.min.css';

import { MainPanel, MainPanelCollapsible } from "../../components/panel";
import MainTable from '../../components/table';
import MainModalForm from '../../components/modal';
import { useState } from 'react';
import CreateSolicCompra from '../../components/forms/compras/createSoliciCompra';
import { data } from '../../components/solicitacoesCompras'
import { Link, redirect, useNavigate } from 'react-router-dom';

const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}

const Compras = () => {
    const navegate = useNavigate()

    const form = {
        'Nº Solicitação': { dataKey: 'nr_solic', width: 170, align: 'center' },
        'Dt Solicitação': { dataKey: 'data', width: 200, align: 'center' },
        'Dt Lançamento': { dataKey: 'pub_date', width: 200, align: 'center' },
        'Status': { dataKey: 'status', width: 150, align: 'center' },
        'Filial': { dataKey: 'filial', width: 150, align: 'center' },
        'Solicitante': { dataKey: 'solicitante', width: 230, align: 'center' },
        'Responsável': { dataKey: 'responsavel_id', width: 230, align: 'center' }
    };
    const handleOpen = (rowData) => {
        navegate(`/compras/${rowData.nr_solic}`)
    }


    const [openCreate, setOpenCreate] = useState(false);
    const [formCreate, setFormCreate] = useState({
        empresa: '',
        filial: '',
        cod_solic: '',
        anexo: ''
    });
    const handleOpenCreate = () => setOpenCreate(true);

    const sendCreate = () => {
        setOpenCreate(false);
        setFormCreate({
            empresa: '',
            filial: '',
            cod_solic: '',
            anexo: ''
        })
        console.log(formCreate)
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
            </MainPanel>
            <MainPanel>
                <MainTable data={data} form={form} handleOpen={handleOpen} send={sendCreate} />
            </MainPanel >
        </>
    )
}

export default Compras;