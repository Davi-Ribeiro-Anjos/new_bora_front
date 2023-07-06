import { Col, Grid, IconButton, Panel, PanelGroup, Row, Tooltip, Whisper } from "rsuite"

import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import MainDrawer from "../../drawer"
import { useState } from "react";
import CriarContrato from "./contratos/criarContrato";


const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
    },
    iconBu: {
        width: "2.75vw",
        height: "6.5vh",
        padding: 0,
        margin: 0
    }
}

const ServicoFuncionario = ({ form, setForm, abrir, setAbrir }) => {
    // Contrato
    const [abrirContrato, setAbrirContrato] = useState(false)
    const modalAbrirContrato = () => {
        setAbrirContrato(true)
        fechar()
    }

    const fechar = () => {
        setAbrir(false)
    }

    return (
        <>

            <CriarContrato form={form} setForm={setForm} abrir={abrirContrato} setAbrir={setAbrirContrato} setAbrirDrawer={setAbrir} />
            <MainDrawer open={abrir} fechar={fechar} titulo="Serviços">
                <Grid fluid>
                    <PanelGroup accordion defaultActiveKey={0}>
                        <Panel header="Contratos" eventKey={1}>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Criar Contrato</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Contrato</Tooltip>}>
                                        <IconButton icon={<PlusIcon />} style={styles.iconBu} onClick={() => modalAbrirContrato()} />
                                    </Whisper>
                                </Col>

                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Contratos</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Contratos</Tooltip>}>
                                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Exportar Contratos</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Contratos</Tooltip>}>
                                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="Décimo Terceiro" eventKey={2}>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Criar 13º</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar 13º</Tooltip>}>
                                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>13ºs</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>13ºs</Tooltip>}>
                                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Exportar 13ºs</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar 13ºs</Tooltip>}>
                                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="Férias" eventKey={3}>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Criar Férias</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Férias</Tooltip>}>
                                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Férias</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Férias</Tooltip>}>
                                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Exportar Férias</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Férias</Tooltip>}>
                                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="Bônus" eventKey={4}>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Criar Bônus</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Bônus</Tooltip>}>
                                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Bônus</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Bônus</Tooltip>}>
                                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                            <Row style={styles.row}>
                                <Col xs={20}>
                                    <em>Exportar Bônus</em>
                                </Col>
                                <Col xs={4}>
                                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Bônus</Tooltip>}>
                                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                                    </Whisper>
                                </Col>
                            </Row>
                        </Panel>
                    </PanelGroup>
                </Grid>
            </MainDrawer>
        </>
    )
}

export default ServicoFuncionario;