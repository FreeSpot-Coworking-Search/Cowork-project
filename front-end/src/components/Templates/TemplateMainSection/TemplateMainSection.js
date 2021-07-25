import './TemplateMainSection.css';

import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import MainNavigation from '../../MainNavigation/MainNavigation';

import locationIcon from '../../../assets/icons/bxs-location-plus 1.png';

export default function TemplateMainSection({ className }) {
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
    action: () => setVisualization(visualization === 3 ? 1 : visualization + 1),
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

    default:
      break;
  }

  // *********
  // ** JSX **
  // *********

  return (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <div className="mainSectionLeftArticle Borrame">
            <p>1</p>
          </div>

          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>
          {visualization === 2 ? (
            <div className="mainSectionRightArticle Borrame">
              <p>2</p>
            </div>
          ) : (
            <div className="mainSectionRightArticle Borrame">
              <p>3</p>
            </div>
          )}
        </div>
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          {visualization === 1 ? (
            <div className="mainSectionLeftArticle Borrame">
              <p>1</p>
            </div>
          ) : visualization === 2 ? (
            <div className="mainSectionLeftArticle Borrame">
              <p>2</p>
            </div>
          ) : (
            <div className="mainSectionLeftArticle Borrame">
              <p>3</p>
            </div>
          )}
          <MainNavigation
            links={Links}
            className="mainSectionNavigation"
          ></MainNavigation>
        </div>
      )}
    </>
  );
}
