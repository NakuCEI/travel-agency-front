import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importación de BrowserRouter para la gestión de rutas
import { store } from './store/store'; // store para la gestión de estados de la aplicación
import { Provider } from 'react-redux'; // Módulo para el contexto del store
import App from './App'; // Punto de entrada de la aplicación
import './assets/css/index.css'; // Estilos genéricos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
