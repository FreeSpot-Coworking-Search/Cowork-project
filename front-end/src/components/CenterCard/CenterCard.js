import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './CenterCard.css';
import image from '../../assets/img/Coworking-768x380.png';

export default function ListCentersSearchElement({ center }) {
  const styleBackground = {
    background:
      'linear-gradient(0deg, RGBA(78,205,196,0.3), RGBA(78,205,196,0.0)), url(https://unsplash.com/photos/dZxQn4VEv2M/download?force=true&w=1920)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };
  return (
    <li className="centerCard" style={styleBackground}>
      <div className="leftColumn">
        <p>{center.nombre}</p>
        <p>{center.localidad}</p>
      </div>
      <div className="rightColumn">
        <p>
          {center.precio_minimo}-{center.precio_maximo}€
        </p>
        <StarsDisplay puntuation={center.puntuacion_media}></StarsDisplay>
      </div>
    </li>
  );
}
