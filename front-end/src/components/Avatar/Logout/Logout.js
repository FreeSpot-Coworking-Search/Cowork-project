import './logout.css';
import '../../../css/dialog.css';

import { useClient } from '../../../hooks/useClient';
import { Link } from 'react-router-dom';
import ButtonList from '../../ButtonList/ButtonList';

function Logout({ handleClose }) {
    const [clientData, setClientData] = useClient();

    function performLogout() {
        setClientData({ state: false });
        handleClose();
    }

    const btnBehavior = [
        {
            text: 'cerrar sesión',
            action: () => performLogout(),
            type: 'secondary',
        },
        { text: 'cerrar', action: () => handleClose() },
    ];

    return (
        <article className="dialog">
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

            <ButtonList
                btnBehavior={[...btnBehavior]}
                cssStyle="logout-clientBtn"
            />
        </article>
    );
}

export default Logout;
