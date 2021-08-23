import '../../css/presentation.css';
import './spacePresentation.css';
import { useState } from 'react';

import { SpaceData } from '../SpaceData/SpaceData';
import ModificationFormSpace from '../Formularies/ModificationFormSpace';
import DisplaySelector from '../DisplaySelector/DisplaySelector';

import infoIcon from '../../assets/icons/bx-info-circle.svg';
import editIcon from '../../assets/icons/bx-edit-alt.svg';

export default function SpacePresentation({
    spaceData,
    className,
    reservation,
    setReservation,
}) {
    const [visualization, setVisualization] = useState('data');

    const visualizationsButtons = spaceData.owner
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

    const visualizations = {
        data: (
            <SpaceData
                spaceData={spaceData}
                reservation={reservation}
                setReservation={setReservation}
            />
        ),
        edit: <ModificationFormSpace spaceData={spaceData} />,
    };

    return (
        <article className={className + ' presentation'}>
            <h3>{`${spaceData.nombre} - ${spaceData.tipo} `}</h3>
            <DisplaySelector
                visualizationsButtons={visualizationsButtons}
                setVisualization={setVisualization}
                visualization={visualization}
            />
            {visualizations[visualization]}
        </article>
    );
}
