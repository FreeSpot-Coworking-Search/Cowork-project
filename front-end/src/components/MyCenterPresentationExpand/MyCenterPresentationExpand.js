import './MyCenterPresentationExpand.css';
import '../../css/presentation.css';

import spaceTyping from '../../helpers/spaceTyping';
import MyCenterSelector from '../MyCenterSelector/MyCenterSelector';
import MyCenterListExpand from '../MyCenterListExpand/MyCenterListExpand';
import MyCenterWeekCalendar from '../MyCenterWeekCalendar/MyCenterWeekCalendar';
import { thisWeek } from '../../helpers/calendarHelper';
import { useState } from 'react';

export default function MyCenterPresentationExpand({
  centers,
  selectedCenter,
  setSelectedCenter,
  day,
  setDay,
}) {
  const [rangeDays, setRangeDays] = useState(thisWeek(day));
  const listSpaces = spaceTyping(centers[selectedCenter].espacios);
  return (
    <>
      <section className="presentation myCenterPresentationExpand">
        <MyCenterSelector
          centers={centers}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
          day={day}
          setDay={setDay}
        />
        <MyCenterListExpand listSpaces={listSpaces} rangeDays={rangeDays} />
        <MyCenterWeekCalendar
          day={day}
          rangeDays={rangeDays}
          setRangeDays={setRangeDays}
        />
      </section>
    </>
  );
}
