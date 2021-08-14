import './CleaningCard.css';
import cleaningIcon from '../../assets/icons/carbon_clean.svg';

export default function CleaningCard({ space }) {
  return (
    <li className="cleaningCard">
      <p>{space.id}</p>
      <p>{space.tipo}</p>
      <button>
        <img src={cleaningIcon} alt="Icono limpieza" />
        Marcar como limpio
      </button>
    </li>
  );
}
