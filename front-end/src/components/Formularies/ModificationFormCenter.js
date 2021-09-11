import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import useDialog from '../../hooks/useDialog';
import '../Formularies/Form.css';

export default function ModificationFormCenter({
  className,
  center,
  setCenter,
}) {
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
    latitud: center.latitud,
    longitud: center.longitud,
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
        setMessage(
          'Datos del centro modificados. Veamos si todo esta correcto.'
        );
        setCenter((center) => {
          return {
            ...center,
            ...response.data.center,
          };
        });
        setTimeout(() => {
          setMessage('');
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
    <>
      <div className="form-limit" />
      <form className={`${className} form`} onSubmit={(e) => performSubmit(e)}>
        <fieldset>
          <div class="form-element form-input">
            <input
              id="nombreCentro"
              class="form-element-field"
              placeholder="Introduce el nombre del centro"
              type="input"
              required
              onChange={(event) => handleOnChange(event, 'nombre')}
              maxLength="20"
              minLength="1"
              value={centerInfo.nombre}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="nombreCentro">
              Nombre del centro
            </label>
          </div>
          <div class="form-element form-input">
            <input
              id="nombre_fiscal"
              class="form-element-field"
              placeholder="Ahora el nombre de la sociedad"
              type="text"
              required
              onChange={(event) => handleOnChange(event, 'nombre_fiscal')}
              maxLength="50"
              minLength="1"
              value={centerInfo.nombre_fiscal}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="nombre_fiscal">
              Nombre Fiscal
            </label>
          </div>

          <div class="form-element form-input">
            <input
              id="direccion"
              class="form-element-field"
              placeholder="Seguimos con la dirección del centro"
              type="text"
              onChange={(event) => handleOnChange(event, 'direccion')}
              maxLength="50"
              minLength="1"
              value={centerInfo.direccion}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="direccion">
              Dirección
            </label>
          </div>

          <div class="form-element form-input">
            <input
              id="localidad"
              class="form-element-field"
              placeholder="Es turno de la localidad"
              type="text"
              onChange={(event) => handleOnChange(event, 'localidad')}
              maxLength="70"
              minLength="1"
              value={centerInfo.localidad}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="localidad">
              Localidad
            </label>
          </div>
          <div class="form-element form-input">
            <input
              id="codigo_postal"
              class="form-element-field"
              placeholder="Bien, el codigo postal"
              onChange={(event) => handleOnChange(event, 'codigo_postal')}
              maxLength="5"
              minLength="5"
              value={centerInfo.codigo_postal}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="codigo_postal">
              Codigo Postal
            </label>
          </div>
          <div class="form-element form-input">
            <input
              id="iban"
              class="form-element-field"
              placeholder="El IBAN de la cuenta donde ingresaran los pagos"
              type="number"
              onChange={(event) => handleOnChange(event, 'iban')}
              maxLength="34"
              minLength="1"
              value={centerInfo.iban}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="iban">
              IBAN
            </label>
          </div>
          <div class="form-element form-input">
            <input
              id="telefono"
              class="form-element-field"
              placeholder="Queda poco! El telefono de contacto."
              type="string"
              onChange={(event) => handleOnChange(event, 'telefono')}
              maxLength="12"
              minLength="9"
              value={centerInfo.telefono}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="telefono">
              Telefono
            </label>
          </div>
          <div class="form-element form-input">
            <input
              id="email"
              class="form-element-field"
              placeholder="Seguimos con el correo electronico"
              type="email"
              onChange={(event) => handleOnChange(event, 'email')}
              maxLength="20"
              value={centerInfo.email}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="email">
              Email
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="lat"
              className="form-element-field"
              placeholder="Localicemos el centro. Primero la latitud."
              type="number"
              onChange={(event) => handleOnChange(event, 'latitud')}
              maxLength="34"
              required
              minLength="1"
              value={centerInfo.latitud}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="iban">
              Latitud
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="long"
              className="form-element-field"
              placeholder="Ahora la longitud"
              type="number"
              onChange={(event) => handleOnChange(event, 'longitud')}
              maxLength="34"
              required
              minLength="1"
              value={centerInfo.longitud}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="iban">
              Longitud
            </label>
          </div>
          <div class="form-element form-input">
            <textarea
              id="equipamiento"
              class="form-element-field"
              placeholder="Describe a tu futuros clientes de que servicios dispondran"
              onChange={(event) => handleOnChange(event, 'equipamiento')}
              maxLength="1000"
              rows="3"
              value={centerInfo.equipamiento}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="equipamiento">
              Equipamiento
            </label>
          </div>
          <div class="form-element form-input">
            <textarea
              id="descripcion"
              class="form-element-field"
              placeholder="Dinos porque nos va a encantar tu centro"
              onChange={(event) => handleOnChange(event, 'descripcion')}
              maxLength="1000"
              rows="3"
              value={centerInfo.descripcion}
            />
            <div class="form-element-bar"></div>
            <label class="form-element-label" for="descripcion">
              Descripción
            </label>
          </div>
        </fieldset>
        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-message">{message}</p>}
        <button>Enviar</button>
        <button onClick={handleClickOpen}>Eliminar centro</button>

        <Dialog open={open} onClose={handleClose}>
          <div className="modificationForm-dialog">
            ¡Al eliminar el centro perderá toda la información sobre su
            actividad!
            <button onClick={deleteCenter}>Eliminar</button>
            <button onClick={handleClose}>Cancelar</button>
          </div>
        </Dialog>
      </form>
      <div className="form-limit" />
    </>
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
