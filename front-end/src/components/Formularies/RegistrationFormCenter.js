import '../Formularies/Form.css';

import { useState } from 'react';
import useDialog from '../../hooks/useDialog';
import axios from 'axios';

export default function RegistrationFormCenter({ className }) {
  //   const { open, handleClickOpen, handleClose } = useDialog();
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
  //   const [modification, setModification] = useState(false);

  const handleOnChange = (event, prop) => {
    setCenterInfo({
      ...centerInfo,
      [prop]: event.target.value,
    });
    // setModification(true);
  };

  async function performSubmit() {
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
      <div className="registerForm-limit" />
      <form
        onSubmit={(e) => performSubmit(e)}
        className={`${className} registerForm`}
      >
        <h3>Crea tu nuevo centro</h3>
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
              required
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
              required
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
              required
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
              required
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

        {error && <p className="registerForm-error">{error}</p>}
        {message && <p className="registerForm-message">{message}</p>}

        <button>Crear</button>
      </form>
      <div className="registerForm-limit" />
    </>
  );
}
