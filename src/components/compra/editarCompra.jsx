import { Form, Uploader, DatePicker, Grid, Row, Col, InputPicker, Input, Panel, Checkbox, useToaster } from 'rsuite';

import { useContext, forwardRef } from 'react';

import { api } from '../../services/api';
import { dataParaString } from '../../services/data';
import { ChoicesContext } from '../../providers/choicesProviders';
import { UsuarioContext } from '../../providers/usuarioProviders';

import CriarEntrada from '../entrada/criarEntrada';
import MainModal from '../modal';
import { criarMensagemErro, criarMensagemOk } from '../../services/mensagem';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const style = {
    row: {
        marginBottom: 10,
    }
}

const EditarCompra = ({ form, setForm, abrir, setAbrir, update, setUpdate }) => {
    const { status, categorias, departamentos, formasPgt, choicesFiliais } = useContext(ChoicesContext)
    const { usuarios, choiceUser, auth } = useContext(UsuarioContext)
    const toaster = useToaster();

    const enviar = async () => {
        delete form.filial
        delete form.autor
        delete form.data_solicitacao_bo
        delete form.data_solicitacao
        delete form.numero_solicitacao

        if (form.responsavel) {
            for (let index = 0; index < usuarios.length; index++) {
                if (usuarios[index].username === form.responsavel) {
                    form.responsavel = usuarios[index].id;
                    break;
                }
            }
        }
        if (form.data_vencimento_boleto) form.data_vencimento_boleto = dataParaString(form.data_vencimento_boleto)
        if (form.anexo) form.anexo = form.anexo[0].blobFile

        let data_post = { ...form, ultima_atualizacao: 1, solicitante: form.solicitante.id }
        await api.patch(
            `solicitacoes-compras/${form.id}/`,
            { ...data_post }
        ).then((response) => {
            criarMensagemOk("Sucesso - Solicitação editada.", toaster)
        }).catch((error) => {
            let listMensagem = {
                numero_solicitacao: "Número Solicitação",
                filial: "Filial",
                solicitante: "Solicitante"
            }
            criarMensagemErro(error, listMensagem, toaster)
        })

        setForm({})
        setAbrir(false);

        setUpdate(!update)
    }

    const close = () => {
        setUpdate(!update)
    }

    return (
        <MainModal title={form.numero_solicitacao ? `Editar a Solicitação ${form.numero_solicitacao}` : 'Editar a Solicitação'} nomeBotao="Editar" size='md' open={abrir} setOpen={setAbrir}
            send={enviar} close={close} >
            <Grid fluid>
                <Row xs={24}>
                    <Panel header="Informações da Solicitação">
                        <Form fluid onChange={setForm} formValue={form}>
                            <Col xs={24}>
                                <Row style={style.row}>
                                    <Col xs={12}>
                                        <Form.Group controlId="status">
                                            <Form.ControlLabel>Status:</Form.ControlLabel>
                                            <Form.Control name="status" data={status} accepter={InputPicker} disabledItemValues={auth ? [] : ['CONCLUIDO', 'CANCELADO']} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="filial" >
                                            <Form.ControlLabel>Filial:</Form.ControlLabel>
                                            <Form.Control name="filial" data={choicesFiliais} accepter={InputPicker} disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={12}>
                                        <Form.Group controlId="departamento">
                                            <Form.ControlLabel>Departamento:</Form.ControlLabel>
                                            <Form.Control name="departamento" data={departamentos} accepter={InputPicker} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="responsavel">
                                            <Form.ControlLabel>Responsavel:</Form.ControlLabel>
                                            <Form.Control name="responsavel" data={choiceUser} accepter={InputPicker} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={12}>
                                        <Form.Group controlId="categoria">
                                            <Form.ControlLabel>Categoria:</Form.ControlLabel>
                                            <Form.Control name="categoria" data={categorias} accepter={InputPicker} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="forma_pagamento">
                                            <Form.ControlLabel>Forma de Pagamento:</Form.ControlLabel>
                                            <Form.Control name="forma_pagamento" data={formasPgt} accepter={InputPicker} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={12}>
                                        <Form.Group controlId="data_solicitacao">
                                            <Form.ControlLabel>Criado em:</Form.ControlLabel>
                                            <Form.Control name="data_solicitacao" accepter={DatePicker} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        {form.forma_pagamento !== 'NÃO INFORMADO' && (
                                            <Form.Group controlId="data_vencimento_boleto">
                                                <Form.ControlLabel>Vencimento:</Form.ControlLabel>
                                                <Form.Control name="data_vencimento_boleto" accepter={DatePicker} />
                                            </Form.Group>
                                        )}
                                    </Col>
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={12}>
                                        <Form.Group controlId="anexo">
                                            <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                            <Form.Control name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                                        </Form.Group>
                                    </Col>
                                    {form.status === "CONCLUIDO" && (
                                        <Col xs={12}>
                                            <Form.Group controlId="pago">
                                                <Form.ControlLabel>Pagamento:</Form.ControlLabel>
                                                <Form.Control name="pago" checked={form.pago} onChange={(value) => setForm({ ...form, pago: !value })} accepter={Checkbox} >Pago</Form.Control>
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={24}>
                                        <Form.Group controlId="observacao">
                                            <Form.ControlLabel>Observação:</Form.ControlLabel>
                                            <Form.Control rows={5} name="observacao" value={form.observacao} accepter={Textarea} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Form>
                    </Panel>
                </Row>
                <CriarEntrada form={form} />
            </Grid >
        </MainModal >
    );
};

export default EditarCompra;