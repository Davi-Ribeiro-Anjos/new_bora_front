import { Button, Col, DateRangePicker, Form, Grid, InputNumber, InputPicker, Row } from "rsuite";

import { useContext, useState } from "react";

import { ChoicesContext } from "../../providers/choicesProviders";
import { UsuarioContext } from "../../providers/usuarioProviders";
import { dataParaString } from "../../services/data";
import { api } from "../../services/api";


const style = {
    row: {
        marginBottom: 10,
    },
    form: {
        width: "17vw"
    }
}

const { afterToday } = DateRangePicker;

const FiltroCompra = ({ setDado }) => {
    const { status, filiais } = useContext(ChoicesContext);
    const { auth } = useContext(UsuarioContext)

    const [filtro, setFiltro] = useState({})

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        if (novoFiltro.data_solicitacao_bo) {
            let dataInicio = novoFiltro.data_solicitacao_bo[0];
            let dataFim = novoFiltro.data_solicitacao_bo[1];
            novoFiltro['data_solicitacao_bo__gte'] = dataParaString(dataInicio) + "T00:00:00";
            novoFiltro['data_solicitacao_bo__lte'] = dataParaString(dataFim) + "T23:59:59";

            delete novoFiltro.data_solicitacao_bo
        }

        await api.get('solicitacoes-compras/', { params: { ...novoFiltro } }).then((response) => {
            setDado(response.data)
        }).catch((error) => {
            console.log(error)
        })

        const limparForm = {
            numero_solicitacao: null,
            data_solicitacao_bo: null,
            status: null,
            filial: null,
        }

        setFiltro(limparForm)

    }

    return (
        <>
            <Grid style={{ width: "100%" }}>
                <Form fluid onChange={setFiltro} formValue={filtro}>
                    <Row xs={24} style={style.row}>
                        <Col xs={12}>
                            <Form.Group controlId="numero_solicitacao" style={style.form}>
                                <Form.ControlLabel>Número Solicitação</Form.ControlLabel>
                                <Form.Control name="numero_solicitacao" accepter={InputNumber} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="data_solicitacao_bo" style={style.form}>
                                <Form.ControlLabel>Data Solicitação</Form.ControlLabel>
                                <Form.Control name="data_solicitacao_bo" placeholder="Selecione a data Inicial e Final" disabledDate={afterToday()} accepter={DateRangePicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={style.row}>
                        <Col xs={12}>
                            <Form.Group controlId="status" style={style.form}>
                                <Form.ControlLabel>Status</Form.ControlLabel>
                                <Form.Control name="status" data={status} accepter={InputPicker} disabledItemValues={auth ? [] : ['CONCLUIDO', 'CANCELADO']} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="filial" style={style.form}>
                                <Form.ControlLabel>Filial</Form.ControlLabel>
                                <Form.Control name="filial" data={filiais} accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={22}></Col>
                        <Button onClick={() => filtrarDados()} appearance="primary">
                            Filtrar
                        </Button>
                    </Row>
                </Form>
            </Grid>
        </>
    )
}

export default FiltroCompra;