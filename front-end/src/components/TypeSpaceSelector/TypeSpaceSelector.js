import { useState } from 'react';
import './TypeSpaceSelector.css';

export default function TypeSpaceSelector({
  newSearchObject,
  setNewSearchObject,
}) {
  const [state, setState] = useState(newSearchObject.tipo);

  const onClick = (e, value) => {
    e.preventDefault();
    if (value === state) {
      setState('');
      setNewSearchObject({
        ...newSearchObject,
        tipo: '',
      });
    } else {
      setState(value);
      setNewSearchObject({
        ...newSearchObject,
        tipo: value,
      });
    }
  };

  return (
    <nav className="typeSpaceSelector">
      <button
        onClick={(e) => onClick(e, 'Mesa Flex')}
        className={state === 'Mesa Flex' ? 'clickedTypeSpace' : 'typeSpace'}
      >
        Mesa Flex
      </button>
      <button
        onClick={(e) => onClick(e, 'Mesa Fija')}
        className={state === 'Mesa Fija' ? 'clickedTypeSpace' : 'typeSpace'}
      >
        Mesa Fija
      </button>
      <button
        onClick={(e) => onClick(e, 'Despacho')}
        className={state === 'Despacho' ? 'clickedTypeSpace' : 'typeSpace'}
      >
        Despacho
      </button>
      <button
        onClick={(e) => onClick(e, 'Sala de reuniones')}
        className={
          state === 'Sala de reuniones' ? 'clickedTypeSpace' : 'typeSpace'
        }
      >
        Sala de reuniones
      </button>
    </nav>
  );
}
