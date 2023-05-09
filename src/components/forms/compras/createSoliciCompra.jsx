import { Form, Uploader, SelectPicker } from 'rsuite';
import { api } from '../../../services/api';
import { useEffect, useState } from 'react';

const styles = {
    line: {
        display: "flex",
        "flex-direction": "row",
    }
}

const CreateSolicCompra = ({ form, setForm }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        selectData()
    }, [])

    const selectData = () => {
        api.get('filiais/').then((response) => {
            let res = response.data

            setData(res.map((item) => ({
                label: item.sigla,
                value: item.id
            })))
        })
    }

    return (
        <>
            <Form fluid onChange={setForm} form={form} layout='inline'>
                <Form.Group controlId="name-5">
                    <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                    <Form.Control name="numero_solicitacao" />
                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                </Form.Group>
                <div style={styles.line}>
                    <Form.Group controlId="inputPicker" style={{ marginRight: "3vw" }}>
                        <Form.ControlLabel>Filial:</Form.ControlLabel>
                        <Form.Control name="filial" data={data} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="uploader">
                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                        <Form.Control name="anexo" accepter={Uploader} action="#" />
                    </Form.Group>
                </div>
            </Form>
        </>
    );
};

export default CreateSolicCompra;