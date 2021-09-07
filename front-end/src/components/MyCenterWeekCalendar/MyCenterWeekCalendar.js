import { nextWeek, prevWeek } from '../../helpers/calendarHelper';
import rangeDaysMonthReader from '../../helpers/rangeDaysMonthReader';
import './MyCenterWeekCalendar.css';

export default function MyCenterWeekCalendar({
  className,
  day,
  rangeDays,
  setRangeDays,
}) {
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
  const months = rangeDaysMonthReader(rangeDays);

  return (
    <nav className="myCenterWeekCalendar">
      {months.length > 1 ? (
        <>
          <p className="monthDisplay monthDisplayOne">{months[1]}</p>
          <p className="monthDisplay monthDisplayTwo">{months[0]}</p>
        </>
      ) : (
        <p className="monthDisplay monthDisplayOnly">{months[0]}</p>
      )}

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
          return (
            <li key={date}>
              {date.getDate()}
              <br /> {weekDays[date.getDay()]}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
