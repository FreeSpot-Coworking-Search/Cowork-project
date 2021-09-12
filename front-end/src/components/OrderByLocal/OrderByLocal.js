import { useState } from 'react';
import './OrderByLocal.css';

import orderBy from '../../helpers/orderBy';

export default function OrderByLocal({
  state,
  setState,
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
  return (
    <nav className="orderByNavigator">
      <ul>
        {managementCriteria.criterias.map((criteria, index) => {
          return criteria.position === 0 ? (
            <li key={criteria.text[0]}>
              <button
                key={criteria.text[0]}
                onClick={() => {
                  setCriteria(index);
                  setState({
                    scores: orderBy(state.scores, criteria.order[0]),
                  });
                }}
              >
                {criteria.icons[0].map((icon) => (
                  <img src={icon} alt="icono" key={icon} />
                ))}
              </button>
            </li>
          ) : (
            <li key={criteria.text[1]}>
              <button
                key={criteria.text[1]}
                onClick={() => {
                  setCriteria(index);
                  setState({
                    scores: orderBy(state.scores, criteria.order[1]),
                  });
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
