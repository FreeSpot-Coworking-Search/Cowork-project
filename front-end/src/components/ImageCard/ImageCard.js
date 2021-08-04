import './imageCard.css';
import { useState } from 'react';
import { useClient } from '../../hooks/useClient';

import { RiImageEditFill } from 'react-icons/ri';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function ImageCard({ className }) {
    const [clientData, setClientData] = useClient();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const { avatarUrl, idAuth, idUser, tipo } = clientData;

    const imageSrc =
        tipo === 'administrador'
            ? `${host}:${port}/api/images/adminsPhotos/`
            : `${host}:${port}/api/images/usersPhotos/`;

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
                    ? `${host}:${port}/api/admins/photo/?id=${idAuth}`
                    : `${host}:${port}/api/users/photo/?id=${idUser}`;
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
                <RiImageEditFill />
            </label>
            {error && <p className="imageCard-error">{error}</p>}
            {message && <p className="imageCard-message">{message}</p>}
        </div>
    );
}
