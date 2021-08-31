import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';
import './SpaceAlertDisplay.css';

export default function SpaceAlertDisplay({ space }) {
  return (
    <ul className="spaceAlertDisplay">
      <li>
        {space.visible === 1 ? (
          <img src={visionIcon} alt="Icono de limpieza" />
        ) : (
          ''
        )}
      </li>
      <li>
        {space.estado === 1 ? (
          <img src={cleaningIcon} alt="Icono de limpieza" />
        ) : (
          ''
        )}
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
  );
}
