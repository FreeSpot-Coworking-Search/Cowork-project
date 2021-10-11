/* eslint-disable jsx-a11y/img-redundant-alt */
import './photosPresentation.css';

import { useState } from 'react';
import ImagePicker from '../ImagePicker/SpaceImagePicker';

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function PhotosPresentation({
  data: { imagenes, id },
  className,
  setSpace,
}) {
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const baseImageURL = `${host}/api/images/spacesCentersPhotos/`;
  const actionsRoute = `${host}/api/spaces/photo/`;

  const props = {
    images: imagenes,
    setMessage,
    setError,
    baseImageURL,
    actionsRoute,
    idUser: id,
  };
  //
  return (
    <>
      <ImagePicker className="" {...props} setSpace={setSpace} />
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </>
  );
}
