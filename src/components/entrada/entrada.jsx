import { FlexboxGrid, List } from "rsuite"
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
                <List bordered>
                    {entradas.map((dado) => {
                        return (
                            <List.Item key={dado.id}>
                                <FlexboxGrid style={style}>
                                    <FlexboxGrid.Item colspan={4} style={styleCenter}>
                                        ID ENTREGA - {dado.id}
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item style={styleCenter}>
                                        OBSERVAÇÃO - {dado.observacao}
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </List.Item>
                        )
                    })}
                </List>
                :
                <label>Nenhuma entrada cadastrada.</label>
            }
        </MainModal>
    )
}

export default Entrada;
