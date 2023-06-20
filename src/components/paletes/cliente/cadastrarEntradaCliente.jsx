import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, InputNumber, Row, SelectPicker, useToaster } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ChoicesClientesContext } from "../../../providers/choicesClientePrividers";
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

const tipo_palete = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

const CadastrarEntradaCliente = ({ abrirCadastrarEntradaCliente, setAbrirCadastrarEntradaCliente, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { choicesClientes } = useContext(ChoicesClientesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        filial__id: null,
        tipo_palete: null,
        quantidade_paletes: null,
        cliente__id: null,
    })

    const enviar = () => {
        if (form.quantidade_paletes) form.quantidade_paletes = parseInt(form.quantidade_paletes)

        api.patch(
            'clientes/',
            form
        ).then((response) => {
            criarMensagemOk("Sucesso - Entrada de paletes cadastrado.", toaster)
            inverteUpdate()
            fechar()
        }).catch((error) => {
            if (error.response.data.tipo_cadastro) delete error.response.data.tipo_cadastro
            let listMensagem = {

            }
            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const fechar = () => {
        setAbrirCadastrarEntradaCliente(false)

        setForm({
            filial__id: null,
            tipo_palete: null,
            quantidade_paletes: null,
            cliente__id: null,
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
                                <Form.Control style={styles.input} name="filial__id" data={filiais} accepter={SelectPicker} />
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
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="cliente__id" data={choicesClientes} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
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