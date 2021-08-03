import './SearchSpace.css';

import { useState } from 'react';
import useSearchSpace from '../../hooks/useSearchSpace';
import useFullView from '../../hooks/useFullView';
import cleanSearchObject from '../../helpers/cleanSearchObject';

import Spinner from '../../components/Spinner/Spinner';
import SearchForm from '../../components/SearchForm/SearchForm';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ListSpacesSearch from '../../components/ListSpacesSearch/ListSpacesSearch';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import CenterPresentation from '../../components/CenterPresentation/CenterPresentation';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';

import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import presentationIcon from '../../assets/icons/bxs-home.svg';

export default function SearchSpace({ className }) {
  const INITIAL_SEARCH_OBJECT = RetrieveQueryParams([
    'id_centro',
    'tipo',
    'aforo',
    'dias_estancia',
    'precio_maximo',
    'precio_minimo',
    'fecha_entrada',
    'fecha_salida',
    'puntuacion_minima',
    'ordenado_por',
  ]);

  const [loading, results, searchObject, setSearchObject, resetSearchObject] =
    useSearchSpace(INITIAL_SEARCH_OBJECT);
  const [fullView] = useFullView();
  const [visualization, setVisualization] = useState('presentation');

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const filterButton = {
    action: () => setVisualization('filter'),
    icon: filterIcon,
    text: 'Filtrar',
  };
  const presentationButton = {
    action: () => setVisualization('presentation'),
    icon: presentationIcon,
    text: 'Ver centro',
  };

  const genericButton = { path: '/', icon: locationIcon, text: 'Uno' };
  let Links = [];
  if (fullView) Links = [genericButton, genericButton, genericButton];
  else Links = [genericButton, genericButton, genericButton, genericButton];

  switch (visualization) {
    case 'presentation':
      if (fullView) Links = [filterButton, genericButton, genericButton];
      else Links = [filterButton, genericButton, genericButton, genericButton];
      break;
    case 'filter':
      if (fullView) Links = [presentationButton, genericButton, genericButton];
      else
        Links = [
          presentationButton,
          genericButton,
          genericButton,
          genericButton,
        ];

      break;

    default:
      break;
  }

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
            results={results}
            searchObject={cleanSearchObject(searchObject)}
            setSearchObject={searchObject}
            className="mainSectionLeftArticle"
          ></ListSpacesSearch>
          <MainNavigation links={Links}></MainNavigation>
          {visualization === 'presentation' ? (
            <CenterPresentation
              className="mainSectionRightArticle"
              centerId={searchObject.id_centro}
            />
          ) : (
            <SearchForm
              type="space"
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              services={[]}
              results={results}
              className="mainSectionRightArticle"
            />
          )}
        </div>
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          <ListSpacesSearch
            results={results}
            searchObject={cleanSearchObject(searchObject)}
            setSearchObject={searchObject}
            className="mainSectionLeftArticle"
          ></ListSpacesSearch>
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
  // return <p>hola</p>;
}
