import './confirmationDialog.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

import ServicesCard from '../../components/ServicesCard/ServicesCard';

import { reservationHelper } from '../../helpers/reservationHelper';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function ConfirmationDialog({
    spaceData,
    reservation,
    handleClose,
}) {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [enabledBtn, setEnabledBtn] = useState(false);
    let history = useHistory();

    const [
        serviciosAgregados,
        listsGroup,
        fecha_entrada,
        fecha_salida,
        getFinalPrice,
    ] = reservationHelper(spaceData, reservation);

    async function performSubmit(reservation) {
        try {
            setMessage('Enviando datos');

            setEnabledBtn(true);

            const submitObject = {
                fecha_inicio: fecha_entrada,
                fecha_fin: fecha_salida,
                id_espacio: reservation.id,
                servicios: serviciosAgregados.map((servicio) => servicio.id),
            };

            const route = `${host}:${port}/api/reserves`;

            const response = await axios.post(route, submitObject);
            if (response.status === 200) {
                setMessage(
                    'Reserva realizada, falta abonar la misma. Para ello, hemos enviado un mail a su correo con el enlace de pago. Muchas gracias.'
                );
                setTimeout(() => {
                    history.push('/');
                }, 5000);
            }
        } catch (error) {
            setMessage('');
            const {
                data: { message },
            } = error.response;
            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <article className="dialog">
            <h1>Confirmar reserva</h1>
            {listsGroup.map((list) => (
                <ServicesCard key={list.name} listData={list} />
            ))}
            <p>Precio final: {getFinalPrice()} €</p>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <button
                onClick={() => performSubmit(reservation)}
                disabled={enabledBtn}
            >
                Realizar reserva
            </button>
            <button onClick={handleClose}>Cerrar</button>
        </article>
    );
}
