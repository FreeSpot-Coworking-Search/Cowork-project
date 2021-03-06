import { Link } from 'react-router-dom';
import './SpaceCard.css';

import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';
import CardImageSlide from '../CardImageSlide/CardImageSlide';
import SpaceCardNotificationDisplay from '../SpaceCardNotificationDisplay/SpaceCardNotificationDisplay';

export default function SpaceCard({ space, searchObject, name }) {
  return (
    <li className="spaceCard">
      <div className="spaceCardLeftColumn">
        <CardImageSlide
          images={space.imagenes}
          tag={name}
          className="imageSlide"
        />
      </div>
      <div className="spaceCardRightColumn">
        <Link
          to={
            searchObject
              ? objectToQuerryParamsString(`/space/${space.id}/`, searchObject)
              : `/space/${space.id}`
          }
          className="spaceCardRightColumnInfo"
        >
          <h4>{space.nombre}</h4>
          <ul>
            <li className="spaceCardCapacity">
              <img src={personIcon} alt="Person icon" />
              <p>{space.capacidad_maxima}</p>
            </li>
            <li className="spaceCardPrice">
              <img src={priceIcon} alt="Price icon" />
              <p>{space.precio}€/día</p>
            </li>
            <li className="spaceCardDays">
              <img src={calendarIcon} alt="Calendar icon" />
              <p>{`Min. ${space.reserva_minima} días`}</p>
            </li>
            <li>
              {space.owner ? (
                <SpaceCardNotificationDisplay space={space} />
              ) : (
                ''
              )}
            </li>
          </ul>
        </Link>
      </div>
    </li>
  );
}
