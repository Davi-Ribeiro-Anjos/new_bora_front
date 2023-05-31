import { Form, Uploader, SelectPicker, Grid, Row, Col } from 'rsuite';

import { useContext } from 'react';

import { ChoicesContext } from '../../providers/choicesProviders';


const CriarCompraForm = ({ form, setForm }) => {
    const { filiais } = useContext(ChoicesContext)

    return (
        <>
            <Grid fluid>
                <Form onChange={setForm} form={form} layout='inline'>
                    <Row>
                        <Col xs={24}>
                            <Form.Group controlId="name-5">
                                <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                                <Form.Control name="numero_solicitacao" />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <Form.Group controlId="inputPicker">
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control name="filial" data={filiais} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={8}>
                            <Form.Group controlId="uploader">
                                <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                <Form.Control name="anexo" accepter={Uploader} action="#" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        </>
    );
};

export default CriarCompraForm;