import { Message } from "rsuite"

export const criarMensagemOk = (mensagem, toaster) => {
    let m = (
        <Message showIcon type="success" closable>
            {mensagem}
        </Message>
    )

    toaster.push(m, { placement: 'topEnd', duration: 4000 })
}

export const criarMensagemErro = (error, listMensagem, toaster) => {
    let status = error.response.status
    let listaErro = error.response.data

    if (status === 400) {
        for (let valor in listaErro) {
            let mensagem = (
                < Message showIcon type="error" closable >
                    {listMensagem[valor]} - {listaErro[valor]}
                </ Message>
            )
            toaster.push(mensagem, { placement: 'topEnd', duration: 6000 })
        }
    } else {
        console.log(error)
        let mensagem = (
            < Message showIcon type="error" closable >
                Erro - Ocorreu um erro.
            </ Message>
        )
        toaster.push(mensagem, { placement: 'topEnd', duration: 6000 })
    }
}

export const criarMensagemInfo = (mensagem, toaster) => {
    let m = (
        <Message showIcon type="info" closable>
            {mensagem}
        </Message>
    )

    toaster.push(m, { placement: 'topEnd', duration: 4000 })
}