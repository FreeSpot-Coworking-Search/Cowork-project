import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRange.css';
import { useState, useMemo } from 'react';
import { DateRange } from 'react-date-range';
import { eachDayOfInterval } from 'date-fns';

export default function DateRangeSelector({
  setNewSearchObject,
  newSearchObject,
  minDate,
  reserves,
}) {
  const handleSelect = (event) => {
    setSelectionRange({
      startDate: event.selection.startDate,
      endDate: event.selection.endDate,
      key: 'selection',
    });
    setNewSearchObject({
      ...newSearchObject,
      fecha_entrada: event.selection.startDate,
      fecha_salida: event.selection.endDate,
    });
  };
  const [selectionRange, setSelectionRange] = useState({
    startDate: newSearchObject.fecha_entrada
      ? new Date(newSearchObject.fecha_entrada)
      : new Date(),
    endDate: newSearchObject.fecha_salida
      ? new Date(newSearchObject.fecha_salida)
      : new Date(),
    key: 'selection',
  });

  let disabledDates = useMemo(() => {
    let dates = [];
    reserves?.forEach((reserve) => {
      const reserveArray = eachDayOfInterval({
        start: new Date(reserve.fecha_inicio),
        end: new Date(reserve.fecha_fin),
      });
      dates = dates.concat(reserveArray);
    });
    return dates;
  }, [reserves]);

  return (
    <div className="dateRange">
      <DateRange
        ranges={[selectionRange]}
        rangeColors={['rgba(var(--primary),0.6)']}
        onChange={(event) => handleSelect(event)}
        minDate={minDate ? new Date(minDate) : new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
}
