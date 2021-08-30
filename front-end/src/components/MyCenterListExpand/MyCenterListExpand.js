import './MyCenterListExpand.css';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';

import infoIcon from '../../assets/icons/bx-info-circle.svg';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import MyCenterListExpandElement from '../MyCenterListExpandElement/MyCenterListExpandElement';
export default function MyCenterListExpand({
  className,
  listSpaces,
  rangeDays,
}) {
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
                  <MyCenterListExpandElement
                    space={space}
                    rangeDays={rangeDays}
                  />
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
