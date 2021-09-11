import './reservesList.css';

import { Fragment } from 'react';
import ItemList from '../ItemList/ItemList';
import ButtonList from '../ButtonList/ButtonList';

import { getReservesList, getBtnBehavior } from '../../helpers/reservesHelpers';

export default function ReservesList({
    reservesList,
    fullView,
    refDialog,
    handleClickOpen,
    active,
    finished,
    setVisualization,
    setRefReservation,
}) {
    return (
        <>
            {reservesList.length !== 0 ? (
                <>
                    {reservesList.map((reservation) => {
                        return (
                            <Fragment key={reservation.id}>
                                <section
                                    className={
                                        fullView
                                            ? 'reservesList-fullView'
                                            : 'reservesList-singleView'
                                    }
                                >
                                    <div className="reservesList-information">
                                        <ItemList
                                            listData={getReservesList(
                                                reservation
                                            )}
                                            active
                                        />
                                        <p className="error">
                                            <strong>
                                                {reservation.estado === 1 &&
                                                active
                                                    ? 'Limpieza pendiente'
                                                    : ''}
                                            </strong>
                                        </p>
                                    </div>
                                    <nav>
                                        <ButtonList
                                            btnBehavior={getBtnBehavior(
                                                reservation,
                                                refDialog,
                                                handleClickOpen,
                                                finished,
                                                setVisualization,
                                                setRefReservation
                                            )}
                                            cssStyle={
                                                fullView
                                                    ? 'reservesList-buttonList'
                                                    : 'reservesList-buttonList reservesList-buttonList-singleView'
                                            }
                                        />
                                    </nav>
                                </section>
                            </Fragment>
                        );
                    })}
                </>
            ) : (
                <section className="reservesList-fullView">
                    <p>No cuenta con reservas en esta categoría.</p>
                </section>
            )}
        </>
    );
}
