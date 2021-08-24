import './Center.css';

import { useState } from 'react';

import CenterPresentation from '../../components/CenterPresentation/CenterPresentation';
import MainNavigation from '../../components/MainNavigation/MainNavigation';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import useFullView from '../../hooks/useFullView';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import ListSpacesSearch from '../../components/ListSpacesSearch/ListSpacesSearch';
import useCenter from '../../hooks/useCenter';
import Spinner from '../../components/Spinner/Spinner';

export default function Center({ className }) {
  const centerId = RetrieveQueryParams(['id_centro']).id_centro;
  const [center, loading] = useCenter(centerId);
  const [visualization, setVisualization] = useState('modification');
  const [fullView] = useFullView();

  console.log(center);

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const genericButton = {
    action: () => setVisualization(visualization === 3 ? 1 : visualization + 1),
    icon: locationIcon,
    text: 'Mensaje ayuda',
  };
  let Links = [];

  switch (visualization) {
    case 'modification':
      if (fullView) Links = [genericButton, genericButton, genericButton];
      else Links = [genericButton, genericButton, genericButton, genericButton];
      break;
    case 2:
      if (fullView) Links = [genericButton, genericButton, genericButton];
      else Links = [genericButton, genericButton, genericButton, genericButton];

      break;
    case 3:
      if (fullView) Links = [genericButton, genericButton, genericButton];
      else Links = [genericButton, genericButton, genericButton, genericButton];
      break;

    default:
      break;
  }

  const fullViewJSX = {
    modification: (
      <CenterPresentation
        center={center}
        loading={loading}
        className="mainSectionRightArticle"
      />
    ),
  };
  const singleViewJSX = {
    modification: (
      <CenterPresentation
        center={center}
        loading={loading}
        className="mainSectionLeftArticle"
      />
    ),
    list: (
      <ListSpacesSearch
        className="mainSectionLeftArticle"
        results={center.espacios}
      />
    ),
  };

  // *********
  // ** JSX **
  // *********

  return loading ? (
    <Spinner />
  ) : (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <ListSpacesSearch
            className="mainSectionLeftArticle"
            results={center.espacios}
          />

          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>
          {fullViewJSX[visualization]}
        </div>
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
