import '../../css/presentation.css';
import './spacePresentation.css';

import ImageSlide from '../ImageSlide/ImageSlide';
import DateRangeSelector from '../DateRange/DateRange';

import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';

export default function SpacePresentation({ spaceData, className, reservation, setReservation}) {
    console.log(spaceData);

    return (
        <article className={className + ' presentation'}>
            <h3>{`${spaceData.nombre} - ${spaceData.tipo} `}</h3>

            <div className="spaceCard">
                <p className="spaceCardLeftColumn">{spaceData.descripcion}</p>

                <ul classname="spaceCardRightColumn">
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
            </div>


            <ImageSlide
                images={spaceData.imagenes}
                tag={'presentationSpace'}
                className="presentationSlide"
            />

            <DateRangeSelector
                setNewSearchObject={setReservation}
                newSearchObject={reservation}
                minDate={true}
             />
        </article>
    ) 
}
