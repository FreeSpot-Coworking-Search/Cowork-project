import './MyCenterListExpandElement.css';
import spaceOccupied from '../../helpers/spaceOccupied';
import '../../css/notifications.css';
import '../../css/tooltip.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import SpaceStatus from '../SpaceStatus/SpaceStatus';

export default function MyCenterListExpandElement({ space, rangeDays }) {
  return (
    <li key={space.id}>
      <Link
        className="myCenterListExpandElement"
        key={space.id}
        to={`/space/${space.id}`}
      >
        <article>
          <h4>{space.nombre}</h4>
          <SpaceStatus space={space} />
        </article>
        <ul>
          {rangeDays.map((day) => {
            const reservation = spaceOccupied(space, day);
            return reservation ? (
              <li key={day}>
                <div
                  className="reserveChart"
                  //   new Date(reservation.fecha_fin).toLocaleDateString() ===
                  //   day.toLocaleDateString()
                  //     ? cn('reserveChart', 'reserveChartEnd')
                  //     : new Date(
                  //         reservation.fecha_inicio
                  //       ).toLocaleDateString() === day.toLocaleDateString()
                  //     ? cn('reserveChart', 'reserveChartStart')
                  //     : 'reserveChart'
                  // }

                  // className={`reserveChart ${
                  //   new Date(reservation.fecha_fin).toLocaleDateString() ===
                  //   day.toLocaleDateString()
                  //     ? 'reserveChartEnd'
                  //     : ''
                  // }${
                  //   new Date(reservation.fecha_inicio).toLocaleDateString() ===
                  //   day.toLocaleDateString()
                  //     ? 'reserveChartStart'
                  //     : ''
                  // }
                  // `}
                ></div>
              </li>
            ) : (
              <li key={day}>
                <div className="noReserveChart"></div>
              </li>
            );
          })}
        </ul>
      </Link>
    </li>
  );
}
