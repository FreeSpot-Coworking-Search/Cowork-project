import './Home.css';
import { useState } from 'react';
import HomeSearch from '../../components/HomeSearch/HomeSearch';

export default function Home() {
  const INITIAL_SEARCH_OBJECT = {
    tipo: '',
    texto: '',
    fecha_entrada: '',
    fecha_salida: '',
  };

  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  return (
    <div className="mainSection mainSectionFullView">
      <HomeSearch
        searchObject={searchObject}
        setSearchObject={setSearchObject}
      />
    </div>
  );
}
