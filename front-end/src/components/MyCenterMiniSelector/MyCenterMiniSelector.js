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
        <button onClick={() => setDay(prevDay(day))}>&#10094;</button>
        <button onClick={() => setDay(nextDay(day))}>&#10095;</button>
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
      </nav>
    </div>
  );
}
