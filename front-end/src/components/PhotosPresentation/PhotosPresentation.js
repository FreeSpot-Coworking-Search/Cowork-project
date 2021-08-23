/* eslint-disable jsx-a11y/img-redundant-alt */
import './photosPresentation.css';

import { useState } from 'react';
import axios from 'axios';

import addIcon from '../../assets/icons/plus-solid.png';
const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

export default function PhotosPresentation({
    data: {imagenes, id},
    className,
}) {
    const [images, setImages] = useState(imagenes);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);


    const baseURL = `${host}:${port}/api/images/spacesCentersPhotos/`;

    function submitImage(event) {
        const file = event.target.files[0];

        async function perfomSubmit(photo) {
            try {
                let data = new FormData();
                data.append('photo', photo);
    
                const route = `${host}:${port}/api/spaces/photo/?id=${id}`;
                const response = await axios.post(route, data);
                if (response.status === 200) {
                    setMessage('Imagen cargada.');
                    const newImages = [
                        ...images,
                        response.data
                    ]
                    setImages(newImages);
                    console.log(newImages);
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                }
            } catch (error) {
                const {
                    data: { message },
                } = error.response;
    
                message ? setError(message) : setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        }

        perfomSubmit(file);
    }
   // 
    return (
        <article className={className + ' presentation'}>
            <h3>Imágenes del espacio</h3>

            <ul className="imagePresentation">
                {images.map(image => (
                    <li key={image.URL}>
                        <figure>
                            <img 
                                src={`${baseURL}${image.URL}`}
                                alt="space center image"
                                id="imagePresentation-mainImage"
                            />

                            <figcaption>{image.descripcion === "undefined" ? '' : image.descripcion}</figcaption>
                        </figure>
                    </li>
                ))}

                <li>
                    <label
                        htmlFor="fileUpload"
                        className="fileUpload"
                        >
                        <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            accept="image/*"
                            onChange={submitImage}
                        />
                        <img 
                            src={addIcon}
                            alt="addIcon"
                        />
                    </label>
                </li>
            </ul>
            {error && <p className="imageCard-error">{error}</p>}
            {message && <p className="imageCard-message">{message}</p>}
        </article>
    );
}
