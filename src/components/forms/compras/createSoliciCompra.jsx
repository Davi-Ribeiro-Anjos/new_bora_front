import { Form, Uploader, SelectPicker } from 'rsuite';

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
    label: item,
    value: item
}));

const styles = {
    line: {
        display: "flex",
        "flex-direction": "row",
    }
}

const CreateSolicCompra = ({ formValue, setFormValue }) => {
    return (
        <>
            <Form fluid onChange={setFormValue} formValue={formValue} layout='inline'>
                <div style={styles.line}>
                    <Form.Group controlId="inputPicker" style={{ marginRight: "4vw" }}>
                        <Form.ControlLabel>Empresa:</Form.ControlLabel>
                        <Form.Control name="empresa" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Filial:</Form.ControlLabel>
                        <Form.Control name="filial" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                </div>
                <Form.Group controlId="name-5">
                    <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                    <Form.Control name="cod_solic" />
                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="uploader">
                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                    <Form.Control name="anexo" accepter={Uploader} action="#" />
                </Form.Group>
            </Form>
        </>
    );
};

export default CreateSolicCompra;