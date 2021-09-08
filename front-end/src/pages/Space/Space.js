import './Space.css';

import { useState, lazy } from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';

import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import RetrieveQueryParams from '../../helpers/RetriveQueryParams';

import useFullView from '../../hooks/useFullView';
import useFetch from '../../hooks/useFetch';
import useDialog from '../../hooks/useDialog';

import submitIcon from '../../assets/icons/check-solid.png';
import centersIcon from '../../assets/icons/centers-solid.png';
import servicesIcon from '../../assets/icons/plus-solid.png';

import { useParams } from 'react-router-dom';
import { CalendarIcon, IncidentsIcon } from '../../components/Icons/Icons';
import Spinner from '../../components/Spinner/Spinner';
import ClientSpace from './ClientSpace';
import OwnerSpace from './OwnerSpace';

const ConfirmationDialog = lazy(() =>
  import('../../components/SpacePresentation/ConfirmationDialog')
);
const ServicesPresentation = lazy(() =>
  import('../../components/ServicesPresentation/ServicesPresentation')
);
const PhotosPresentation = lazy(() =>
  import('../../components/PhotosPresentation/PhotosPresentation')
);

export default function Space({ className }) {
  const { spaceId } = useParams();
  // const [fullView] = useFullView();
  // const query = RetrieveQueryParams(['fecha_entrada', 'fecha_salida']);
  const [spaceData, setSpace, loading] = useFetch('spaces', spaceId);
  const owner = spaceData.owner;
  // const [visualization, setVisualization] = useState(
  //   owner ? 'incidents' : 'calendar'
  // );
  // const [reservation, setReservation] = useState(query);
  // const { open, handleClickOpen, handleClose } = useDialog();
  console.log(owner);

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************
  // const submitButton = {
  //   action: handleClickOpen,
  //   icon: submitIcon,
  //   text: 'Reservar',
  // };

  // const calendarButton = {
  //   action: () => setVisualization('calendar'),
  //   icon: <CalendarIcon className="mainNavigationButtonIcon" />,
  //   text: 'Haz tu reserva',
  // };

  // const incidentsButton = {
  //   action: () => setVisualization('incidents'),
  //   icon: <IncidentsIcon className="mainNavigationButtonIcon" />,
  //   text: 'Informacion espacio',
  // };

  // const centerVisualizationBtn = {
  //   action: () => setVisualization('center'),
  //   icon: centersIcon,
  //   text: 'Informacion centro',
  // };

  // const servicesVisualizationBtn = {
  //   action: () => setVisualization('services'),
  //   icon: servicesIcon,
  //   text: 'Informacion servicios',
  // };

  // switch (visualization) {
  //   case 'calendar':
  //     if (fullView) Links = [calendarButton, centerVisualizationBtn];
  //     else
  //       Links = [
  //         calendarButton,
  //         centerVisualizationBtn,
  //         servicesVisualizationBtn,
  //       ];
  //     break;
  //   case 'incidents':
  //     if (fullView) Links = [incidentsButton, servicesVisualizationBtn];
  //     else Links = [incidentsButton, servicesVisualizationBtn];

  //   break;
  // case 'services':
  //   if (fullView) Links = [firstButton, centerVisualizationBtn];
  //   else Links = [firstButton, spaceVisualizationBtn, centerVisualizationBtn];

  //   break;

  // case 'photos':
  //   if (fullView) Links = [firstButton, servicesVisualizationBtn];
  //   else
  //     Links = [firstButton, spaceVisualizationBtn, servicesVisualizationBtn];
  //   break;

  //   default:
  //     break;
  // }

  // *********
  // ** JSX **
  // *********

  // const ownerFullViewJSX = {
  //   calendar: (
  //     <main className={className + ' mainSectionFullView'}>
  //       <SpacePresentation
  //         className="mainSectionLeftArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //         setSpace={setSpace}
  //       />

  //       <MainNavigation
  //         links={Links}
  //         className="mainSectionNavigation"
  //       ></MainNavigation>

  //       <ServicesPresentation
  //         className="mainSectionRightArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //       />
  //     </main>
  //   ),
  //   incidents: (
  //     <main className={className + ' mainSectionFullView'}>
  //       <SpacePresentation
  //         className="mainSectionLeftArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //       />
  //       <MainNavigation
  //         links={Links}
  //         className="mainSectionNavigation"
  //       ></MainNavigation>

  //       <article className="mainSectionRightArticle Borrame">
  //         <p>centro</p>
  //       </article>
  //     </main>
  //   ),
  // };
  // const noOwnerFullViewJSX = {
  //   calendar: (
  //     <main className={className + ' mainSectionFullView'}>
  //       <SpacePresentation
  //         className="mainSectionLeftArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //         setSpace={setSpace}
  //       />

  //       <MainNavigation
  //         links={Links}
  //         className="mainSectionNavigation"
  //       ></MainNavigation>

  //       <ServicesPresentation
  //         className="mainSectionRightArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //       />
  //     </main>
  //   ),
  //   incidents: (
  //     <main className={className + ' mainSectionFullView'}>
  //       <SpacePresentation
  //         className="mainSectionLeftArticle"
  //         spaceData={spaceData}
  //         reservation={reservation}
  //         setReservation={setReservation}
  //       />
  //       <MainNavigation
  //         links={Links}
  //         className="mainSectionNavigation"
  //       ></MainNavigation>

  //       <article className="mainSectionRightArticle Borrame">
  //         <p>centro</p>
  //       </article>
  //     </main>
  //   ),
  // };

  // const singleViewJSX = {
  //   space: (
  //     <SpacePresentation
  //       className="mainSectionLeftArticle"
  //       spaceData={spaceData}
  //       reservation={reservation}
  //       setReservation={setReservation}
  //     />
  //   ),
  //   center: (
  //     <article className="mainSectionLeftArticle Borrame">
  //       <p>centro</p>
  //     </article>
  //   ),
  //   services: (
  //     <ServicesPresentation
  //       className="mainSectionLeftArticle"
  //       spaceData={spaceData}
  //       reservation={reservation}
  //       setReservation={setReservation}
  //     />
  //   ),
  //   photos: (
  //     <PhotosPresentation className="mainSectionLeftArticle" data={spaceData} />
  //   ),
  // };

  // const responsiveChangeJSX = {
  //   true: <>{fullViewJSX[visualization]}</>,
  //   false: (
  //     <main className={className + ' mainSectionSingleView'}>
  //       {singleViewJSX[visualization]}
  //       <MainNavigation
  //         links={Links}
  //         className="mainSectionNavigation"
  //       ></MainNavigation>
  //     </main>
  //   ),
  // };

  return loading && !owner ? (
    <Spinner />
  ) : owner ? (
    <OwnerSpace
      spaceData={spaceData}
      setSpace={setSpace}
      className={className}
    />
  ) : (
    <ClientSpace
      spaceData={spaceData}
      setSpace={setSpace}
      className={className}
    />
    // <>
    //   {responsiveChangeJSX[fullView]}
    //   <CircularSuspense>
    //     <Dialog open={open} onClose={handleClose}>
    //       <ConfirmationDialog
    //         reservation={reservation}
    //         handleClose={handleClose}
    //         spaceData={spaceData}
    //       />
    //     </Dialog>
    //   </CircularSuspense>
    // </>
  );
}
