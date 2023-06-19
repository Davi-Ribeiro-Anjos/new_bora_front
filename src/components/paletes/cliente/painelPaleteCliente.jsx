import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import MemberIcon from '@rsuite/icons/Member';

import { useState } from "react";

import CadastrarEntradaCliente from "./cadastrarEntradaCliente";
import CadastrarSaidaCliente from "./cadastrarSaidaCliente";
import CadastrarCliente from "./cadastrarCliente";


const styles = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: "0 5px"
    },
}

const PainelPaleteCliente = ({ update, inverteUpdate }) => {
    const [abrirCadastrarEntradaCliente, setAbrirCadastrarEntradaCliente] = useState(false);
    const modalCadastrarEntrada = () => setAbrirCadastrarEntradaCliente(true);

    const [abrirCadastrarSaidaCliente, setAbrirCadastrarSaidaCliente] = useState(false);
    const modalCadastrarSaida = () => setAbrirCadastrarSaidaCliente(true);

    const [abrirCadastrarCliente, setAbrirCadastrarCliente] = useState(false);
    const modalCliente = () => setAbrirCadastrarCliente(true);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Painel Paletes Clientes</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Entrada</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCadastrarEntrada()} />
                    </Whisper>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Saída</Tooltip>}>
                        <IconButton icon={<MinusIcon />} appearance="primary" color="red" style={styles.iconBu} onClick={() => modalCadastrarSaida()} />
                    </Whisper>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Cliente</Tooltip>}>
                        <IconButton icon={<MemberIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => modalCliente()} />
                    </Whisper>
                </div>
            </div>
            <CadastrarEntradaCliente abrirCadastrarEntradaCliente={abrirCadastrarEntradaCliente} setAbrirCadastrarEntradaCliente={setAbrirCadastrarEntradaCliente} inverteUpdate={inverteUpdate} />
            <CadastrarSaidaCliente abrirCadastrarSaidaCliente={abrirCadastrarSaidaCliente} setAbrirCadastrarSaidaCliente={setAbrirCadastrarSaidaCliente} inverteUpdate={inverteUpdate} />
            <CadastrarCliente abrirCadastrarCliente={abrirCadastrarCliente} setAbrirCadastrarCliente={setAbrirCadastrarCliente} inverteUpdate={inverteUpdate} />
        </>
    )
}

export default PainelPaleteCliente;