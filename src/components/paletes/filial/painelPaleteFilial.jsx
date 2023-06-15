import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';

import { useState } from "react";

import CriarTransferenciaFilial from "./criarTransferenciaFilial";
import InfoPaleteFilial from "./infoPaleteFilial";


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: "0 5px"
    },
}

const PainelPaleteFilial = ({ update, inverteUpdate }) => {
    const [abrirCriar, setAbrirCriar] = useState(false);
    const modalCriar = () => setAbrirCriar(true);

    const [abrirInfo, setAbrirInfo] = useState(false);
    const modalInfo = () => setAbrirInfo(true);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Painel Paletes Filiais</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Solicitar Transferência</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCriar()} />
                    </Whisper>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Quantidade por Garagem</Tooltip>}>
                        <IconButton icon={<InfoOutlineIcon />} appearance="primary" color="cyan" style={styles.iconBu} onClick={() => modalInfo()} />
                    </Whisper>
                </div>
            </div>
            <CriarTransferenciaFilial abrirCriar={abrirCriar} setAbrirCriar={setAbrirCriar} inverteUpdate={inverteUpdate} />
            <InfoPaleteFilial abrirInfo={abrirInfo} setAbrirInfo={setAbrirInfo} update={update} inverteUpdate={inverteUpdate} />
        </>
    )
}

export default PainelPaleteFilial;