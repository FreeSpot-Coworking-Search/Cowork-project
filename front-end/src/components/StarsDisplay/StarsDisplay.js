import { useEffect, useState } from 'react';
import './StarsDisplay.css';
import { FullStartIcon, HalfStartIcon, EmptyStartIcon } from '../Icons/Icons';

export default function StarsDisplay({ puntuation, className }) {
  const [stars, setStars] = useState(Array(5).fill(0));

  useEffect(() => analyzeStars(), [puntuation]);

  const analyzeStars = () => {
    puntuation = Number(puntuation);
    const newStars = stars.map((star, index) => {
      if (puntuation >= index + 1) return 2;
      else if (puntuation >= index + 0.5) return 1;
      else return 0;
    });
    setStars(newStars);
  };

  const starsIcons = {
    0: (index) => <EmptyStartIcon key={index} className="StarDisplayStar" />,
    1: (index) => <HalfStartIcon key={index} className="StarDisplayStar" />,
    2: (index) => <FullStartIcon key={index} className="StarDisplayStar" />,
  };
  return (
    <div className={className}>
      {stars.map((imagen, index) => {
        return starsIcons[imagen](index);
      })}
    </div>
  );
}
