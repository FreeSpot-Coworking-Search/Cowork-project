import './imageCard.css';
import { useState } from 'react';
import { useClient } from '../../hooks/useClient';

import { NoCameraIcon } from '../../components/Icons/Icons';
import NoPhoto from '../NoPhoto/NoPhoto';

const { REACT_APP_API_LOCAL_SERVER_HOST: host } = process.env;
const axios = require('axios');

export default function ImageCard({ className }) {
  const [clientData, setClientData] = useClient();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const { avatarUrl, idAuth, idUser, tipo } = clientData;

  const imageSrc =
    tipo === 'administrador'
      ? `${host}/api/images/adminsPhotos/`
      : `${host}/api/images/usersPhotos/`;

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
          ? `${host}/api/admins/photo/?id=${idAuth}`
          : `${host}/api/users/photo/?id=${idUser}`;
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
