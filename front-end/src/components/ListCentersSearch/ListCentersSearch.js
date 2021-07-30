import './ListCentersSearch.css';
import CenterCard from '../CenterCard/CenterCard';

export default function ListCentersSearch({
  results,
  searchObject,
  linksRoute,
  className,
}) {
  return results.length !== 0 ? (
    <ul className={className + ' listCenters'}>
      {results.map((center) => (
        <CenterCard
          key={center.id}
          center={center}
          linksRoute={linksRoute}
          searchObject={searchObject}
        />
      ))}
    </ul>
  ) : (
    <p>NO hay resultados</p>
  );
}
