import { useState } from 'react';
import './logout.css';

function Logout({ setClientData, handleClose, clientData }) {
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
