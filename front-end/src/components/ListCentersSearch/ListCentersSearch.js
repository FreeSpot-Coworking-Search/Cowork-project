import './ListCentersSearch.css';
import CenterCard from '../CenterCard/CenterCard';
import Spinner from '../Spinner/Spinner';

import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import puntuationIcon from '../../assets/icons/bxs-star.svg';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import aToZAlfabeticIcon from '../../assets/icons/bx-sort-a-z.svg';
import zToAAlfabeticIcon from '../../assets/icons/bx-sort-z-a.svg';
import OrderByNavigation from '../OrderByNavigation/OrderByNavigation';

export default function ListCentersSearch({
  results,
  searchObject,
  setSearchObjet,
  linksRoute,
  className,
}) {
  const initialManagementCriteria = {
    state: 0,
    criterias: [
      {
        position: 1,
        icons: [
          [puntuationIcon, descIcon],
          [puntuationIcon, ascIcon],
        ],
        text: ['Puntuación descendente', 'Puntuación ascendente'],
        value: ['puntuacion_media descendente', 'puntuacion_media ascendente'],
      },
      {
        position: 1,
        icons: [
          [priceIcon, descIcon],
          [priceIcon, ascIcon],
        ],
        text: ['Precio descendente', 'Precio ascendente'],
        value: ['precio_minimo descendente', 'precio_minimo ascendente'],
      },
      {
        position: 1,
        icons: [[aToZAlfabeticIcon], [zToAAlfabeticIcon]],
        text: ['Alfabetico', 'Alfabetico inverso'],
        value: ['centros.nombre ascendente', 'centros.nombre descendente'],
      },
    ],
  };

  return results.length !== 0 ? (
    <article className={className + ' listCenters'}>
      <OrderByNavigation
        searchObject={searchObject}
        setSearchObject={setSearchObjet}
        initialManagementCriteria={initialManagementCriteria}
      />
      <ul>
        {results.map((center) => (
          <CenterCard
            key={center.id}
            center={center}
            linksRoute={linksRoute}
            searchObject={searchObject}
          />
        ))}
      </ul>
      <div className="presentationEnd" />
    </article>
  ) : (
    <Spinner />
  );
}
