import './avatar.css';
import { useState, useEffect, Suspense, lazy } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useClient } from '../../hooks/useClient';

import axios from 'axios';

import { Dialog } from '@material-ui/core';
const Login = lazy(() => import('../Login/Login'));
const Logout = lazy(() => import('./Logout/Logout'));

function Avatar() {
    const [open, setOpen] = useState(false);

    const [clientData] = useClient();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const avatarPath = clientData ? getPath(clientData) : null;

    useEffect(() => {
        (function () {
            const { authorization } =
                JSON.parse(localStorage.getItem('client')) || {};
            if (authorization) {
                axios.defaults.headers.common['Authorization'] = authorization;
            } else {
                axios.defaults.headers.common['Authorization'] = null;
            }
        })();
    }, [clientData]);

    return (
        <figcaption className="avatar">
            {clientData?.avatarUrl ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                    onClick={handleClickOpen}
                    src={avatarPath}
                    alt="avatar image"
                    className="avatar-logo"
                />
            ) : (
                <FaUserAlt className="avatar-logo" onClick={handleClickOpen} />
            )}

            <Suspense fallback={null}>
                <Dialog open={open} onClose={handleClose}>
                    {clientData?.state ? (
                        <Logout handleClose={handleClose} />
                    ) : (
                        <Login handleClose={handleClose} />
                    )}
                </Dialog>
            </Suspense>
        </figcaption>
    );
}

export default Avatar;

function getPath(clientData) {
    if (clientData.tipo === 'administrador')
        return `http://localhost:8080/api/images/adminsPhotos/${clientData.avatarUrl}`;
    if (clientData.tipo === 'usuario')
        return `http://localhost:8080/api/images/usersPhotos/${clientData.avatarUrl}`;
}
