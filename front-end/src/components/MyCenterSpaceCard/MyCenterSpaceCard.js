import './MyCenterSpaceCard.css';
import '../../css/notifications.css';
import '../../css/tooltip.css';

import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import personIcon from '../../assets/icons/bxs-user.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';
import spaceOccupied from '../../helpers/spaceOccupied';
import { Link } from 'react-router-dom';

export default function MyCenterSpaceCard({ space, day }) {
  let cleaning = false;
  const occupied = spaceOccupied(space, day);
  if (space.estado === 0) cleaning = true;

  const openIncidences = openIncidencesNumber(space);
  console.log(space);

  return (
    <li className="myCenterSpaceCard">
      <Link key={space.id} to={`/space/${space.id}`}>
        <p>{space.nombre}</p>
        <ul>
          <li className="tooltip">
            {occupied ? (
              <>
                <img src={personIcon} alt="Icono de ocupación" />
                <p className="tooltiptext">Ocupado</p>
              </>
            ) : (
              ''
            )}
          </li>
          <li>
            {space.visible === 0 ? (
              <img src={visionIcon} alt="Icono de limpieza" />
            ) : (
              ''
            )}
          </li>
          <li>
            {cleaning ? <img src={cleaningIcon} alt="Icono de limpieza" /> : ''}
          </li>
          <li>
            {openIncidences > 0 ? (
              <div className="notificationContainer">
                <img src={incidentsIcon} alt="Icono de incidencia" />
                <p className="miniNotificationBubble">{openIncidences}</p>
              </div>
            ) : (
              ''
            )}
          </li>
        </ul>
      </Link>
    </li>
  );
}
const openIncidencesNumber = (space) => {
  const alerts = space.incidencias.reduce((acc, incidencia) => {
    if (incidencia.estado === 0) return (acc += 1);
    else return (acc += 0);
  }, 0);
  return alerts;
};
