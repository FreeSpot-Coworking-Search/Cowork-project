import './MyCenterSpaceCard.css';
import '../../css/notifications.css';
import '../../css/tooltip.css';

import infoIcon from '../../assets/icons/bx-info-circle.svg';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import personIcon from '../../assets/icons/bxs-user.svg';
import spaceOccupied from '../../helpers/spaceOccupied';

export default function MyCenterSpaceCard({ space, day }) {
  let cleaning = false;
  const occupied = spaceOccupied(space, day);
  console.log(occupied);
  if (space.estado === 1) cleaning = true;

  return (
    <li className="myCenterSpaceCard">
      <p>{space.id}</p>
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
          {occupied?.pagado === 1 ? (
            <img src={priceIcon} alt="Icono de pagado" />
          ) : (
            ''
          )}
        </li>
        <li>
          {cleaning ? <img src={cleaningIcon} alt="Icono de limpieza" /> : ''}
        </li>
        <li>
          {space.incidencias.length !== 0 ? (
            <div className="notificationContainer">
              <img src={incidentsIcon} alt="Icono de incidencia" />
              <p className="notificationBubble">{space.incidencias.length}</p>
            </div>
          ) : (
            ''
          )}
        </li>
      </ul>
    </li>
  );
}
