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
  // const INITIAL_SEARCH_OBJECT = {
  // 	texto: ,
  // 	tipo: "Mesa Flex"
  // 	aforo:
  // 	dias_estancia:
  // 	precio_maximo:
  // 	precio_minimo:
  // 	fecha_entrada:
  // 	fecha_salida:
  // 	puntuacion_minima:
  // 	ordenado_por:
  // }

  const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
  const [objectSearch, setObjectSearch] = useState({});
  const [data, setData] = useState({ results: [], services: [] });
  const [visualization, setVisualization] = useState('list');
  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
    })
  );

  useEffect(() => {
    getSpaces(objectSearch);
  }, []);

  const getSpaces = async (searchObject) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/centers/search',
        objectSearch
      );

      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSearch = () => {
    setObjectSearch({});
  };

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

  console.log(data.results);

  return (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <ListCentersSearch
            data={data.results}
            className="listCentersFullView"
          ></ListCentersSearch>
          <MainNavigation links={Links}></MainNavigation>
          {visualization === 'filter' ? (
            <SearchForm
              setObjectSearch={setObjectSearch}
              services={data.services}
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
              data={data.results}
              className="listCentersSingleView"
            ></ListCentersSearch>
          ) : visualization === 'map' ? (
            <GoogleMap></GoogleMap>
          ) : (
            <SearchForm
              setObjectSearch={setObjectSearch}
              services={data.services}
              className="mainSectionLeftArticle"
            />
          )}
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
}
