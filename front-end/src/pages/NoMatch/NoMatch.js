import './noMatch.css';
import { useHistory } from 'react-router';

import {NoMatchSVG, ResetIcon, InfoIcon} from '../../components/Icons/Icons'
import MainNavigation from '../../components/MainNavigation/MainNavigation';


export default function NoMatch({ className }) {
    let history = useHistory();

    const newCenterButton = {
        action: () => history.goBack(),
        icon: <InfoIcon className="mainNavigationButtonIcon" />,
        text: 'Página anterior',
    };
    const newSpaceButton = {
        path: '/',
        icon: <ResetIcon className="mainNavigationButtonIcon" />,
        text: 'Nueva búsqueda',
    };

    let Links = [newCenterButton,newSpaceButton ];

    return (
        <article className={className + ' mainSectionFullViewExpand'}>
            <section className="noMatch mainSectionLeftArticle">
                <h3 className="Nomatch-presentationName">Página no encontrada</h3>
                <figure className="Nomatch-container">
                    <NoMatchSVG className="Nomatch-image" />
                </figure>
            </section>
            <MainNavigation
                links={Links}
                className="mainSectionNavigation"
            />
        </article>
        
    );
}
