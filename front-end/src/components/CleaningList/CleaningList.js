import './CleaningList.css';
import '../OrderByLocal/OrderByLocal.css';
import CleaningCard from '../CleaningCard/CleaningCard';

export default function CleaningList({ spaces }) {
  return (
    <div className="presentationList">
      <div className="presentationStart" />
      <ul>
        {spaces
          .filter((space) => (space.estado = 1))
          .map((space) => {
            return <CleaningCard space={space} />;
          })}
      </ul>
      <div className="presentationEnd" />
    </div>
  );
}
