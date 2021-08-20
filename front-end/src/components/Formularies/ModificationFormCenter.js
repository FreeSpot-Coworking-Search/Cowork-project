import './registrationForm.css';
import infoIcon from '../../assets/icons/bx-info-circle.svg';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import useDialog from '../../hooks/useDialog';

export default function ModificationFormCenter({ className, center }) {
  const { open, handleClickOpen, handleClose } = useDialog();
  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
  } = process.env;

  const INITIAL_CENTER_INFO = {
    nombre: center.nombre,
    nombre_fiscal: center.nombre_fiscal,
    direccion: center.direccion,
    localidad: center.localidad,
    codigo_postal: center.codigo_postal,
    iban: center.iban,
    telefono: center.telefono,
    email: center.email,
    equipamiento: center.equipamiento,
    descripcion: center.descripcion,
  };
  const handleOnChange = (event, prop) => {
    setCenterInfo({
      ...centerInfo,
      [prop]: event.target.value,
    });
    setModification(true);
  };

  const [centerInfo, setCenterInfo] = useState(INITIAL_CENTER_INFO);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [modification, setModification] = useState(false);

  async function deleteCenter(e) {
    e.preventDefault();
    try {
      const route = `${host}:${port}/api/centers/?id=${center.id}`;
      const response = axios.delete(route);

      if (response.status === 200) {
        setError('Centro eliminado');
        setTimeout(() => {
          <Redirect to="/" />;
        }, 5000);
      }
    } catch (error) {
      setError('Ha habido algun error');
      setTimeout(() => {
        setError('');
      }, 5000);

      return;
    }
  }
  async function performSubmit(e) {
    e.preventDefault();
    try {
      if (!modification) {
        setError(
          'Debes tener habilitada la modificación antes de poder guardar los cambios.'
        );
        setTimeout(() => {
          setError('');
        }, 5000);
        return;
      }

      setMessage('Enviando datos');

      const route = `${host}:${port}/api/centers/?id=${center.id}`;

      const response = await axios.put(route, centerInfo);
      if (response.status === 200) {
        setMessage('Datos del centro modificados.');
        setTimeout(() => {
          setMessage('');
          <Redirect to={`/center?id_centro=${center.id}`} />;
        }, 2000);
        setModification(false);
      }
    } catch (error) {
      setMessage('');

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
    <form
      className={`${className} registerForm`}
      onSubmit={(e) => performSubmit(e)}
    >
      <fieldset>
        <label>
          <img src={infoIcon} alt="Nombre del centro" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'nombre')}
            placeholder="Nombre del centro"
            required
            maxLength="20"
            minLength="1"
            value={centerInfo.nombre}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Nombre fiscal" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'nombre_fiscal')}
            placeholder="Nombre Fiscal"
            maxLength="50"
            minLength="1"
            value={centerInfo.nombre_fiscal}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Direccion" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'direccion')}
            placeholder="Direccion"
            maxLength="50"
            minLength="1"
            value={centerInfo.direccion}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Localidad" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'localidad')}
            placeholder="Localidad"
            maxLength="70"
            minLength="1"
            value={centerInfo.localidad}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Codigo Postal" />
          <input
            type="number"
            onChange={(event) => handleOnChange(event, 'codigo_postal')}
            placeholder="codigo_postal"
            maxLength="5"
            minLength="5"
            value={centerInfo.codigo_postal}
          />
        </label>
        <label>
          <img src={infoIcon} alt="IBAN" />
          <input
            type="number"
            onChange={(event) => handleOnChange(event, 'iban')}
            placeholder="IBAN"
            maxLength="34"
            minLength="1"
            value={centerInfo.iban}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Telefono" />
          <input
            type="string"
            onChange={(event) => handleOnChange(event, 'telefono')}
            placeholder="Telefono"
            maxLength="12"
            minLength="9"
            value={centerInfo.telefono}
          />
        </label>
        <label>
          <img src={infoIcon} alt="email" />
          <input
            type="email"
            onChange={(event) => handleOnChange(event, 'email')}
            placeholder="email"
            maxLength="20"
            value={centerInfo.email}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Equipamiento" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'equipamiento')}
            placeholder="Equipamiento"
            maxLength="1000"
            value={centerInfo.equipamiento}
          />
        </label>
        <label>
          <img src={infoIcon} alt="Descripcion" />
          <input
            type="text"
            onChange={(event) => handleOnChange(event, 'descripcion')}
            placeholder="Descripcion"
            maxLength="1000"
            value={centerInfo.descripcion}
          />
        </label>
      </fieldset>
      {error && <p className="registerForm-error">{error}</p>}
      {message && <p className="registerForm-message">{message}</p>}
      <button>Enviar</button>
      <button onClick={handleClickOpen}>Eliminar centro</button>

      <Dialog open={open} onClose={handleClose}>
        <div className="modificationForm-dialog">
          ¡Al eliminar el centro perderá toda la información sobre su actividad!
          <button onClick={deleteCenter}>Eliminar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Dialog>
    </form>
  );
}

// nombre: Joi.string().min(1).max(50),
// nombre_fiscal: Joi.string().required().min(1).max(50),
// direccion: Joi.string().required().min(1).max(50),
// localidad: Joi.string().required().min(1).max(70),
// codigo_postal: Joi.string().required().min(1).max(10),
// iban: Joi.string().required().min(1).max(34),
// telefono: Joi.string().max(15),
// email: Joi.string().required().email().max(50),
// equipamiento: Joi.string().max(1000),
// descripcion: Joi.any(),
