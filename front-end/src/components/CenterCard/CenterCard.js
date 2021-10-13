import StarsDisplay from '../StarsDisplay/StarsDisplay';
import { Link } from 'react-router-dom';
import './CenterCard.css';
import objectToQuerryParamsString from '../../helpers/objectToQuerryParamsString';
import CardImageSlide from '../CardImageSlide/CardImageSlide';

export default function ListCentersSearchElement({
    center,
    searchObject,
    linksRoute,
}) {
    return (
        <li className="centerCard">
            <Link
                to={objectToQuerryParamsString(
                    '/search/space',
                    { id_centro: center.id },
                    searchObject
                )}
                className="leftColumn"
            >
                <div>
                    <p className="centerCardName">{center.nombre}</p>
                    <h4 className="centerCardPlace">({center.localidad})</h4>
                </div>
                <div className="centerData">
                    <p>
                        {center.precio_minimo}-{center.precio_maximo}€
                    </p>
                    <StarsDisplay
                        puntuation={center.puntuacion_media}
                    ></StarsDisplay>
                </div>
            </Link>
            <div className="rightColumn">
                {center.imagenes ? (
                    <CardImageSlide
                        images={center.imagenes}
                        tag={center.id}
                        className="imageSlide"
                    />
                ) : (
                    <img
                        src={center.imagenes[0]}
                        className="centerCardImage"
                        alt=""
                    />
                )}
            </div>
        </li>
    );
}
