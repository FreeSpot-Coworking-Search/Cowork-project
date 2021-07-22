import './avatar.css';
import { useState, Suspense, lazy } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import useClientData from '../../hooks/useClientData';

const Dialog = lazy(() => import('@material-ui/core/Dialog'));
const Login = lazy(() => import('../Login/Login'));
const Logout = lazy(() => import('./Logout/Logout'));

function Avatar() {
    const [open, setOpen] = useState(false);

    const [clientData, setClientData] = useClientData('clienData');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const avatarPath = clientData ? getPath(clientData) : null;

    return (
        <figcaption className="avatar">
            {clientData?.state ? (
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
                        <Logout
                            setClientData={setClientData}
                            handleClose={handleClose}
                            clientData={clientData}
                        />
                    ) : (
                        <Login
                            setClientData={setClientData}
                            handleClose={handleClose}
                        />
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
