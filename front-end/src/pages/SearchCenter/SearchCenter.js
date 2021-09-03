import './SearchCenter.css';

import { useState } from 'react';

import ListCentersSearch from '../../components/ListCentersSearch/ListCentersSearch';
import SearchForm from '../../components/SearchForm/SearchForm';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import GoogleMapSearch from '../../components/GoogleMapsSearch/GoogleMapsSearch';
import Spinner from '../../components/Spinner/Spinner';

import {
  FilterIcon,
  ResetIcon,
  MapIcon,
  ListIcon,
} from '../../components/Icons/Icons';

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
    icon: <MapIcon className="mainNavigationButtonIcon" />,
    text: 'Mapa',
  };
  const filterButton = {
    action: () => setVisualization('filter'),
    icon: <FilterIcon className="mainNavigationButtonIcon" />,
    text: 'Filtrar',
  };
  const listButton = {
    action: () => setVisualization('list'),
    icon: <ListIcon className="mainNavigationButtonIcon" />,
    text: 'Lista',
  };
  const resetButton = {
    action: resetSearchObject,
    icon: <ResetIcon className="mainNavigationButtonIcon" />,
    text: 'Resetear busqueda',
  };
  let Links = [];

  switch (visualization) {
    case 'list':
      if (fullView) Links = [mapButton, filterButton, resetButton];
      else Links = [listButton, mapButton, filterButton, resetButton];
      break;
    case 'map':
      if (fullView) Links = [mapButton, filterButton, resetButton];
      else Links = [listButton, mapButton, filterButton, resetButton];

      break;
    case 'filter':
      if (fullView) Links = [mapButton, filterButton, resetButton];
      else Links = [listButton, mapButton, filterButton, resetButton];

      break;

    default:
      break;
  }

  // *********
  // ** JSX **
  // *********

  const fullViewJSX = {
    filter: (
      <SearchForm
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        services={[]}
        results={results}
        className="mainSectionRightArticle"
      />
    ),
    list: (
      <SearchForm
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        services={[]}
        results={results}
        className="mainSectionRightArticle"
      />
    ),
    map: <GoogleMapSearch markers={results} />,
  };

  const singleViewJSX = {
    filter: (
      <SearchForm
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        services={[]}
        results={results}
        className="mainSectionLeftArticle"
      />
    ),
    list: (
      <ListCentersSearch
        results={results}
        searchObject={cleanSearchObject(searchObject)}
        setSearchObjet={setSearchObject}
        linksRoute={linksRoute}
        className="listCentersSingleView"
      ></ListCentersSearch>
    ),
    map: <GoogleMapSearch markers={results} />,
  };

  return !loading ? (
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
          {fullViewJSX[visualization]}
        </div>
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          {singleViewJSX[visualization]}
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  ) : (
    <div className={className + ' mainSectionFullView'}>
      <Spinner />
    </div>
  );
}
