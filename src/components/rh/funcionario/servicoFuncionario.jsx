import { Button, Col, Grid, Panel, PanelGroup, Row } from "rsuite"
import MainDrawer from "../../drawer"


const ServicoFuncionario = ({ abrir, setAbrir }) => {
    const fechar = () => {
        setAbrir(false)
    }

    return (
        <MainDrawer open={abrir} fechar={fechar} titulo="Serviços">
            <Grid fluid>
                <PanelGroup accordion defaultActiveKey={0}>
                    <Panel header="Contratos" eventKey={1}>
                        <Row>
                            <Col>
                                <em>Criar Contrato</em>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Décimo Terceiro" eventKey={2}>
                        <Row>
                            <Col xs={20}>
                                <em>Criar 13º</em>
                            </Col>
                            <Col xs={4}>
                                <Button>Criar</Button>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Férias" eventKey={3}>
                        <Row>
                            <Col>
                                <em>Criar Contrato</em>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Bônus" eventKey={4}>
                        <Row>
                            <Col>
                                <em>Criar Contrato</em>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Panel>
                </PanelGroup>
            </Grid>
        </MainDrawer>
    )
}

export default ServicoFuncionario;