import './registrationForm.css';

import { toFormDate } from '../../helpers/dateHelper';

import FormInput from '../../components/FormInput/FormInput';

import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsCalendarFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

export default function RegistrationFormAdmin({ className, ...params }) {
  const { error, message, form, setForm, setPhoto } = params;

  const today = toFormDate();

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setForm({ ...form, [name]: value });
  }

  function onFileChange(event) {
    const file = event.target.files[0];
    setPhoto(file);
  }

  return (
    <form className={`${className} registerForm`}>
      <h3 className="registerForm-title">Registro de administrador</h3>

      <div className="registerForm-inputs">
        <div className="personalData">
          <FormInput name="correo">
            <GrMail />
            <input
              type="email"
              value={form.correo}
              onChange={handleInputChange}
              placeholder=" Correo"
              required
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
            />
          </FormInput>

          <p>Selecciona una foto de perfil:</p>
          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
        </div>
        <div className="passwordChange">
          <FormInput name="password">
            <RiLockPasswordFill />
            <input
              type="password"
              value={form.password}
              onChange={handleInputChange}
              minLength="8"
              maxLength="100"
              placeholder=" Password"
              required
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
            />
          </FormInput>
        </div>
      </div>
      {error && <p className="registerForm-error">{error}</p>}
      {message && <p className="registerForm-message">{message}</p>}

      <div className="registerForm-submit">
        <p>
          Al hacer clic en "Registrarse", estará dando su conformidad a nuestra{' '}
          <a href="https://www.w3docs.com/privacy-policy">
            Política de Privacidad
          </a>
          .
        </p>
      </div>
    </form>
  );
}
