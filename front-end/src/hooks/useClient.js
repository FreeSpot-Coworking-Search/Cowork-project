import { useState, createContext, useContext, useMemo } from 'react';

const ClientContext = createContext();

function useClient() {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error(
            `useClient debe ser usado dentro del contexto  ClientProvider`
        );
    }

    return context;
}

function ClientProvider(props) {
    const initialValue = JSON.parse(localStorage.getItem('client')) || {
        state: false,
    };

    const [clientData, setInternalData] = useState(initialValue);

    function setClientData(newData) {
        setInternalData(newData);
        localStorage.setItem('client', JSON.stringify(newData));
    }

    const value = useMemo(() => [clientData, setClientData], [clientData]);

    return <ClientContext.Provider value={value} {...props} />;
}

export { useClient, ClientProvider };
