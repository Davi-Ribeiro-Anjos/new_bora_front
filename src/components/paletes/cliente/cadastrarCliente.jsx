import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, Row, SelectPicker, useToaster } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';

const styles = {
    input: {
        width: 250,
        textTransform: 'uppercase'
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

const cnpjMask = (value) => {
    return value
        .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
        .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
}

const cpfMask = value => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}


const tipo_palete = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

const CadastrarCliente = ({ abrirCadastrarCliente, setAbrirCadastrarCliente, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        filial: null,
        tipo_palete: null,
        razao_social_motorista: null,
        cnpj_cpf: ''
    })

    const enviar = () => {

        if (form.razao_social_motorista) form.razao_social_motorista = form.razao_social_motorista.toUpperCase()
        if (form.cnpj_cpf) form.cnpj_cpf = form.cnpj_cpf.replaceAll('.', '').replace('-', '')
        console.log(form)
    }

    //CLiente
    const [selecionado, setSelecionado] = useState(true)
    const [cliente, setCliente] = useState(false)
    const mostrarCliente = () => {
        setSelecionado(false)
        setCliente(true)
    }
    const mostrarMotorista = () => {
        setSelecionado(false)
    }

    const fechar = () => {
        setAbrirCadastrarCliente(false)
        setCliente(false)
        setSelecionado(true)

        setForm({
            filial: null,
            tipo_palete: null,
            razao_social_motorista: null,
            cnpj_cpf: ''
        })
    };

    return (
        <MainModal open={abrirCadastrarCliente} setOpen={setAbrirCadastrarCliente} enviar={enviar} titulo="Cadastro de Entrada Cliente" nomeBotao="Cadastrar" size='lg' fechar={fechar} >
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
                    {selecionado ? (
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
                </Form>
            </Grid >
        </MainModal >
    )
}

export default CadastrarCliente;