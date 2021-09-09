import { useState } from 'react';
import './StarsSelector.css';
import { FullStartIcon, EmptyStartIcon } from '../Icons/Icons';

export default function StarsSelector({ newSearchObject, setNewSearchObject }) {
  const [starsButtons, setStarsButtons] = useState(
    newSearchObject.puntuacion_minima
      ? Array(5).fill(false).fill(true, 0, newSearchObject.puntuacion_minima)
      : Array(5).fill(false)
  );
  const onClick = (e, value) => {
    e.preventDefault();
    const newStarsButtons = Array(5).fill(false);
    for (let i = 0; i < value; i++) {
      newStarsButtons[i] = true;
    }
    setStarsButtons(newStarsButtons);
    setNewSearchObject({
      ...newSearchObject,
      puntuacion_minima: value,
    });
  };

  return (
    <div className="starsSelector">
      {starsButtons.map((button, index) => {
        return (
          <button onClick={(e) => onClick(e, index + 1)} key={index}>
            {button ? <FullStartIcon /> : <EmptyStartIcon />}
          </button>
        );
      })}
    </div>
  );
}
