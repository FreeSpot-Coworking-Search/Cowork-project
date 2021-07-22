import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ClientProvider } from './hooks/useClient';

ReactDOM.render(
    <React.StrictMode>
        <ClientProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
