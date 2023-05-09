import { Modal, Button } from 'rsuite';

const MainModalForm = ({ send, open, setOpen, title, nameB, children }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => send()} appearance="primary">
                    {nameB}
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MainModalForm