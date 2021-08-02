import './logout.css';

import { useClient } from '../../../hooks/useClient';
import { Link } from 'react-router-dom';

function Logout({ handleClose }) {
    const [clientData, setClientData] = useClient();

    function performLogout() {
        setClientData({ state: false });
        handleClose();
    }

    return (
        <article className="logout">
            <h2 className="logout-header">Hola {clientData.name}</h2>
            {clientData.tipo === 'usuario' ? (
                <Link to="/users" onClick={handleClose}>
                    Mis datos
                </Link>
            ) : (
                <Link to="/admins" onClick={handleClose}>
                    Mis datos
                </Link>
            )}

            <button onClick={() => performLogout()}>Cerrar sesión</button>
            <button onClick={handleClose}>Cerrar</button>
        </article>
    );
}

export default Logout;
