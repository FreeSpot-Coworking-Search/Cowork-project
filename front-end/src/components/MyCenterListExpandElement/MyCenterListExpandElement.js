import './MyCenterListExpandElement.css';
import spaceOccupied from '../../helpers/spaceOccupied';
import lastDayReservation from '../../helpers/lastDayReservation';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import visionIcon from '../../assets/icons/bx-low-vision.svg';
import '../../css/notifications.css';
import '../../css/tooltip.css';
import { Link } from 'react-router-dom';
import SpaceAlertDisplay from '../SpaceAlertDisplay/SpaceAlertDisplay';

export default function MyCenterListExpandElement({ space, rangeDays }) {
  return (
    <li>
      <Link
        className="myCenterListExpandElement"
        key={space.id}
        to={`/space/${space.id}`}
      >
        <div>
          <h4>{space.nombre}</h4>
          <SpaceAlertDisplay space={space} />
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
      </Link>
    </li>
  );
}
