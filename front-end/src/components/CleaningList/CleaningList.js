import './CleaningList.css';
import '../OrderByLocal/OrderByLocal.css';
import CleaningCard from '../CleaningCard/CleaningCard';

export default function CleaningList({ spaces, setCenter, className }) {
  return (
    <div className={className + ' presentation presentationList'}>
      <h3>Limpieza de los espacios</h3>
      <div className="presentationStart" />
      <ul>
        {spaces
          .filter((space) => space.estado === 0)
          .map((space) => {
            return (
              <CleaningCard
                space={space}
                spaces={spaces}
                setCenter={setCenter}
                key={space.id}
              />
            );
          })}
      </ul>
      <div className="presentationEnd" />
    </div>
  );
}
