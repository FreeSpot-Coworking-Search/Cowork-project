import { useState, lazy } from 'react';
import { CircularProgress } from '@material-ui/core';

import useFullView from '../../hooks/useFullView';
import useFetch from '../../hooks/useFetch';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ReservesPresentation from '../../components/ReservesPresentation/ReservesPresentation';

import {
    ListIcon,
    CleaningIcon,
    IncidentsIcon,
} from '../../components/Icons/Icons';

const IncidenceForm = lazy(() =>
    import('../../components/Formularies/IncidenceForm')
);

export default function MyCenter({ className }) {
    const [fullView] = useFullView();
    const [visualization, setVisualization] = useState('reserves');

    const [reservations, setReservations, loading] = useFetch(
        'reserves/allreserves/',
        'foo'
    );
    console.log(reservations);

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const listBtn = {
        action: () => setVisualization('space'),
        icon: <ListIcon className="mainNavigationButtonIcon" />,
        text: 'Ver espacio',
    };

    const spaceBtn = {
        action: () => setVisualization('reserves'),
        icon: <ListIcon className="mainNavigationButtonIcon" />,
        text: 'Ver reservas',
    };

    const incidenceBtn = {
        action: () => setVisualization('incidence'),
        icon: <IncidentsIcon className="mainNavigationButtonIcon" />,
        text: 'Nueva incidencia',
    };

    const cleaningBtn = {
        action: () => alert('cambialo!!'),
        icon: <CleaningIcon className="mainNavigationButtonIcon" />,
        text: 'Solicitar limpieza',
    };

    let Links = [];
    switch (visualization) {
        case 'space':
            Links = [spaceBtn, cleaningBtn, incidenceBtn];
            break;

        default:
            Links = [listBtn, cleaningBtn, incidenceBtn];
            break;
    }

    // *********
    // ** JSX **
    // *********

    const fullViewJSX = {
        reserves: (
            <div className={className + ' mainSectionFullView'}>
                <ReservesPresentation
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    fullView={fullView}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <div className="mainSectionRightArticle Borrame">
                    <p>space</p>
                </div>
            </div>
        ),
        space: (
            <div className={className + ' mainSectionFullView'}>
                <div className="mainSectionLeftArticle Borrame">
                    <p>1</p>
                </div>

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <div className="mainSectionRightArticle Borrame">
                    <p>2</p>
                </div>
            </div>
        ),
        incidence: (
            <div className={className + ' mainSectionFullView'}>
                <ReservesPresentation
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    fullView={fullView}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <IncidenceForm
                    className="mainSectionRightArticle"
                    reservations={reservations}
                    setReservations={setReservations}
                />
            </div>
        ),
    };

    const singleViewJSX = {
        reserves: (
            <ReservesPresentation
                className="mainSectionLeftArticle"
                reservations={reservations}
                fullView={fullView}
            />
        ),
        space: (
            <div className="mainSectionLeftArticle Borrame">
                <p>space</p>
            </div>
        ),
        incidence: (
            <IncidenceForm
                className="mainSectionLeftArticle"
                reservations={reservations}
                setReservations={setReservations}
            />
        ),
    };

    const responsiveChangeJSX = {
        true: <>{fullViewJSX[visualization]}</>,
        false: (
            <div className={className + ' mainSectionSingleView'}>
                {singleViewJSX[visualization]}
                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
            </div>
        ),
    };

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <>{responsiveChangeJSX[fullView]}</>
            )}
        </>
    );
}
