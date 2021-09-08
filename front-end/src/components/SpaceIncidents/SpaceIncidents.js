import AdminIncidenceForm from '../Formularies/AdminIncidenceForm';
import './SpaceIncidents.css';

export function SpaceIncidents({ spaceData, setSpace, className }) {
  console.log(spaceData);
  return (
    <section className={className + ' presentation'}>
      <div className="presentationLimit" />
      <ul className="incidentList">
        {spaceData.incidencias.map((incident, index) => {
          return (
            <li className="incident">
              <p>{incident.categoria}</p>
              <p>{incident.descripcion}</p>
              <p>{new Date(incident.fecha_incidencia).toLocaleDateString()}</p>
              {incident.estado === 1 ? (
                <>
                  <p>{incident.respuesta}</p>
                  <p>Cerrada</p>
                </>
              ) : (
                <AdminIncidenceForm
                  index={index}
                  incident={incident}
                  spaceData={spaceData}
                  setSpace={setSpace}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="presentationLimit" />
    </section>
  );
}
