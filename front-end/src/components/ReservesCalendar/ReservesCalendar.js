import './reservesCalendar.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


import { DateRange } from 'react-date-range';
import { useMemo } from 'react';

export default function ReservesCalendar({className, reservations}) {

    const reservationsRange = useMemo(() => (
        reservations.map((reservation, index) => ({
        startDate: new Date(reservation.fecha_inicio),
        endDate: new Date(reservation.fecha_fin),
        key: `reservation${index}`,
    }))
    ), [reservations])

    return <article className={`${className} reservesCalendar`}>
        <section>
                <h3 className="reservesCalendar-presentationName">
                    Calendario de reservas
                </h3>
                <div className="dateRange">
                <DateRange
                    ranges={reservationsRange}
                    showDateDisplay={false}
                />
                </div>
                
            </section>
    </article>
}