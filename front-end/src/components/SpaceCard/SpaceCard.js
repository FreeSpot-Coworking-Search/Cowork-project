import { Link } from 'react-router-dom';
import './SpaceCard.css';
import image from '../../assets/img/Coworking-768x380.png';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';

export default function SpaceCard({ space, searchObject, linksRoute }) {
  return (
    <li>
      <Link
        to={objectToQuerryParamsString(
          '/space',
          { id: space.id },
          searchObject
        )}
        className="spaceCard"
      >
        <div className="leftColumn">
          <p className="spaceCardName">{space.tipo}</p>
          <h4 className="spaceCardPlace">({space.precio})</h4>
          <p className="spaceCardPrice">{space.precio}€</p>
          <p className="spaceCardPrice">{space.reserva_minima}€</p>
        </div>
        <div className="rightColumn">
          {space.imagenes ? (
            <img src={image} className="spaceCardImage" alt="Imagen Generica" />
          ) : (
            <img src={image} className="spaceCardImage" alt="" />
          )}
        </div>
      </Link>
    </li>
  );
}
