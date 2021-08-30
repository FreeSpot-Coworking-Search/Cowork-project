import IncidentCard from '../IncidentCard/IncidentCard';
import './IncidentList.css';

export default function IncidentList({ incidents }) {
  return (
    <div className="presentation presentationList">
      <h3>Incidencias</h3>
      <div className="presentationStart" />
      <ul className="incidentList">
        {incidents
          .filter((space) => space.incidencias.length > 0)
          .map((space) => {
            return <IncidentCard space={space} />;
          })}
      </ul>
      <div className="presentationEnd" />
    </div>
  );
}
