import { Button, Col, DateRangePicker, Form, Grid, Input, InputNumber, InputPicker, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { criarMensagemErro } from "../../../services/mensagem";
import { ApiContext } from '../../../providers/apiProviders';

import { MainPanelCollapsible } from "../../panel";


const styles = {
    row: {
        marginBottom: 10,
    },
    input: {
        width: 250
    }
}

const FiltroDemissao = ({ filtro, setFiltro, setDado }) => {
    const { api } = useContext(ApiContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            funcionario: null,
        })
    }

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        await api.get('solicitacoes-compras/', { params: { ...novoFiltro } }).then((response) => {
            setDado(response.data)
            limparFiltro()
        }).catch((error) => {
            let listMensagem = {
                funcionario: "Funcionário",
            }
            criarMensagemErro(error, listMensagem, toaster)
        })


        setFiltro({
            funcionario: filtro.funcionario || null,
        })
    }

    return (
        <MainPanelCollapsible title="Filtros" collapsible={false}>
            <Grid style={{ width: "100%" }} fluid>
                <Form fluid onChange={setFiltro} formValue={filtro} layout="inline">
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Buscar Funcionários: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="funcionario" accepter={Input} />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={() => filtrarDados()} appearance="primary">
                                Filtrar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        </MainPanelCollapsible>
    )
}

export default FiltroDemissao;