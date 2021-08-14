import './ListSpacesSearch.css';
import SpaceCard from '../SpaceCard/SpaceCard';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import Spinner from '../Spinner/Spinner';
import OrderByNavigation from '../OrderByNavigationn/OrderByNavigation';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';

export default function ListSpacesSearch({
  results,
  searchObject,
  setSearchObject,
  className,
}) {
  let listSpaces = {};
  for (const result of results) {
    if (Object.hasOwnProperty.call(listSpaces, result.tipo)) {
      listSpaces[result.tipo].push(result);
    } else {
      listSpaces = { ...listSpaces, [result.tipo]: [result] };
    }
  }
  console.log(results);

  const initialManagementCriteria = {
    state: 0,
    criterias: [
      {
        position: true,
        icons: [
          [priceIcon, descIcon],
          [priceIcon, ascIcon],
        ],
        text: ['Precio descendente', 'Precio ascendente'],
        value: ['precio descendente', 'precio ascendente'],
      },
      {
        position: true,
        icons: [
          [calendarIcon, descIcon],
          [calendarIcon, ascIcon],
        ],
        text: ['Reserva minima descendente', 'Reserva minima ascendente'],
        value: ['reserva_minima descendente', 'reserva_minima ascendente'],
      },
      {
        position: true,
        icons: [
          [personIcon, descIcon],
          [personIcon, ascIcon],
        ],
        text: ['Capacidad descendente', 'Capacidad minima ascendente'],
        value: ['capacidad_maxima descendente', 'capacidad_maxima ascendente'],
      },
    ],
  };

  return (
    <article className={className + ' listSpaces'}>
      <OrderByNavigation
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        initialManagementCriteria={initialManagementCriteria}
      />
      <ul>
        {Object.keys(listSpaces).map((type) => {
          return (
            <li key={type}>
              <h3 className="listSpacesType">{spaceTypeToPlural(type)}</h3>
              <ul>
                {listSpaces[type].map((space) => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    linksRoute="/space"
                    searchObject={searchObject}
                    name={space.id}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="orderByEnd" />
    </article>
  );
}
