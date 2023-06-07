import { FlexboxGrid, Panel, PanelGroup } from "rsuite"
import MainModal from "../modal";

const styleCenter = {
    justifyContent: 'center',
    alignItems: 'center',
    // height: '30px',
    margin: '10px 0'
};

const style = {
    display: 'flex',
    flexDirection: 'column'
}

const Entrada = ({ entradas, abrirEntradas, setAbrirEntradas }) => {
    return (
        <MainModal title="Entradas" view={true} open={abrirEntradas} setOpen={setAbrirEntradas}
            size='md'>
            {entradas.length > 0 ?
                <PanelGroup accordion bordered>
                    {entradas.map((dado, index) => {
                        return (
                            <Panel header={`ID ENTREGA - ${dado.id}`} eventKey={index} id={dado.id}>
                                <FlexboxGrid style={style}>
                                    <FlexboxGrid.Item style={styleCenter}>
                                        OBSERVAÇÃO - {dado.observacao}
                                    </FlexboxGrid.Item>
                                    {dado.arquivo_1 && (
                                        <FlexboxGrid.Item style={styleCenter}>
                                            ANEXO 1 - {dado.arquivo_1}
                                        </FlexboxGrid.Item>
                                    )}
                                    {dado.arquivo_2 && (
                                        <FlexboxGrid.Item style={styleCenter}>
                                            ANEXO 2 - {dado.arquivo_2}
                                        </FlexboxGrid.Item>
                                    )}
                                    {dado.arquivo_3 && (
                                        <FlexboxGrid.Item style={styleCenter}>
                                            ANEXO 3 - {dado.arquivo_3}
                                        </FlexboxGrid.Item>
                                    )}
                                </FlexboxGrid>
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
