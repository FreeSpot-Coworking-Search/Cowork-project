import '../../css/presentation.css';
import './spacePresentation.css';
import { useState, useMemo, lazy } from 'react';

import { SpaceData } from '../SpaceData/SpaceData';
import DisplaySelector from '../DisplaySelector/DisplaySelector';

import infoIcon from '../../assets/icons/bx-info-circle.svg';
import editIcon from '../../assets/icons/bx-edit-alt.svg';
import photoIcon from '../../assets/icons/bx-camera.svg';
import servicesIcon from '../../assets/icons/bxs-drink.svg';
import PhotosPresentation from '../PhotosPresentation/PhotosPresentation';

const ModificationFormServices = lazy(() =>
  import('../Formularies/ModificationFormServices')
);
const ModificationFormSpace = lazy(() =>
  import('../Formularies/ModificationFormSpace')
);

export default function SpacePresentation({
  spaceData,
  className,
  reservation,
  setReservation,
  setSpace,
}) {
  const [visualization, setVisualization] = useState('data');

  const visualizationsButtons = useMemo(() => {
    return spaceData.owner
      ? [
          {
            value: 'data',
            icon: infoIcon,
            text: 'Visualizar datos',
          },
          {
            value: 'edit',
            icon: editIcon,
            text: 'Modificar datos',
          },
          {
            value: 'photo',
            icon: photoIcon,
            text: 'Modificar fotos',
          },
          {
            value: 'services',
            icon: servicesIcon,
            text: 'Modificar servicios',
          },
        ]
      : [];
  }, [spaceData]);

  const visualizations = {
    data: (
      <SpaceData
        spaceData={spaceData}
        reservation={reservation}
        setReservation={setReservation}
      />
    ),
    edit: <ModificationFormSpace spaceData={spaceData} setSpace={setSpace} />,
    photo: <PhotosPresentation data={spaceData} setSpace={setSpace} />,
    services: (
      <ModificationFormServices spaceData={spaceData} setSpace={setSpace} />
    ),
  };

  return (
    <article className={className + ' presentation'}>
      <DisplaySelector
        visualizationsButtons={visualizationsButtons}
        setVisualization={setVisualization}
        visualization={visualization}
      />
      <div className="presentationLimit" />
      {visualizations[visualization]}
      <div className="presentationLimit" />
    </article>
  );
}
