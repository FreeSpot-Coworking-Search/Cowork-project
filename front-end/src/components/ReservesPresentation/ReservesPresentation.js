import './reservesPresentation.css';

import { useRef, lazy } from 'react';
import { Dialog } from '@material-ui/core';

import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';
import ReservesList from '../ReservesList/ReservesList';

import { isBetween, isPrevious, isFuture } from '../../helpers/dateHelper';

import useDialog from '../../hooks/useDialog';

const ReservesDialogs = lazy(() =>
    import('../ReservesDialogs/ReservesDialogs')
);

export default function ReservesPresentation({
    className,
    reservations,
    fullView,
}) {
    const { open, handleClickOpen, handleClose } = useDialog();
    const refDialog = useRef({});

    return (
        <article className={`${className} reservesPresentation`}>
            <section>
                <h3 className="reservesPresentation-presentationName">
                    Reserva Activa
                </h3>
                <ReservesList
                    reservesList={reservations.filter((reserve) =>
                        isBetween(reserve.fecha_inicio, reserve.fecha_fin)
                    )}
                    fullView={fullView}
                    refDialog={refDialog}
                    handleClickOpen={handleClickOpen}
                />
            </section>

            <section>
                <h3 className="reservesPresentation-presentationName">
                    Reservas Finalizadas
                </h3>
                <ReservesList
                    reservesList={reservations?.filter((reserve) =>
                        isPrevious(reserve?.fecha_inicio)
                    )}
                    fullView={fullView}
                    refDialog={refDialog}
                    handleClickOpen={handleClickOpen}
                />
            </section>

            <section>
                <h3 className="reservesPresentation-presentationName">
                    Reservas Futuras
                </h3>
                <ReservesList
                    reservesList={reservations?.filter((reserve) =>
                        isFuture(reserve?.fecha_inicio)
                    )}
                    fullView={fullView}
                    refDialog={refDialog}
                    handleClickOpen={handleClickOpen}
                />
            </section>

            <CircularSuspense>
                <Dialog open={open} onClose={handleClose}>
                    <ReservesDialogs
                        choosedDialog={refDialog.current.dialog}
                        reservation={refDialog.current.reservation}
                        handleClose={handleClose}
                    />
                </Dialog>
            </CircularSuspense>
        </article>
    );
}
