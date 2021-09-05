import '../../css/dialog.css';
import { CircularProgress } from '@material-ui/core';

import ButtonList from '../ButtonList/ButtonList';
import ServicesCard from '../ServicesCard/ServicesCard';
import InfoServicesList from '../InfoServicesList/ReservesServicesList2';

import { getIncidenceList } from '../../helpers/reservesHelpers';

export default function ReservesDialog({
    choosedDialog,
    reservation,
    handleClose,
}) {
    const dialogOptions = {
        paymentDialogPendiente: (
            <article className="dialog">
                <h1>Abonar reserva de {reservation?.nombre}</h1>
                <p>Hemos enviado un correo con el link de pago a su cuenta.</p>
                <p>Por favor, dirígete al mismo para realizar el pago.</p>
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
                    <ServicesCard
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
