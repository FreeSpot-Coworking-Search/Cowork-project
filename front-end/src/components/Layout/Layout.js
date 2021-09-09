import './Layout.css';
import '../../css/mainSection.css';
import '../../css/tooltip.css';
import { Switch } from 'react-router-dom';

import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';

import Header from '../Header/Header';
import Routes from '../../routes/Routes';

//import Footer from '../../components/Footer/Footer';

import Decoration from '../Decoration/Decoration';

import {
    ErrorHeader,
    ErrorMain,
} from '../../components/ErrorBoundaries/ErrorBoundaries';

export default function Layout() {
    return (
        <section className="mainPage">
            <BackGroundLeft />
            <BackGroundRight />
            <Decoration />
            <ErrorHeader>
                <Header />
            </ErrorHeader>
            <ErrorMain>
                <Switch>
                    <Routes />
                </Switch>
            </ErrorMain>
        </section>
    );
}
