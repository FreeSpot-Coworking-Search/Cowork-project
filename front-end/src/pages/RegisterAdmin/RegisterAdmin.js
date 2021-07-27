import './registerAdmin.css';

import { useState } from 'react';
import ButtonList from '../../components/ButtonList/ButtonList';
import { toFormDate } from '../../helpers/dateHelper';
import { useHistory } from 'react-router';

import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsCalendarFill } from 'react-icons/bs';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function RegisterAdmin({ className }) {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');

    const [photo, setPhoto] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const today = toFormDate(new Date());

    const btnBehavior = [{ text: 'registrarse', action: () => {} }];

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    let history = useHistory();

    const performSubmit = async (e) => {
        try {
            e.preventDefault();
            if (password !== confirmPw) {
                setError('Revisa que las contraseñas ingresadas sean iguales.');
                setTimeout(() => {
                    setError('');
                }, 5000);

                return;
            }

            let data = new FormData();
            data.append('correo', correo);
            data.append('nombre', nombre);
            data.append('apellidos', apellidos);
            data.append('password', password);
            data.append('fecha_nacimiento', fecha_nacimiento);
            data.append('photo', photo);

            const route = `${host}:${port}/api/admins/`;

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            const response = await axios.post(route, data, config);
            if (response.status === 200) {
                setMessage(
                    'Cuenta creada, falta activar la misma. Para ello, hemos enviado un mail al correo indicado con el enlace de activación. Muchas gracias.'
                );
                setTimeout(() => {
                    history.push('/');
                }, 5000);
            }
        } catch (error) {
            const {
                data: { message },
            } = error.response;
            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <main className={`${className} register`}>
            <h1 className="register-title">registro como administrador</h1>
            <h2 className="register-subtitle">
                como usuario tipo administrador usted será capaz de crear y
                modificar y publicar diferentes centros con sus respectivos
                espacios
            </h2>
            <form className="registerForm" onSubmit={performSubmit}>
                <hr />

                <div className="registerForm-main">
                    <div>
                        <label className="registerForm-label" htmlFor="email">
                            <GrMail />
                            <input
                                type="email"
                                className="registerForm-input"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                name="email"
                                id="email"
                                placeholder=" Email"
                                required
                            />
                        </label>
                        <label className="registerForm-label" htmlFor="name">
                            N
                            <input
                                type="text"
                                className="registerForm-input"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                name="name"
                                id="name"
                                placeholder=" Nombre"
                                minLength="1"
                                maxLength="20"
                                required
                            />
                        </label>
                        <label
                            className="registerForm-label"
                            htmlFor="lastName"
                        >
                            A
                            <input
                                type="text"
                                className="registerForm-input"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                name="lastName"
                                id="lastName"
                                placeholder=" Apellidos"
                                minLength="1"
                                maxLength="50"
                                required
                            />
                        </label>
                        <label
                            className="registerForm-label"
                            htmlFor="password"
                        >
                            <RiLockPasswordFill />
                            <input
                                type="password"
                                className="registerForm-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
                                placeholder=" Contraseña"
                                minLength="8"
                                maxLength="100"
                                required
                            />
                        </label>
                        <label
                            className="registerForm-label"
                            htmlFor="confirmPw"
                        >
                            <RiLockPasswordFill />
                            <input
                                type="password"
                                className="registerForm-input"
                                value={confirmPw}
                                onChange={(e) => setConfirmPw(e.target.value)}
                                name="confirmPw"
                                id="confirmPw"
                                placeholder=" Repita constraseña"
                                minLength="8"
                                maxLength="100"
                                required
                            />
                        </label>
                        <label
                            className="registerForm-label"
                            htmlFor="born-date"
                        >
                            <BsCalendarFill />
                            <input
                                type="date"
                                className="registerForm-input"
                                onChange={(e) =>
                                    setFecha_nacimiento(e.target.value)
                                }
                                value={fecha_nacimiento}
                                id="born-date"
                                name="born-date"
                                min="1900-01-01"
                                max={today}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <p>Seleccione foto de perfil:</p>
                        <label className="registerForm-label" htmlFor="avatar">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                        </label>
                    </div>
                </div>

                {error && <p className="registerForm-error">{error}</p>}
                {message && <p className="registerForm-message">{message}</p>}

                <hr />

                <div className="registerForm-button">
                    <p>
                        Al hacer clic en "Registrarse", estará dando su
                        conformidad a nuestra{' '}
                        <a href="https://www.w3docs.com/privacy-policy">
                            Política de Privacidad
                        </a>
                        .
                    </p>
                    <ButtonList btnBehavior={[...btnBehavior]} cssStyle="btn" />
                </div>
            </form>
        </main>
    );
}
