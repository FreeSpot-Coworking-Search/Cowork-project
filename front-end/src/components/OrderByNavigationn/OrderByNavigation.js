import { useState } from 'react';
import './OrderByNavigation.css';

export default function OrderByNavigation({
  searchObject,
  setSearchObject,
  initialManagementCriteria,
}) {
  const [managementCriteria, setManagementCriteria] = useState(
    initialManagementCriteria
  );

  const setCriteria = (index) => {
    const newManagementCriteria = {
      ...managementCriteria,
    };
    newManagementCriteria.criterias[index].position =
      newManagementCriteria.criterias[index].position === 0 ? 1 : 0;
    newManagementCriteria.state = index;
    setManagementCriteria(newManagementCriteria);
  };
  const updateSearchObject = (value) => {
    const order = value.split(' ');
    setSearchObject({
      ...searchObject,
      ordenado_por: order[0],
      orden: order[1],
    });
  };
  return (
    <nav className="orderByNavigator">
      <ul>
        {managementCriteria.criterias.map((criteria, index) => {
          return criteria.position === 0 ? (
            <li key={criteria}>
              <button
                key={criteria}
                onClick={() => {
                  setCriteria(index);
                  updateSearchObject(criteria.value[criteria.position]);
                }}
              >
                {criteria.icons[0].map((icon) => (
                  <img src={icon} alt="icono" key={icon} />
                ))}
              </button>
            </li>
          ) : (
            <li key={criteria}>
              <button
                key={criteria}
                onClick={() => {
                  setCriteria(index);
                  updateSearchObject(criteria.value[criteria.position]);
                }}
              >
                {criteria.icons[1].map((icon) => (
                  <img src={icon} alt="icono" key={icon} />
                ))}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
