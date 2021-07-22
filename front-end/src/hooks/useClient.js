import { useState, createContext, useContext, useMemo } from 'react';

const ClientContext = createContext();

function useClient() {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error(`useContext must be used within a CountProvider`);
    }

    return context;
}

function ClientProvider(props) {
    const [clientData, setClientData] = useState({ state: false });

    const value = useMemo(() => [clientData, setClientData], [clientData]);

    return <ClientContext.Provider value={value} {...props} />;
}

export { useClient, ClientProvider };
