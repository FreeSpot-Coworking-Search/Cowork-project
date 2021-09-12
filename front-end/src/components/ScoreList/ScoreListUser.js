import './ScoreList.css';
import '../../css/presentation.css';
import { useEffect, useState } from 'react';
import { isPrevious } from '../../helpers/dateHelper';

import Spinner from '../Spinner/Spinner';
import OrderByLocal from '../OrderByLocal/OrderByLocal';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import starIcon from '../../assets/icons/bxs-star.svg';
import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import ScoreCard from '../ScoreCard/ScoreCardUser';

export default function ScoreList({ reservations: scores, className }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    const scoreList = scores?.filter((scores) =>
      isPrevious(scores?.fecha_inicio)
    );
    setState({ scores: scoreList });
  }, [scores]);

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
  return state ? (
    <div className={className + ' presentation  presentationList'}>
      <h3>Valoraciones</h3>
      {/* <OrderByLocal
        state={state}
        setState={setState}
        initialManagementCriteria={initialManagementCriteria}
      /> */}

      <div className="presentationStart" />
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
