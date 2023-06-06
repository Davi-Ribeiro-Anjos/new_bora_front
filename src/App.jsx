import { Container, Content, CustomProvider, Footer, Header, Sidebar } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import MainNavBar from "./components/header/navBar";
import RoutesMain from "./routes";
import { useContext, useState } from 'react';
import { ThemeContext } from './providers/themeProviders';
import MainSideBar from './components/header/sideBar';
import { UsuarioContext } from './providers/usuarioProviders';
import Login from './components/login/login';
import MainHeader from './components/header/header';


const App = () => {
  const { theme } = useContext(ThemeContext)
  const { auth } = useContext(UsuarioContext)

  return (
    <CustomProvider theme={theme} locale={ptBr}>
      {auth ? (
        <MainHeader />
      ) : (
        <Login />
      )
      }
    </CustomProvider >
  )
};


export default App;