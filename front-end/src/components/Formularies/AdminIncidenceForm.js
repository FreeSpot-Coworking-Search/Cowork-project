import '../Formularies/Form.css';

import { useState } from 'react';
import axios from 'axios';

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function AdminIncidenceForm({
  className,
  incident,
  index,
  spaceData,
  setSpace,
}) {
  const [incidence, setIncidence] = useState(incident);

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [modification, setModification] = useState(false);

  const handleOnChange = (event, prop) => {
    setIncidence({
      ...incidence,
      [prop]: event.target.value,
      estado: 1,
    });
    setModification(true);
  };

  async function performSubmit(e) {
    e.preventDefault();
    try {
      if (!modification) {
        setError('Por favor, expecifica una respuesta');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }

      setMessage('Enviando solicitud.');
      const route = `${host}:${port}/api/incidences/?id=${incidence.id}`;

      const response = await axios.put(route, {
        respuesta: incidence.respuesta,
      });
      if (response.status === 200) {
        setMessage('Incidencia actualizada');
        const newSpace = {
          ...spaceData,
          incidencias: [...spaceData.incidencias],
        };
        newSpace.incidencias[index] = incidence;
        setSpace(newSpace);
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
      }, 3000);
    }
  }

  return (
    <form className={`${className} form`} onSubmit={(e) => performSubmit(e)}>
      <fieldset>
        <div className="form-element form-input">
          <textarea
            id="respuesta"
            className="form-element-field"
            placeholder="Responde a tu cliente para demostrar tu interes por su incidencia"
            onChange={(event) => handleOnChange(event, 'respuesta')}
            maxLength="1000"
            minLength="5"
            rows="3"
            value={incidence.respuesta}
            required
          />
          <div className="form-element-bar"></div>
          <label className="form-element-label" htmlFor="descripcion">
            Respuesta
          </label>
        </div>
      </fieldset>

      {error && <p className="form-error">{error}</p>}
      {message && <p className="form-message">{message}</p>}
      <button>Actualizar</button>
    </form>
  );
}
