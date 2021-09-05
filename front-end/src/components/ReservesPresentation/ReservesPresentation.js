import './reservesPresentation.css';

import { useRef, lazy } from 'react';
import { Dialog } from '@material-ui/core';

import ServicesCard from '../ServicesCard/ServicesCard';
import ButtonList from '../ButtonList/ButtonList';
import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import { isTodayBetween } from '../../helpers/dateHelper';
import {
    getReservesList,
    findActiveIncidence,
} from '../../helpers/reservesHelpers';

import useDialog from '../../hooks/useDialog';

const ReservesDialogs = lazy(() =>
    import('../ReservesDialogs/ReservesDialogs')
);

export default function ReservesPresentation({
    className,
    reservations,
    setReservations,
    fullView,
}) {
    const { open, handleClickOpen, handleClose } = useDialog();
    const refDialog = useRef(null);

    console.log('reservations: ', reservations);

    const [activeReservation] =
        Object.entries(reservations).length !== 0
            ? reservations.filter((reserve) =>
                  isTodayBetween(reserve.fecha_inicio, reserve.fecha_fin)
              )
            : [];

    const btnBehavior = [
        {
            text: '$',
            action: () => {
                activeReservation.pagado === 1
                    ? (refDialog.current = 'paymentDialogPagado')
                    : (refDialog.current = 'paymentDialogPendiente');
                handleClickOpen();
            },
            type: activeReservation?.pagado === 0 ? 'alert' : 'main',
        },
        {
            text: '!',
            action: () => {
                refDialog.current = 'incidencesDialog';
                handleClickOpen();
            },
            type: findActiveIncidence(activeReservation?.incidencias)
                ? 'alert'
                : 'main',
        },
        {
            text: '+',
            action: () => {
                refDialog.current = 'servicesDialog';
                handleClickOpen();
            },
        },
    ];

    console.log('activeReservation: ', activeReservation);
    return (
        <article className={`${className} reservesPresentation`}>
            <section>
                <h3 className="reservesPresentation-presentationName">
                    reserva activa
                </h3>
                <section className="reservesPresentation-info">
                    <ServicesCard
                        listData={getReservesList(activeReservation)}
                    />
                    <nav>
                        <ButtonList
                            btnBehavior={[...btnBehavior]}
                            cssStyle={
                                fullView
                                    ? 'buttonList'
                                    : 'buttonList buttonList-singleView'
                            }
                        />
                    </nav>
                </section>
            </section>

            <CircularSuspense>
                <Dialog open={open} onClose={handleClose}>
                    <ReservesDialogs
                        choosedDialog={refDialog.current}
                        reservation={activeReservation}
                        handleClose={handleClose}
                    />
                </Dialog>
            </CircularSuspense>
        </article>
    );
}
