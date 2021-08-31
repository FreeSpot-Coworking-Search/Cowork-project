import '../../css/presentation.css';
import './servicesPresentation.css';

import { useMemo, useState, lazy } from 'react';

import DisplaySelector from '../DisplaySelector/DisplaySelector';
import ServicesList from '../ServicesList/ServicesList';

import infoIcon from '../../assets/icons/bx-info-circle.svg';
import editIcon from '../../assets/icons/bx-edit-alt.svg';

const ModificationFormServices = lazy(() =>
  import('../Formularies/ModificationFormServices')
);

export default function ServicesPresentation({
  className,
  spaceData,
  reservation,
  setReservation,
}) {
  const [visualization, setVisualization] = useState('data');

  const visualizationsButtons = useMemo(() => {
    return spaceData.owner
      ? [
          {
            value: 'data',
            icon: infoIcon,
            text: 'visualizar datos',
          },
          {
            value: 'edit',
            icon: editIcon,
            text: 'modificar datos',
          },
        ]
      : [];
  }, [spaceData]);

  const visualizations = {
    data: (
      <ServicesList
        spaceData={spaceData}
        reservation={reservation}
        setReservation={setReservation}
      />
    ),
    edit: <ModificationFormServices spaceData={spaceData} />,
  };

  return (
    <article className={className + ' presentation'}>
      <DisplaySelector
        visualizationsButtons={visualizationsButtons}
        setVisualization={setVisualization}
        visualization={visualization}
      />
      {visualizations[visualization]}
    </article>
  );
}
