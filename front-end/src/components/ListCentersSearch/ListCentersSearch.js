import './ListCentersSearch.css';
import CenterCard from '../CenterCard/CenterCard';

export default function ListCentersSearch({ data, className }) {
  console.log(data);
  return (
    <ul className={className + ' listCenters'}>
      {data.map((center) => (
        <CenterCard key={center.id} center={center} />
      ))}
    </ul>
  );
}
