import './MyCenterSelector.css';
import '../../css/presentation.css';

export default function MyCenterSelector({
  centers,
  selectedCenter,
  setSelectedCenter,
}) {
  return (
    <div className="myCenterSelector">
      <nav>
        <a href={`/center/${centers[selectedCenter].id}`}>
          {centers[selectedCenter].nombre}
        </a>
        <ul>
          {centers.map((center, index) =>
            index !== selectedCenter ? (
              <li key={center.id}>
                <a href="#" onClick={() => setSelectedCenter(index)}>
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
