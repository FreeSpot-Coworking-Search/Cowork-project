import { Link } from 'react-router-dom';
import './IncidentCard.css';

export default function IncidentCard({ space }) {
  return (
    <li key={space.id} className="incidentCard">
      <Link className="myCenterListExpandElement" to={`/space/${space.id}`}>
        <header>
          <p>{space.nombre}</p>
          <p>{space.tipo}</p>
        </header>
        <ul>
          {space.incidencias.map((incident) => {
            return (
              <li>
                <p>{incident.descripcion}</p>
              </li>
            );
          })}
        </ul>
      </Link>
    </li>
  );
}
