import { Button, Col, Grid, Panel, PanelGroup, Row } from "rsuite"

import { useContext } from "react";

import { ApiContext } from '../../providers/apiProviders';

import MainModal from "../modal";

const styles = {
    row: {
        marginBottom: 10,
    },
    col: {
        marginRigth: 10
    }
}

const Entrada = ({ entradas, abrirEntradas, setAbrirEntradas }) => {
    const { urlBase } = useContext(ApiContext)

    const fechar = () => {
        setAbrirEntradas(false)
    };

    return (
        <MainModal titulo="Entradas" view={true} open={abrirEntradas} setOpen={setAbrirEntradas}
            size='md' fechar={fechar}>
            {entradas.length > 0 ?
                <PanelGroup accordion bordered defaultActiveKey={0}>
                    {entradas.map((dado, index) => {
                        return (
                            <Panel header={`ID ENTREGA - ${dado.id}`} eventKey={index} key={index} id={index}>
                                <Grid>
                                    <Row style={styles.row}>
                                        OBSERVAÇÃO - {dado.observacao}
                                    </Row>
                                    <Row style={styles.row}>
                                        {dado.arquivo_1 && (
                                            <Col>
                                                <a href={`${urlBase}${dado.arquivo_1}`} rel="noreferrer" target="_blank" >
                                                    <Button >ANEXO 1</Button>
                                                </a>
                                            </Col>
                                        )}
                                        {dado.arquivo_2 && (
                                            <Col>
                                                <a href={`${urlBase}${dado.arquivo_2}`} rel="noreferrer" target="_blank" >
                                                    <Button>ANEXO 2</Button>
                                                </a>
                                            </Col>
                                        )}
                                        {dado.arquivo_3 && (
                                            <Col>
                                                <a href={`${urlBase}${dado.arquivo_3}`} rel="noreferrer" target="_blank" >
                                                    <Button>ANEXO 3</Button>
                                                </a>
                                            </Col>
                                        )}
                                    </Row>
                                </Grid>
                            </Panel>
                        )
                    })}
                </PanelGroup>
                :
                <label>Nenhuma entrada cadastrada.</label>
            }
        </MainModal>
    )
}

export default Entrada;
