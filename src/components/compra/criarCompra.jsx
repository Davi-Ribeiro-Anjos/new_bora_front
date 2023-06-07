import { Form, Uploader, SelectPicker, Grid, Row, Col, Whisper, IconButton, Tooltip, useToaster } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

import { useContext, useState } from 'react';

import { api } from '../../services/api';
import { ChoicesContext } from '../../providers/choicesProviders';

import MainModal from '../modal';
import { criarMensagemErro, criarMensagemOk } from '../../services/mensagem';

const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}

const CriarCompra = ({ update, setUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const toaster = useToaster();

    const [abrir, setAbrir] = useState(false);
    const [form, setForm] = useState({
        filial: '',
        numero_solicitacao: '',
        anexo: [],
    });

    const modal = () => setAbrir(true);

    const enviar = async () => {
        console.log(form)
        if (form.anexo.length > 0) form.anexo = form.anexo[0].blobFile

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        today.setHours(today.getHours() - 3)

        let data_post = { ...form, data_solicitacao_bo: today.toISOString(), status: "ABERTO", solicitante: 1, autor: 1, ultima_atualizacao: 1 }
        await api.post(
            'solicitacoes-compras/',
            { ...data_post }
        ).then((response) => {
            criarMensagemOk("Sucesso - Solicitação criada.", toaster)
            setForm({
                filial: '',
                numero_solicitacao: '',
                anexo: [],
            })
            setAbrir(false);
            setUpdate(!update)
        }).catch((error) => {
            let listMensagem = {
                numero_solicitacao: "Número Solicitação",
                filial: "Filial",
                anexo: "Anexo"
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Painel Compras</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip> Solicitação</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modal()} />
                    </Whisper>
                </div>
            </div>
            <MainModal title="Adicionar Solicitação" nomeBotao="Criar" open={abrir} setOpen={setAbrir}
                form={form} send={enviar}>
                <Grid fluid>
                    <Form onChange={(valor) => setForm({ ...form, ...valor })} form={form} layout='inline'>
                        <Row>
                            <Col xs={24}>
                                <Form.Group controlId="name-5">
                                    <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                                    <Form.Control name="numero_solicitacao" />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9}>
                                <Form.Group controlId="inputPicker">
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control name="filial" data={filiais} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={14}>
                                <Form.Group controlId="anexo">
                                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                    <Form.Control name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Grid >
            </MainModal>
        </>
    );
};

export default CriarCompra;