import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CustomProvider, IntlProvider } from 'rsuite';
import { IntlProvider as RSIntlProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomProvider theme='light' locale={ptBr}>
        <App />
      </CustomProvider>
    </BrowserRouter>
  </React.StrictMode >
);
