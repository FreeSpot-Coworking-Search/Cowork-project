/* eslint-disable jsx-a11y/img-redundant-alt */
import './photosPresentation.css';

import { useState } from 'react';
import ImagePicker from '../ImagePicker/ImagePicker';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function PhotosPresentation({
    data: { imagenes, id },
    className,
}) {
    const [images, setImages] = useState(imagenes);

    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);

    const baseImageURL = `${host}:${port}/api/images/spacesCentersPhotos/`;
    const actionsRoute = `${host}:${port}/api/spaces/photo/`;

    const props = {
        images,
        setImages,
        setMessage,
        setError,
        baseImageURL,
        actionsRoute,
        idUser: id,
    };
    //
    return (
        <article className={className + ' presentation'}>
            <h3 className="presentationName">Imágenes del espacio</h3>
            <ImagePicker className="" {...props} />
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
        </article>
    );
}
