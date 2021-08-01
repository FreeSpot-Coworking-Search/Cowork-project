import './Layout.css';
import '../../css/mainSection.css';
import { Switch, Route } from 'react-router-dom';

import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import DecorationHeader from '../Decoration/DecorationHeader/DecorationHeader';

import Header from '../Header/Header';
import Routes from '../../routes/Routes';

import Footer from '../../components/Footer/Footer';

import MyCenter from '../../pages/MyCenter/MyCenter';

import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

import TemplateMainSection from '../Templates/TemplateMainSection/TemplateMainSection';

// TEMPORAL
const isUserLogged = false;
// TEMPORAL

export default function Layout() {
    return (
        <section className="mainPage">
            <BackGroundLeft />
            <BackGroundRight />
            <Header></Header>
            <div className="decorationLeft"></div>
            <div className="decorationRight"></div>
            <DecorationHeader className="decorationTop" />
            <Switch>
                <Routes />
                <Route path="/template">
                    <TemplateMainSection className="mainSection" />
                </Route>

                {/* EJEMPLO DE RUTA PRIVADA */}
                <PrivateRoute
                    path="/mycenter"
                    Component={MyCenter}
                    isUserLogged={isUserLogged}
                    propsDelComponente="Las props del componente iran aqui"
                />
                {/* EJEMPLO DE RUTA PRIVADA */}
            </Switch>
            <Footer />
        </section>
    );
}
