import { useState } from 'react';
import './StarsSelector.css';
import fullStart from '../../assets/stars/bxs-star.svg';
import emptyStart from '../../assets/stars/bx-star.svg';

export default function StarsSelector({ newSearchObject, setNewSearchObject }) {
  const [starsButtons, setStarsButtons] = useState(Array(5).fill(false));

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
            <img src={button ? fullStart : emptyStart} alt="start" />
          </button>
        );
      })}
    </div>
  );
}
