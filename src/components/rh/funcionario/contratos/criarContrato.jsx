import { Col, DatePicker, Form, Grid, Input, InputNumber, Panel, Row, Uploader } from "rsuite"

import { forwardRef, useContext } from "react";

import { UsuarioContext } from "../../../../providers/usuarioProviders";

import MainModal from "../../../modal"

const styles = {
    row: {
        marginBottom: 10,
    },
    input: {
        width: 250
    },
    observacao: {
        textTransform: 'uppercase',
        width: "48vw"
    }
}

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const CriarContrato = ({ form, setForm, abrir, setAbrir, setAbrirDrawer }) => {
    const { usuarios, choiceUser, auth } = useContext(UsuarioContext)
    const enviar = () => {
        console.log(form)
    }

    const fechar = () => {
        setAbrir(false)
        setAbrirDrawer(true)
    }

    return (
        <Grid fluid>
            <Form onChange={setForm} formValue={form}>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group >
                            <Form.ControlLabel>Início Contrato:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="inicio_contrato" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                            <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group  >
                            <Form.ControlLabel>Final Contrato:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="final_contrato" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                            <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group >
                            <Form.ControlLabel>Data Reajuste:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="data_reajuste" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                            <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group >
                            <Form.ControlLabel>Valor Reajuste:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="valor_reajuste" accepter={InputNumber} />
                            <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={24}>
                        <Form.Group >
                            <Form.ControlLabel>Anexo:</Form.ControlLabel>
                            <Form.Control name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={24}>
                        <Form.Group >
                            <Form.ControlLabel>Observação:</Form.ControlLabel>
                            <Form.Control style={styles.observacao} rows={5} name="observacao" accepter={Textarea} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Grid>
    )
}

export default CriarContrato;