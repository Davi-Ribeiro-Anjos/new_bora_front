import { Col, Form, Grid, InputNumber, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";
import { useState } from "react";

import { api } from "../../../services/api";
import { criarMensagemErro, criarMensagemOk } from "../../../services/mensagem";
import { ChoicesContext } from "../../../providers/choicesProviders";

import MainModal from "../../modal"

const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    }
}

const tipo_palete = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

const CriarPaletes = ({ abrirCriar, setAbrirCriar, setAbrirInfo, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const toaster = useToaster();

    const [form, setForm] = useState({
        localizacao_atual: '',
        quantidade_paletes: null,
        tipo_palete: '',
    });

    const enviar = () => {
        form['autor'] = 1
        api.post('paletes-controles/', form).then(response => {
            criarMensagemOk("Sucesso - Paletes criados.", toaster)
            inverteUpdate()
            fechar()
        }).catch(error => {
            let listMensagem = {
                localizacao_atual: "Filial",
                quantidade_paletes: "Quantidade de Paletes",
                tipo_palete: 'Tipo Palete',
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const fechar = () => {
        setAbrirCriar(false)
        setAbrirInfo(true)

        setForm({
            quantidade_paletes: null,
            localizacao_atual: null,
            tipo_palete: null,
        })
    };


    return (
        <MainModal open={abrirCriar} setOpen={setAbrirCriar} enviar={enviar} fechar={fechar} titulo="Adicionar Paletes" nomeBotao="Criar" size="md" >
            <Grid fluid>
                <Form onChange={setForm} formValue={form}>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="localizacao_atual" data={filiais} accepter={SelectPicker} />
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
                            <Form.Group >
                                <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="quantidade_paletes" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid >
        </MainModal>
    )
}

export default CriarPaletes;