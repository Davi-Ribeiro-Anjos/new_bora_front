import { Button, Checkbox, Col, Form, Grid, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { criarMensagemErro } from "../../../services/mensagem";
import { ChoicesContext } from "../../../providers/choicesProviders";
// import { UsuarioContext } from "../../../providers/usuarioProviders";
import { ApiContext } from '../../../providers/apiProviders';
import { ChoicesFuncionariosContext } from "../../../providers/choicesFuncionarioProviders";

import { MainPanelCollapsible } from "../../panel";


const styles = {
    row: {
        marginBottom: 10,
    },
    input: {
        width: 250
    }
}

const tipo_contrato = ["PJ", "CLT"].map(item => ({ label: item, value: item }));

const FiltroFuncionario = ({ filtro, setFiltro, setDado }) => {
    const { filiais } = useContext(ChoicesContext);
    const { choicesFuncionarios } = useContext(ChoicesFuncionariosContext);
    // const { auth } = useContext(UsuarioContext);
    const { api } = useContext(ApiContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            funcionario: null,
            filial: null,
            tipo_contrato: null,
            ativo: null,
        })
    }

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        const funcionario = filtro.funcionario

        if (novoFiltro.funcionario) {
            novoFiltro['funcionario__nome'] = novoFiltro.funcionario

            delete novoFiltro.funcionario
        }

        await api.get('funcionarios/', { params: { ...novoFiltro } }).then((response) => {
            setDado(response.data)
        }).catch((error) => {
            let listMensagem = {
                funcionario: "Funcionário",
                filial: "Filial",
            }
            criarMensagemErro(error, listMensagem, toaster)
        })


        setFiltro({
            funcionario: funcionario || null,
            filial: filtro.filial || null,
            tipo_contrato: filtro.tipo_contrato || null,
        })
    }

    return (
        <MainPanelCollapsible title="Filtros">
            <Grid style={{ width: "100%" }}>
                <Form fluid onChange={setFiltro} formValue={filtro}>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Funcionário: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="funcionario" data={choicesFuncionarios} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Filial: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={styles.row}>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Tipo Contrato: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="tipo_contrato" data={tipo_contrato} accepter={SelectPicker} />
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

export default FiltroFuncionario;