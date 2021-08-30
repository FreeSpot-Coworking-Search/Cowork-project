import './MyCenterListExpandElement.css';
import spaceOccupied from '../../helpers/spaceOccupied';
import lastDayReservation from '../../helpers/lastDayReservation';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';
import '../../css/notifications.css';
import '../../css/tooltip.css';

export default function MyCenterListExpandElement({ space, rangeDays }) {
  return (
    <li className="myCenterListExpandElement" key={space.id}>
      <div>
        <h4>{space.nombre}</h4>
        <ul>
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
      </div>
      <ul>
        {rangeDays.map((day) => {
          const reservation = spaceOccupied(space, day);
          return reservation ? (
            <li>
              <div
                className={`reserveChart${
                  new Date(reservation.fecha_fin).getTime() === day.getTime()
                    ? ' reserveChartEnd'
                    : ''
                }${
                  new Date(reservation.fecha_inicio) === day
                    ? ' reserveChartStart'
                    : ''
                }`}
              ></div>
            </li>
          ) : (
            <li></li>
          );
        })}
      </ul>
    </li>
  );
}
