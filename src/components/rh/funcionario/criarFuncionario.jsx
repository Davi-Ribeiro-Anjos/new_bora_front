import { Form, Uploader, SelectPicker, Grid, Row, Col, useToaster, InputNumber } from 'rsuite';

import { useContext, useState } from 'react';

import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';
import { ChoicesContext } from '../../../providers/choicesProviders';
import { ApiContext } from '../../../providers/apiProviders';

import MainModal from '../../modal';



const CriarFuncionario = ({ abrir, setAbrir, inverteUpdate }) => {
    const { filiais } = useContext(ChoicesContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();


    const [form, setForm] = useState({
        filial: '',
        numero_solicitacao: '',
        anexo: [],
    });


    const enviar = async () => {
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
            inverteUpdate()
        }).catch((error) => {
            let listMensagem = {
                numero_solicitacao: "Número Solicitação",
                filial: "Filial",
                anexo: "Anexo"
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const fechar = () => {
        setAbrir(false)
    };

    return (
        <MainModal titulo="Adicionar Solicitação" nomeBotao="Criar" open={abrir} setOpen={setAbrir}
            enviar={enviar} fechar={fechar}>
            <Grid fluid>
                <Form onChange={setForm} formValue={form} layout='inline'>
                    <Row>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                                <Form.Control name="numero_solicitacao" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <Form.Group >
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control name="filial" data={filiais} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={14}>
                            <Form.Group >
                                <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                <Form.Control name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid >
        </MainModal>
    );
};

export default CriarFuncionario;