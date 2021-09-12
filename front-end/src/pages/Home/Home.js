import './Home.css';
import '../../css/mainSection.css';
import { useState } from 'react';
import HomeSearch from '../../components/HomeSearch/HomeSearch';
import Intro from '../../components/Intro/Intro';
import useFullView from '../../hooks/useFullView';

export default function Home() {
  const INITIAL_SEARCH_OBJECT = {
    tipo: '',
    texto: '',
    fecha_entrada: '',
    fecha_salida: '',
  };
  const [fullView] = useFullView();
  const [searchObject, setSearchObject] = useState(INITIAL_SEARCH_OBJECT);
  return !fullView ? (
    <div className="mainSection mainSectionFullView">
      <div className="mainSectionNavigation">
        <HomeSearch
          searchObject={searchObject}
          setSearchObject={setSearchObject}
        />
      </div>
    </div>
  ) : (
    <div className="mainSection mainSectionFullView">
      <div className="mainSectionIntro">
        <Intro />
      </div>
      <div className="mainSectionRightArticle">
        <HomeSearch
          searchObject={searchObject}
          setSearchObject={setSearchObject}
        />
      </div>
    </div>
  );
}
