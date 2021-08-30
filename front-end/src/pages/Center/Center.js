import './Center.css';

import { useState } from 'react';

import CenterPresentation from '../../components/CenterPresentation/CenterPresentation';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import listIcon from '../../assets/icons/bx-list-ul.svg';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import infoIcon from '../../assets/icons/bx-info-circle.svg';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import scoresIcon from '../../assets/icons/bxs-star.svg';
import useFullView from '../../hooks/useFullView';
import ListSpacesSearch from '../../components/ListSpacesSearch/ListSpacesSearch';
import useCenter from '../../hooks/useCenter';
import Spinner from '../../components/Spinner/Spinner';
import ScoreList from '../../components/ScoreList/ScoreList';
import IncidentList from '../../components/IncidentList/IncidentList';
import CleaningList from '../../components/CleaningList/CleaningList';
import { useParams } from 'react-router-dom';

export default function Center({ className }) {
  const { centerId } = useParams();
  const [center, loading, reload] = useCenter(centerId);
  const [visualization, setVisualization] = useState('spacesList');
  const [fullView] = useFullView();

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************
  let Links = [];
  let fullViewJSX = {};
  let singleViewJSX = {};

  if (!loading) {
    const genericButton = {
      action: () =>
        setVisualization(visualization === 3 ? 1 : visualization + 1),
      icon: locationIcon,
      text: 'Mensaje ayuda',
    };
    const scoresButton = {
      action: () => setVisualization('scores'),
      icon: scoresIcon,
      text: 'Ver puntuaciones',
    };
    const spacesButton = {
      action: () => setVisualization('spacesList'),
      icon: listIcon,
      text: 'Ver espacios',
    };
    const incidentsButton = {
      action: () => setVisualization('incidents'),
      icon: incidentsIcon,
      text: 'Ver incidencias',
      alert: incidentAlert(center),
    };
    const cleaningButton = {
      action: () => setVisualization('cleaning'),
      icon: cleaningIcon,
      text: 'Ver limpieza',
      alert: cleaningAlert(center),
    };
    const infoButton = {
      action: () => setVisualization('info'),
      icon: infoIcon,
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
        if (fullView) Links = [genericButton, genericButton, genericButton];
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
            reload={reload}
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
