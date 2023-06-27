import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';

import { useState } from "react";

import CriarFuncionario from "./criarFuncionario";


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}

const PainelFuncionario = ({ inverteUpdate }) => {
    const [abrir, setAbrir] = useState(false);
    const modalCriar = () => setAbrir(true);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Painel Funcionários</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Novo Funcionário</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCriar()} />
                    </Whisper>
                </div>
            </div>
            <CriarFuncionario abrir={abrir} setAbrir={setAbrir} inverteUpdate={inverteUpdate} />
        </>
    )
}

export default PainelFuncionario;