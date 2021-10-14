import './CleaningCard.css';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import axios from 'axios';
import { getHost } from '../../helpers/environmentHelpers';

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
    const route = `${getHost()}/api/spaces/?id=${space.id}`;

    const response = await axios.put(route, { estado: 1 });
    const index = spaces.findIndex((spaceItem) => spaceItem.id === space.id);
    const cleanedSpace = {
        ...space,
        estado: 1,
    };

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
