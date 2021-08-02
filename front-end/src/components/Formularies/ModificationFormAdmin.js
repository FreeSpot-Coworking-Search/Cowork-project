import './registrationForm.css';

import { toFormDate } from '../../helpers/dateHelper';

import FormInput from '../../components/FormInput/FormInput';

import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsCalendarFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

export default function RegistrationFormAdmin({ className, ...params }) {
    const { error, message, form, setForm, modification } = params;

    const today = toFormDate();

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setForm({ ...form, [name]: value });
    }

    return (
        <form className={`${className} registerForm`}>
            <h1 className="registerForm-title">Mis datos Personales</h1>
            <h2 className="registerForm-subtitle">
                usuario tipo administrador
            </h2>

            <hr />
            <div className="registerForm-inputs">
                <div>
                    <FormInput name="correo">
                        <GrMail />
                        <input
                            type="email"
                            value={form.correo}
                            onChange={handleInputChange}
                            placeholder=" Correo"
                            required
                            disabled={!modification}
                        />
                    </FormInput>

                    <FormInput name="nombre">
                        <FaUser />
                        <input
                            type="text"
                            value={form.nombre}
                            onChange={handleInputChange}
                            minLength="1"
                            maxLength="20"
                            placeholder=" Nombre"
                            required
                            disabled={!modification}
                        />
                    </FormInput>

                    <FormInput name="apellidos">
                        <FaUsers />
                        <input
                            type="text"
                            value={form.apellidos}
                            onChange={handleInputChange}
                            minLength="1"
                            maxLength="50"
                            placeholder=" Apellidos"
                            required
                            disabled={!modification}
                        />
                    </FormInput>

                    <FormInput name="password">
                        <RiLockPasswordFill />
                        <input
                            type="password"
                            value={form.password}
                            onChange={handleInputChange}
                            minLength="8"
                            maxLength="100"
                            placeholder=" Modificar contraseña"
                            required
                            disabled={!modification}
                        />
                    </FormInput>

                    <FormInput name="confirmPw">
                        <RiLockPasswordFill />
                        <input
                            type="password"
                            value={form.confirmPw}
                            onChange={handleInputChange}
                            minLength="8"
                            maxLength="100"
                            placeholder=" Repita contraseña"
                            required
                            disabled={!modification}
                        />
                    </FormInput>

                    <FormInput name="fecha_nacimiento">
                        <BsCalendarFill />
                        <input
                            type="date"
                            value={form.fecha_nacimiento}
                            onChange={handleInputChange}
                            min="1900-01-01"
                            max={today}
                            required
                            disabled={!modification}
                        />
                    </FormInput>
                </div>
            </div>

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
            </div>
        </form>
    );
}
