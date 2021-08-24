import './MyCenterPresentation.css';
import '../../css/presentation.css';
import spaceTyping from '../../helpers/spaceTyping';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';
import MyCenterSpaceCard from '../MyCenterSpaceCard/MyCenterSpaceCard';
import MyCenterMiniSelector from '../MyCenterMiniSelector/MyCenterMiniSelector';

export default function MyCenterPresentation({
  centers,
  selectedCenter,
  setSelectedCenter,
  day,
  setDay,
}) {
  const listSpaces = spaceTyping(centers[selectedCenter].espacios);
  return (
    <>
      <section className="presentation">
        <MyCenterMiniSelector
          centers={centers}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
          day={day}
          setDay={setDay}
        />
        <div className="myCenterListLimit" />
        <ul>
          {Object.keys(listSpaces).map((type) => {
            return (
              <li key={type} className="myCenterTypeCard">
                <h3>{spaceTypeToPlural(type)}</h3>
                <ul>
                  {listSpaces[type].map((space) => (
                    <MyCenterSpaceCard space={space} day={day} key={space.id} />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="myCenterListLimit" />
      </section>
    </>
  );
}
