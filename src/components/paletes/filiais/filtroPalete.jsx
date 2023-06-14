import { Button, Col, Form, Grid, Input, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { api } from "../../../services/api";
import { dataParaString } from "../../../services/data";
import { criarMensagemErro } from "../../../services/mensagem";
import { ChoicesContext } from "../../../providers/choicesProviders";
import { UsuarioContext } from "../../../providers/usuarioProviders";

import { MainPanelCollapsible } from "../../panel";


const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    },
}


const FiltroPalete = ({ filtro, setFiltro, setDado }) => {
    const { filiais } = useContext(ChoicesContext);
    const { choiceUser } = useContext(UsuarioContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            origem: null,
            destino: null,
            placa_veiculo: null,
            autor: null,
        })
    }

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        const data_solicitacao_bo = filtro.data_solicitacao_bo
        const solicitante = filtro.solicitante

        if (novoFiltro.data_solicitacao_bo) {
            let dataInicio = novoFiltro.data_solicitacao_bo[0];
            let dataFim = novoFiltro.data_solicitacao_bo[1];
            novoFiltro['data_solicitacao_bo__gte'] = dataParaString(dataInicio) + "T00:00:00";
            novoFiltro['data_solicitacao_bo__lte'] = dataParaString(dataFim) + "T23:59:59";

            delete novoFiltro.data_solicitacao_bo
        }

        if (novoFiltro.solicitante) {
            novoFiltro['solicitante__username'] = novoFiltro.solicitante

            delete novoFiltro.solicitante
        }

        await api.get('solicitacoes-compras/', { params: { ...novoFiltro } }).then((response) => {
            setDado(response.data)
        }).catch((error) => {
            let listMensagem = {
                numero_solicitacao: "Número Solicitação",
                status: "Status",
                filial: "Filial",
                solicitante: "Solicitante",
                data_solicitacao_bo: "Data Solicitação"
            }
            criarMensagemErro(error, listMensagem, toaster)
        })


        setFiltro({
            numero_solicitacao: filtro.numero_solicitacao || null,
            data_solicitacao_bo: data_solicitacao_bo || null,
            status: filtro.status || null,
            filial: filtro.filial || null,
            solicitante: solicitante || null,
        })
    }

    return (
        <MainPanelCollapsible title="Filtros">
            <Grid style={{ width: "100%" }}>
                <Form fluid onChange={setFiltro} formValue={filtro}>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group controlId="origem" style={styles.form}>
                                <Form.ControlLabel>Origem:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="origem" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="destino" style={styles.form}>
                                <Form.ControlLabel>Destino:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="destino" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group controlId="placa_veiculo" style={styles.form}>
                                <Form.ControlLabel>Placa do Veículo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="placa_veiculo" accepter={Input} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="autor" style={styles.form}>
                                <Form.ControlLabel>Autor:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="autor" data={choiceUser} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
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
                </Form>
            </Grid>
        </MainPanelCollapsible>
    )
}

export default FiltroPalete;