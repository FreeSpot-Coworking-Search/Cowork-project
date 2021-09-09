import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ClientProvider } from './hooks/useClient';

ReactDOM.render(
    <React.StrictMode>
        <ClientProvider>
            <App />
        </ClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
