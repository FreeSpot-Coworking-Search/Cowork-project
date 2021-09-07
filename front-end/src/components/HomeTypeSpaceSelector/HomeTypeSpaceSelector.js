import { useState } from 'react';
import './HomeTypeSpaceSelector.css';

export default function HomeTypeSpaceSelector({
  searchObject,
  setSearchObject,
}) {
  const [state, setState] = useState(searchObject.tipo);

  const onClick = (e, value) => {
    e.preventDefault();
    if (value === state) {
      setState('');
      setSearchObject({
        ...searchObject,
        tipo: '',
      });
    } else {
      setState(value);
      setSearchObject({
        ...searchObject,
        tipo: value,
      });
    }
  };

  return (
    <nav className="homeTypeSpaceSelector">
      <button
        onClick={(e) => onClick(e, 'Mesa Flex')}
        className={
          state === 'Mesa Flex' ? 'clickedHomeTypeSpace' : 'homeTypeSpace'
        }
      >
        Mesa Flex
      </button>
      <button
        onClick={(e) => onClick(e, 'Mesa Fija')}
        className={
          state === 'Mesa Fija' ? 'clickedHomeTypeSpace' : 'homeTypeSpace'
        }
      >
        Mesa Fija
      </button>
      <button
        onClick={(e) => onClick(e, 'Despacho')}
        className={
          state === 'Despacho' ? 'clickedHomeTypeSpace' : 'homeTypeSpace'
        }
      >
        Despacho
      </button>
      <button
        onClick={(e) => onClick(e, 'Sala de reuniones')}
        className={
          state === 'Sala de reuniones'
            ? 'clickedHomeTypeSpace'
            : 'homeTypeSpace'
        }
      >
        Sala de reuniones
      </button>
    </nav>
  );
}
