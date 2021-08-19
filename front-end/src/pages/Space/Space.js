import './Space.css';

import { useState, lazy } from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';
import ServicesPresentation from '../../components/ServicesPresentation/ServicesPresentation';
import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import RetrieveQueryParams from '../../helpers/RetriveQueryParams';

import useFullView from '../../hooks/useFullView';
import useSpace from '../../hooks/useSpace';
import useDialog from '../../hooks/useDialog';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import submitIcon from '../../assets/icons/check-solid.png';

const ConfirmationDialog = lazy(() => import('./ConfirmationDialog'));

export default function Space({ className }) {
    const [fullView] = useFullView();
    const [visualization, setVisualization] = useState('presentation');

    const query = RetrieveQueryParams(['id', 'fecha_entrada', 'fecha_salida']);
    const [spaceData, loading] = useSpace(query.id);

    const [reservation, setReservation] = useState(query);
    const { open, handleClickOpen, handleClose } = useDialog();

    const servicesGroup = [
        {
            name: 'servicios extra',
            data: spaceData?.servicios_extra,
            type: 'checkbox',
        },
        {
            name: 'servicios incluidos',
            data: spaceData?.servicios,
            type: 'standar',
        },
    ];
    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const genericButton = {
        action: () => setVisualization(visualization === 'presentation'),
        icon: locationIcon,
        text: 'Mensaje ayuda',
    };
    const submitButton = {
        action: handleClickOpen,
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

                    <CircularSuspense>
                        <Dialog open={open} onClose={handleClose}>
                            <ConfirmationDialog
                                reservation={reservation}
                                handleClose={handleClose}
                                spaceData={spaceData}
                            />
                        </Dialog>
                    </CircularSuspense>

                    {visualization === 'presentation' ? (
                        <ServicesPresentation
                            className="mainSectionRightArticle"
                            listsGroup={servicesGroup}
                            reservation={reservation}
                            setReservation={setReservation}
                        />
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
                        <ServicesPresentation
                            className="mainSectionRightArticle"
                            listsGroup={servicesGroup}
                            reservation={reservation}
                            setReservation={setReservation}
                        />
                    ) : (
                        <div className="mainSectionLeftArticle Borrame">
                            <p>3</p>
                        </div>
                    )}
                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    ></MainNavigation>
                    <CircularSuspense>
                        <Dialog open={open} onClose={handleClose}>
                            <ConfirmationDialog
                                reservation={reservation}
                                handleClose={handleClose}
                                spaceData={spaceData}
                            />
                        </Dialog>
                    </CircularSuspense>
                </div>
            )}
        </>
    );
}
