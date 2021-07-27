import './login.css';
import './form.css';

import { useState } from 'react';
import { useClient } from '../../hooks/useClient';
import { Link } from 'react-router-dom';
const axios = require('axios');

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

function Login({ handleClose }) {
    const [userType, setUserType] = useState('usuario');

    function changeUser(userType) {
        setUserType(userType);
    }

    return (
        <article className="login">
            <h2 className="login-header">Acceso {userType}</h2>
            <div className="login-clientBtn">
                <button onClick={() => changeUser('usuario')}>
                    acceso asuarios
                </button>
                <button onClick={() => changeUser('administrador')}>
                    acceso administradores
                </button>
            </div>
            <Form userType={userType} handleClose={handleClose} />
            <button onClick={handleClose}>Cerrar</button>
        </article>
    );
}

export default Login;

function Form({ userType, handleClose }) {
    const [, setClientData] = useClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function onSubmitLogin(event) {
        event.preventDefault();
        performLogin(email, password, setError, userType);
    }

    async function performLogin(email, password, setError, userType) {
        try {
            const route =
                userType === 'usuario'
                    ? `${host}:${port}/api/users/login`
                    : `${host}:${port}/api/admins/login`;

            const response = await axios.post(route, {
                correo: email,
                password,
            });

            const { authorization, tokenInfo, avatarUrl, name } =
                response.data.data;

            setClientData({
                state: true,
                authorization,
                avatarUrl,
                name,
                ...tokenInfo,
            });

            handleClose();
        } catch (error) {
            console.log(error.response);
            setError(error.response.data.message);
        }
    }

    return (
        <form onSubmit={onSubmitLogin} className="form">
            <label htmlFor="email">correo: </label>
            <input
                type="email"
                name="correo"
                id="email"
                placeholder="email@email.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">contraseña: </label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                minLength="8"
                maxLength="100"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <input type="submit" value="Login" />
            {error && <div className="form-error">{error}</div>}
            <hr />
            <div className="form-options">
                <p>
                    Olvidaste tu contraseña?{' '}
                    <Link to="/reset" onClick={() => handleClose()}>
                        Pincha aquí
                    </Link>
                </p>
                <p>
                    Aún no tienes una cuenta con nosotros?{' '}
                    <Link to="/register/admin" onClick={() => handleClose()}>
                        Regístrate aquí
                    </Link>
                    .
                </p>
            </div>
        </form>
    );
}
