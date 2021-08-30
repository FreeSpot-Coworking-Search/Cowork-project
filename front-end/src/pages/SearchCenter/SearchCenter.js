import './SearchCenter.css';

import { useState } from 'react';

import ListCentersSearch from '../../components/ListCentersSearch/ListCentersSearch';
import SearchForm from '../../components/SearchForm/SearchForm';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import GoogleMap from '../../components/GoogleMapsSearch/GoogleMapsSearch';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import mapIcon from '../../assets/icons/bxs-map-pin.svg';
import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import resetIcon from '../../assets/icons/bx-reset.svg';
import listIcon from '../../assets/icons/bx-list-ul.svg';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import useFullView from '../../hooks/useFullView';
import useSearchCenter from '../../hooks/useSearchCenter';
import cleanSearchObject from '../../helpers/cleanSearchObject';

export default function SearchCenter({ className }) {
  const INITIAL_SEARCH_OBJECT = RetrieveQueryParams([
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
  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
  } = process.env;
  const linksRoute = `${host}:${port}/api/search/space`;

  const [visualization, setVisualization] = useState('list');
  const [fullView] = useFullView();

  const [loading, results, searchObject, setSearchObject, resetSearchObject] =
    useSearchCenter(INITIAL_SEARCH_OBJECT);

  // ****************************
  // ** MAIN NAVIGATION CONFIG **
  // ****************************

  const mapButton = {
    action: () => setVisualization('map'),
    icon: mapIcon,
    text: 'Mapa',
  };
  const filterButton = {
    action: () => setVisualization('filter'),
    icon: filterIcon,
    text: 'Filtrar',
  };
  const listButton = {
    action: () => setVisualization('list'),
    icon: listIcon,
    text: 'Lista',
  };
  const resetButton = {
    action: resetSearchObject,
    icon: resetIcon,
    text: 'Resetear busqueda',
  };
  const genericButton = { path: '/', icon: locationIcon, text: 'Uno' };
  let Links = [];

  switch (visualization) {
    case 'list':
      if (fullView) Links = [filterButton, resetButton, genericButton];
      else Links = [mapButton, filterButton, resetButton, genericButton];
      break;
    case 'map':
      if (fullView) Links = [filterButton, resetButton, genericButton];
      else Links = [listButton, filterButton, resetButton, genericButton];

      break;
    case 'filter':
      if (fullView) Links = [mapButton, resetButton, genericButton];
      else Links = [listButton, mapButton, resetButton, genericButton];

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
          <ListCentersSearch
            results={results}
            searchObject={cleanSearchObject(searchObject)}
            setSearchObjet={setSearchObject}
            linksRoute={linksRoute}
            className="listCentersFullView"
          ></ListCentersSearch>
          <MainNavigation links={Links}></MainNavigation>
          {visualization === 'filter' ? (
            <SearchForm
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              services={[]}
              results={results}
              className="mainSectionRightArticle"
            />
          ) : (
            <GoogleMap></GoogleMap>
          )}
        </div>
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          {visualization === 'list' ? (
            <ListCentersSearch
              results={results}
              searchObject={cleanSearchObject(searchObject)}
              setSearchObjet={setSearchObject}
              linksRoute={linksRoute}
              className="listCentersSingleView"
            ></ListCentersSearch>
          ) : visualization === 'map' ? (
            <GoogleMap></GoogleMap>
          ) : (
            <SearchForm
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              services={[]}
              results={results}
              className="mainSectionLeftArticle"
            />
          )}
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
}
