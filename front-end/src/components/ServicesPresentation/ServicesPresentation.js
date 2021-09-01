import '../../css/presentation.css';
import './servicesPresentation.css';
import ReservationServicesList from '../ReservationServicesList/ReservationServicesList';
import DateRangeSelector from '../DateRange/DateRange';

export default function ServicesPresentation({
  className,
  spaceData,
  reservation,
  setReservation,
}) {
  return (
    <article className={className + ' presentation'}>
      <DateRangeSelector
        setNewSearchObject={setReservation}
        newSearchObject={reservation}
        minDate={true}
        reserves={spaceData.reserves}
      />
      <ReservationServicesList
        spaceData={spaceData}
        reservation={reservation}
        setReservation={setReservation}
      />
    </article>
  );
}
