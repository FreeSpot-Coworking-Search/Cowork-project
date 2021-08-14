import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export default function DoubleRangeInput({
  min,
  max,
  newSearchObject,
  setNewSearchObject,
}) {
  const [state, setState] = useState({
    min: min,
    max: max,
  });

  const onChange = (value) => {
    setState(value);
    setNewSearchObject({
      ...newSearchObject,
      precio_maximo: value.max,
      precio_minimo: value.min,
    });
  };

  return (
    <InputRange
      maxValue={max ? max : 100}
      minValue={min ? min : 0}
      value={state}
      onChange={(value) => onChange(value)}
    />
  );
}
