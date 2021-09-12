import '../Formularies/Form.css';

import { useState } from 'react';
import axios from 'axios';

export default function RegistrationFormCenter({ className }) {
  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
  } = process.env;

  const INITIAL_CENTER_INFO = {
    nombre: '',
    nombre_fiscal: '',
    direccion: '',
    localidad: '',
    codigo_postal: '',
    iban: '',
    telefono: '',
    email: '',
    equipamiento: '',
    descripcion: '',
  };

  const [centerInfo, setCenterInfo] = useState(INITIAL_CENTER_INFO);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const handleOnChange = (event, prop) => {
    setCenterInfo({
      ...centerInfo,
      [prop]: event.target.value,
    });
  };

  async function performSubmit(e) {
    e.preventDefault();
    try {
      setMessage('Enviando datos');
      const route = `${host}:${port}/api/centers/`;

      const response = await axios.post(route, centerInfo);
      if (response.status === 200) {
        setMessage('Genial! Has creado un nuevo centro!');
        setTimeout(() => {
          setMessage('');
        }, 5000);
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
      <form onSubmit={(e) => performSubmit(e)} className={`${className} form`}>
        <h3>Crea tu nuevo centro</h3>
        <fieldset>
          <div className="form-element form-input">
            <input
              id="nombreCentro"
              className="form-element-field"
              placeholder="Introduce el nombre del centro"
              type="input"
              required
              onChange={(event) => handleOnChange(event, 'nombre')}
              maxLength="20"
              minLength="1"
              value={centerInfo.nombre}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="nombreCentro">
              Nombre del centro
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="nombre_fiscal"
              className="form-element-field"
              placeholder="Ahora el nombre de la sociedad"
              type="text"
              required
              onChange={(event) => handleOnChange(event, 'nombre_fiscal')}
              maxLength="50"
              minLength="1"
              value={centerInfo.nombre_fiscal}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="nombre_fiscal">
              Nombre Fiscal
            </label>
          </div>

          <div className="form-element form-input">
            <input
              id="direccion"
              className="form-element-field"
              placeholder="Seguimos con la dirección del centro"
              type="text"
              required
              onChange={(event) => handleOnChange(event, 'direccion')}
              maxLength="50"
              minLength="1"
              value={centerInfo.direccion}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="direccion">
              Dirección
            </label>
          </div>

          <div className="form-element form-input">
            <input
              id="localidad"
              className="form-element-field"
              placeholder="Es turno de la localidad"
              type="text"
              required
              onChange={(event) => handleOnChange(event, 'localidad')}
              maxLength="70"
              minLength="1"
              value={centerInfo.localidad}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="localidad">
              Localidad
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="codigo_postal"
              className="form-element-field"
              placeholder="Bien, el codigo postal"
              onChange={(event) => handleOnChange(event, 'codigo_postal')}
              maxLength="5"
              required
              minLength="5"
              value={centerInfo.codigo_postal}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="codigo_postal">
              Codigo Postal
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="iban"
              className="form-element-field"
              placeholder="El IBAN de la cuenta donde ingresaran los pagos"
              type="number"
              onChange={(event) => handleOnChange(event, 'iban')}
              maxLength="34"
              required
              minLength="1"
              value={centerInfo.iban}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="iban">
              IBAN
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="telefono"
              className="form-element-field"
              placeholder="Queda poco! El telefono de contacto."
              type="string"
              onChange={(event) => handleOnChange(event, 'telefono')}
              maxLength="12"
              minLength="9"
              value={centerInfo.telefono}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="telefono">
              Telefono
            </label>
          </div>
          <div className="form-element form-input">
            <input
              id="email"
              className="form-element-field"
              placeholder="Seguimos con el correo electronico"
              type="email"
              onChange={(event) => handleOnChange(event, 'email')}
              maxLength="20"
              value={centerInfo.email}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="email">
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
          <div className="form-element form-input">
            <textarea
              id="equipamiento"
              className="form-element-field"
              placeholder="Describe a tu futuros clientes de que servicios dispondran"
              onChange={(event) => handleOnChange(event, 'equipamiento')}
              maxLength="1000"
              rows="3"
              value={centerInfo.equipamiento}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="equipamiento">
              Equipamiento
            </label>
          </div>
          <div className="form-element form-input">
            <textarea
              id="descripcion"
              className="form-element-field"
              placeholder="Dinos porque nos va a encantar tu centro"
              onChange={(event) => handleOnChange(event, 'descripcion')}
              maxLength="1000"
              rows="3"
              value={centerInfo.descripcion}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" for="descripcion">
              Descripción
            </label>
          </div>
        </fieldset>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-message">{message}</p>}

        <button>Crear</button>
      </form>
      <div className="form-limit" />
    </>
  );
}
