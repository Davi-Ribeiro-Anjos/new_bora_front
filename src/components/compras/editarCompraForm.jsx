import { Form, Uploader, DatePicker, Grid, Row, Col, InputPicker, Input, Divider, Panel, Button } from 'rsuite';

import { useContext, forwardRef } from 'react';

import { api } from '../../services/api';
import { ChoicesContext } from '../../providers/choicesProviders';
import { UsuarioContext } from '../../providers/usuarioProviders';
import { useState } from 'react';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const style = {
    row: {
        marginBottom: 10,
    }
}

const EditarCompraForm = ({ formEdit, setFormEdit }) => {
    const { status, categorias, departamentos, formasPgt, choicesFiliais } = useContext(ChoicesContext)
    const { choiceUser, auth } = useContext(UsuarioContext)
    const [entradaForm, setEntradaForm] = useState({})

    const criarEntrada = () => {
        let dado_post = { ...entradaForm, autor: 1, solicitacao: formEdit.id }
        api.post('solicitacoes-entradas/', { ...dado_post }).then((response) => console.log(response))

        setEntradaForm(limparForm)
    }

    const limparForm = {
        observacao: ''
    }

    return (
        <Grid fluid>
            <Row xs={24}>
                <Panel header="Informações da Solicitação">
                    <Form fluid onChange={setFormEdit} formValue={formEdit}>
                        <Col xs={24}>
                            <Row style={style.row}>
                                <Col xs={12}>
                                    <Form.Group controlId="status">
                                        <Form.ControlLabel>Status</Form.ControlLabel>
                                        <Form.Control name="status" data={status} accepter={InputPicker} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="filial" >
                                        <Form.ControlLabel>Filial</Form.ControlLabel>
                                        <Form.Control name="filial" data={choicesFiliais} accepter={InputPicker} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={style.row}>
                                <Col xs={12}>
                                    <Form.Group controlId="departamento">
                                        <Form.ControlLabel>Departamento</Form.ControlLabel>
                                        <Form.Control name="departamento" data={departamentos} accepter={InputPicker} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="responsavel">
                                        <Form.ControlLabel>Responsavel</Form.ControlLabel>
                                        <Form.Control name="responsavel" data={choiceUser} accepter={InputPicker} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={style.row}>
                                <Col xs={12}>
                                    <Form.Group controlId="categoria">
                                        <Form.ControlLabel>Categoria</Form.ControlLabel>
                                        <Form.Control name="categoria" data={categorias} accepter={InputPicker} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="forma_pagamento">
                                        <Form.ControlLabel>Forma de Pagamento</Form.ControlLabel>
                                        <Form.Control name="forma_pagamento" data={formasPgt} accepter={InputPicker} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={style.row}>
                                <Col xs={12}>
                                    <Form.Group controlId="data_solicitacao">
                                        <Form.ControlLabel>Criado em</Form.ControlLabel>
                                        <Form.Control name="data_solicitacao" accepter={DatePicker} disabled />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    {formEdit.forma_pagamento === 'NÃO INFORMADO' ? <></>
                                        :
                                        <Form.Group controlId="data_vencimento_boleto">
                                            <Form.ControlLabel>Vencimento</Form.ControlLabel>
                                            <Form.Control name="data_vencimento_boleto" accepter={DatePicker} />
                                        </Form.Group>
                                    }
                                </Col>
                            </Row>
                            <Row style={style.row}>
                                <Col xs={12}>
                                    <Form.Group controlId="uploader">
                                        <Form.ControlLabel>Anexo</Form.ControlLabel>
                                        <Form.Control name="anexo" accepter={Uploader} action="#" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={style.row}>
                                <Col xs={24}>
                                    <Form.Group controlId="observacao">
                                        <Form.ControlLabel>Observação</Form.ControlLabel>
                                        <Form.Control rows={5} name="observacao" accepter={Textarea} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Form>
                </Panel>
            </Row>
            <Row>
                {auth ? (
                    <>
                        <Divider />
                        <Panel header="Cadastrar Entradas">
                            <Form fluid onChange={setEntradaForm} formValue={entradaForm} >
                                <Col xs={24}>
                                    <Row style={style.row}>
                                        <Col xs={24}>
                                            <Form.Group controlId="observacao">
                                                <Form.ControlLabel>Descrição da Entrada</Form.ControlLabel>
                                                <Form.Control rows={10} name="observacao" accepter={Textarea} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={style.row}>
                                        <Col xs={12}>
                                            <Form.Group controlId="uploader">
                                                <Form.ControlLabel>Anexo</Form.ControlLabel>
                                                <Form.Control name="anexo" accepter={Uploader} action="#" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row style={style.row}>
                                        <Button onClick={() => criarEntrada()} appearance="primary" color='green'>
                                            Criar Entrada
                                        </Button>
                                    </Row>
                                </Col>
                            </Form>
                        </Panel>
                    </>
                ) : <></>}
            </Row>
        </Grid >
    );
};

export default EditarCompraForm;