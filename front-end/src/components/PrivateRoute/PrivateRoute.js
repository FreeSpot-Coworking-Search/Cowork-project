import { Route, Redirect } from 'react-router-dom';

import { useClient } from '../../hooks/useClient';

export default function PrivateRoute({ path, typeRequired, children }) {
    const [clientData] = useClient();
    const concedeAcces = clientData.tipo === typeRequired;

    return (
        <Route exact path={path}>
            {concedeAcces ? { ...children } : <Redirect to="/" />}
        </Route>
    );
}
