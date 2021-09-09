import './CenterPresentation.css';
import '../../css/presentation.css';
import Spinner from '../Spinner/Spinner';
import ScoreList from '../ScoreList/ScoreList';
import { useState } from 'react';
import infoIcon from '../../assets/icons/bx-info-circle.svg';
import editIcon from '../../assets/icons/bx-edit-alt.svg';
import photoIcon from '../../assets/icons/bx-camera.svg';
import scoresIcon from '../../assets/icons/bxs-star.svg';
import DisplaySelector from '../DisplaySelector/DisplaySelector';
import CenterDataList from '../CenterDataList/CenterDataList';
import ModificationFormCenter from '../Formularies/ModificationFormCenter';
import IncidentList from '../IncidentList/IncidentList';
import CleaningList from '../CleaningList/CleaningList';
import CenterPhotosPresentation from '../CenterPhotosPresentation/CenterPhotosPresentation';

export default function CenterPresentation({
  center,
  loading,
  setCenter,
  className,
  fullView,
}) {
  const [visualization, setVisualization] = useState('data');
  const visualizationsButtons = center.owner
    ? [
        { value: 'data', icon: infoIcon, text: 'Info', alert: 0 },
        { value: 'edit', icon: editIcon, text: 'Editar', alert: 0 },
        { value: 'photos', icon: photoIcon, text: 'Fotos', alert: 0 },
      ]
    : [
        { value: 'data', text: 'Info', icon: infoIcon, alert: false },
        {
          value: 'scores',
          text: 'Puntuaciones',
          icon: scoresIcon,
          alert: false,
        },
      ];

  let visualizations;

  if (!loading) {
    visualizations = {
      data: (
        <CenterDataList center={center.info} className="presentationSlide" />
      ),
      scores: <ScoreList scores={center.valoraciones} />,
      edit: (
        <ModificationFormCenter center={center.info} setCenter={setCenter} />
      ),
      photos: (
        <CenterPhotosPresentation
          id={center.info.id}
          imagenes={center.info.imagenes}
          setCenter={setCenter}
          fullView={fullView}
        />
      ),
      incidents: <IncidentList incidents={center.espacios} />,
      cleaning: <CleaningList spaces={center.espacios} />,
    };
  }

  return loading ? (
    <Spinner />
  ) : (
    <article className={className + ' presentation centerPresentation'}>
      <DisplaySelector
        visualizationsButtons={visualizationsButtons}
        setVisualization={setVisualization}
        visualization={visualization}
      />
      {visualizations[visualization]}
    </article>
  );
}
