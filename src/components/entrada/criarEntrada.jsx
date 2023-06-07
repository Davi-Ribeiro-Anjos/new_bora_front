import { Button, Col, Divider, Form, Input, Panel, Row, Uploader, useToaster } from "rsuite"

import { forwardRef, useContext, useState } from "react"

import { api } from "../../services/api"
import { UsuarioContext } from "../../providers/usuarioProviders"
import { criarMensagemErro, criarMensagemOk } from "../../services/mensagem";

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const style = {
    row: {
        marginBottom: 10,
    }
}

const CriarEntrada = ({ form }) => {
    const { auth } = useContext(UsuarioContext)
    const toaster = useToaster();

    const [entrada, setEntrada] = useState(
        {
            observacao: '',
            anexo: []
        }
    )

    const criarEntrada = async () => {
        let dado_post = { ...entrada, autor: 1, solicitacao: form.id }

        if (Boolean(dado_post.anexo.length)) {
            for (let index in dado_post.anexo) {
                dado_post[`arquivo_${parseInt(index + 1)}`] = dado_post.anexo[index].blobFile
            }
        }
        delete dado_post.anexo

        await api.post(
            'solicitacoes-entradas/',
            { ...dado_post }
        ).then((response) => {
            criarMensagemOk("Sucesso - Entrada criada.", toaster)

            setEntrada({
                observacao: '',
                anexo: []
            })

        }).catch((error) => {
            let listMensagem = {
                observacao: "Descrição",
                anexo: "Anexo"
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    return (
        <Row>
            {auth ? (
                <>
                    <Divider />
                    <Panel header="Cadastrar Entradas">
                        <Form fluid onChange={setEntrada} formValue={entrada} >
                            <Col xs={24}>
                                <Row style={style.row}>
                                    <Col xs={24}>
                                        <Form.Group controlId="observacao">
                                            <Form.ControlLabel>Descrição da Entrada:</Form.ControlLabel>
                                            <Form.Control rows={8} name="observacao" accepter={Textarea} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={style.row}>
                                    <Col xs={24}>
                                        <Form.Group controlId="anexo">
                                            <Form.ControlLabel>Anexo: </Form.ControlLabel>
                                            <Form.Control name="anexo" multiple={true} accepter={Uploader} action='' autoUpload={false} />
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
    )
}

export default CriarEntrada;