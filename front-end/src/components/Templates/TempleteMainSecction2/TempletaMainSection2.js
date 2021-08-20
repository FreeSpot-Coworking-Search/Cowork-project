import './MyCenter.css';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import MainNavigation from '../../components/MainNavigation/MainNavigation';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';

export default function MyCenter({ className }) {
  const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
  const [visualization, setVisualization] = useState(1);
  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
    })
  );

  // ****************
  // ** RESPONSIVE **
  // ****************

  const handleMediaQueryChange = (matches) => {
    setFullView(matches);
  };
  const isFullView = useMediaQuery(
    { query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})` },
    undefined,
    handleMediaQueryChange
  );

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
    case 1:
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

    case 4:
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
    1: (
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
    4: (
      <div className={className + ' mainSectionFullViewExpand'}>
        <div className="mainSectionLeftArticle Borrame">
          <p>1</p>
        </div>

        <MainNavigation
          links={Links}
          className="mainSectionNavigation"
        ></MainNavigation>
      </div>
    ),
  };

  const singleViewJSX = {
    1: (
      <div className="mainSectionLeftArticle Borrame">
        <p>1</p>
      </div>
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

  return <>{responsiveChangeJSX[fullView]}</>;
}
