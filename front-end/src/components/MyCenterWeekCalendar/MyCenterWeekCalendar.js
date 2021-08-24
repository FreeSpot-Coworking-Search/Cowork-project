import { nextWeek, prevWeek } from '../../helpers/calendarHelper';
import './MyCenterWeekCalendar.css';

export default function MyCenterWeekCalendar({
  className,
  day,
  rangeDays,
  setRangeDays,
}) {
  return (
    <nav className="myCenterWeekCalendar">
      <a
        className="calendarPrev"
        onClick={() => setRangeDays(prevWeek(rangeDays))}
      >
        &#10094;
      </a>
      <a
        className="calendarNext"
        onClick={() => setRangeDays(nextWeek(rangeDays))}
      >
        &#10095;
      </a>
      <ul>
        {rangeDays.map((date) => {
          return <li key={date}>{date.getDate()}</li>;
        })}
      </ul>
    </nav>
  );
}
