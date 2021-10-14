import '../Formularies/Form.css';

import { toFormDate } from '../../helpers/dateHelper';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { getHost } from '../../helpers/environmentHelpers';

export default function ReservesScoreForm({
    className,
    reservations,
    setReservations,
    refReservation,
}) {
    const [feedBack, setFeedBack] = useState(refReservation);

    useEffect(() => {
        const newReservation = refReservation;
        setFeedBack({
            ...newReservation,
            comentario_usuario: newReservation.comentario_usuario || '',
            puntuacion_usuario: newReservation.puntuacion_usuario || 5,
        });
    }, [refReservation]);

    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [modification, setModification] = useState(false);

    const handleOnChange = (event, prop) => {
        setFeedBack({
            ...feedBack,
            [prop]: event.target.value,
        });
        setModification(true);
    };

    async function performSubmit(e) {
        e.preventDefault();
        try {
            const index = reservations.findIndex(
                (reserve) => reserve.id === feedBack.id
            );

            if (index === -1) {
                setError('La reserva que buscas no existe.');
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            }

            if (reservations[index].puntuacion_usuario !== null) {
                setError('La reserva ya ha sido puntuado anteriormente.');
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            }

            if (!modification) {
                setError(
                    'Por favor, elije al menos una puntuación antes de puntuar el espacio.'
                );
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            }

            setMessage('Enviando solicitud.');
            const route = `${getHost()}/api/reserves/rate/?id=${
                reservations[index].id
            }`;

            const response = await axios.put(route, {
                puntuacion_usuario: Number(feedBack.puntuacion_usuario),
                comentario_usuario: feedBack.comentario_usuario
                    ? feedBack.comentario_usuario.toString()
                    : ' ',
            });
            if (response.status === 200) {
                setMessage('Reserva puntuada');

                reservations.splice(index, 1, feedBack);

                setReservations([...reservations]);

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
                Valorar reserva de espacio {feedBack.nombre}
            </h3>
            <h3>
                Fecha inicio: {toFormDate(feedBack.fecha_inicio)} / Fecha fin:{' '}
                {toFormDate(feedBack.fecha_fin)}
            </h3>
            <form
                className={`${className} form`}
                onSubmit={(e) => performSubmit(e)}
            >
                <fieldset>
                    <div className="form-element form-input">
                        <textarea
                            id="comentario_usuario"
                            className="form-element-field"
                            placeholder="Deja tus experiencias de tu estancia así los demás usuarios pueden conocer mejor el lugar!"
                            onChange={(event) =>
                                handleOnChange(event, 'comentario_usuario')
                            }
                            maxLength="1000"
                            rows="3"
                            value={feedBack.comentario_usuario}
                            required
                        />
                        <div className="form-element-bar"></div>
                        <label
                            className="form-element-label"
                            htmlFor="comentario_usuario"
                        >
                            Comentarios
                        </label>
                    </div>

                    <label htmlFor="puntuacion_usuario">
                        Puntuación{' '}
                        <select
                            id="puntuacion_usuario"
                            value={feedBack.puntuacion_usuario}
                            onChange={(event) =>
                                handleOnChange(event, 'puntuacion_usuario')
                            }
                            required
                        >
                            <option value="5">5 Estrellas</option>
                            <option value="4">4 Estrellas</option>
                            <option value="3">3 Estrellas</option>
                            <option value="2">2 Estrellas</option>
                            <option value="1">1 Estrellas</option>
                        </select>
                    </label>
                </fieldset>

                {error && <p className="form-error">{error}</p>}
                {message && <p className="form-message">{message}</p>}
                <button>Puntuar</button>
            </form>
        </article>
    );
}
