import './SpaceCardNotificationDisplay.css';
import '../../css/notifications.css';

import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';

export default function SpaceCardNotificationDisplay({ space }) {
  let cleaning = false;
  let incident = false;
  if (space.estado === 1) cleaning = true;
  if (space.incidencias.length > 0) incident = true;

  return (
    <nav className="spaceCardNotificationDisplay">
      <ul>
        {space.visible !== 1 ? (
          <li>
            <img src={visionIcon} alt="Icono incidencia" />
          </li>
        ) : (
          ''
        )}
        <li>
          {incident ? <img src={incidentsIcon} alt="Icono incidencia" /> : ''}
        </li>
        <li>
          {cleaning ? <img src={cleaningIcon} alt="Icono limpieza" /> : ''}
        </li>
      </ul>
    </nav>
  );
}
