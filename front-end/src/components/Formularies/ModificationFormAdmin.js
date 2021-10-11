import './registrationForm.css';
import { Redirect } from 'react-router-dom';

import { toFormDate } from '../../helpers/dateHelper';
import FormInput from '../../components/FormInput/FormInput';
import { Dialog } from '@material-ui/core';
import useDialog from '../../hooks/useDialog';

import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsCalendarFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

import axios from 'axios';
const { REACT_APP_API_LOCAL_SERVER_HOST: host } = process.env;

export default function ModificationFormAdmin({ className, ...params }) {
  const { open, handleClickOpen, handleClose } = useDialog();
  const {
    error,
    message,
    form,
    handleInputChange,
    setError,
    modification,
    id,
    setClientData,
  } = params;
  const today = toFormDate();

  async function deleteClient(e) {
    try {
      e.preventDefault();
      const route = `${host}/api/admins/?id=${id}`;
      const response = axios.delete(route);
      setClientData({ state: false });

      if (response.status === 200) {
        setError('Cuenta eliminada.');
        setTimeout(() => {
          <Redirect to="/" />;
        }, 5000);
      }
    } catch (error) {
      setError('Revisa que las contraseñas ingresadas sean iguales.');
      setTimeout(() => {
        setError('');
      }, 5000);

      return;
    }
  }

  return (
    <form
      className={`${className} registerForm`}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="registerForm-title">Datos del administrador</h1>

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
              disabled
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
        <div className="passwordChange">
          <h4>Modifica tu contraseña</h4>
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
        </div>
      </div>

      {error && <p className="registerForm-error">{error}</p>}
      {message && <p className="registerForm-message">{message}</p>}

      <hr />

      <div className="registerForm-submit">
        <p>
          Recuerde que al darse de sigue bajo la conformidad de nuestra{' '}
          <a href="https://www.w3docs.com/privacy-policy">
            Política de Privacidad
          </a>
          .
        </p>

        <button onClick={handleClickOpen}>Eliminar administrador</button>

        <Dialog open={open} onClose={handleClose}>
          <div className="modificationForm-dialog">
            ¡Al eliminar el usuario perderá toda la información sobre su
            actividad!
            <button onClick={deleteClient}>Eliminar</button>
            <button onClick={handleClose}>Cancelar</button>
          </div>
        </Dialog>
      </div>
    </form>
  );
}
