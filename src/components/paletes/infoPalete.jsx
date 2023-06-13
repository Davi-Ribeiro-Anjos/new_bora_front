import { Col, Panel, Placeholder, Row } from 'rsuite';
import MainModal from '../modal';

const styles = {
    col: {
        margin: "10px 0",
    },
}

const Card = ({ titulo }) => (
    <Col md={4} sm={12} style={styles.col}>
        <Panel bordered header={titulo}>
            <p>PBR: <strong>1</strong></p>
            <p>CHEP: <strong>1</strong></p>
            <p>TOTAL: <strong>1</strong></p>
        </Panel>
    </Col>
);

const InfoPalete = ({ abrirInfo, setAbrirInfo }) => {
    const fechar = () => {
        setAbrirInfo(false)
    };

    return (
        <MainModal open={abrirInfo} setOpen={setAbrirInfo} titulo="Quantidade de Paletes por Garagem" nomeBotao="Adicionar Paletes" size='full' fechar={fechar} >
            <Row>
                <Card titulo={"teste"} />
                <Card titulo={"teste"} />
                <Card titulo={"teste"} />
                <Card titulo={"teste"} />
                <Card titulo={"teste"} />
                <Card titulo={"teste"} />
            </Row>
        </MainModal>
    )
}

export default InfoPalete;