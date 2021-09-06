import './reservesList.css';

import { Fragment } from 'react';
import ItemList from '../ItemList/ItemList';
import ButtonList from '../ButtonList/ButtonList';

import {
    getReservesList,
    getBtnBehavior,
} from '../../helpers/reservesHelpers';

export default function ReservesList({reservesList, fullView, refDialog, handleClickOpen}) {
    return <>
        {reservesList.length !== 0
            ?
            <>{reservesList.map((reservation) => {
                return (
                    <Fragment key={reservation.id}>
                        <section
                            className={
                                fullView
                                    ? 'reservesList-fullView'
                                    : 'reservesList-singleView'
                            }
                        >
                            <ItemList
                                listData={getReservesList(reservation)}
                            />
                            <nav>
                                <ButtonList
                                    btnBehavior={getBtnBehavior(
                                        reservation,
                                        refDialog,
                                        handleClickOpen
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
            })}</>
            :
            <section className="reservesList-fullView">
                <p>No cuenta con reservas en esta categoría.</p>
            </section>
        }
    </>
}

