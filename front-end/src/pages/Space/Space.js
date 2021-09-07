import './Space.css';

import { useState, lazy } from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import SpacePresentation from '../../components/SpacePresentation/SpacePresentation';

import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import RetrieveQueryParams from '../../helpers/RetriveQueryParams';

import useFullView from '../../hooks/useFullView';
import useFetch from '../../hooks/useFetch';
import useDialog from '../../hooks/useDialog';

import submitIcon from '../../assets/icons/check-solid.png';
import centersIcon from '../../assets/icons/centers-solid.png';
import spaceIcon from '../../assets/icons/bxs-home.svg';
import servicesIcon from '../../assets/icons/plus-solid.png';
import imageIcon from '../../assets/icons/image-solid.png';

import { useParams } from 'react-router-dom';

const ConfirmationDialog = lazy(() =>
    import('../../components/SpacePresentation/ConfirmationDialog')
);
const ServicesPresentation = lazy(() =>
    import('../../components/ServicesPresentation/ServicesPresentation')
);
const PhotosPresentation = lazy(() =>
    import('../../components/PhotosPresentation/PhotosPresentation')
);

export default function Space({ className }) {
    const { spaceId } = useParams();
    const [fullView] = useFullView();
    const query = RetrieveQueryParams(['fecha_entrada', 'fecha_salida']);
    const [spaceData, setSpace, loading] = useFetch('spaces', spaceId);
    const owner = spaceData?.owner;
    const [visualization, setVisualization] = useState('space');
    const [reservation, setReservation] = useState(query);
    const { open, handleClickOpen, handleClose } = useDialog();
    console.log(spaceData);

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************
    const submitButton = {
        action: handleClickOpen,
        icon: submitIcon,
        text: 'Reservar',
    };

    const photosVisualizationBtn = {
        action: () => setVisualization('photos'),
        icon: imageIcon,
        text: 'Cambiar fotos',
    };

    const spaceVisualizationBtn = {
        action: () => setVisualization('space'),
        icon: spaceIcon,
        text: 'Informacion espacio',
    };

    const centerVisualizationBtn = {
        action: () => setVisualization('center'),
        icon: centersIcon,
        text: 'Informacion centro',
    };

    const servicesVisualizationBtn = {
        action: () => setVisualization('services'),
        icon: servicesIcon,
        text: 'Informacion servicios',
    };

    const firstButton = !owner ? submitButton : photosVisualizationBtn;

    let Links = [];

    switch (visualization) {
        case 'space':
            if (fullView) Links = [firstButton, centerVisualizationBtn];
            else
                Links = [
                    firstButton,
                    centerVisualizationBtn,
                    servicesVisualizationBtn,
                ];
            break;
        case 'center':
            if (fullView) Links = [firstButton, servicesVisualizationBtn];
            else
                Links = [
                    firstButton,
                    spaceVisualizationBtn,
                    servicesVisualizationBtn,
                ];

            break;
        case 'services':
            if (fullView) Links = [firstButton, centerVisualizationBtn];
            else
                Links = [
                    firstButton,
                    spaceVisualizationBtn,
                    centerVisualizationBtn,
                ];

            break;

        case 'photos':
            if (fullView) Links = [firstButton, servicesVisualizationBtn];
            else
                Links = [
                    firstButton,
                    spaceVisualizationBtn,
                    servicesVisualizationBtn,
                ];
            break;

        default:
            break;
    }

    // *********
    // ** JSX **
    // *********

    const fullViewJSX = {
        space: (
            <main className={className + ' mainSectionFullView'}>
                <SpacePresentation
                    className="mainSectionLeftArticle"
                    spaceData={spaceData}
                    reservation={reservation}
                    setReservation={setReservation}
                    setSpace={setSpace}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>

                <ServicesPresentation
                    className="mainSectionRightArticle"
                    spaceData={spaceData}
                    reservation={reservation}
                    setReservation={setReservation}
                />
            </main>
        ),
        center: (
            <main className={className + ' mainSectionFullView'}>
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

                <article className="mainSectionRightArticle Borrame">
                    <p>centro</p>
                </article>
            </main>
        ),
        services: (
            <main className={className + ' mainSectionFullView'}>
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

                <ServicesPresentation
                    className="mainSectionRightArticle"
                    spaceData={spaceData}
                    reservation={reservation}
                    setReservation={setReservation}
                />
            </main>
        ),
        photos: (
            <main className={className + ' mainSectionFullView'}>
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

                <PhotosPresentation
                    className="mainSectionRightArticle"
                    data={spaceData}
                />
            </main>
        ),
    };

    const singleViewJSX = {
        space: (
            <SpacePresentation
                className="mainSectionLeftArticle"
                spaceData={spaceData}
                reservation={reservation}
                setReservation={setReservation}
            />
        ),
        center: (
            <article className="mainSectionLeftArticle Borrame">
                <p>centro</p>
            </article>
        ),
        services: (
            <ServicesPresentation
                className="mainSectionLeftArticle"
                spaceData={spaceData}
                reservation={reservation}
                setReservation={setReservation}
            />
        ),
        photos: (
            <PhotosPresentation
                className="mainSectionLeftArticle"
                data={spaceData}
            />
        ),
    };

    const responsiveChangeJSX = {
        true: <>{fullViewJSX[visualization]}</>,
        false: (
            <main className={className + ' mainSectionSingleView'}>
                {singleViewJSX[visualization]}
                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
            </main>
        ),
    };

    return loading ? (
        <CircularProgress />
    ) : (
        <>
            {responsiveChangeJSX[fullView]}
            <CircularSuspense>
                <Dialog open={open} onClose={handleClose}>
                    <ConfirmationDialog
                        reservation={reservation}
                        handleClose={handleClose}
                        spaceData={spaceData}
                    />
                </Dialog>
            </CircularSuspense>
        </>
    );
}
