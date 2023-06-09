import { Button, Checkbox, Col, Form, Grid, Input, Row, SelectPicker, useToaster } from "rsuite";

import { useContext } from "react";

import { criarMensagemErro } from "../../../services/mensagem";
import { ChoicesContext } from "../../../providers/choicesProviders";
import { UsuarioContext } from "../../../providers/usuarioProviders";
import { ApiContext } from '../../../providers/apiProviders';

import { MainPanelCollapsible } from "../../panel";


const styles = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


const FiltroPaleteFilial = ({ filtro, setFiltro, setDado, setMostrarRecebimento }) => {
    const { filiais } = useContext(ChoicesContext);
    const { choiceUser } = useContext(UsuarioContext)
    const { api } = useContext(ApiContext)
    const toaster = useToaster();


    const limparFiltro = () => {
        setFiltro({
            origem: null,
            destino: null,
            placa_veiculo: '',
            autor: null,
            recebido: false,
        })
    }

    const filtrarDados = async () => {
        let novoFiltro = filtro;

        const placa_veiculo = novoFiltro.placa_veiculo
        const autor = novoFiltro.autor

        if (novoFiltro.placa_veiculo) {
            novoFiltro['placa_veiculo__contains'] = novoFiltro.placa_veiculo

            delete novoFiltro.placa_veiculo
        } else {
            delete novoFiltro.placa_veiculo
        }

        if (novoFiltro.autor) {
            novoFiltro['autor__username'] = novoFiltro.autor

            delete novoFiltro.autor
        }

        await api.get('paletes-movimentos/', { params: { ...novoFiltro } }).then((response) => {
            setDado(response.data)
            if (novoFiltro.recebido) setMostrarRecebimento(true)
            else setMostrarRecebimento(false)
        }).catch((error) => {
            let listMensagem = {
                origem: "Origem",
                destino: "Destino",
                placa_veiculo: "Placa do Veiculo",
                autor: "Autor",
                recebido: "Recebido"
            }
            criarMensagemErro(error, listMensagem, toaster)
        })

        setFiltro({
            origem: filtro.origem || null,
            destino: filtro.destino || null,
            placa_veiculo: placa_veiculo || '',
            recebido: filtro.recebido || false,
            autor: autor || null,
        })
    }

    return (
        <MainPanelCollapsible title="Filtros">
            <Grid style={{ width: "100%" }}>
                <Form fluid onChange={setFiltro} formValue={filtro}>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Origem:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="origem" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Destino:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="destino" data={filiais} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Placa do Veículo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="placa_veiculo" accepter={Input} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Autor:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="autor" data={choiceUser} accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={24} style={styles.row}>
                        <Col xs={12}>
                            <Form.Group style={styles.form}>
                                <Form.ControlLabel>Transferências Recebidas:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="recebido" checked={filtro.recebido} onChange={(value) => setFiltro({ ...filtro, recebido: !value })} accepter={Checkbox} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col xs={20}></Col>
                    <Col xs={2}>
                        <Button onClick={() => filtrarDados()} appearance="primary">
                            Filtrar
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => limparFiltro()}>
                            Limpar
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </MainPanelCollapsible>
    )
}

export default FiltroPaleteFilial;