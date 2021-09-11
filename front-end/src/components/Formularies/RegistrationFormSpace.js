import '../Formularies/Form.css';

import { useState, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function ModificationFormSpace({
  className,
  centers,
  selectedCenter,
}) {
  const INITIAL_SPACE_INFO = {
    nombre: '',
    tipo: 'Mesa Flex',
    precio: '',
    reserva_minima: '',
    capacidad_maxima: '',
    descripcion: '',
    visible: 1,
    servicios: '',
    servicios_extra: '',
    id_centro: centers[selectedCenter].id,
    estado: 1,
  };

  const [spaceInfo, setSpaceInfo] = useState(INITIAL_SPACE_INFO);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const handleInputChange = (event, prop) => {
    setSpaceInfo({
      ...spaceInfo,
      [prop]: event.target.value,
    });
  };

  async function performSubmit(e) {
    e.preventDefault();
    try {
      setMessage('Enviando datos');

      const route = `${host}:${port}/api/spaces/`;

      const spaceInfoObject = {
        ...spaceInfo,
        visible: Number(spaceInfo.visible),
      };

      const response = await axios.post(route, spaceInfoObject);
      if (response.status === 200) {
        setMessage('Genial! Has creado un nuevo espacio!');
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
    <article className={`${className}`}>
      <form className="form" onSubmit={(e) => performSubmit(e)}>
        <fieldset>
          <div className="form-element form-input">
            <input
              id="nombreEspacio"
              className="form-element-field"
              placeholder="Introduce el nombre del centro"
              type="text"
              onChange={(event) => handleInputChange(event, 'nombre')}
              placeholder=" Nombre espacio"
              required
              maxLength="20"
              minLength="1"
              value={spaceInfo.nombre}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" htmlFor="nombreEspacio">
              Nombre
            </label>
          </div>

          <div className="form-element form-input">
            <input
              id="precio"
              className="form-element-field"
              type="number"
              onChange={(event) => handleInputChange(event, 'precio')}
              placeholder="20.00"
              required
              step="0.01"
              min="1"
              value={spaceInfo.precio}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" htmlFor="precio">
              Precio
            </label>
          </div>

          <div className="form-element form-input">
            <input
              id="reserva_minima"
              className="form-element-field"
              type="number"
              onChange={(event) => handleInputChange(event, 'reserva_minima')}
              placeholder="2 días"
              required
              step="1"
              min="1"
              value={spaceInfo.reserva_minima}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" htmlFor="reserva_minima">
              Mínimo de días reservables
            </label>
          </div>

          <div className="form-element form-input">
            <input
              id="capacidad_maxima"
              className="form-element-field"
              type="number"
              onChange={(event) => handleInputChange(event, 'capacidad_maxima')}
              placeholder="1 persona"
              required
              step="1"
              min="1"
              value={spaceInfo.capacidad_maxima}
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" htmlFor="capacidad_maxima">
              Maxímo de personas en el espacio
            </label>
          </div>
          <div className="form-element form-input">
            <textarea
              id="descripcion"
              className="form-element-field"
              value={spaceInfo.descripcion}
              onChange={(event) => handleInputChange(event, 'descripcion')}
              rows="5"
              cols="30"
              maxLength="1000"
              placeholder=" Espacio iluminado..."
            />
            <div className="form-element-bar"></div>
            <label className="form-element-label" htmlFor="descripcion">
              Descripción
            </label>
          </div>
          <label htmlFor="tipo">
            Tipo
            <select
              id="tipo"
              value={spaceInfo.tipo}
              onChange={(event) => handleInputChange(event, 'tipo')}
              required
            >
              <option value="Mesa Flex">Mesa Flex</option>
              <option value="Mesa Fija">Mesa Fija</option>
              <option value="Despacho">Despacho</option>
              <option value="Sala de reuniones">Sala de reuniones</option>
            </select>
          </label>
          <label htmlFor="visible">
            Visibilidad
            <select
              htmlFor="visible"
              value={spaceInfo.visible}
              onChange={(event) => handleInputChange(event, 'visible')}
              required
            >
              <option value="1">Activa</option>
              <option value="0">Oculto</option>
            </select>
          </label>
        </fieldset>

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <button>Crear espacio</button>
      </form>
    </article>
  );
}
