import '../../css/dialog.css';
import './login.css';
import './form.css';

import { useState, useMemo } from 'react';
import { useClient } from '../../hooks/useClient';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonList from '../ButtonList/ButtonList';
const axios = require('axios');

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

function Login({ handleClose }) {
  const [userType, setUserType] = useState('usuario');

  const btnBehavior = useMemo(
    () => [
      {
        text: 'usuarios',
        action: () => setUserType('usuario'),
        type: 'secondary',
      },
      {
        text: 'administradores',
        action: () => setUserType('administrador'),
        type: 'secondary',
      },
    ],
    []
  );

  const btnBehavior2 = useMemo(
    () => [{ text: 'cerrar', action: handleClose }],
    [handleClose]
  );

  return (
    <article className="dialog">
      <h2 className="login-header">Acceso {userType}</h2>
      <ButtonList btnBehavior={[...btnBehavior]} cssStyle="login-clientBtn" />
      <Form userType={userType} handleClose={handleClose} />
      <ButtonList btnBehavior={[...btnBehavior2]} cssStyle="login-clientBtn" />
    </article>
  );
}

export default Login;

function Form({ userType, handleClose, history }) {
  const [, setClientData] = useClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onSubmitLogin(event) {
    event.preventDefault();
    performLogin(email, password, setError, userType);
  }

  const registerLink =
    userType === 'usuario' ? '/users/register' : '/admins/register';
  const resetLink = userType === 'usuario' ? '/users/reset' : '/admins/reset';

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

      const { authorization, tokenInfo, avatarUrl, name } = response.data;

      setClientData({
        state: true,
        authorization,
        avatarUrl,
        name,
        ...tokenInfo,
      });

      handleClose();
    } catch (error) {
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

      <button>Acceder</button>
      {error && <div className="form-error">{error}</div>}

      <div className="form-options">
        <p>
          Olvidaste tu contraseña?{' '}
          <Link to={resetLink} onClick={() => handleClose()}>
            Pincha aquí
          </Link>
        </p>
        <p>
          Aún no tienes una cuenta con nosotros?{' '}
          <Link to={registerLink} onClick={() => handleClose()}>
            Regístrate aquí
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
