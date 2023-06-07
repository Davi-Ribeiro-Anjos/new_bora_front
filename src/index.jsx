import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { IndexProvider } from './providers/indexProviders';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <IndexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IndexProvider>
  // </React.StrictMode>
);
