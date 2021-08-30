import './IncidentCard.css';

export default function IncidentCard({ space }) {
  return (
    <li className="incidentCard">
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
    </li>
  );
}
