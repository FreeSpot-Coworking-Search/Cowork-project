import { Dialog } from '@material-ui/core';
import { useState, lazy } from 'react';
import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';
import { CalendarIcon } from '../../components/Icons/Icons';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import useDialog from '../../hooks/useDialog';
import useFullView from '../../hooks/useFullView';
import './Space.css';
const ConfirmationDialog = lazy(() =>
  import('../../components/SpacePresentation/ConfirmationDialog')
);
const ServicesPresentation = lazy(() =>
  import('../../components/ServicesPresentation/ServicesPresentation')
);

export default function OwnerSpace({ spaceData, setSpace, className }) {
  const query = RetrieveQueryParams(['fecha_entrada', 'fecha_salida']);
  const [reservation, setReservation] = useState(query);
  const { open, handleClickOpen, handleClose } = useDialog();
  const [visualization, setVisualization] = useState('info');
  const [fullView] = useFullView();

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const submitButton = {
    action: handleClickOpen,
    icon: <CalendarIcon className="mainNavigationButtonIcon" />,
    text: 'Reservar',
  };

  const calendarButton = {
    action: () => setVisualization('reserve'),
    icon: <CalendarIcon className="mainNavigationButtonIcon" />,
    text: 'Haz tu reserva',
  };
  let Links = [];
  switch (visualization) {
    case 'info':
      if (fullView) Links = [submitButton];
      else Links = [calendarButton];
      break;

    case 'reserve':
      if (fullView) Links = [submitButton];
      else Links = [submitButton];
      break;
    default:
      break;
  }
  const singleViewJSX = {
    info: (
      <SpacePresentation
        className="mainSectionLeftArticle"
        spaceData={spaceData}
        reservation={reservation}
        setReservation={setReservation}
        setSpace={setSpace}
      />
    ),
    reserve: (
      <ServicesPresentation
        className="mainSectionLeftArticle"
        spaceData={spaceData}
        reservation={reservation}
        setReservation={setReservation}
      />
    ),
  };

  const responsiveChangeJSX = {
    true: (
      <main className={className + ' mainSectionFullView'}>
        <SpacePresentation
          className="mainSectionLeftArticle"
          spaceData={spaceData}
          reservation={reservation}
          setReservation={setReservation}
          setSpace={setSpace}
        />
        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
        <ServicesPresentation
          className="mainSectionRightArticle"
          spaceData={spaceData}
          reservation={reservation}
          setReservation={setReservation}
        />
      </main>
    ),
    false: (
      <main className={className + ' mainSectionSingleView'}>
        {singleViewJSX[visualization]}
        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
      </main>
    ),
  };

  return (
    <>
      {responsiveChangeJSX[fullView]}
      <CircularSuspense>
        <Dialog open={open} onClose={handleClose}>
          <ConfirmationDialog
            reservation={reservation}
            handleClose={handleClose}
            spaceData={spaceData}
          />
        </Dialog>
      </CircularSuspense>
    </>
  );
}
