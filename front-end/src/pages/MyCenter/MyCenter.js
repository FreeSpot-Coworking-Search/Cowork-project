import './MyCenter.css';

import { useState } from 'react';
import RegistrationFormCenter from '../../components/Formularies/RegistrationFormCenter';
import RegistrationFormSpace from '../../components/Formularies/RegistrationFormSpace';
import MainNavigation from '../../components/MainNavigation/MainNavigation';
import Spinner from '../../components/Spinner/Spinner';
import formIllustration from '../../assets/illustrations/undraw_fill_form_re_cwyf.svg';
import useFullView from '../../hooks/useFullView';
import useMyCenter from '../../hooks/useMyCenter';
import MyCenterPresentation from '../../components/MyCenterPresentation/MyCenterPresentation';
import MyCenterPresentationExpand from '../../components/MyCenterPresentationExpand/MyCenterPresentationExpand';
import HelpPresentation from '../../components/HelpPresentation/HelpPresentation';
import {
    BackIcon,
    NewCenterIcon,
    NewSpaceIcon,
} from '../../components/Icons/Icons';
import { useClient } from '../../hooks/useClient';
import noCentersIllustration from '../../assets/illustrations/undraw_Traveling_re_weve.svg';

export default function MyCenter({ className }) {
    const [clientData] = useClient();
    const [centers, loading] = useMyCenter(clientData.idAuth);
    const [selectedCenter, setSelectedCenter] = useState(0);
    const [day, setDay] = useState(new Date());
    const [visualization, setVisualization] = useState('list');
    const [fullView] = useFullView();

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const newCenterButton = {
        action: () => setVisualization('newCenter'),
        icon: <NewCenterIcon className="mainNavigationButtonIcon" />,
        text: 'Nuevo centro',
    };
    const newSpaceButton = {
        action: () => setVisualization('newSpace'),
        icon: <NewSpaceIcon className="mainNavigationButtonIcon" />,
        text: 'Nuevo Espacio',
    };
    const backButton = {
        path: '/mycenter',
        icon: <BackIcon className="mainNavigationButtonIcon" />,
        text: 'Volver',
    };

    let Links = [];

    switch (visualization) {
        case 'list':
            if (fullView) {
                Links = [newCenterButton];
                if (centers.length > 0) Links.push(newSpaceButton);
            } else {
                Links = [newCenterButton];
                if (centers.length > 0) Links.push(newSpaceButton);
            }
            break;
        case 'newCenter':
            if (fullView) Links = [backButton];
            else Links = [backButton];
            break;
        case 'newSpace':
            if (fullView) Links = [backButton];
            else Links = [backButton];
            break;

        default:
            break;
    }

    // *********
    // ** JSX **
    // *********

    const fullViewJSX = {
        // list: (
        //   <div className={className + ' mainSectionFullView'}>
        //     <div className="mainSectionLeftArticle Borrame"></div>

        //     <MainNavigation
        //       links={Links}
        //       className="mainSectionNavigation"
        //     ></MainNavigation>
        //     <MyCenterPresentation
        //       className="mainSectionRightArticle"
        //       centers={centers}
        //       selectedCenter={selectedCenter}
        //       setSelectedCenter={setSelectedCenter}
        //     />
        //   </div>
        // ),
        newCenter: (
            <div className={className + ' mainSectionFullView'}>
                <div className="mainSectionLeftArticle presentation">
                    <RegistrationFormCenter />
                </div>
                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <HelpPresentation
                    className="mainSectionRightArticle"
                    image={formIllustration}
                    text="Cubramos los datos de su centro"
                />
            </div>
        ),
        newSpace: (
            <div className={className + ' mainSectionFullView'}>
                <div className="mainSectionLeftArticle presentation">
                    <RegistrationFormSpace
                        centers={centers}
                        selectedCenter={selectedCenter}
                    />
                </div>
                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <HelpPresentation
                    className="mainSectionRightArticle"
                    image={formIllustration}
                    text="Cubramos los datos de su centro"
                />
            </div>
        ),
        list: (
            <div className={className + ' mainSectionFullViewExpand'}>
                {centers.length > 0 ? (
                    <>
                        <MyCenterPresentationExpand
                            className="mainSectionLeftArticle"
                            centers={centers}
                            day={day}
                            setday={setDay}
                            selectedCenter={selectedCenter}
                            setSelectedCenter={setSelectedCenter}
                        />

                        <MainNavigation
                            links={Links}
                            className="mainSectionNavigation"
                        ></MainNavigation>
                    </>
                ) : (
                    <>
                        <HelpPresentation
                            className="mainSectionLeftArticle"
                            image={noCentersIllustration}
                            text="Aun no posees centros registrados"
                        />
                        <MainNavigation
                            links={Links}
                            className="mainSectionNavigation"
                        ></MainNavigation>
                    </>
                )}
            </div>
        ),
    };

    const singleViewJSX = {
        list: (
            <>
                {centers.length > 0 ? (
                    <MyCenterPresentation
                        className="mainSectionLeftArticle"
                        centers={centers}
                        selectedCenter={selectedCenter}
                        setSelectedCenter={setSelectedCenter}
                        day={day}
                        setDay={setDay}
                    />
                ) : (
                    <HelpPresentation
                        className="mainSectionLeftArticle"
                        image={noCentersIllustration}
                        text="Aun no posees centros registrados"
                    />
                )}
            </>
        ),
        newSpace: (
            <div className="mainSectionLeftArticle presentation">
                <RegistrationFormSpace
                    centers={centers}
                    selectedCenter={selectedCenter}
                />
            </div>
        ),
        newCenter: (
            <div className="mainSectionLeftArticle presentation">
                <RegistrationFormCenter />
            </div>
        ),
    };

    const responsiveChangeJSX = {
        true: fullViewJSX[visualization],
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

    return !loading ? <>{responsiveChangeJSX[fullView]}</> : <Spinner />;
}
