import './CleaningCard.css';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import axios from 'axios';

export default function CleaningCard({ space, setCenter, spaces }) {
    return (
        <li className="cleaningCard">
            <p>{space.nombre}</p>
            <p>{space.tipo}</p>
            <button onClick={() => CleanSpace(space, setCenter, spaces)}>
                <img src={cleaningIcon} alt="Icono limpieza" />
                Marcar como limpio
            </button>
        </li>
    );
}
async function CleanSpace(space, setCenter, spaces) {
    const {
        REACT_APP_API_LOCAL_SERVER_HOST: host,
        REACT_APP_API_LOCAL_SERVER_PORT: port,
    } = process.env;
    const route = `${host}:${port}/api/spaces/?id=${space.id}`;

    const response = await axios.put(route, { estado: 0 });
    const index = spaces.findIndex((spaceItem) => spaceItem.id === space.id);
    const cleanedSpace = {
        ...space,
        estado: 0,
    };
    console.log(index);
    if (response.status === 200) {
        setCenter((center) => ({
            ...center,
            espacios: [
                ...center.espacios.slice(0, index),
                cleanedSpace,
                ...center.espacios.slice(index + 1),
            ],
        }));
    }
}

//revisar como destructurar espacios
