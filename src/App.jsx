import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import MainHeader from "./components/header";
import RoutesMain from "./routes";
import { useContext } from 'react';
import { ThemeContext } from './providers/themeProviders';


const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <CustomProvider theme={theme} locale={ptBr}>
        <MainHeader />
        <RoutesMain />
      </CustomProvider>
    </>
  )
};


export default App;