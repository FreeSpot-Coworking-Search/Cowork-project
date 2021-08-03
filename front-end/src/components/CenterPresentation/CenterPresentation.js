import './CenterPresentation.css';
import ImageSlide from '../ImageSlide/ImageSlide';
import '../../css/presentation.css';
import useCenter from '../../hooks/useCenter';
import Spinner from '../Spinner/Spinner';

export default function CenterPresentation({ centerId, className }) {
  const [center, loading] = useCenter(centerId);

  return loading ? (
    <Spinner />
  ) : (
    <article className={className + ' presentation centerPresentation'}>
      <h3 className="presentationName">{center.nombre}</h3>
      <ImageSlide images={center.imagenes} className="presentationSlide" />
      <p className="presentationCity">{center.localidad}</p>
      <p className="presentationAddress">{`${center.direccion} - (${center.codigo_postal})`}</p>
      <p className="presentationPhone">{center.telefono}</p>
      <p className="presentationEmail"> {center.email}</p>
      <p className="presentationDescription">{center.descripcion}</p>
    </article>
  );
}
