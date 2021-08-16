import './Space.css';

import { useState } from 'react';
import useFullView from '../../hooks/useFullView';
import RetrieveQueryParams from '../../helpers/RetriveQueryParams';
import useSpace from '../../hooks/useSpace';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';

export default function Space({ className }) {
    const [fullView] = useFullView();
    const [visualization, setVisualization] = useState(1);

    const [reservation, setReservation] = useState(
        RetrieveQueryParams(['id', 'fecha_entrada', 'fecha_salida'])
    );
    const [spaceData, loading] = useSpace(reservation.id);

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const genericButton = {
        action: () =>
            setVisualization(visualization === 3 ? 1 : visualization + 1),
        icon: locationIcon,
        text: 'Mensaje ayuda',
    };
    let Links = [];

    switch (visualization) {
        case 1:
            if (fullView) Links = [genericButton, genericButton, genericButton];
            else
                Links = [
                    genericButton,
                    genericButton,
                    genericButton,
                    genericButton,
                ];
            break;
        case 2:
            if (fullView) Links = [genericButton, genericButton, genericButton];
            else
                Links = [
                    genericButton,
                    genericButton,
                    genericButton,
                    genericButton,
                ];

            break;
        case 3:
            if (fullView) Links = [genericButton, genericButton, genericButton];
            else
                Links = [
                    genericButton,
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
                    {visualization === 2 ? (
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
                    {visualization === 1 ? (
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
