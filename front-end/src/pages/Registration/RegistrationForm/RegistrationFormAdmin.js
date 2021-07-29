import './registrationForm.css';

import { useState } from 'react';
import { useHistory } from 'react-router';

import AdminInputs from './inputs/AdminInputs';
import ButtonList from '../../../components/ButtonList/ButtonList';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function RegistrationFormAdmin({ className }) {
    const [form, setForm] = useState({
        correo: '',
        nombre: '',
        apellidos: '',
        password: '',
        confirmPw: '',
        fecha_nacimiento: '',
    });
    const [photo, setPhoto] = useState();

    const [error, setError] = useState();
    const [message, setMessage] = useState();

    let history = useHistory();

    const btnBehavior = [
        {
            text: 'registrarse',
        },
    ];

    const InputParams = {
        form,
        setForm,
        setPhoto,
    };

    async function performSubmit(e) {
        try {
            e.preventDefault();
            if (form.password !== form.confirmPw) {
                setError('Revisa que las contraseñas ingresadas sean iguales.');
                setTimeout(() => {
                    setError('');
                }, 5000);

                return;
            }

            setMessage('Enviando datos');

            let data = new FormData();
            for (const key in form) {
                if (key === 'confirmPw') continue;
                data.append(key, form[key]);
            }
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
    }

    return (
        <form className={`${className} registerForm`} onSubmit={performSubmit}>
            <h1 className="registerForm-title">registro como administrador</h1>
            <h2 className="registerForm-subtitle">
                como usuario tipo administrador usted será capaz de crear y
                modificar y publicar diferentes centros con sus respectivos
                espacios
            </h2>

            <hr />
            <AdminInputs className="registerForm-inputs" {...InputParams} />

            {error && <p className="registerForm-error">{error}</p>}
            {message && <p className="registerForm-message">{message}</p>}

            <hr />

            <div className="registerForm-submit">
                <p>
                    Al hacer clic en "Registrarse", estará dando su conformidad
                    a nuestra{' '}
                    <a href="https://www.w3docs.com/privacy-policy">
                        Política de Privacidad
                    </a>
                    .
                </p>
                <ButtonList btnBehavior={[...btnBehavior]} />
            </div>
        </form>
    );
}
