import './logout.css';
import '../../../css/dialog.css';

import { useClient } from '../../../hooks/useClient';
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
            <ButtonList
                btnBehavior={[...btnBehavior]}
                cssStyle="logout-clientBtn"
            />
        </article>
    );
}

export default Logout;
