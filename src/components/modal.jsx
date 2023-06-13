import { Modal, Button } from 'rsuite';

const MainModal = ({ enviar, open, titulo, nomeBotao, overflow = false, view = false, fechar, size = 'sm', children }) => {
    return (
        <Modal overflow={overflow} size={size} open={open} onClose={() => fechar()}>
            <Modal.Header>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {view === false ?
                    <>
                        <Button onClick={() => enviar()} appearance="primary">
                            {nomeBotao}
                        </Button>
                        <Button onClick={() => fechar()} appearance="subtle">
                            Cancelar
                        </Button>
                    </>
                    :
                    <Button onClick={() => fechar()} appearance="subtle">
                        Fechar
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default MainModal