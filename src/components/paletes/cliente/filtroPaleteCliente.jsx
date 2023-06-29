import { Button, Col, Form, Grid, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { criarMensagemErro } from "../../../services/mensagem";
import { ChoicesContext } from "../../../providers/choicesProviders";
import { ChoicesClientesContext } from "../../../providers/choicesClientePrividers";
import { ApiContext } from '../../../providers/apiProviders';

import { MainPanelCollapsible } from "../../panel";


const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    },
}


const FiltroPaleteCliente = ({ filtro, setFiltro, setDado }) => {
    const { filiais } = useContext(ChoicesContext);
    const { choicesClientes } = useContext(ChoicesClientesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            filial: null,
            razao_social_motorista: null,
        })
    }

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        const razao_social_motorista = novoFiltro.razao_social_motorista

        if (novoFiltro.razao_social_motorista) {
            novoFiltro['cliente__id'] = novoFiltro.razao_social_motorista

            delete novoFiltro.razao_social_motorista
        } else {
            delete novoFiltro.razao_social_motorista
        }

        await api.get('clientes/', { params: { ...novoFiltro } }).then((response) => {
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
            let listMensagem = {
                filial: "Filial",
                razao_social_motorista: 'Cliente',
            }
            criarMensagemErro(error, listMensagem, toaster)
        })

        setFiltro({
            filial: filtro.filial || null,
            razao_social_motorista: razao_social_motorista || null,
        })
    }

    return (
        <MainPanelCollapsible title="Filtros">
            <Grid style={{ width: "100%" }}>
                <Form fluid onChange={setFiltro} formValue={filtro}>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="razao_social_motorista" data={choicesClientes} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col xs={20}></Col>
                    <Col xs={2}>
                        <Button onClick={() => filtrarDados()} appearance="primary">
                            Filtrar
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => limparFiltro()}>
                            Limpar
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </MainPanelCollapsible>
    )
}

export default FiltroPaleteCliente;