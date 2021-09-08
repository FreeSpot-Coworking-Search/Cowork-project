import './CleaningCard.css';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';
import axios from 'axios';

export default function CleaningCard({ space, setSpace }) {
  return (
    <li className="cleaningCard">
      <p>{space.nombre}</p>
      <p>{space.tipo}</p>
      <button onClick={() => CleanSpace(space, setSpace)}>
        <img src={cleaningIcon} alt="Icono limpieza" />
        Marcar como limpio
      </button>
    </li>
  );
}
async function CleanSpace(space, setSpace) {
  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
  } = process.env;
  const route = `${host}:${port}/api/spaces/?id=${space.id}`;

  const response = await axios.put(route, { ...space, estado: 1 });

  if (response.status === 200) {
    setSpace({ ...space, estado: 0 });
  }
}
