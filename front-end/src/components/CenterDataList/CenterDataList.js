import ImageSlide from '../ImageSlide/ImageSlide';
import Spinner from '../Spinner/Spinner';
import phoneIcon from '../../assets/icons/bxs-phone.svg';
import addressIcon from '../../assets/icons/bxs-home.svg';
import mailIcon from '../../assets/icons/bx-mail-send.svg';
import './CenterDataList.css';
import GoogleMapsLocation from '../GoogleMapsLocation/GoogleMapsLocation';
export default function CenterDataList({ center, className }) {
  console.log(center);
  return center ? (
    <>
      <h3 className="presentationName">{center.nombre}</h3>
      <ImageSlide
        images={center.imagenes}
        className="presentationSlide"
        tag="PresentationCenter"
      />
      <ul className="centerDataList">
        <li>
          <p className="presentationCity">{center.localidad}</p>
        </li>
        <li className="presentationAddress">
          <img src={addressIcon} alt="Address icon" />
          <p className="presentationAddress">{`${center.direccion} - (${center.codigo_postal})`}</p>
        </li>
        <li className="presentationPhone">
          <img src={phoneIcon} alt="Phone icon" />
          <p>{center.telefono}</p>
        </li>
        <li className="presentationEmail">
          <img src={mailIcon} alt="Mail icon" />
          <p> {center.email}</p>
        </li>
        <li>
          <p className="presentationDescription">{center.descripcion}</p>
        </li>
        <li>
          <GoogleMapsLocation center={center} />
        </li>
      </ul>
    </>
  ) : (
    <Spinner />
  );
}
