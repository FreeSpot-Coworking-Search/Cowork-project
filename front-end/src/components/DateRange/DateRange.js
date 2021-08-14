import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';

export default function DateRangeSelector({
  setNewSearchObject,
  newSearchObject,
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
      ? newSearchObject.fecha_entrada
      : new Date(),
    endDate: newSearchObject.fecha_salida
      ? newSearchObject.fecha_salida
      : new Date(),
    key: 'selection',
  });
  return (
    <div className="dateRange">
      <DateRange
        ranges={[selectionRange]}
        rangeColors={['rgba(var(--primary),0.6)']}
        onChange={(event) => handleSelect(event)}
      />
    </div>
  );
}
