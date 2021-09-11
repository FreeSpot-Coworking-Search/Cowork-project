import './SpaceReservesCalendar.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRange } from 'react-date-range';
import { useMemo } from 'react';
import SpaceAlertDisplay from '../SpaceAlertDisplay/SpaceAlertDisplay';
import CleaningCard from '../CleaningCard/CleaningCard';

export default function SpaceReservesCalendar({
    className,
    spaceData,
    setSpace,
}) {
    const reservationsRange = useMemo(
        () =>
            spaceData.reserves.map((reservation, index) => ({
                startDate: new Date(reservation.fecha_inicio),
                endDate: new Date(reservation.fecha_fin),
                key: `reservation${index}`,
            })),
        [spaceData]
    );

    return (
        <section className={`${className} spaceReservesCalendar`}>
            <h3>Estado del espacio</h3>
            <div className="spaceDateRange">
                <h4>Reservas</h4>
                <DateRange ranges={reservationsRange} showDateDisplay={false} />
            </div>
            <SpaceAlertDisplay space={spaceData} />
            {spaceData.estado === 0 ? <CleaningCard space={spaceData} /> : ''}
        </section>
    );
}
