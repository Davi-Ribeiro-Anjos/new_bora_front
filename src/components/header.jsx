import { Navbar, Nav, Dropdown, Toggle, Stack } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import 'rsuite/dist/rsuite.min.css';

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import image from "../static/images/logo.png"
import { ThemeContext } from '../providers/themeProviders';


const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
    const navegate = useNavigate();
    const { theme, changeTheme } = useContext(ThemeContext);
    return (
        <Navbar {...props} >
            <Nav appearance="default" style={{ width: "100%" }}>
                <Navbar.Brand onClick={() => navegate('/')} style={{ padding: 5 }}>
                    <img src={image} alt='Logo Bora' style={{ width: 140, height: 45 }} />
                </Navbar.Brand>
                <Nav onSelect={onSelect} activeKey={activeKey}>
                    <Nav.Item onClick={() => navegate('/')} eventKey="10">
                        Home
                    </Nav.Item>
                    <Nav.Item onClick={() => navegate('/login')} eventKey="20">
                        Login
                    </Nav.Item>
                    <Nav.Menu title="Paletes">
                        <Nav.Item onClick={() => navegate('/solicitar-transferencia')} eventKey="31">Solicitar Tranferência</Nav.Item>
                        <Nav.Item onClick={() => navegate('/transferencia-andamento')} eventKey="32">Transferências em Andamento</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu title="Ferramentas">
                        <Nav.Item onClick={() => navegate('/compras')} eventKey="41">Compras</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu title="Comercial">
                        <Nav.Item onClick={() => navegate('/justificativa')} eventKey="51">Justificativa</Nav.Item>
                    </Nav.Menu>
                </Nav>
                <Nav pullRight>
                    <Dropdown.Menu noCaret icon={<CogIcon />} placement="bottomEnd">
                        {theme === 'dark' ? (
                            <Dropdown.Item panel style={{ padding: 10, width: 160, color: 'white' }}>
                                <p>Logado como</p>
                                <strong>davi.bezerra</strong>
                            </Dropdown.Item>
                        ) : (
                            <Dropdown.Item panel style={{ padding: 10, width: 160, color: 'black' }}>
                                <p>Logado como</p>
                                <strong>davi.bezerra</strong>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Separator />
                        <Dropdown.Item >
                            <Stack spacing={50}>
                                Tema
                                <Toggle defaultChecked={theme === 'dark' ? true : false} checkedChildren="Escuro" unCheckedChildren="Claro" onClick={() => changeTheme(theme)} />
                            </Stack>
                        </Dropdown.Item>
                        <Dropdown.Item>Ajuda</Dropdown.Item>
                        <Dropdown.Item onClick={() => navegate('/configuracoes')}>Configurações</Dropdown.Item>
                        <Dropdown.Item>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                </Nav>
            </Nav>
        </Navbar >
    );
};

const MainHeader = () => {
    const [activeKey, setActiveKey] = React.useState(null);

    return <CustomNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
}

export default MainHeader;