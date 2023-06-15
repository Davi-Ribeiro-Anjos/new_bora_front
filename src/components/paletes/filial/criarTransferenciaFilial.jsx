import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, InputNumber, Row, SelectPicker, useToaster } from 'rsuite';

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

const GrupoBotao = ({ mostrarSimples, mostrarComposto }) => {
    return (
        <ButtonToolbar>
            <ButtonGroup>
                <Button appearance="primary" color='cyan' onClick={() => mostrarSimples()}>Único</Button>
                <Button appearance="primary" color='cyan' onClick={() => mostrarComposto()}>Vários</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

const tipo_palete = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

const CriarTransferenciaFilial = ({ abrirCriar, setAbrirCriar, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        origem: null,
        destinos: [0],
        tipo_palete: null,
        placa_veiculo: '',
        motorista: '',
        conferente: ''
    })

    const enviar = () => {
        const lista_forms = []
        for (const index in form.destinos) {
            if (Object.hasOwnProperty.call(form.destinos, index)) {
                const destino = form[`destino-${index}`]
                const quantidade_paletes = form[`quantidade_paletes-${index}`]

                const novoForm = {
                    origem: form.origem,
                    tipo_palete: form.tipo_palete,
                    destino: destino,
                    quantidade_paletes: quantidade_paletes,
                    placa_veiculo: form.placa_veiculo,
                    motorista: form.motorista,
                    conferente: form.conferente,
                    autor: 1
                }

                lista_forms.push(novoForm)
            }
        }

        for (const movimento in lista_forms) {
            if (Object.hasOwnProperty.call(lista_forms, movimento)) {
                const elemento = lista_forms[movimento];

                api.post('paletes-movimentos/', elemento).then(response => {
                    criarMensagemOk("Sucesso - Transferência realizada.", toaster)
                    inverteUpdate()
                    fechar()
                }).catch(error => {
                    let listMensagem = {
                        conferente: "Conferente",
                        destino: "Destino",
                        motorista: "Motorista",
                        origem: "Origem",
                        placa_veiculo: "Placa Veiculo",
                        quantidade_paletes: "Quantidade Paletes"
                    }

                    criarMensagemErro(error, listMensagem, toaster)
                })
            }
        }

    }

    //Destino
    const [selecionado, setSelecionado] = useState(true)
    const [simples, setSimples] = useState(false)
    const mostrarSimples = () => {
        setSelecionado(false)
        setSimples(true)
    }
    const [composto, setComposto] = useState(false)
    const mostrarComposto = () => {
        setSelecionado(false)
        setComposto(true)
    }
    const adicionarDestino = () => {
        const quantidadeDestino = form.destinos
        if (quantidadeDestino.length < 5) quantidadeDestino.push(quantidadeDestino.length)

        setForm({ ...form, destinos: quantidadeDestino })
    }

    const fechar = () => {
        setAbrirCriar(false)
        setSimples(false)
        setComposto(false)
        setSelecionado(true)

        setForm({
            origem: null,
            destinos: [0],
            tipo_palete: null,
            placa_veiculo: '',
            motorista: '',
            conferente: ''
        })
    };

    return (
        <MainModal open={abrirCriar} setOpen={setAbrirCriar} enviar={enviar} titulo="Solicitar Transferência de Paletes" nomeBotao="Criar" size='lg' fechar={fechar} >
            <Grid fluid>
                <Form onChange={setForm} formValue={form}>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Origem:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="origem" data={filiais} accepter={SelectPicker} />
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
                    {selecionado && (
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo de Destino:</Form.ControlLabel>
                                    <Form.Control style={styles.input} mostrarSimples={mostrarSimples} mostrarComposto={mostrarComposto} accepter={GrupoBotao} />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    {simples && !selecionado && (
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Destino:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="destino-0" data={filiais} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="quantidade_paletes-0" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    {composto && !selecionado && (
                        <>
                            {form.destinos.map((valor, index) => {
                                return (
                                    <Row key={index} style={styles.row}>
                                        <Col xs={12}>
                                            <Form.Group >
                                                <Form.ControlLabel>Destino - {index + 1}:</Form.ControlLabel>
                                                <Form.Control style={styles.input} name={`destino-${index}`} data={filiais} accepter={SelectPicker} />
                                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.ControlLabel>Quantidade - {index + 1}:</Form.ControlLabel>
                                                <Form.Control style={styles.input} name={`quantidade_paletes-${index}`} accepter={InputNumber} />
                                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            })}
                            <Row style={styles.row}>
                                <Col xs={12}></Col>
                                <Col xs={12}>
                                    {form.destinos.length < 5 &&
                                        <Button onClick={() => adicionarDestino()} appearance="primary" color='green'>Adicionar novo destino</Button>
                                    }
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Placa do Veiculo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="placa_veiculo" accepter={Input} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Motorista:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="motorista" accepter={Input} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Conferente:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="conferente" accepter={Input} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid >
        </MainModal >
    )
}

export default CriarTransferenciaFilial;