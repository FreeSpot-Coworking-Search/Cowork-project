import './SearchCenter.css';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import axios from 'axios';

import ListCentersSearch from '../../components/ListCentersSearch/ListCentersSearch';
import SearchForm from '../../components/SearchForm/SearchForm';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import GoogleMap from '../../components/CustomGoogleMap/CustomGoogleMap';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import mapIcon from '../../assets/icons/bxs-map-pin.svg';
import filterIcon from '../../assets/icons/bxs-filter-alt.svg';
import resetIcon from '../../assets/icons/bx-reset.svg';
import listIcon from '../../assets/icons/bx-list-ul.svg';

export default function SearchCenter({ className }) {
  const INITIAL_SEARCH_OBJECT = {
    texto: '',
    tipo: '',
    aforo: '',
    dias_estancia: '',
    precio_maximo: '',
    precio_minimo: '',
    fecha_entrada: '',
    fecha_salida: '',
    puntuacion_minima: '',
    ordenado_por: '',
  };

  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
    REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION: minWidth,
  } = process.env;
  const registrationRoute = `${host}:${port}/api/search/center`;
  const linksRoute = `${host}:${port}/api/search/space`;

  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  const [data, setData] = useState({ results: [], services: [] });
  const [visualization, setVisualization] = useState('list');
  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${minWidth})`,
    })
  );

  useEffect(() => {
    getSpaces(cleanSearchObject(searchObject));
  }, [searchObject]);

  const getSpaces = async (searchObject) => {
    try {
      // const response = await axios.post(registrationRoute, searchObject);
      const response = await axios.get(registrationRoute, {
        params: searchObject,
      });

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSearch = () => {
    setSearchObject(INITIAL_SEARCH_OBJECT);
  };

  // ****************
  // ** RESPONSIVE **
  // ****************

  const handleMediaQueryChange = (matches) => {
    setFullView(matches);
  };
  const isFullView = useMediaQuery(
    { query: `(min-width: ${minWidth})` },
    undefined,
    handleMediaQueryChange
  );

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
    action: resetSearch,
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
            results={data.results}
            searchObject={cleanSearchObject(searchObject)}
            linksRoute={linksRoute}
            className="listCentersFullView"
          ></ListCentersSearch>
          <MainNavigation links={Links}></MainNavigation>
          {visualization === 'filter' ? (
            <SearchForm
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              services={data.services}
              results={data.results}
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
              results={data.results}
              searchObject={cleanSearchObject(searchObject)}
              linksRoute={linksRoute}
              className="listCentersSingleView"
            ></ListCentersSearch>
          ) : visualization === 'map' ? (
            <GoogleMap></GoogleMap>
          ) : (
            <SearchForm
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              services={data.services}
              results={data.results}
              className="mainSectionLeftArticle"
            />
          )}
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
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
