import './spaceData.css';

import ImageSlide from '../ImageSlide/ImageSlide';
import DateRangeSelector from '../DateRange/DateRange';
import ServicesList from '../servicesList/ServicesList';

import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';

export function SpaceData({ spaceData, reservation, setReservation }) {
    const ownerInfo = {
        data: {
            estado: spaceData.estado ? 'limpio' : 'sucio',
            visibilidad: spaceData.visible ? 'activa' : 'oculto',
        },
        type: 'object',
    };

    return (
        <>
            <section className="spaceCard">
                <DateRangeSelector
                    setNewSearchObject={setReservation}
                    newSearchObject={reservation}
                    minDate={true}
                />

                <article>
                    <ul className="spaceCard-list">
                        <li>
                            <img src={personIcon} alt="Person icon" />
                            <p>{spaceData.capacidad_maxima}</p>
                        </li>
                        <li>
                            <img src={priceIcon} alt="Price icon" />
                            <p>{spaceData.precio}€/día</p>
                        </li>
                        <li>
                            <img src={calendarIcon} alt="Calendar icon" />
                            <p>{`Min. ${spaceData.reserva_minima} días`}</p>
                        </li>
                    </ul>

                    {spaceData?.owner && <ServicesList listData={ownerInfo} />}
                </article>
            </section>

            <ImageSlide
                images={spaceData.imagenes}
                tag={'presentationSpace'}
                className="presentationSlide"
            />

            <section className="spaceCard-list">
                <p>{spaceData.descripcion}</p>
            </section>
        </>
    );
}
