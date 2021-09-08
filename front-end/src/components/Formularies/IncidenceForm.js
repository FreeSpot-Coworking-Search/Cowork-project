import '../Formularies/Form.css';

import { useState } from 'react';
import axios from 'axios';

import { isBetween } from '../../helpers/dateHelper';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function IncidenceForm({
    className,
    reservations,
    setReservations,
}) {
    const [incidence, setIncidence] = useState({
        categoria: 'Categoria 1',
        descripcion: '',
    });

    const [error, setError] = useState();
    const [error2, setError2] = useState();
    const [message, setMessage] = useState();
    const [message2, setMessage2] = useState();
    const [modification, setModification] = useState(false);

    const handleOnChange = (event, prop) => {
        setIncidence({
            ...incidence,
            [prop]: event.target.value,
        });
        setModification(true);
    };

    async function performSubmit(e) {
        e.preventDefault();
        try {
            if (!modification) {
                setError(
                    'Por favor, describe mejor la incidencia antes de reportar el problema.'
                );
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            }

            const index = reservations.findIndex((reserve) =>
                isBetween(reserve.fecha_inicio, reserve.fecha_fin)
            );

            if (index === -1) {
                setError('No cuenta con reservas activas en este momento.');
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            }

            setMessage('Enviando solicitud.');
            const route = `${host}:${port}/api/incidences/?id=${reservations[index].id}`;

            const response = await axios.post(route, incidence);
            if (response.status === 200) {
                setMessage('Incidencia Creada');

                const modifiedReservation = {
                    ...reservations[index],
                    incidencias: response.data,
                };

                reservations.splice(index, 1, modifiedReservation);

                setReservations([...reservations]);

                setIncidence({
                    categoria: 'Categoria 1',
                    descripcion: '',
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
            }, 3000);
        }
    }

    async function requestCleaning(e) {
        e.preventDefault();
        try {
            const index = reservations.findIndex((reserve) =>
                isBetween(reserve.fecha_inicio, reserve.fecha_fin)
            );
            if (index === -1) {
                setError2('No se encuentra reserva activa al día de hoy.');
                setTimeout(() => {
                    setError2('');
                }, 3000);
                return;
            }
            if (reservations[index].estado === 1) {
                setError2(
                    `El pedido de limpieza del espacio ${reservations[index].nombre} ya se encuentra efectuado.`
                );
                setTimeout(() => {
                    setError2('');
                }, 3000);
                return;
            }

            setMessage2('Enviando solicitud.');
            setTimeout(() => {
                setMessage2('');
            }, 3000);

            const route = `${host}:${port}/api/reserves/cleaning/?id=${reservations[index].id}`;

            const response = await axios.put(route, { estado: 1 });

            if (response.status === 200) {
                setMessage2('Pedido de limpieza creado');

                const modifiedReservation = {
                    ...reservations[index],
                    estado: response.data === true ? 1 : 0,
                };

                reservations.splice(index, 1, modifiedReservation);
                setReservations([...reservations]);

                setTimeout(() => {
                    setMessage2('');
                }, 2000);
            }
        } catch (error) {
            const {
                data: { message },
            } = error.response;

            message ? setError2(message) : setError2(error.message);
        }
    }

    return (
        <article className={`${className} reservesPresentation`}>
            <h3 className="reservesPresentation-presentationName">
                Requerir limpieza de espacio
            </h3>
            <form
                className={`${className} registerForm`}
                onSubmit={(e) => requestCleaning(e)}
            >
                <p>
                    Informa al anfitrión si quieres limpiar tu espacio
                    reservado.
                </p>
                {error2 && <p className="registerForm-error">{error2}</p>}
                {message2 && <p className="registerForm-message">{message2}</p>}
                <button>Requerir limpieza</button>
            </form>

            <h3 className="reservesPresentation-presentationName">
                Reportar nueva incidencia
            </h3>
            <form
                className={`${className} registerForm`}
                onSubmit={(e) => performSubmit(e)}
            >
                <fieldset>
                    <div className="form-element form-input">
                        <textarea
                            id="descripcion"
                            className="form-element-field"
                            placeholder="Cuentanos el problema así el anfitrión puede solucionarlo lo antes posible."
                            onChange={(event) =>
                                handleOnChange(event, 'descripcion')
                            }
                            maxLength="1000"
                            minLength="5"
                            rows="3"
                            value={incidence.descripcion}
                            required
                        />
                        <div className="form-element-bar"></div>
                        <label
                            className="form-element-label"
                            htmlFor="descripcion"
                        >
                            Descripción
                        </label>
                    </div>

                    <label htmlFor="categoria">
                        Clase{' '}
                        <select
                            id="categoria"
                            value={incidence.categoria}
                            onChange={(event) =>
                                handleOnChange(event, 'categoria')
                            }
                            required
                        >
                            <option value="Categoria 1">Categoría 1</option>
                            <option value="Categoria 2">Categoría 2</option>
                            <option value="Categoria 3">Categoría 3</option>
                        </select>
                    </label>
                </fieldset>

                {error && <p className="registerForm-error">{error}</p>}
                {message && <p className="registerForm-message">{message}</p>}
                <button>Reportar</button>
            </form>
        </article>
    );
}
