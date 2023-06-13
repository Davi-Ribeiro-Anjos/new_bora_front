import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';

import { useState } from "react";

import CriarPalete from "./criarPalete";
import InfoPalete from "./infoPalete";


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: "0 5px"
    },
}

const PainelPalete = ({ inverteUpdate }) => {
    const [abrirCriar, setAbrirCriar] = useState(false);
    const modalCriar = () => setAbrirCriar(true);

    const [abrirInfo, setAbrirInfo] = useState(false);
    const modalInfo = () => setAbrirInfo(true);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Painel Paletes</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Solicitar Transferência</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCriar()} />
                    </Whisper>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Quantidade por Garagem</Tooltip>}>
                        <IconButton icon={<InfoOutlineIcon />} appearance="primary" color="cyan" style={styles.iconBu} onClick={() => modalInfo()} />
                    </Whisper>
                </div>
            </div>
            <CriarPalete abrirCriar={abrirCriar} setAbrirCriar={setAbrirCriar} inverteUpdate={inverteUpdate} />
            <InfoPalete abrirInfo={abrirInfo} setAbrirInfo={setAbrirInfo} />
        </>
    )
}

export default PainelPalete;