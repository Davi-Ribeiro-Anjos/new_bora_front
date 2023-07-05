import { Navbar, Nav, Dropdown, Toggle, Stack } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import image from "../../static/images/logo.png"
import { ThemeContext } from '../../providers/themeProviders';
import { UsuarioContext } from '../../providers/usuarioProviders';


const MainNavBar = () => {
    const { theme, changeTheme } = useContext(ThemeContext);
    const { setAuth } = useContext(UsuarioContext)

    const [activeKey, setActiveKey] = useState(null);

    const navegate = useNavigate();

    const logout = () => {
        navegate('/login')
        setAuth(false)
    }

    return (
        <Navbar appearance='inverse' >
            <Nav style={{ width: "100%" }} activeKey={activeKey} onSelect={setActiveKey} >
                <Navbar.Brand onClick={() => navegate('/')} style={{ padding: 5 }}>
                    <img src={image} alt='Logo Bora' style={{ width: 140, height: 45 }} />
                </Navbar.Brand>
                <Nav.Item onClick={() => navegate('/')} eventKey="10">
                    Home
                </Nav.Item>
                <Nav.Item onClick={() => navegate('/login')} eventKey="20">
                    Login
                </Nav.Item>
                <Nav.Menu title="Paletes">
                    <Nav.Item onClick={() => navegate('/paletes/filiais')} eventKey="31">Paletes Filiais</Nav.Item>
                    <Nav.Item onClick={() => navegate('/paletes/clientes')} eventKey="32">Paletes Clientes</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Ferramentas">
                    <Nav.Item onClick={() => navegate('/compras')} eventKey="41">Compras</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Ferramentas RH">
                    <Nav.Item onClick={() => navegate('/demissoes')} eventKey="51">Demissões</Nav.Item>
                    <Nav.Item onClick={() => navegate('/funcionarios-pj')} eventKey="52">Funcionários PJ</Nav.Item>
                    <Nav.Item onClick={() => navegate('/fichas-cadastrais')} eventKey="53">Fixa Cadastral</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Comercial">
                    <Nav.Item onClick={() => navegate('/justificativa')} eventKey="61">Justificativa</Nav.Item>
                </Nav.Menu>
                <Nav pullRight>
                    <Nav.Menu noCaret icon={<CogIcon />} placement="bottomEnd">
                        <Nav.Item panel style={theme === 'dark' ? { padding: 10, width: 160, color: 'white' } : { padding: 10, width: 160, color: 'black' }}>
                            <p>Logado como</p>
                            <strong>davi.bezerra</strong>
                        </Nav.Item>
                        <Dropdown.Separator />
                        <Nav.Item >
                            <Stack spacing={50}>
                                Tema
                                <Toggle defaultChecked={theme === 'dark' ? true : false} checkedChildren="Escuro" unCheckedChildren="Claro" onClick={() => changeTheme(theme)} />
                            </Stack>
                        </Nav.Item>
                        <Nav.Item>Ajuda</Nav.Item>
                        <Nav.Item onClick={() => navegate('/configuracoes')}>Configurações</Nav.Item>
                        <Nav.Item onClick={() => logout()}>Sair</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Nav>
        </Navbar >
    );
}
export default MainNavBar;