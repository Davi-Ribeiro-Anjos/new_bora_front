import { Form, Uploader, DatePicker, Grid, Row, Col, InputPicker, Input, Panel, Checkbox, useToaster, SelectPicker, IconButton } from 'rsuite';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useContext, forwardRef } from 'react';

import { dataParaString } from '../../services/data';
import { criarMensagemErro, criarMensagemOk } from '../../services/mensagem';
import { ChoicesContext } from '../../providers/choicesProviders';
import { UsuarioContext } from '../../providers/usuarioProviders';
import { ApiContext } from '../../providers/apiProviders';

import CriarEntrada from '../entrada/criarEntrada';
import MainModal from '../modal';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const styles = {
    titulo: {
        marginBottom: 20,
    },
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    },
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    },
    observacao: {
        textTransform: 'uppercase'
    }
}

const EditarCompra = ({ form, setForm, abrir, setAbrir, inverteUpdate }) => {
    const { status, categorias, departamentos, formasPgt, choicesFiliais } = useContext(ChoicesContext)
    const { usuarios, choiceUser, auth } = useContext(UsuarioContext)
    const { api, urlBase } = useContext(ApiContext)
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
        if (form.observacao) form.observacao = form.observacao.toUpperCase()

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

        inverteUpdate()
    }

    const fechar = () => {
        setAbrir(false)
        inverteUpdate()
    };

    return (
        <MainModal titulo={form.numero_solicitacao ? `Editar a Solicitação ${form.numero_solicitacao}` : 'Editar a Solicitação'} nomeBotao="Editar" size='md' open={abrir}
            enviar={enviar} fechar={fechar} >
            <Grid fluid>
                <Panel header="Informações da Solicitação">
                    <Form fluid onChange={setForm} formValue={form}>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Status:</Form.ControlLabel>
                                    <Form.Control name="status" data={status} accepter={InputPicker} disabledItemValues={auth ? [] : ['CONCLUIDO', 'CANCELADO']} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control name="filial" data={choicesFiliais} accepter={InputPicker} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Departamento:</Form.ControlLabel>
                                    <Form.Control name="departamento" data={departamentos} accepter={InputPicker} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Responsavel:</Form.ControlLabel>
                                    <Form.Control name="responsavel" data={choiceUser} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Categoria:</Form.ControlLabel>
                                    <Form.Control name="categoria" data={categorias} accepter={InputPicker} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Forma de Pagamento:</Form.ControlLabel>
                                    <Form.Control name="forma_pagamento" data={formasPgt} accepter={InputPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Criado em:</Form.ControlLabel>
                                    <Form.Control name="data_solicitacao" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                {form.forma_pagamento !== 'NÃO INFORMADO' && (
                                    <Form.Group >
                                        <Form.ControlLabel>Vencimento:</Form.ControlLabel>
                                        <Form.Control name="data_vencimento_boleto" placeholder="DD-MM-AAAA" format='dd-MM-yyyy' accepter={DatePicker} />
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                {form.anexo ? (
                                    <Form.Group >
                                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                        <a href={`${urlBase}${form.anexo}`} rel="noreferrer" target="_blank">
                                            <IconButton icon={<FileDownloadIcon />} appearance="primary" color="blue" style={styles.iconBu} />
                                        </a>
                                    </Form.Group>
                                ) : (
                                    <Form.Group >
                                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                        <Form.Control name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                                    </Form.Group>
                                )}
                            </Col>
                            {form.status === "CONCLUIDO" && (
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.ControlLabel>Pagamento:</Form.ControlLabel>
                                        <Form.Control name="pago" checked={form.pago} onChange={(value) => setForm({ ...form, pago: !value })} accepter={Checkbox} >Pago</Form.Control>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Observação:</Form.ControlLabel>
                                    <Form.Control style={styles.observacao} rows={5} name="observacao" value={form.observacao} accepter={Textarea} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
                <CriarEntrada form={form} />
            </Grid >
        </MainModal >
    );
};

export default EditarCompra;