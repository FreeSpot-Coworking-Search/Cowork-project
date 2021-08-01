import { Route, Redirect } from 'react-router-dom';

import { useClient } from '../../hooks/useClient';

export default function PrivateRoute({ path, typeRequired, children }) {
    const [clientData] = useClient();

    console.log(clientData);

    const concedeAcces = clientData.tipo === typeRequired;

    return (
        <Route exact path={path}>
            {concedeAcces ? { ...children } : <Redirect to="/" />}
        </Route>
    );
}
