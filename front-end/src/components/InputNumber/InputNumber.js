import React, { useState } from 'react';
import './InputNumber.css';

export default function InputNumber({
  min,
  max,
  prop,
  newSearchObject,
  setNewSearchObject,
}) {
  const [state, setState] = useState(
    newSearchObject[prop] ? Number(newSearchObject[prop]) : 0
  );

  const increment = () => {
    if (typeof max === 'number' && state >= max) return;
    setState(state + 1);
    setNewSearchObject({
      ...newSearchObject,
      [prop]: state + 1,
    });
  };

  const decrement = () => {
    if (typeof max === 'number' && state <= min) return;
    setState(state - 1);
    setNewSearchObject({
      ...newSearchObject,
      [prop]: state - 1,
    });
  };

  return (
    <div className="input-number">
      <button type="button" onClick={decrement}>
        &minus;
      </button>
      <span>{state}</span>
      <button type="button" onClick={increment}>
        &#43;
      </button>
    </div>
  );
}
