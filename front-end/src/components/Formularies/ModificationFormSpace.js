import './registrationForm.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Dialog } from '@material-ui/core';
import useDialog from '../../hooks/useDialog';

export default function ModificationFormSpace({ className, spaceData }) {
    const { open, handleClickOpen, handleClose } = useDialog();
    const {
        REACT_APP_API_LOCAL_SERVER_HOST: host,
        REACT_APP_API_LOCAL_SERVER_PORT: port,
    } = process.env;

    const INITIAL_SPACE_INFO = {
        //nombre: spaceData.nombre,
        tipo: spaceData.tipo,
        precio: spaceData.precio,
        reserva_minima: spaceData.reserva_minima,
        capacidad_maxima: spaceData.capacidad_maxima,
        descripcion: spaceData.descripcion,
        visible: spaceData.visible,
        servicios: spaceData.servicios,
        servicios_extra: spaceData.servicios_extra,
    };

    const [spaceInfo, setSpaceInfo] = useState(INITIAL_SPACE_INFO);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [modification, setModification] = useState(false);

    const handleInputChange = (event, prop) => {
        setSpaceInfo({
            ...spaceInfo,
            [prop]: event.target.value,
        });
        setModification(true);
    };

    async function deleteSpace(e) {
        e.preventDefault();
        try {
            const route = `${host}:${port}/api/spaces/?id=${spaceData.id}`;
            const response = axios.delete(route);

            if (response.status === 200) {
                setError('Espacio eliminado');
                setTimeout(() => {
                    <Redirect to="/" />;
                }, 5000);
            }
        } catch (error) {
            setError('Ha habido algun error al eliminar el espacio.');
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

            const route = `${host}:${port}/api/spaces/?id=${spaceData.id}`;

            const spaceInfoObject = {
                ...spaceInfo,
                visible: Number(spaceInfo.visible),
            };

            const response = await axios.put(route, spaceInfoObject);
            if (response.status === 200) {
                setMessage('Datos del espacio modificados.');
                setTimeout(() => {
                    setMessage('');
                    <Redirect
                        to={`/space?space=${spaceData.id}&id_centro=${spaceData.id_centro}`}
                    />;
                }, 5000);
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
        <article className={`${className}`}>
            <form className="registerForm" onSubmit={(e) => performSubmit(e)}>
                <h1 className="registerForm-title">Modificación de espacio</h1>
                <hr />
                <fieldset>
                    {/* 
  nombre: tipo text
  tipo: Joi.valid('Mesa Flex', 'Mesa Fija', 'Despacho', 'Sala de reuniones'),
  precio: Joi.number().precision(2),
  reserva_minima: Joi.number().max(365),
  capacidad_maxima: Joi.number().integer(),
  descripcion: Joi.string().min(1).max(1000),
  estado: Joi.valid(0, 1),
  visible: Joi.valid(0, 1),
*/}

                    <label>
                        Nombre
                        <input
                            type="text"
                            /* onChange={(event) =>
                                handleInputChange(event, 'nombre')
                            } */
                            placeholder=" Nombre espacio"
                            required
                            maxLength="20"
                            minLength="1"
                            value={spaceInfo.nombre}
                        />
                    </label>

                    <label htmlFor="tipo">
                        Tipo
                        <select
                            id="tipo"
                            value={spaceInfo.tipo}
                            onChange={(event) =>
                                handleInputChange(event, 'tipo')
                            }
                            required
                        >
                            <option value="Mesa Flex">Mesa Flex</option>
                            <option value="Mesa Fija">Mesa Fija</option>
                            <option value="Despacho">Despacho</option>
                            <option value="Sala de reuniones">
                                Sala de reuniones
                            </option>
                        </select>
                    </label>

                    <label>
                        Precio
                        <input
                            type="number"
                            onChange={(event) =>
                                handleInputChange(event, 'precio')
                            }
                            placeholder="20.00"
                            required
                            step="0.50"
                            min="1"
                            value={spaceInfo.precio}
                        />
                        €/dia
                    </label>

                    <label>
                        Reserva mínima
                        <input
                            type="number"
                            onChange={(event) =>
                                handleInputChange(event, 'reserva_minima')
                            }
                            placeholder="2 días"
                            required
                            step="1"
                            min="1"
                            value={spaceInfo.reserva_minima}
                        />
                        dias
                    </label>

                    <label>
                        Capacidad máxima
                        <input
                            type="number"
                            onChange={(event) =>
                                handleInputChange(event, 'capacidad_maxima')
                            }
                            placeholder="1 persona"
                            required
                            step="1"
                            min="1"
                            value={spaceInfo.capacidad_maxima}
                        />
                        personas
                    </label>

                    <label htmlFor="visible">
                        Visibilidad
                        <select
                            htmlFor="visible"
                            value={spaceInfo.visible}
                            onChange={(event) =>
                                handleInputChange(event, 'visible')
                            }
                            required
                        >
                            <option value="1">Activado</option>
                            <option value="0">Oculto</option>
                        </select>
                    </label>

                    <label>
                        Descripción
                        <textarea
                            value={spaceInfo.descripcion}
                            onChange={(event) =>
                                handleInputChange(event, 'descripcion')
                            }
                            rows="5"
                            cols="30"
                            maxLength="1000"
                            placeholder=" Espacio iluminado..."
                        />
                    </label>
                </fieldset>

                {error && <p className="registerForm-error">{error}</p>}
                {message && <p className="registerForm-message">{message}</p>}

                <hr />

                <button disabled={!modification}>Modificar datos</button>
                <button onClick={handleClickOpen}>Eliminar espacio</button>

                <Dialog open={open} onClose={handleClose}>
                    <div className="modificationForm-dialog">
                        ¡Al eliminar el espacio perderá toda la información
                        sobre su actividad!
                        <button onClick={deleteSpace}>Eliminar</button>
                        <button onClick={handleClose}>Cancelar</button>
                    </div>
                </Dialog>
            </form>
        </article>
    );
}
