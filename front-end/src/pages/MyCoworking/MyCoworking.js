import { useState, lazy } from 'react';
import { CircularProgress } from '@material-ui/core';

import useFullView from '../../hooks/useFullView';
import useFetch from '../../hooks/useFetch';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ReservesPresentation from '../../components/ReservesPresentation/ReservesPresentation';
import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import {
    ListIcon,
    CalendarIcon,
    IncidentsIcon,
    StarIcon,
} from '../../components/Icons/Icons';

const ResevesCalendar = lazy(() =>
    import('../../components/ReservesCalendar/ReservesCalendar')
);
const IncidenceForm = lazy(() =>
    import('../../components/Formularies/IncidenceForm')
);
const ReservesScoreForm = lazy(() =>
    import('../../components/Formularies/ReservesScoreForm')
);
const ScoreList = lazy(() =>
    import('../../components/ScoreList/ScoreListUser')
);

export default function MyCenter({ className }) {
    const [fullView] = useFullView();
    const [visualization, setVisualization] = useState('reserves');

    const [refReservation, setRefReservation] = useState({});

    const [reservations, setReservations, loading] = useFetch(
        'reserves/allreserves/',
        'foo'
    );
    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const listBtn = {
        action: () => setVisualization('reserves'),
        icon: <ListIcon className="mainNavigationButtonIcon" />,
        text: 'Ver reservas',
    };

    const calendarBtn = {
        action: () => setVisualization('calendar'),
        icon: <CalendarIcon className="mainNavigationButtonIcon" />,
        text: 'Ver calendario',
    };

    const incidenceBtn = {
        action: () => setVisualization('incidence'),
        icon: <IncidentsIcon className="mainNavigationButtonIcon" />,
        text: 'Nueva incidencia / limpieza',
    };

    const scoreBtn = {
        action: () => setVisualization('scores'),
        icon: <StarIcon className="mainNavigationButtonIcon" />,
        text: 'Mis puntuaciones',
    };

    let Links = [];
    switch (visualization) {
        case 'reserves':
            if (fullView) Links = [listBtn, incidenceBtn, scoreBtn];
            else Links = [calendarBtn, incidenceBtn, scoreBtn];
            break;

        default:
            Links = [listBtn, incidenceBtn, scoreBtn];
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
                    setVisualization={setVisualization}
                    setRefReservation={setRefReservation}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <CircularSuspense className="mainSectionRightArticle">
                    <ResevesCalendar
                        className="mainSectionRightArticle"
                        reservations={reservations}
                    />
                </CircularSuspense>
            </div>
        ),
        calendar: (
            <div className={className + ' mainSectionFullView'}>
                <div className="mainSectionLeftArticle Borrame">
                    <p></p>
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
                    setVisualization={setVisualization}
                    setRefReservation={setRefReservation}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <CircularSuspense className="mainSectionRightArticle">
                    <IncidenceForm
                        className="mainSectionRightArticle"
                        reservations={reservations}
                        setReservations={setReservations}
                    />
                </CircularSuspense>
            </div>
        ),
        scores: (
            <div className={className + ' mainSectionFullView'}>
                <ReservesPresentation
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    fullView={fullView}
                    setVisualization={setVisualization}
                    setRefReservation={setRefReservation}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <CircularSuspense className="mainSectionRightArticle">
                    <ScoreList
                        className="mainSectionRightArticle"
                        reservations={reservations}
                    />
                </CircularSuspense>
            </div>
        ),
        newScore: (
            <div className={className + ' mainSectionFullView'}>
                <ReservesPresentation
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    fullView={fullView}
                    setVisualization={setVisualization}
                    setRefReservation={setRefReservation}
                />

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <CircularSuspense className="mainSectionRightArticle">
                    <ReservesScoreForm
                        className="mainSectionRightArticle"
                        reservations={reservations}
                        setReservations={setReservations}
                        refReservation={refReservation}
                    />
                </CircularSuspense>
            </div>
        ),
    };

    const singleViewJSX = {
        reserves: (
            <ReservesPresentation
                className="mainSectionLeftArticle"
                reservations={reservations}
                fullView={fullView}
                setVisualization={setVisualization}
                setRefReservation={setRefReservation}
            />
        ),
        calendar: (
            <CircularSuspense className="mainSectionLeftArticle">
                <ResevesCalendar
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                />
            </CircularSuspense>
        ),
        incidence: (
            <CircularSuspense className="mainSectionLeftArticle">
                <IncidenceForm
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    setReservations={setReservations}
                />
            </CircularSuspense>
        ),
        scores: (
            <CircularSuspense className="mainSectionLeftArticle">
                <ScoreList
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                />
            </CircularSuspense>
        ),
        newScore: (
            <CircularSuspense className="mainSectionLeftArticle">
                <ReservesScoreForm
                    className="mainSectionLeftArticle"
                    reservations={reservations}
                    setReservations={setReservations}
                    refReservation={refReservation}
                />
            </CircularSuspense>
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
