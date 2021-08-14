import './CenterPresentation.css';
import '../../css/presentation.css';
import useCenter from '../../hooks/useCenter';
import Spinner from '../Spinner/Spinner';
import ScoreList from '../ScoreList/ScoreList';
import { useState } from 'react';
import infoIcon from '../../assets/icons/bx-info-circle.svg';
import editIcon from '../../assets/icons/bx-edit-alt.svg';
import scoresIcon from '../../assets/icons/bxs-star.svg';
import incidentsIcon from '../../assets/icons/bx-message-square-error.svg';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import DisplaySelector from '../DisplaySelector/DisplaySelector';
import CenterDataList from '../CenterDataList/CenterDataList';
import ModificationFormCenter from '../Formularies/ModificationFormCenter';
import IncidentList from '../IncidentList/IncidentList';
import CleaningList from '../CleaningList/CleaningList';

export default function CenterPresentation({ centerId, className }) {
  const [center, loading] = useCenter(centerId);
  const [visualization, setVisualization] = useState('data');
  console.log(center);
  const visualizationsButtons = center.owner
    ? [
        { value: 'data', icon: infoIcon },
        { value: 'edit', icon: editIcon },
        { value: 'scores', icon: scoresIcon },
        { value: 'incidents', icon: incidentsIcon },
        { value: 'cleaning', icon: cleaningIcon },
      ]
    : [
        { value: 'data', icon: infoIcon },
        { value: 'scores', icon: scoresIcon },
      ];

  const visualizations = {
    data: <CenterDataList center={center.info} className="presentationSlide" />,
    scores: <ScoreList scores={center.valoraciones} />,
    edit: <ModificationFormCenter center={center.info} />,
    incidents: <IncidentList incidents={center.espacios} />,
    cleaning: <CleaningList spaces={center.espacios} />,
  };

  return loading ? (
    <Spinner />
  ) : (
    <article className={className + ' presentation centerPresentation'}>
      <DisplaySelector
        visualizationsButtons={visualizationsButtons}
        setVisualization={setVisualization}
        visualization={visualization}
      />
      <h3 className="presentationName">{center.info.nombre}</h3>
      {visualizations[visualization]}
    </article>
  );
}
