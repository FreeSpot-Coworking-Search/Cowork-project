import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './CenterCard.css';
import image from '../../assets/img/Coworking-768x380.png';

export default function ListCentersSearchElement({ center }) {
  return (
    <li className="centerCard">
      <div className="leftColumn">
        <p className="centerCardName">{center.nombre}</p>
        <h4 className="centerCardPlace">({center.localidad})</h4>
        <p className="centerCardPrice">
          {center.precio_minimo}-{center.precio_maximo}€
        </p>
        <StarsDisplay
          className="centerCardStarsDisplay"
          puntuation={center.puntuacion_media}
        ></StarsDisplay>
      </div>
      <div className="rightColumn">
        {center.imagenes ? (
          <img src={image} className="centerCardImage" alt="Imagen Generica" />
        ) : (
          <img src={image} className="centerCardImage" alt="" />
        )}
      </div>
    </li>
  );
}
