import './SearchSpace.css';

import useSearchSpace from '../../hooks/useSearchSpace';
import useFullView from '../../hooks/useFullView';

import SearchForm from '../../components/SearchForm/SearchForm';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ListSpacesSearch from '../../components/ListSpacesSearch/ListSpacesSearch';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import CenterPresentation from '../../components/CenterPresentation/CenterPresentation';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';

import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import presentationIcon from '../../assets/icons/bxs-home.svg';
import { useState } from 'react';

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

  // const mapButton = {
  //   action: () => setVisualization('map'),
  //   icon: mapIcon,
  //   text: 'Mapa',
  // };

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
  // const resetButton = {
  //   action: resetSearch,
  //   icon: resetIcon,
  //   text: 'Resetear busqueda',
  // };
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
    // case 'filter':
    //   if (fullView) Links = [genericButton, genericButton, genericButton];
    //   else Links = [genericButton, genericButton, genericButton, genericButton];

    //   break;

    default:
      break;
  }

  // *********
  // ** JSX **
  // *********

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <ListSpacesSearch
            results={results}
            searchObject={cleanSearchObject(searchObject)}
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
            className="mainSectionLeftArticle"
          ></ListSpacesSearch>
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
  // return <p>hola</p>;
}

const cleanSearchObject = (searchObject) => {
  let newSearchObject = {};
  for (const key in searchObject) {
    if (searchObject[key] !== '') {
      newSearchObject = {
        ...newSearchObject,
        [key]: searchObject[key],
      };
    }
  }
  return newSearchObject;
};
