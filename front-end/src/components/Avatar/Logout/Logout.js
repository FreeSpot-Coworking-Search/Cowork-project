import './logout.css';

import { useClient } from '../../../hooks/useClient';

function Logout({ handleClose }) {
    const [clientData, setClientData] = useClient();

    function performLogout() {
        setClientData({ state: false });
        handleClose();
    }

    return (
        <article className="logout">
            <h2 className="logout-header">{clientData.name}</h2>
            <a href="#">Mis Datos</a>
            <button onClick={() => performLogout()}>Cerrar sesión</button>
            <button onClick={handleClose}>Cerrar</button>
        </article>
    );
}

export default Logout;
