import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CustomProvider } from 'rsuite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomProvider theme='light'>
        <App />
      </CustomProvider>
    </BrowserRouter>
  </React.StrictMode>
);
