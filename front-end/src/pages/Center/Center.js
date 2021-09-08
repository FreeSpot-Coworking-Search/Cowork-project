import './Center.css';

import { useState } from 'react';

import CenterPresentation from '../../components/CenterPresentation/CenterPresentation';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import useFullView from '../../hooks/useFullView';
import ListSpacesSearch from '../../components/ListSpacesSearch/ListSpacesSearch';
import useCenter from '../../hooks/useCenter';
import Spinner from '../../components/Spinner/Spinner';
import ScoreList from '../../components/ScoreList/ScoreList';
import IncidentList from '../../components/IncidentList/IncidentList';
import CleaningList from '../../components/CleaningList/CleaningList';
import {
  ListIcon,
  IncidentsIcon,
  InfoIcon,
  CleaningIcon,
  ScoresIcon,
} from '../../components/Icons/Icons';

import { useParams } from 'react-router-dom';

export default function Center({ className }) {
  const { centerId } = useParams();
  const [center, loading, setCenter] = useCenter(centerId);
  const [visualization, setVisualization] = useState('spacesList');
  const [fullView] = useFullView();

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************
  let Links = [];
  let fullViewJSX = {};
  let singleViewJSX = {};

  if (!loading) {
    const scoresButton = {
      action: () => setVisualization('scores'),
      icon: <ScoresIcon className="mainNavigationButtonIcon" />,
      text: 'Ver puntuaciones',
    };
    const spacesButton = {
      action: () => setVisualization('spacesList'),
      icon: <ListIcon className="mainNavigationButtonIcon" />,
      text: 'Ver espacios',
    };
    const incidentsButton = {
      action: () => setVisualization('incidents'),
      icon: <IncidentsIcon className="mainNavigationButtonIcon" />,
      text: 'Ver incidencias',
      alert: incidentAlert(center),
    };
    const cleaningButton = {
      action: () => setVisualization('cleaning'),
      icon: <CleaningIcon className="mainNavigationButtonIcon" />,
      text: 'Ver limpieza',
      alert: cleaningAlert(center),
    };
    const infoButton = {
      action: () => setVisualization('info'),
      icon: <InfoIcon className="mainNavigationButtonIcon" />,
      text: 'Ver limpieza',
    };

    switch (visualization) {
      case 'spacesList':
        if (fullView)
          Links = [spacesButton, scoresButton, cleaningButton, incidentsButton];
        else
          Links = [
            infoButton,
            spacesButton,
            scoresButton,
            cleaningButton,
            incidentsButton,
          ];
        break;
      case 'scores':
        if (fullView)
          Links = [spacesButton, scoresButton, cleaningButton, incidentsButton];
        else
          Links = [
            infoButton,
            spacesButton,
            scoresButton,
            cleaningButton,
            incidentsButton,
          ];

        break;
      case 'incidents':
        if (fullView)
          Links = [spacesButton, scoresButton, cleaningButton, incidentsButton];
        else
          Links = [
            infoButton,
            spacesButton,
            scoresButton,
            cleaningButton,
            incidentsButton,
          ];

        break;
      case 'cleaning':
        if (fullView)
          Links = [spacesButton, scoresButton, cleaningButton, incidentsButton];
        else
          Links = Links = [
            infoButton,
            spacesButton,
            scoresButton,
            cleaningButton,
            incidentsButton,
          ];

        break;
      case 'info':
        if (fullView)
          Links = [spacesButton, scoresButton, cleaningButton, incidentsButton];
        else
          Links = Links = [
            infoButton,
            spacesButton,
            scoresButton,
            cleaningButton,
            incidentsButton,
          ];
        break;

      default:
        break;
    }

    fullViewJSX = {
      info: (
        <div className={className + ' mainSectionFullView'}>
          <ListSpacesSearch
            className="mainSectionLeftArticle"
            results={center.espacios}
          />
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>

          <CenterPresentation
            center={center}
            loading={loading}
            setCenter={setCenter}
            className="mainSectionRightArticle"
          />
        </div>
      ),
      spacesList: (
        <div className={className + ' mainSectionFullView'}>
          <ListSpacesSearch
            className="mainSectionLeftArticle"
            results={center.espacios}
          />
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>

          <CenterPresentation
            center={center}
            loading={loading}
            setCenter={setCenter}
            className="mainSectionRightArticle"
          />
        </div>
      ),
      scores: (
        <div className={className + ' mainSectionFullView'}>
          <ScoreList
            className="mainSectionLeftArticle"
            scores={center.valoraciones}
          />
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>

          <CenterPresentation
            center={center}
            loading={loading}
            className="mainSectionRightArticle"
          />
        </div>
      ),
      incidents: (
        <div className={className + ' mainSectionFullView'}>
          <IncidentList
            className="mainSectionLeftArticle"
            incidents={center.espacios}
          />
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>

          <CenterPresentation
            center={center}
            loading={loading}
            className="mainSectionRightArticle"
          />
        </div>
      ),
      cleaning: (
        <div className={className + ' mainSectionFullView'}>
          <CleaningList
            className="mainSectionLeftArticle"
            spaces={center.espacios}
          />
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>

          <CenterPresentation
            center={center}
            loading={loading}
            className="mainSectionRightArticle"
          />
        </div>
      ),
    };
    singleViewJSX = {
      info: (
        <CenterPresentation
          center={center}
          loading={loading}
          className="mainSectionLeftArticle"
        />
      ),
      spacesList: (
        <ListSpacesSearch
          className="mainSectionLeftArticle"
          results={center.espacios}
        />
      ),
      cleaning: (
        <CleaningList
          className="mainSectionLeftArticle"
          spaces={center.espacios}
        />
      ),
      incidents: (
        <IncidentList
          className="mainSectionLeftArticle"
          incidents={center.espacios}
        />
      ),
      scores: (
        <ScoreList
          className="mainSectionLeftArticle"
          scores={center.valoraciones}
        />
      ),
    };
  }
  // *********
  // ** JSX **
  // *********

  return loading ? (
    <Spinner />
  ) : (
    <>
      {fullView ? (
        fullViewJSX[visualization]
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          {singleViewJSX[visualization]}
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>
        </div>
      )}
    </>
  );
}
const incidentAlert = (center) => {
  const result = center.espacios.reduce((number, space) => {
    return (number += space.incidencias.length);
  }, 0);
  return result;
};
const cleaningAlert = (center) => {
  const result = center.espacios.filter((space) => space.estado === 1);
  return result.length;
};
