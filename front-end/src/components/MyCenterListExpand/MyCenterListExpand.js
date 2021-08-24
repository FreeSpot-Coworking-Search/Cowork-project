import './MyCenterListExpand.css';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';

export default function MyCenterListExpand({ className, listSpaces }) {
  return (
    <div className={className + ' myCenterListExpand'}>
      <div className="myCenterListLimit" />
      <ul>
        {Object.keys(listSpaces).map((type) => {
          return (
            <li key={type}>
              <h3>{spaceTypeToPlural(type)}</h3>
              <ul>
                {listSpaces[type].map((space) => (
                  <li key={space.id}>{space.id}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="myCenterListLimit" />
    </div>
  );
}
