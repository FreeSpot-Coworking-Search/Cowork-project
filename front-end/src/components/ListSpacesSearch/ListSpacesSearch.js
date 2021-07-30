import './ListSpacesSearch.css';
import SpaceCard from '../SpaceCard/SpaceCard';

export default function ListSpacesSearch({ results, searchObject, className }) {
  return results.length !== 0 ? (
    <ul className={className + ' listSpaces'}>
      {results.map((space) => (
        <SpaceCard
          key={space.id}
          space={space}
          linksRoute="/space"
          searchObject={searchObject}
        />
      ))}
    </ul>
  ) : (
    <p>NO hay resultados</p>
  );
}
