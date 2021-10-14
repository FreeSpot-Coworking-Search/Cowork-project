/* eslint-disable jsx-a11y/img-redundant-alt */
import './CenterPhotosPresentation.css';
import { useState } from 'react';
import ImagePicker from '../ImagePicker/ImagePicker';

import { getHost } from '../../helpers/environmentHelpers';

export default function CenterPhotosPresentation({
    imagenes,
    id,
    setCenter,
    className,
    fullView,
}) {
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);

    const baseImageURL = `${getHost()}/api/images/spacesCentersPhotos/`;
    const actionsRoute = `${getHost()}/api/centers/photo/`;

    const props = {
        images: imagenes,
        setMessage,
        setError,
        baseImageURL,
        actionsRoute,
        idUser: id,
        setCenter,
    };
    //
    return (
        <>
            <ImagePicker className="" {...props} fullView={fullView} />
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
        </>
    );
}
