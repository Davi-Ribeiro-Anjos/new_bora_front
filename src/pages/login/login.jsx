import {
    Content,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid
} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Login = () => {
    return (
        <div className="show-fake-browser login-page" >
            <Content style={{ marginTop: "15vh" }}>
                <FlexboxGrid justify="center" >
                    <FlexboxGrid.Item colspan={7}>
                        <Panel header={<h3>Login</h3>} bordered>
                            <Form fluid>
                                <Form.Group>
                                    <Form.ControlLabel>Usuário</Form.ControlLabel>
                                    <Form.Control name="name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.ControlLabel>Senha</Form.ControlLabel>
                                    <Form.Control name="password" type="password" autoComplete="off" />
                                </Form.Group>
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button appearance="primary">Entrar</Button>
                                        <Button appearance="link">Esqueceu a senha?</Button>
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </div>)
}

export default Login;