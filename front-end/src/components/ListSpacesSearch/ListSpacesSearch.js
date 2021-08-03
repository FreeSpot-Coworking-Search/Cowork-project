import './ListSpacesSearch.css';
import SpaceCard from '../SpaceCard/SpaceCard';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import Spinner from '../Spinner/Spinner';
import OrderByNavigation from '../OrderByNavigationn/OrderByNavigation';

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
      console.log('hola');
    } else {
      listSpaces = { ...listSpaces, [result.tipo]: [result] };
    }
  }

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
    ],
  };

  console.log(results);
  console.log(listSpaces);
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
              <h3 className="listSpacesType">{type}</h3>
              <ul>
                {listSpaces[type].map((space) => (
                  <SpaceCard
                    key={space.id}
                    space={space}
                    linksRoute="/space"
                    searchObject={searchObject}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </article>
  );
  //   (<ul>
  //    {Object.keys(listSpaces).map((tipo, index) => {
  //       return <li>{tipo}</li>;
  //     })}
  // // </ul>
  // );
  // listSpaces.length !== 0 ? (
  //   <ul className={className + ' listSpaces'}>
  //     {results.map((space) => (
  // <SpaceCard
  //   key={space.id}
  //   space={space}
  //   linksRoute="/space"
  //   searchObject={searchObject}
  // />
  //     ))}
  //   </ul>
  //   ) : (
  //     <Spinner />
}
