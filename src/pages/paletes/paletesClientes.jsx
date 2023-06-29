import { Message, useToaster } from "rsuite";
import PageIcon from '@rsuite/icons/Page';

import { useContext, useState } from "react";

// import { UsuarioContext } from "../../providers/usuarioProviders";
import { ApiContext } from '../../providers/apiProviders';

import { MainPanel } from "../../components/panel";
import PainelPaleteCliente from "../../components/paletes/cliente/painelPaleteCliente";
import FiltroPaleteCliente from "../../components/paletes/cliente/filtroPaleteCliente";
import MainTable from "../../components/table";


const PaletesClientes = () => {
    // const { auth } = useContext(UsuarioContext)
    const { api, urlBase } = useContext(ApiContext)
    const toaster = useToaster();

    const [filtro, setFiltro] = useState({})
    const [update, setUpdate] = useState(false)
    const inverteUpdate = () => {
        setUpdate(!update)
    }

    //Data
    const [dado, setDado] = useState([])
    const buscaDados = async () => {
        await api.get('clientes/', { params: { ...filtro } }).then((response) => {
            let data = response.data

            for (const linha in data) {
                if (Object.hasOwnProperty.call(data, linha)) {
                    const elemento = data[linha];

                    if (elemento.saldo) {
                        if (elemento.saldo > 0) {
                            elemento.status = "A BORA DEVE"
                        } else {
                            elemento.status = "O CLIENTE DEVE"
                            elemento.saldo *= -1
                        }
                    }
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

    //Table
    const colunas = {
        'Filial': { dataKey: 'filial.sigla', width: 150 },
        'Saldo': { dataKey: 'saldo', width: 110 },
        'Tipo Palete': { dataKey: 'tipo_palete', width: 110 },
        'Razão Social/ Motorista': { dataKey: 'cliente.razao_social_motorista', width: 250 },
        'Status': { dataKey: 'status', width: 130 },
        'Documento': { dataKey: "link", url: `${urlBase}api/clientes/documento/`, width: 130, icon: PageIcon }
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