import './SearchCenter.css';
import ListCentersSearch from './components/ListCentersSearch/ListCentersSearch';
import { useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';

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

  const [objectSearch, setObjectSearch] = useState({});

  console.log('SearchCenter');
  console.log(objectSearch);

  return (
    <div className="searchCenter">
      <h1>SearchCenter</h1>
      <ListCentersSearch></ListCentersSearch>
      <SearchForm setObjectSearch={setObjectSearch}></SearchForm>
    </div>
  );
}
