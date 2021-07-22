import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import User from '../../pages/User/User';
import Admin from '../../pages/Admin/Admin';
import Space from '../../pages/Space/Space';
import Center from '../../pages/Center/Center';
import SearchSpaces from '../../pages/SearchSpaces/SearchSpaces';
import SearchCenter from '../../pages/SearchCenter/SearchCenter';
import MyCoworking from '../../pages/MyCoworking/MyCoworking';
import MyCenter from '../../pages/MyCenter/MyCenter';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Footer from '../../components/Footer/Footer';

import './Layout.css';

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
            <BrowserRouter>
                <Switch>
                    <Route path="/user">
                        <User />
                    </Route>
                    <Route path="/admin">
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
            </BrowserRouter>
            <Footer />
        </section>
    );
}
