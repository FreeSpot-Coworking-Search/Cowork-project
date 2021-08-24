import { isTomorrow } from 'date-fns';
import nextDay from '../../helpers/nextDay';
import prevDay from '../../helpers/prevDay';
import './MyCenterMiniSelector.css';

export default function MyCenterMiniSelector({
  centers,
  selectedCenter,
  setSelectedCenter,
  day,
  setDay,
}) {
  return (
    <div className="MyCenterMiniSelector">
      <nav>
        <button onClick={() => setDay(prevDay(day))}>-</button>
        <div>
          <p>{centers[selectedCenter].nombre}</p>
          <p>{day?.toLocaleDateString()}</p>
        </div>
        <ul>
          {centers.map((center, index) =>
            index !== selectedCenter ? (
              <li key={center.id}>
                <a href="" onClick={() => setSelectedCenter(index)}>
                  {centers[index].nombre}
                </a>
              </li>
            ) : (
              ''
            )
          )}
        </ul>
        <button onClick={() => setDay(nextDay(day))}>+</button>
      </nav>
    </div>
  );
}
