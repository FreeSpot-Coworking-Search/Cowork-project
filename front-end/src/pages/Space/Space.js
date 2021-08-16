import './Space.css';

import { useState } from 'react';
import useFullView from '../../hooks/useFullView';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import useSpace from '../../hooks/useSpace';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import submitIcon from '../../assets/icons/check-solid.png';

export default function Space({ className }) {
    const [fullView] = useFullView();
    const [visualization, setVisualization] = useState('presentation');

    const query = RetrieveQueryParams(['id', 'fecha_entrada', 'fecha_salida']);

    const [reservation, setReservation] = useState(query);
    const [spaceData, loading] = useSpace(query.id);

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const genericButton = {
        action: () => setVisualization(visualization === 'presentation'),
        icon: locationIcon,
        text: 'Mensaje ayuda',
    };
    const submitButton = {
        action: () => console.log('submit'),
        icon: submitIcon,
        text: 'Reservar',
    };

    let Links = [];

    switch (visualization) {
        case 'presentation':
            if (fullView) Links = [submitButton, genericButton, genericButton];
            else
                Links = [
                    submitButton,
                    genericButton,
                    genericButton,
                    genericButton,
                ];
            break;
        case 2:
            if (fullView) Links = [submitButton, genericButton, genericButton];
            else
                Links = [
                    submitButton,
                    genericButton,
                    genericButton,
                    genericButton,
                ];

            break;
        case 3:
            if (fullView) Links = [submitButton, genericButton, genericButton];
            else
                Links = [
                    submitButton,
                    genericButton,
                    genericButton,
                    genericButton,
                ];
            break;

        default:
            break;
    }

    // *********
    // ** JSX **
    // *********

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            {fullView ? (
                <div className={className + ' mainSectionFullView'}>
                    <SpacePresentation
                        className="mainSectionLeftArticle"
                        spaceData={spaceData}
                        reservation={reservation}
                        setReservation={setReservation}
                    />

                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    ></MainNavigation>
                    {visualization === 'presentation' ? (
                        <div className="mainSectionRightArticle Borrame">
                            <p>2</p>
                        </div>
                    ) : (
                        <div className="mainSectionRightArticle Borrame">
                            <p>3</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={className + ' mainSectionSingleView'}>
                    {visualization === 'presentation' ? (
                        <SpacePresentation
                            className="mainSectionLeftArticle"
                            spaceData={spaceData}
                            reservation={reservation}
                            setReservation={setReservation}
                        />
                    ) : visualization === 2 ? (
                        <div className="mainSectionLeftArticle Borrame">
                            <p>2</p>
                        </div>
                    ) : (
                        <div className="mainSectionLeftArticle Borrame">
                            <p>3</p>
                        </div>
                    )}
                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    ></MainNavigation>
                </div>
            )}
        </>
    );
}
