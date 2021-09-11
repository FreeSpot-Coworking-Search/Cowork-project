import './ScoreList.css';
import '../../css/presentation.css';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
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
        order: [
          'puntuacion_usuario descendente',
          'puntuacion_usuario ascendente',
        ],
      },
      {
        position: 0,
        icons: [
          [calendarIcon, descIcon],
          [calendarIcon, ascIcon],
        ],
        text: ['Fecha descendente', 'Fecha ascendente'],
        order: ['fecha_inicio descendente', 'fecha_inicio ascendente'],
      },
    ],
  };
  console.log(state);

  return scores ? (
    <div className={className + ' presentation presentationList'}>
      <h3>Valoraciones</h3>
      <OrderByLocal
        state={state}
        setState={setState}
        initialManagementCriteria={initialManagementCriteria}
      />
      <ul>
        {state.scores.map((score) => (
          <ScoreCard score={score} />
        ))}
      </ul>
      <div className="presentationEnd" />
    </div>
  ) : (
    <Spinner />
  );
}
