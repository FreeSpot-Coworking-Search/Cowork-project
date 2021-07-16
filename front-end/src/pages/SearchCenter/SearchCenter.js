import './SearchCenter.css';
import ListCentersSearch from './components/ListCentersSearch/ListCentersSearch';
import { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import axios from 'axios';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import GoogleMap from '../../components/CustomGoogleMap/CustomGoogleMap';

export default function SearchCenter() {
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
    'Parking',
    'Pizarra / Flipchart',
    'Proyector',
    'Prueba gratuita',
    'Recepción',
    'Recepción de emails',
    'Recepción de llamadas',
    'Recepción paquetería',
    'Sala de reuniones',
    'Secretaría',
    'TV',
    'Uso de dirección',
  ];

  const [objectSearch, setObjectSearch] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    getSpaces(objectSearch);
  }, [objectSearch]);

  const getSpaces = async (searchObject) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/centers/search'
      );
      const { data: newData } = response.data;
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(objectSearch);

  return (
    <div className="searchCenter">
      <ListCentersSearch data={data}></ListCentersSearch>
      <MainNavigation></MainNavigation>
      <SearchForm setObjectSearch={setObjectSearch} services={services} />
      <GoogleMap></GoogleMap>
    </div>
  );
}
