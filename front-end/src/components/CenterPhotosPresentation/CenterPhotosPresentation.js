/* eslint-disable jsx-a11y/img-redundant-alt */
import './CenterPhotosPresentation.css';
import { useState } from 'react';
import ImagePicker from '../ImagePicker/ImagePicker';

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function CenterPhotosPresentation({
  imagenes,
  id,
  reload,
  className,
}) {
  const [images, setImages] = useState(imagenes);

  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const baseImageURL = `${host}:${port}/api/images/spacesCentersPhotos/`;
  const actionsRoute = `${host}:${port}/api/centers/photo/`;

  const props = {
    images,
    setImages,
    setMessage,
    setError,
    baseImageURL,
    actionsRoute,
    idUser: id,
    reload,
  };
  //
  return (
    <>
      <ImagePicker className="" {...props} />
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </>
  );
}
