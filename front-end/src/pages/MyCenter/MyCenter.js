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
import { NewCenterIcon, NewSpaceIcon } from '../../components/Icons/Icons';
import { useClient } from '../../hooks/useClient';

export default function MyCenter({ className }) {
    const [clientData] = useClient();
    const [centers, loading] = useMyCenter(clientData.idAuth);
    const [selectedCenter, setSelectedCenter] = useState(0);
    const [day, setDay] = useState(new Date());
    const [visualization, setVisualization] = useState('expand');
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

    let Links = [];

    switch (visualization) {
        case 'list':
            if (fullView) Links = [newCenterButton, newSpaceButton];
            else Links = [newCenterButton, newSpaceButton];
            break;

        case 'expand':
            if (fullView) Links = [newCenterButton, newSpaceButton];
            else Links = [newCenterButton, newSpaceButton];
            break;
        case 'newCenter':
            if (fullView) Links = [newCenterButton, newSpaceButton];
            else Links = [newCenterButton, newSpaceButton];
            break;
        case 'newSpace':
            if (fullView) Links = [newCenterButton, newSpaceButton];
            else Links = [newCenterButton, newSpaceButton];
            break;

        default:
            break;
    }

    // *********
    // ** JSX **
    // *********

    const fullViewJSX = {
        list: (
            <div className={className + ' mainSectionFullView'}>
                <div className="mainSectionLeftArticle Borrame"></div>

                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
                <MyCenterPresentation
                    className="mainSectionRightArticle"
                    centers={centers}
                    selectedCenter={selectedCenter}
                    setSelectedCenter={setSelectedCenter}
                />
            </div>
        ),
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
        expand: (
            <div className={className + ' mainSectionFullViewExpand'}>
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
            </div>
        ),
    };

    const singleViewJSX = {
        list: (
            <MyCenterPresentation
                className="mainSectionLeftArticle"
                centers={centers}
                selectedCenter={selectedCenter}
                setSelectedCenter={setSelectedCenter}
                day={day}
                setDay={setDay}
            />
        ),
    };

    const responsiveChangeJSX = {
        true: fullViewJSX[visualization],
        false: (
            <div className={className + ' mainSectionSingleView'}>
                <MyCenterPresentation
                    className="mainSectionLeftArticle"
                    centers={centers}
                    selectedCenter={selectedCenter}
                    setSelectedCenter={setSelectedCenter}
                    day={day}
                    setDay={setDay}
                />
                <MainNavigation
                    links={Links}
                    className="mainSectionNavigation"
                ></MainNavigation>
            </div>
        ),
    };

    return !loading ? <>{responsiveChangeJSX[fullView]}</> : <Spinner />;
}
