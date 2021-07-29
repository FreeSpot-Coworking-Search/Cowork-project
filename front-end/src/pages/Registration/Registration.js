import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import RegistrationFormAdmin from './RegistrationForm/RegistrationFormAdmin';
import MainNavigation from '../../components/MainNavigation/MainNavigation';

import locationIcon from '../../assets/icons/bxs-location-plus 1.png';

export default function AdminsRegister({ className }) {
    const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
    const [visualization, setVisualization] = useState(1);
    const [fullView, setFullView] = useState(
        useMediaQuery({
            query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
        })
    );

    // ****************
    // ** RESPONSIVE **
    // ****************

    const handleMediaQueryChange = (matches) => {
        setFullView(matches);
    };
    const isFullView = useMediaQuery(
        { query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})` },
        undefined,
        handleMediaQueryChange
    );

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const sendButton = {
        action: () => {},
        icon: locationIcon,
        text: 'Registrarse',
    };

    const resetButton = {
        action: () => {},
        icon: locationIcon,
        text: 'Reset',
    };

    const swipeButton = {
        action: () => setVisualization(visualization === 2 ? 1 : 2),
        icon: locationIcon,
        text: 'Swipe',
    };

    let Links = [];

    switch (visualization) {
        case 1:
            if (fullView) Links = [sendButton, resetButton];
            else Links = [sendButton, resetButton, swipeButton];
            break;

        case 2:
            if (fullView) Links = [sendButton, resetButton];
            else Links = [sendButton, resetButton, swipeButton];
            break;

        default:
            break;
    }

    // *******************************
    // ** ESTADOS Y OBJETOS COMUNES **
    // *******************************

    // *********
    // ** JSX **
    // *********

    return (
        <>
            {fullView ? (
                <div className={className + ' mainSectionFullView'}>
                    <RegistrationFormAdmin className="mainSectionLeftArticle" />

                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    />

                    <div className="mainSectionRightArticle Borrame">
                        <p>2</p>
                    </div>
                </div>
            ) : (
                <div className={className + ' mainSectionSingleView'}>
                    {visualization === 1 ? (
                        <RegistrationFormAdmin className="mainSectionLeftArticle" />
                    ) : (
                        <div className="mainSectionLeftArticle Borrame">
                            <p>2</p>
                        </div>
                    )}
                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    />
                </div>
            )}
        </>
    );
}
