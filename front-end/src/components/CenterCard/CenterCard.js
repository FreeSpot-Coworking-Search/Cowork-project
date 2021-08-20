import StarsDisplay from '../StarsDisplay/StarsDisplay';
import { Link } from 'react-router-dom';
import './CenterCard.css';
import image from '../../assets/img/Coworking-768x380.png';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';

export default function ListCentersSearchElement({
  center,
  searchObject,
  linksRoute,
}) {
  return (
    <li>
      <Link
        to={objectToQuerryParamsString(
          '/search/space',
          { id_centro: center.id },
          searchObject
        )}
        className="centerCard"
      >
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
            <img
              src={`http://localhost:8080/api/images/spacesCentersPhotos/${center.imagenes[0].URL}`}
              className="centerCardImage"
              alt="Imagen Generica"
            />
          ) : (
            <img src={center.imagenes[0]} className="centerCardImage" alt="" />
          )}
        </div>
      </Link>
    </li>
  );
}
