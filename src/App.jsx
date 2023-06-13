import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import { useContext } from 'react';
import { ThemeContext } from './providers/themeProviders';
import { UsuarioContext } from './providers/usuarioProviders';
import Login from './components/login/login';
import BasePage from './components/basePage';


const App = () => {
  const { theme } = useContext(ThemeContext)
  const { auth } = useContext(UsuarioContext)

  return (
    <CustomProvider theme={theme} locale={ptBr}>
      {/* {auth ? (
        <BasePage />
      ) : (
        <Login />
      )
      } */}
      <BasePage />
    </CustomProvider >
  )
};


export default App;