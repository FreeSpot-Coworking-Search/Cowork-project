import '../Formularies/Form.css';

import { useState } from 'react';
import axios from 'axios';

import { isBetween } from '../../helpers/dateHelper';

export default function IncidenceForm({
    className,
    reservations,
    setReservations,
}) {
    const {
        REACT_APP_API_LOCAL_SERVER_HOST: host,
        REACT_APP_API_LOCAL_SERVER_PORT: port,
    } = process.env;

    const [incidence, setIncidence] = useState({
        categoria: 'Categoria 1',
        descripcion: '',
    });

    const [error, setError] = useState();
    const [message, setMessage] = useState();
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

            setMessage('Enviando datos');
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

    return (
        <article className={`${className} reservesPresentation`}>
            <h3 className="reservesPresentation-presentationName">
                Reportar Nueva Incidencia
            </h3>
            <form
                className={`${className} registerForm`}
                onSubmit={(e) => performSubmit(e)}
            >
                <fieldset>
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

                    <div className="form-element form-input">
                        <textarea
                            id="descripcion"
                            className="form-element-field"
                            placeholder="Dinos porque nos va a encantar tu centro"
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
                </fieldset>

                <br />

                {error && <p className="registerForm-error">{error}</p>}
                {message && <p className="registerForm-message">{message}</p>}
                <button>Reportar</button>
            </form>
        </article>
    );
}
