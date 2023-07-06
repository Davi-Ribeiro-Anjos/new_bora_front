import { useState } from "react"

import MainModal from "../../modal"

import CriarContrato from "./contratos/criarContrato"

const ModalCriar = ({ abrir, fechar, enviar }) => {
    const [form, setForm] = useState({})

    return (
        <MainModal open={abrir} fechar={fechar} enviar={enviar} titulo="Criar Contrato" nomeBotao="Criar" size='md'>
            <CriarContrato />
        </MainModal>
    )
}