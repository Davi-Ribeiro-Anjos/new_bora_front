import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, Row, SelectPicker, useToaster } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';
import { forwardRef } from 'react';

const styles = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
    observacao: {
        textTransform: 'uppercase'
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

const cnpjMask = (value) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

const cpfMask = value => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const CadastrarCliente = ({ abrirCadastrarCliente, setAbrirCadastrarCliente, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        tipo_cadastro: null,
        razao_social_motorista: null,
        cnpj_cpf: '',
        observacao: ''
    })

    const enviar = () => {
        if (form.razao_social_motorista) form.razao_social_motorista = form.razao_social_motorista.toUpperCase()
        if (form.observacao) form.observacao = form.observacao.toUpperCase()
        if (form.cnpj_cpf) form.cnpj_cpf = form.cnpj_cpf.replaceAll('.', '').replace('-', '').replace('/', '').slice(0, -1)
        if (selecionado) {
            if (cliente) {
                form.tipo_cadastro = 'CLIENTE'
            } else {
                form.tipo_cadastro = 'MOTORISTA'
            }
        }

        form.autor = 1

        api.post(
            'clientes/',
            form
        ).then((response) => {
            criarMensagemOk("Sucesso - Cliente cadastrado.", toaster)
            fechar()
        }).catch((error) => {
            if (error.response.data.tipo_cadastro) delete error.response.data.tipo_cadastro
            let listMensagem = {
                razao_social_motorista: selecionado ? (cliente ? "Razão Social" : "Motorista") : "Tipo Cliente"
            }
            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    //CLiente
    const [selecionado, setSelecionado] = useState(false)
    const [cliente, setCliente] = useState(false)
    const mostrarCliente = () => {
        setSelecionado(true)
        setCliente(true)
    }
    const mostrarMotorista = () => {
        setSelecionado(true)
    }

    const fechar = () => {
        setAbrirCadastrarCliente(false)
        setCliente(false)
        setSelecionado(false)

        setForm({
            tipo_cadastro: null,
            razao_social_motorista: null,
            cnpj_cpf: '',
            observacao: ''
        })
    };

    return (
        <MainModal open={abrirCadastrarCliente} setOpen={setAbrirCadastrarCliente} enviar={enviar} titulo="Cadastro de Entrada Cliente" nomeBotao="Cadastrar" size='lg' fechar={fechar} >
            <Grid fluid>
                <Form onChange={setForm} formValue={form}>
                    {!selecionado ? (
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo Cliente:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name='' mostrarCliente={mostrarCliente} mostrarMotorista={mostrarMotorista} accepter={GrupoBotao} />
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : (
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{cliente ? 'Razão Social' : 'Motorista'}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} value={form.razao_social_motorista} name="razao_social_motorista" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{cliente ? 'CNPJ' : 'CPF'}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} value={cliente ? cnpjMask(form.cnpj_cpf) : cpfMask(form.cnpj_cpf)} onChange={(value) => setForm({ ...form, cnpj_cpf: value })} name="cnpj_cpf" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Observação:</Form.ControlLabel>
                                <Form.Control style={styles.observacao} rows={5} name="observacao" value={form.observacao} accepter={Textarea} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid >
        </MainModal >
    )
}

export default CadastrarCliente;