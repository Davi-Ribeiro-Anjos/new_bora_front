import { Col, Grid, Input, InputNumber, Row, useToaster } from 'rsuite';

import { api } from '../../../services/api';
import { dataParaString, stringParaData } from '../../../services/data';
import { criarMensagemErro, criarMensagemOk } from '../../../services/mensagem';

import MainModal from '../../modal';

const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 15,
    }
}

const ConfirmarTransferenciaFilial = ({ form, setForm, abrirConfirmar, setAbrirConfirmar, inverteUpdate }) => {
    const toaster = useToaster();

    const confirmar = () => {
        const data = stringParaData(form.data_recebimento)

        let dado = {
            data_recebimento: dataParaString(data, true),
            quantidade_paletes: form.quantidadeInicial,
            recebido: true,
            destino: form.destino.id
        }

        api.patch(`paletes-movimentos/confirmar/${form.id}/`, dado).then(response => {
            criarMensagemOk("Sucesso - Transferência confirmada.", toaster)
            inverteUpdate()
            fechar()
        }).catch(error => {
            let listMensagem = {
                data_recebimento: "Data Recebimento",
                quantidade_paletes: "Quantidade de Paletes",
                recebido: 'Recebido',
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const fechar = () => {
        setAbrirConfirmar(false)
    };

    return (
        <MainModal open={abrirConfirmar} setOpen={setAbrirConfirmar} titulo="Confirmar Recebimento" nomeBotao="Confirmar" enviar={confirmar} fechar={fechar} size='lg'>
            <Grid fluid>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}><h6>Tipo de Dado:</h6></Col>
                    <Col xs={9}><h6>Transferido:</h6></Col>
                    <Col xs={9}><h6>Recebido:</h6></Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Nº da Solicitação
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.solicitacao} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.solicitacao} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Data solicitação
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.data_solicitacao} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.data_recebimento} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Quantidade
                    </Col>
                    <Col xs={9}>
                        <InputNumber style={styles.input} disabled value={form.quantidadeInicial} />
                    </Col>
                    <Col xs={9}>
                        <InputNumber style={styles.input} value={form.quantidade_paletes} onChange={(valor) => setForm({ ...form, quantidade_paletes: valor })} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Origem
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.origem && form.origem.sigla} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.origem && form.origem.sigla} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Destino
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.destino && form.destino.sigla} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.destino && form.destino.sigla} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Placa do Veículo
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.placa_veiculo} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.placa_veiculo} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Autor
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.autor && form.autor.username} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.autor && form.autor.username} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Motorista
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.motorista} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.motorista} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Conferente
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.conferente} />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled value={form.conferente} />
                    </Col>
                </Row>
            </Grid>
        </MainModal>
    )
}

export default ConfirmarTransferenciaFilial;