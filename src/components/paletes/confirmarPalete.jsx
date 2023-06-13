import { Col, Grid, Input, Row } from 'rsuite';

import MainModal from '../modal';

const styles = {
    input: {
        width: 250
    },
    row: {
        marginBottom: 15,
    }
}

const ConfirmarPalete = ({ abrirConfirmar, setAbrirConfirmar }) => {

    const fechar = () => {
        setAbrirConfirmar(false)
    };

    return (
        <MainModal open={abrirConfirmar} setOpen={setAbrirConfirmar} titulo="Confirmar Recebimento" nomeBotao="Confirmar" fechar={fechar} size='lg'>
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
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Data solicitação
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Quantidade
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Origem
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Destino
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Placa do Veículo
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Autor
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Motorista
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
                <Row style={styles.row} xs={24}>
                    <Col xs={6}>
                        Conferente
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                    <Col xs={9}>
                        <Input style={styles.input} disabled />
                    </Col>
                </Row>
            </Grid>
        </MainModal>
    )
}

export default ConfirmarPalete;