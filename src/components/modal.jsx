import { Modal, Button } from 'rsuite';

const MainModal = ({ send, open, setOpen, title, nomeBotao, overflow = false, view = false, close = false, size = 'sm', children }) => {
    const handleClose = () => {
        setOpen(false)
        if (close) {
            close()
        }
    };

    return (
        <Modal overflow={overflow} size={size} open={open} onClose={() => handleClose()}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {view === false ?
                    <>
                        <Button onClick={() => send()} appearance="primary">
                            {nomeBotao}
                        </Button>
                        <Button onClick={() => handleClose()} appearance="subtle">
                            Cancelar
                        </Button>
                    </>
                    :
                    <Button onClick={() => handleClose()} appearance="subtle">
                        Fechar
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

export default MainModal