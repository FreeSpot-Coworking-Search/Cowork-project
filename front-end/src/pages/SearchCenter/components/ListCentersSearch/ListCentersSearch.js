import './ListCentersSearch.css';
import CenterCard from '../../../../components/CenterCard/CenterCard';

export default function ListCentersSearch({ data, className }) {
  return (
    <ul className={className + ' listCenters'}>
      {data.map((center) => (
        <CenterCard key={center.id} center={center} />
      ))}
    </ul>
  );
}
