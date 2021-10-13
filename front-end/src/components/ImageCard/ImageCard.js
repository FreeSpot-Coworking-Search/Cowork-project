import './imageCard.css';
import { useState } from 'react';
import { useClient } from '../../hooks/useClient';

import NoPhoto from '../NoPhoto/NoPhoto';
import { getHost } from '../../helpers/environmentHelpers';
const axios = require('axios');

export default function ImageCard({ className }) {
    const [clientData, setClientData] = useClient();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const { avatarUrl, idAuth, idUser, tipo } = clientData;

    const imageSrc =
        tipo === 'administrador'
            ? `${getHost()}/api/images/adminsPhotos/`
            : `${getHost()}/api/images/usersPhotos/`;

    function onFileChange(event) {
        const file = event.target.files[0];
        changePhoto(file);
    }

    async function changePhoto(photo) {
        try {
            let data = new FormData();
            data.append('photo', photo);

            const route =
                tipo === 'administrador'
                    ? `${getHost()}/api/admins/photo/?id=${idAuth}`
                    : `${getHost()}/api/users/photo/?id=${idUser}`;
            const response = await axios.post(route, data);
            if (response.status === 200) {
                setMessage('Imagen modificada.');
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }
            setClientData({
                ...clientData,
                avatarUrl: response.data,
            });
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

    return (
        <div className={className + ' imageCard'}>
            {avatarUrl ? (
                <>
                    <figure>
                        <img
                            src={`${imageSrc}${avatarUrl}`}
                            alt=""
                            className="imageCard-img"
                        />
                    </figure>
                    <label
                        htmlFor="imageCard-fileUpload"
                        className="imageCard-fileUpload"
                    >
                        <input
                            type="file"
                            id="imageCard-fileUpload"
                            name="imageCard-fileUpload"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        Cambiar fotografía
                    </label>
                </>
            ) : (
                <>
                    <NoPhoto />
                    <label
                        htmlFor="imageCard-fileUpload"
                        className="imageCard-fileUpload"
                    >
                        <input
                            type="file"
                            id="imageCard-fileUpload"
                            name="imageCard-fileUpload"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        Añadir fotografía
                    </label>
                </>
            )}
            {error && <p className="imageCard-error">{error}</p>}
            {message && <p className="imageCard-message">{message}</p>}
        </div>
    );
}
