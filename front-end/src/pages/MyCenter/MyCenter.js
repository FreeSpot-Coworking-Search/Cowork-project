import './MyCenter.css';

import { useState } from 'react';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import Spinner from '../../components/Spinner/Spinner';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import useFullView from '../../hooks/useFullView';
import useMyCenter from '../../hooks/useMyCenter';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import MyCenterPresentation from '../../components/MyCenterPresentation/MyCenterPresentation';
import MyCenterPresentationExpand from '../../components/MyCenterPresentationExpand/MyCenterPresentationExpand';

export default function MyCenter({ className }) {
  const centerId = RetrieveQueryParams(['id_administrador']).id_administrador;
  const [centers, loading] = useMyCenter(centerId);
  const [selectedCenter, setSelectedCenter] = useState(0);
  const [day, setDay] = useState(new Date());
  const [visualization, setVisualization] = useState('list');
  const [fullView] = useFullView();

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const genericButton = {
    action: () => setVisualization(visualization === 4 ? 1 : visualization + 1),
    icon: locationIcon,
    text: 'Mensaje ayuda',
  };
  let Links = [];

  switch (visualization) {
    case 'list':
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

    case 'expand':
      if (fullView) Links = [genericButton, genericButton, genericButton];
      else Links = [genericButton, genericButton, genericButton, genericButton];
      break;

    default:
      break;
  }

  // *********
  // ** JSX **
  // *********

  const fullViewJSX = {
    list: (
      <div className={className + ' mainSectionFullView'}>
        <div className="mainSectionLeftArticle Borrame">
          <p>1</p>
        </div>

        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
        <MyCenterPresentation
          className="mainSectionRightArticle"
          centers={centers}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
        />
      </div>
    ),
    2: (
      <div className={className + ' mainSectionFullView'}>
        <div className="mainSectionLeftArticle Borrame">
          <p>1</p>
        </div>

        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
        <div className="mainSectionRightArticle Borrame">
          <p>2</p>
        </div>
      </div>
    ),
    3: (
      <div className={className + ' mainSectionFullView'}>
        <div className="mainSectionLeftArticle Borrame">
          <p>1</p>
        </div>

        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
        <div className="mainSectionRightArticle Borrame">
          <p>3</p>
        </div>
      </div>
    ),
    expand: (
      <div className={className + ' mainSectionFullViewExpand'}>
        <MyCenterPresentationExpand
          className="mainSectionLeftArticle"
          centers={centers}
          day={day}
          setday={setDay}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
        />

        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
      </div>
    ),
  };

  const singleViewJSX = {
    list: (
      <MyCenterPresentation
        className="mainSectionLeftArticle"
        centers={centers}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
        day={day}
        setDay={setDay}
      />
    ),
    2: (
      <div className="mainSectionLeftArticle Borrame">
        <p>2</p>
      </div>
    ),
    3: (
      <div className="mainSectionLeftArticle Borrame">
        <p>3</p>
      </div>
    ),
  };

  const responsiveChangeJSX = {
    true: <>{fullViewJSX[visualization]}</>,
    false: (
      <div className={className + ' mainSectionSingleView'}>
        {singleViewJSX[visualization]}
        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
      </div>
    ),
  };

  return !loading ? <>{responsiveChangeJSX[fullView]}</> : <Spinner />;
}
