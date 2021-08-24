import './CenterPresentation.css';
import '../../css/presentation.css';
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

export default function CenterPresentation({
  centerId,
  center,
  loading,
  className,
}) {
  const [visualization, setVisualization] = useState('data');

  const visualizationsButtons = center.owner
    ? [
        { value: 'data', icon: infoIcon, text: 'Texto de ayuda', alert: 0 },
        { value: 'edit', icon: editIcon, text: 'Texto de ayuda', alert: 0 },
        {
          value: 'scores',
          icon: scoresIcon,
          text: 'Texto de ayuda',
          alert: 0,
        },
        {
          value: 'incidents',
          icon: incidentsIcon,
          text: 'Texto de ayuda',
          alert: incidentAlert(center),
        },
        {
          value: 'cleaning',
          icon: cleaningIcon,
          text: 'Texto de ayuda',
          alert: cleaningAlert(center),
        },
      ]
    : [
        { value: 'data', text: 'Texto de ayuda', icon: infoIcon, alert: false },
        {
          value: 'scores',
          text: 'Texto de ayuda',
          icon: scoresIcon,
          alert: false,
        },
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

const incidentAlert = (center) => {
  const result = center.espacios.reduce((number, space) => {
    return (number += space.incidencias.length);
  }, 0);
  return result;
};
const cleaningAlert = (center) => {
  const result = center.espacios.filter((space) => space.estado === 1);
  return result.length;
};
