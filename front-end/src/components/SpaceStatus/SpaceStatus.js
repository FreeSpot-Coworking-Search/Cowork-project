import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';
import './SpaceStatus.css';

export default function SpaceStatus({ space }) {
  const openIncidences = openIncidencesNumber(space);
  return (
    <ul className="spaceStatus">
      <li>
        {space.visible === 0 ? (
          <img src={visionIcon} alt="Icono de limpieza" />
        ) : (
          ''
        )}
      </li>
      <li>
        {space.estado === 0 ? (
          <img src={cleaningIcon} alt="Icono de limpieza" />
        ) : (
          ''
        )}
      </li>
      <li>
        {openIncidences === 1 ? (
          <div className="notificationContainer">
            <img src={incidentsIcon} alt="Icono de incidencia" />
            <p className="miniNotificationBubble">{openIncidences}</p>
          </div>
        ) : (
          ''
        )}
      </li>
    </ul>
  );
}

const openIncidencesNumber = (space) => {
  const alerts = space.incidencias.reduce((acc, incidencia) => {
    if (incidencia.estado === 0) return (acc += 1);
    else return (acc += 0);
  }, 0);
  return alerts;
};
