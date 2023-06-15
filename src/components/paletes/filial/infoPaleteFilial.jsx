import { Col, IconButton, Panel, Row, Tooltip, Whisper, useToaster } from 'rsuite';
import PageIcon from '@rsuite/icons/Page';

import { useEffect, useState } from 'react';

import { api } from '../../../services/api';
import { criarMensagemErro } from '../../../services/mensagem';

import MainModal from '../../modal';
import CriarPaletesFilial from './criarPaleteFilial';

const styles = {
    col: {
        margin: "10px 0",
    },
}

const Card = ({ titulo, quantidade }) => (
    <Col md={4} sm={12} style={styles.col}>
        <Panel bordered header={titulo}>
            <p>PBR: <strong>{quantidade.PBR}</strong></p>
            <p>CHEP: <strong>{quantidade.CHEP}</strong></p>
            <p>TOTAL: <strong>{quantidade.TOTAL}</strong></p>
        </Panel>
    </Col>
);

const InfoPaleteFilial = ({ abrirInfo, setAbrirInfo, update, inverteUpdate }) => {
    const toaster = useToaster();

    const [abrirCriar, setAbrirCriar] = useState(false)
    const [paletes, setPaletes] = useState([])

    useEffect(() => {
        pegaPaletes()

        // eslint-disable-next-line
    }, [update])

    const pegaPaletes = () => {
        api.get("paletes-controles/").then(response => {
            setPaletes(response.data)
        }).catch(error => {
            let listMensagem = {
                localizacao_atual: "Filial",
                quantidade_paletes: "Quantidade de Paletes",
                tipo_palete: 'Tipo Palete',
            }

            criarMensagemErro(error, listMensagem, toaster)
        })
    }

    const abrir = () => {
        setAbrirCriar(true)
        setAbrirInfo(false)
    }

    const fechar = () => {
        setAbrirInfo(false)
    };

    return (
        <>
            <MainModal open={abrirInfo} setOpen={setAbrirInfo} titulo="Quantidade de Paletes por Garagem" nomeBotao="Adicionar Paletes" size='full' enviar={abrir} fechar={fechar} >
                {paletes.length > 0 && (
                    <Row>
                        <Col xs={23}></Col>
                        <Col xs={1}>
                            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Baixar CSV</Tooltip>}>
                                <IconButton icon={<PageIcon />} appearance="primary" color="cyan" style={styles.iconBu} onClick={() => null} />
                            </Whisper></Col>
                    </Row>
                )}
                <Row>
                    {paletes.length > 0 ? (
                        paletes.map((valor, index) => {
                            return (
                                <Card key={index} titulo={valor.localizacao_atual} quantidade={valor} />
                            )
                        })

                    ) : (
                        <p>
                            Não tem paletes cadastrados.
                        </p>

                    )
                    }

                </Row>
            </MainModal >
            <CriarPaletesFilial abrirCriar={abrirCriar} setAbrirCriar={setAbrirCriar} setAbrirInfo={setAbrirInfo} inverteUpdate={inverteUpdate} />
        </>
    )
}

export default InfoPaleteFilial;