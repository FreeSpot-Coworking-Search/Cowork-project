import './Layout.css';
import '../../css/mainSection.css';
import '../../css/tooltip.css';

import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';

import Header from '../Header/Header';
import Routes from '../../routes/Routes';

//import Footer from '../../components/Footer/Footer';

import Decoration from '../Decoration/Decoration';

import CircularSuspense from '../CircularSuspense/CircularSuspense';

import {
    ErrorHeader,
    ErrorMain,
} from '../../components/ErrorBoundaries/ErrorBoundaries';
import { BrowserRouter } from 'react-router-dom';

export default function Layout() {
    return (
        <section className="mainPage">
            <BackGroundLeft />
            <BackGroundRight />
            <Decoration />
            <BrowserRouter>
                <ErrorHeader>
                    <Header />
                </ErrorHeader>
                <ErrorMain>
                    <CircularSuspense className="mainSection">
                        <Routes />
                    </CircularSuspense>
                </ErrorMain>
            </BrowserRouter>
        </section>
    );
}
