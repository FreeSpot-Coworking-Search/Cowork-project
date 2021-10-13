import '../../css/dialog.css';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

import ButtonList from '../ButtonList/ButtonList';
import ItemList from '../ItemList/ItemList';
import InfoServicesList from '../InfoServicesList/ReservesServicesList2';

import { getIncidenceList } from '../../helpers/reservesHelpers';

import axios from 'axios';

import { getHost } from '../../helpers/environmentHelpers';

export default function ReservesDialog({
    choosedDialog,
    reservation,
    handleClose,
}) {
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    async function sendPaymentMail() {
        try {
            setMessage('Enviando peticion');

            setTimeout(() => {
                setMessage('');
            }, 3000);

            const route = `${getHost()}/api/reserves/payment/?id=${
                reservation.id
            }`;
            const response = await axios.get(route);
            if (response.status === 200) {
                setMessage(
                    'Hemos enviado un mail a su correo para abonar reserva. Ya puedes cerrar esta página'
                );

                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            setMessage('');

            const {
                data: { message },
            } = error.response;

            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    const dialogOptions = {
        paymentDialogPendiente: (
            <article className="dialog">
                <h1>Abonar reserva de {reservation?.nombre}</h1>
                <p>
                    Confirma que desear pagar y enviaremos un correo para
                    finalizar el mismo.
                </p>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
                <ButtonList
                    btnBehavior={[
                        {
                            text: 'Enviar Correo',
                            action: () => sendPaymentMail(),
                            type: 'secondary',
                        },
                        {
                            text: 'Cerrar',
                            action: () => handleClose(),
                            type: 'secondary',
                        },
                    ]}
                />
            </article>
        ),
        paymentDialogPagado: (
            <article className="dialog">
                <h1>Abonar reserva de {reservation?.nombre}</h1>
                <p>Su reserva se encuentra actualmente abonada.</p>
                <ButtonList
                    btnBehavior={[
                        {
                            text: 'Cerrar',
                            action: () => handleClose(),
                            type: 'secondary',
                        },
                    ]}
                />
            </article>
        ),
        incidencesDialog: (
            <article className="dialog">
                <h1>Incidencias en {reservation?.nombre}</h1>
                {reservation?.incidencias.map((reservation) => (
                    <ItemList
                        key={reservation.fecha_incidencia}
                        listData={getIncidenceList(reservation)}
                    />
                ))}
                <ButtonList
                    btnBehavior={[
                        {
                            text: 'Cerrar',
                            action: () => handleClose(),
                            type: 'secondary',
                        },
                    ]}
                />
            </article>
        ),
        servicesDialog: (
            <article className="dialog">
                <h1>Servicios disponibles en {reservation?.nombre}</h1>
                <InfoServicesList
                    servicesArray={reservation?.servicios}
                    uniqueId={reservation.id}
                />
                <ButtonList
                    btnBehavior={[
                        {
                            text: 'Cerrar',
                            action: () => handleClose(),
                            type: 'secondary',
                        },
                    ]}
                />
            </article>
        ),
    };

    return (
        <>
            {!reservation ? (
                <CircularProgress />
            ) : (
                <>{dialogOptions[choosedDialog]}</>
            )}
        </>
    );
}
