import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, InputNumber, Row, SelectPicker, useToaster } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';

const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    }
}

const GrupoBotao = ({ mostrarCliente, mostrarMotorista }) => {
    return (
        <ButtonToolbar>
            <ButtonGroup>
                <Button appearance="primary" color='cyan' onClick={() => mostrarCliente()}>Razão Social</Button>
                <Button appearance="primary" color='cyan' onClick={() => mostrarMotorista()}>Motorista</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

const tipo_palete = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

const CadastrarEntradaCliente = ({ abrirCadastrarEntradaCliente, setAbrirCadastrarEntradaCliente, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        filial: null,
        tipo_palete: null,
        quantidade_paletes: null,
        razao_social_motorista: null,
    })

    const enviar = () => {
        console.log(form)

    }

    //CLiente
    const [selecionado, setSelecionado] = useState(true)
    const [cliente, setCliente] = useState(false)
    const mostrarCliente = () => {
        setSelecionado(false)
        setCliente(true)
    }

    // Motorista
    const [motorista, setMotorista] = useState(false)
    const mostrarMotorista = () => {
        setSelecionado(false)
        setMotorista(true)
    }

    const fechar = () => {
        setAbrirCadastrarEntradaCliente(false)
        setCliente(false)
        setMotorista(false)
        setSelecionado(true)

        setForm({
            filial: null,
            tipo_palete: null,
            quantidade_paletes: null,
            razao_social_motorista: null,
        })
    };

    return (
        <MainModal open={abrirCadastrarEntradaCliente} setOpen={setAbrirCadastrarEntradaCliente} enviar={enviar} titulo="Cadastro de Entrada Cliente" nomeBotao="Cadastrar Entrada" size='lg' fechar={fechar} >
            <Grid fluid>
                <Form onChange={setForm} formValue={form}>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" data={filiais} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="tipo_palete" data={tipo_palete} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        {selecionado ? (
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo Cliente:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name='' mostrarCliente={mostrarCliente} mostrarMotorista={mostrarMotorista} accepter={GrupoBotao} />
                                </Form.Group>
                            </Col>
                        ) : (
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{cliente ? 'Razão Social' : 'Motorista'}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="razao_social_motorista" data={filiais} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        )}
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="quantidade_paletes" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid >
        </MainModal >
    )
}

export default CadastrarEntradaCliente;