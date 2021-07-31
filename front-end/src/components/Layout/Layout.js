import './Layout.css';
import '../../css/mainSection.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import Footer from '../../components/Footer/Footer';
import DecorationHeader from '../Decoration/DecorationHeader/DecorationHeader';

import User from '../../pages/User/User';
import MyCoworking from '../../pages/MyCoworking/MyCoworking';

import Admin from '../../pages/Admin/Admin';
import MyCenter from '../../pages/MyCenter/MyCenter';

import Space from '../../pages/Space/Space';
import SearchSpaces from '../../pages/SearchSpaces/SearchSpaces';

import Center from '../../pages/Center/Center';
import SearchCenter from '../../pages/SearchCenter/SearchCenter';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

import TemplateMainSection from '../Templates/TemplateMainSection/TemplateMainSection';

import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';
const AdminRegistration = lazy(() =>
    import('../../pages/AdminRegistration/AdminRegistration')
);
const UserRegistration = lazy(() =>
    import('../../pages/UserRegistration/UserRegistration')
);

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
                <Route path="/users/register">
                    <CircularSuspense className="mainSection">
                        <UserRegistration className="mainSection" />
                    </CircularSuspense>
                </Route>
                <Route path="/users">
                    <User />
                </Route>
                <Route path="/admins/register">
                    <CircularSuspense className="mainSection">
                        <AdminRegistration className="mainSection" />
                    </CircularSuspense>
                </Route>
                <Route path="/admins">
                    <Admin />
                </Route>
                <Route path="/space">
                    <Space />
                </Route>
                <Route path="/center">
                    <Center />
                </Route>
                <Route path="/search/center">
                    <SearchCenter className="mainSection" />
                </Route>
                <Route path="/search/space">
                    <SearchSpaces />
                </Route>
                <Route path="/mycoworking">
                    <MyCoworking />
                </Route>
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

                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </section>
    );
}
