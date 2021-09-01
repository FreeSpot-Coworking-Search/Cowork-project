import { useState, useMemo } from 'react';
import { useHistory } from 'react-router';

//import { arrangeServices } from '../../helpers/servicesHelper';
import axios from 'axios';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function ModificationFormSpace({ className, spaceData }) {
    const history = useHistory();
    const arrangedServices = useMemo(() => spaceData, [spaceData]);

    const [services, setServices] = useState(arrangedServices);

    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [modification, setModification] = useState(false);

    async function performSubmit(e) {
        e.preventDefault();
        try {
            setMessage('Enviando datos');

            const route = `${host}:${port}/api/spaces/?id=${spaceData.id}`;

            const servicios = services
                .filter(
                    (service) =>
                        service.checked === true && Number(service.precio) === 0
                )
                .map((servicio) => ({ id: servicio.id }));
            console.log(servicios);
            const servicios_extra = services
                .filter(
                    (service) =>
                        service.checked === true && Number(service.precio) !== 0
                )
                .map((servicio) => ({
                    id: servicio.id,
                    precio: servicio.precio,
                }));
            console.log(servicios_extra);

            const updateObject = {
                nombre: spaceData.nombre,
                tipo: spaceData.tipo,
                precio: spaceData.precio,
                reserva_minima: spaceData.reserva_minima,
                capacidad_maxima: spaceData.capacidad_maxima,
                descripcion: spaceData.descripcion,
                visible: spaceData.visible,
                servicios,
                servicios_extra,
            };

            console.log(updateObject);

            const response = await axios.put(route, updateObject);
            if (response.status === 200) {
                setMessage('Datos del espacio modificados.');
                setTimeout(() => {
                    setMessage('');
                    history.go(0);
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

    function changeCheckBox(index) {
        const changingService = services[index];
        changingService.checked = !changingService.checked;
        const newArray = services;
        newArray.splice(index, 1, changingService);
        if (modification === false) setModification(true);
        setServices([...newArray]);
    }

    const handleInputChange = (event, index) => {
        const changingService = services[index];
        changingService.precio = event.target.value;
        const newArray = services;
        newArray.splice(index, 1, changingService);
        if (modification === false) setModification(true);
        setServices([...newArray]);
    };

    return (
        <article className={`${className} presentation`}>
            <h3 className="presentationName">Modificación de servicios</h3>
            {/* <form className="registerForm" onSubmit={(e) => performSubmit(e)}>
                <h1 className="registerForm-title">Servicios a incluir</h1>
                <hr />
                <fieldset>
                    <ol className="registerForm-list">
                        {services.map((service, index) => {
                            return (
                                <li>
                                    <label
                                        htmlFor={service.name}
                                        key={`checked-${service.name}-${service.id}`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={service.name}
                                            checked={service.checked}
                                            onChange={() =>
                                                changeCheckBox(index)
                                            }
                                        />
                                        <span>{service.nombre}</span>
                                    </label>

                                    <input
                                        type="number"
                                        id={service.name}
                                        value={service.precio}
                                        min="0.00"
                                        max="9999.50"
                                        step="0.50"
                                        onChange={(event) =>
                                            handleInputChange(event, index)
                                        }
                                        disabled={!service.checked}
                                    />
                                    <span>€/dia</span>
                                </li>
                            );
                        })}
                    </ol>
                </fieldset>
                <hr />
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
                <button disabled={!modification}>Modificar datos</button>
            </form> */}
        </article>
    );
}
