import './ScoreList.css';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import StarsDisplay from '../StarsDisplay/StarsDisplay';
import OrderByLocal from '../OrderByLocal/OrderByLocal';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import starIcon from '../../assets/icons/bxs-star.svg';
import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import ScoreCard from '../ScoreCard/ScoreCard';

export default function ScoreList({ scores, className }) {
  const [state, setState] = useState({ scores });

  const initialManagementCriteria = {
    state: 0,
    criterias: [
      {
        position: 0,
        icons: [
          [starIcon, descIcon],
          [starIcon, ascIcon],
        ],
        text: ['Puntuación descendente', 'Puntuación ascendente'],
        order: ['puntuacion_usuario desc', 'puntuacion_usuario asc'],
      },
      {
        position: 0,
        icons: [
          [calendarIcon, descIcon],
          [calendarIcon, ascIcon],
        ],
        text: ['Fecha descendente', 'Fecha ascendente'],
        order: ['fecha_inicio desc', 'fecha_inicio asc'],
      },
    ],
  };

  return scores ? (
    <div className={className + ' presentationList'}>
      <OrderByLocal
        state={state}
        setState={setState}
        initialManagementCriteria={initialManagementCriteria}
      />
      {/* <div className="orderByStart" /> */}
      <ul>
        {state.scores.map((score) => (
          <ScoreCard score={score} />
        ))}
      </ul>
      <div className="orderByEnd" />
    </div>
  ) : (
    <Spinner />
  );
}
