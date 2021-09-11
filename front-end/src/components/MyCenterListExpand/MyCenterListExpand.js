import './MyCenterListExpand.css';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';
import MyCenterListExpandElement from '../MyCenterListExpandElement/MyCenterListExpandElement';
import HelpPresentation from '../HelpPresentation/HelpPresentation';
import noCentersIllustration from '../../assets/illustrations/undraw_Traveling_re_weve.svg';

export default function MyCenterListExpand({
  className,
  listSpaces,
  rangeDays,
}) {
  return (
    <div className={className + ' myCenterListExpand'}>
      <div className="myCenterListLimit" />
      {Object.keys(listSpaces).length > 0 ? (
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
      ) : (
        <HelpPresentation
          className="mainSectionLeftArticle"
          image={noCentersIllustration}
          text="Este centro aun no tiene espacios. Añadelos ahora con el botón '+'"
        />
      )}
      <div className="myCenterListLimit" />
    </div>
  );
}
