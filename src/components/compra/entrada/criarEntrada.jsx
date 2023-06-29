import { Button, Col, Divider, Form, Input, Panel, Row, Uploader, useToaster } from "rsuite"

import { forwardRef, useContext, useState } from "react"

import { criarMensagemErro, criarMensagemOk } from "../../../services/mensagem";
import { UsuarioContext } from "../../../providers/usuarioProviders";
import { ApiContext } from "../../../providers/apiProviders";

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const styles = {
    row: {
        marginBottom: 10,
    },
    observacao: {
        textTransform: 'uppercase'
    }
}

const CriarEntrada = ({ form }) => {
    const { auth } = useContext(UsuarioContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();

    const [entrada, setEntrada] = useState(
        {
            observacao: '',
            anexo: []
        }
    )

    const criarEntrada = async () => {
        let dado = { ...entrada, autor: 1, solicitacao: form.id }

        if (dado.observacao) dado.observacao = dado.observacao.toUpperCase()
        if (Boolean(dado.anexo.length)) {
            for (let index in dado.anexo) {
                dado[`arquivo_${parseInt(parseInt(index) + 1)}`] = dado.anexo[index].blobFile
            }
        }
        delete dado.anexo

        await api.post(
            'solicitacoes-entradas/',
            { ...dado }
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
                                <Row style={styles.row}>
                                    <Col xs={24}>
                                        <Form.Group controlId="observacao">
                                            <Form.ControlLabel>Descrição da Entrada:</Form.ControlLabel>
                                            <Form.Control style={styles.observacao} rows={8} name="observacao" value={entrada.observacao} accepter={Textarea} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={styles.row}>
                                    <Col xs={24}>
                                        <Form.Group controlId="anexo">
                                            <Form.ControlLabel>Anexo: </Form.ControlLabel>
                                            <Form.Control name="anexo" multiple={true} accepter={Uploader} action='' autoUpload={false} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={styles.row}>
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