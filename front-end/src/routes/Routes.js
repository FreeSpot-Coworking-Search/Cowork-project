import { lazy } from 'react';
import { Route } from 'react-router-dom';

import CircularSuspense from '../components/CircularSuspense/CircularSuspense';

const Home = lazy(() => import('../pages/Home/Home'));

const User = lazy(() => import('../pages/User/User'));
const UserRegistration = lazy(() =>
    import('../pages/UserRegistration/UserRegistration')
);
const MyCoworking = lazy(() => import('../pages/MyCoworking/MyCoworking'));

const Admin = lazy(() => import('../pages/Admin/Admin'));
const AdminRegistration = lazy(() =>
    import('../pages/AdminRegistration/AdminRegistration')
);

const Space = lazy(() => import('../pages/Space/Space'));
const SearchSpaces = lazy(() => import('../pages/SearchSpaces/SearchSpaces'));

const Center = lazy(() => import('../pages/Center/Center'));
const SearchCenter = lazy(() => import('../pages/SearchCenter/SearchCenter'));

const routes = [
    {
        path: '/users/register',
        Page: UserRegistration,
        private: false,
    },
    {
        path: '/users',
        Page: User,
        private: false,
    },
    {
        path: '/mycoworking',
        Page: MyCoworking,
        private: false,
    },
    {
        path: '/admins/register',
        Page: AdminRegistration,
        private: false,
    },
    {
        path: '/admins',
        Page: Admin,
        private: false,
    },
    {
        path: '/search/space',
        Page: SearchSpaces,
        private: false,
    },
    {
        path: '/space',
        Page: Space,
        private: false,
    },
    {
        path: '/search/center',
        Page: SearchCenter,
        private: false,
    },
    {
        path: '/center',
        Page: Center,
        private: false,
    },
    {
        path: '/',
        Page: Home,
        private: false,
    },
];

export default function Routes() {
    return (
        <>
            {routes.map((route) => (
                <Route path={route.path} key={route.path}>
                    <CircularSuspense className="mainSection">
                        <route.Page className="mainSection" />
                    </CircularSuspense>
                </Route>
            ))}
        </>
    );
}
