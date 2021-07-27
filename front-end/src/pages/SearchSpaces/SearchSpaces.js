import './SearchSpaces.css';

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

export default function SearchSpaces({ className }) {
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
  const services = [
    'Acceso 24/7',
    'Aire acondicionado / calefacción',
    'Alarma',
    'Café de cortesía',
    'Catering',
    'Cocina',
    'Coworking Visa',
    'Domicilación fiscal',
    'Domiciliación social',
    'Equipo de sonido',
    'Fotocopiadora',
    'Gestión de agendas (secretaria virtual)',
    'Gestión de eventos',
    'Impresora / escaner',
    'Internet + wifi',
    'Oficina virtual',
  ];
  const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
  const [objectSearch, setObjectSearch] = useState({});
  const [data, setData] = useState([]);
  const [visualization, setVisualization] = useState('list');
  const [fullView, setFullView] = useState(
    useMediaQuery({
      query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
    })
  );

  useEffect(() => {
    getSpaces(objectSearch);
    console.log(data);
  }, [objectSearch]);

  const resetSearch = () => {
    setObjectSearch({});
  };

  const getSpaces = async (searchObject) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/centers/search',
        searchObject
      );
      const { data: newData } = response.data;
      setData(newData);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <ListCentersSearch
            data={data}
            className="listCentersFullView"
          ></ListCentersSearch>
          <MainNavigation links={Links}></MainNavigation>
          {visualization === 'filter' ? (
            <SearchForm
              setObjectSearch={setObjectSearch}
              services={services}
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
              data={data}
              className="listCentersSingleView"
            ></ListCentersSearch>
          ) : visualization === 'map' ? (
            <GoogleMap></GoogleMap>
          ) : (
            <SearchForm
              setObjectSearch={setObjectSearch}
              services={services}
              className="mainSectionLeftArticle"
            />
          )}
          <MainNavigation links={Links}></MainNavigation>
        </div>
      )}
    </>
  );
}
