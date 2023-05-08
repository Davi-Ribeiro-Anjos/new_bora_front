import { useParams } from 'react-router-dom';
import { Form, Uploader, SelectPicker, DatePicker, Panel } from 'rsuite';
import { MainPanel } from '../../components/panel';

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
    label: item,
    value: item
}));

const EditCompra = ({ formValue, setFormValue }) => {
    const params = useParams()

    return (
        <>
            <MainPanel>
                <Form fluid onChange={setFormValue} formValue={formValue} layout="inline">
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Status</Form.ControlLabel>
                        <Form.Control name="empresa" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Empresa</Form.ControlLabel>
                        <Form.Control name="empresa" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Filial</Form.ControlLabel>
                        <Form.Control name="filial" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Departamento</Form.ControlLabel>
                        <Form.Control name="empresa" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Responsavel</Form.ControlLabel>
                        <Form.Control name="filial" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Categoria</Form.ControlLabel>
                        <Form.Control name="empresa" data={selectData} accepter={SelectPicker} />
                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="inputPicker">
                        <Form.ControlLabel>Forma de Pagamento</Form.ControlLabel>
                        <Form.Control name="filial" data={selectData} accepter={SelectPicker} />
                    </Form.Group>
                    <Form.Group controlId="datePicker">
                        <Form.ControlLabel>Prazo</Form.ControlLabel>
                        <Form.Control name="prazo" accepter={DatePicker} />
                    </Form.Group>
                    <Form.Group controlId="uploader">
                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                        <Form.Control name="anexo" accepter={Uploader} action="#" />
                    </Form.Group>
                </Form>
            </MainPanel >
        </>
    );
};

export default EditCompra;