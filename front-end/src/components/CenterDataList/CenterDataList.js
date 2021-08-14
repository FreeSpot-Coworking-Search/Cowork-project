import ImageSlide from '../ImageSlide/ImageSlide';
import PresentationGoogleMap from '../PresentationGoogleMap/PresentationGoogleMap';
import Spinner from '../Spinner/Spinner';
import phoneIcon from '../../assets/icons/bxs-phone.svg';
import addressIcon from '../../assets/icons/bxs-home.svg';
import mailIcon from '../../assets/icons/bx-mail-send.svg';
import './CenterDataList.css';
export default function CenterDataList({ center, className }) {
  return center ? (
    <>
      <ImageSlide
        images={center.imagenes}
        className="presentationSlide"
        tag="PresentationCenter"
      />
      <ul>
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
          <PresentationGoogleMap />
        </li>
      </ul>
    </>
  ) : (
    <Spinner />
  );
}
