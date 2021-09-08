import './spaceData.css';

import ImageSlide from '../ImageSlide/ImageSlide';

import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import InfoServicesList from '../InfoServicesList/InfoServicesList';

export function SpaceData({ spaceData, reservation, setReservation }) {
  return (
    <>
      <section className="spaceData">
        <h3 className="presentationName">{`${spaceData.nombre} - ${spaceData.tipo} `}</h3>
        <ImageSlide
          images={spaceData.imagenes}
          tag={'presentationSpace'}
          className="presentationSlide"
        />
        <article>
          <ul className="spaceData-list">
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
        </article>

        <article className="spaceData-list">
          <p>{spaceData.descripcion}</p>
        </article>
        <article>
          <InfoServicesList reservation={reservation} spaceData={spaceData} />
        </article>
      </section>
    </>
  );
}
