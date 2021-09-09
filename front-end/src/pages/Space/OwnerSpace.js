import { useState } from 'react';
import {
  CalendarIcon,
  IncidentsIcon,
  InfoIcon,
} from '../../components/Icons/Icons';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import { SpaceIncidents } from '../../components/SpaceIncidents/SpaceIncidents';
import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';
import SpaceReservesCalendar from '../../components/SpaceReservesCalendar/SpaceReservesCalendar';
import Spinner from '../../components/Spinner/Spinner';
import useFullView from '../../hooks/useFullView';
import './Space.css';

export default function OwnerSpace({ spaceData, setSpace, className }) {
  const [visualization, setVisualization] = useState('info');
  const [fullView] = useFullView();

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const calendarButton = {
    action: () => setVisualization('reserves'),
    icon: <CalendarIcon className="mainNavigationButtonIcon" />,
    text: 'Estado',
  };
  const infoButton = {
    action: () => setVisualization('info'),
    icon: <InfoIcon className="mainNavigationButtonIcon" />,
    text: 'Información',
  };
  const incidentsButton = {
    action: () => setVisualization('incidents'),
    icon: <IncidentsIcon className="mainNavigationButtonIcon" />,
    text: 'Incidencias',
  };
  let Links = [];
  switch (visualization) {
    case 'info':
      if (fullView) Links = [calendarButton, incidentsButton];
      else Links = [infoButton, calendarButton, incidentsButton];
      break;

    case 'reserves':
      if (fullView) Links = [calendarButton, incidentsButton];
      else Links = [infoButton, calendarButton, incidentsButton];
      break;

    case 'incidents':
      if (fullView) Links = [calendarButton, incidentsButton];
      else Links = [infoButton, calendarButton, incidentsButton];
      break;

    default:
      break;
  }
  const singleViewJSX = {
    info: (
      <SpacePresentation
        className="mainSectionLeftArticle"
        spaceData={spaceData}
        setSpace={setSpace}
      />
    ),
    reserves: (
      <SpaceReservesCalendar
        className="mainSectionLeftArticle"
        spaceData={spaceData}
      />
    ),
    incidents: (
      <SpaceIncidents
        className="mainSectionLeftArticle"
        spaceData={spaceData}
        setSpaceData={setSpace}
      />
    ),
  };

  const fullViewJSX = {
    info: (
      <SpaceReservesCalendar
        className="mainSectionRightArticle"
        spaceData={spaceData}
      />
    ),
    reserves: (
      <SpaceReservesCalendar
        className="mainSectionRightArticle"
        spaceData={spaceData}
      />
    ),
    incidents: (
      <SpaceIncidents
        className="mainSectionRightArticle"
        spaceData={spaceData}
        setSpaceData={setSpace}
      />
    ),
  };

  const responsiveChangeJSX = {
    true: (
      <main className={className + ' mainSectionFullView'}>
        <SpacePresentation
          className="mainSectionLeftArticle"
          spaceData={spaceData}
          setSpace={setSpace}
        />
        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
        {fullViewJSX[visualization]}
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

  return spaceData ? <>{responsiveChangeJSX[fullView]}</> : <Spinner />;
}
