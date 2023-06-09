import { Button, Col, DateRangePicker, Form, Grid, InputNumber, InputPicker, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { api } from "../../services/api";
import { dataParaString } from "../../services/data";
import { ChoicesContext } from "../../providers/choicesProviders";
import { UsuarioContext } from "../../providers/usuarioProviders";

import { MainPanelCollapsible } from "../panel";
import { criarMensagemErro } from "../../services/mensagem";


const style = {
    row: {
        marginBottom: 10,
    },
    form: {
        width: "17vw"
    }
}

const { afterToday } = DateRangePicker;

const FiltroPalete = ({ filtro, setFiltro, setDado }) => {
    const { status, filiais } = useContext(ChoicesContext);
    const { choiceUser } = useContext(UsuarioContext);
    const { auth } = useContext(UsuarioContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            numero_solicitacao: null,
            data_solicitacao_bo: null,
            status: null,
            filial: null,
            solicitante: null,
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
                    <Row xs={24} style={style.row}>
                        <Col xs={12}>
                            <Form.Group controlId="numero_solicitacao" style={style.form}>
                                <Form.ControlLabel>Número Solicitação: </Form.ControlLabel>
                                <Form.Control name="numero_solicitacao" accepter={InputNumber} min={0} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="solicitante" style={style.form}>
                                <Form.ControlLabel>Solicitante: </Form.ControlLabel>
                                <Form.Control name="solicitante" data={choiceUser} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={style.row}>
                        <Col xs={12}>
                            <Form.Group controlId="data_solicitacao_bo" style={style.form}>
                                <Form.ControlLabel>Data Solicitação: </Form.ControlLabel>
                                <Form.Control name="data_solicitacao_bo" placeholder="Selecione a data Inicial e Final" shouldDisableDate={afterToday()} accepter={DateRangePicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="status" style={style.form}>
                                <Form.ControlLabel>Status: </Form.ControlLabel>
                                <Form.Control name="status" data={status} accepter={InputPicker} disabledItemValues={auth ? [] : ['CONCLUIDO', 'CANCELADO']} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={style.row}>
                        <Col xs={12}>
                            <Form.Group controlId="filial" style={style.form}>
                                <Form.ControlLabel>Filial: </Form.ControlLabel>
                                <Form.Control name="filial" data={filiais} accepter={SelectPicker} />
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