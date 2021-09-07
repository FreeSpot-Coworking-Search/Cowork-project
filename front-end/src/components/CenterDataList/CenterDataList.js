import ImageSlide from '../ImageSlide/ImageSlide';
import Spinner from '../Spinner/Spinner';
import phoneIcon from '../../assets/icons/bxs-phone.svg';
import addressIcon from '../../assets/icons/bxs-home.svg';
import mailIcon from '../../assets/icons/bx-mail-send.svg';
import './CenterDataList.css';
import '../../css/presentation.css';

import GoogleMapsLocation from '../GoogleMapsLocation/GoogleMapsLocation';
export default function CenterDataList({ center, className }) {
  console.log(center);
  return center ? (
    <>
      <div className="presentationLimit" />
      <ul className="centerDataList">
        <li>
          <h3 className="centerDataListName">{center.nombre}</h3>
        </li>
        <li className="centerDataListSlide">
          <ImageSlide
            images={center.imagenes}
            className="centerDataListSlide"
            tag="centerDataListCenter"
          />
        </li>
        <div className="centerDataListInfo">
          <li>
            <p className="centerDataListCity">{center.localidad}</p>
          </li>
          <li className="centerDataListElement">
            <img src={addressIcon} alt="Address icon" />
            <p className="centerDataListAddress">{`${center.direccion} - (${center.codigo_postal})`}</p>
          </li>
          <li className="centerDataListElement">
            <img src={phoneIcon} alt="Phone icon" />
            <p>{center.telefono}</p>
          </li>
          <li className="centerDataListElement">
            <img src={mailIcon} alt="Mail icon" />
            <p> {center.email}</p>
          </li>
          <li className="centerDataListDescription">
            <p>Descripcion</p>
            <p>{center.descripcion}</p>
          </li>
          <li className="centerDataListDescription">
            <p>Equipamiento</p>
            <p>{center.equipamiento}</p>
          </li>
          <li>
            <GoogleMapsLocation center={center} />
          </li>
        </div>
      </ul>
      <div className="presentationLimit" />
    </>
  ) : (
    <Spinner />
  );
}
