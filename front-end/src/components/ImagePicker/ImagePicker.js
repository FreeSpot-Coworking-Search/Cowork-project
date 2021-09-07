/* eslint-disable jsx-a11y/img-redundant-alt */
import './imagePicker.css';

import axios from 'axios';
import addIcon from '../../assets/icons/plus-solid.png';
import { Fragment } from 'react';
import { useState } from 'react';

export default function ImagePicker({
    className,
    images,
    idUser,
    baseImageURL,
    actionsRoute,
    setMessage,
    setError,
    setCenter,
    fullView,
}) {
    const [input, setInput] = useState('');

    async function deleteImage(imageId) {
        try {
            setMessage('Eliminando imagen');

            const route = `${actionsRoute}?id=${imageId}`;
            const response = await axios.delete(route);

            if (response.status === 200) {
                setMessage('Imagen eliminada.');
                setCenter((center) => {
                    return {
                        ...center,
                        info: {
                            ...center.info,
                            imagenes: center.info.imagenes.filter(
                                (i) => i.id !== imageId
                            ),
                        },
                    };
                });
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            setMessage('');
            const {
                data: { message },
            } = error.response;

            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    function submitImage(event) {
        const file = event.target.files[0];

        async function perfomSubmit(photo) {
            try {
                setMessage('enviando imagen...');
                setInput('');

                let data = new FormData();
                data.append('photo', photo);
                data.append('description', input);

                const route = `${actionsRoute}?id=${idUser}`;
                const response = await axios.post(route, data);

                if (response.status === 200) {
                    setMessage('Imagen cargada.');

                    setCenter((center) => {
                        return {
                            ...center,
                            info: {
                                ...center.info,
                                imagenes: [
                                    ...center.info.imagenes,
                                    {
                                        ...response.data,
                                    },
                                ],
                            },
                        };
                    });

                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                }
            } catch (error) {
                setMessage('');
                const {
                    data: { message },
                } = error.response;

                message ? setError(message) : setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        }

        perfomSubmit(file);
    }

    return (
        <Fragment className={className}>
            <ul className="imagePresentation">
                {images.map((image) => (
                    <li key={image.URL}>
                        <figure>
                            <button onClick={() => deleteImage(image.id)}>
                                X
                            </button>
                            <img
                                src={`${baseImageURL}${image.URL}`}
                                alt="space center image"
                                id={
                                    fullView === false
                                        ? 'imagePresentation-mainImage-full'
                                        : 'imagePresentation-mainImage-single'
                                }
                            />
                            <figcaption className="imagePresentation-text">
                                {image.descripcion === 'undefined'
                                    ? '(Sin descripción)'
                                    : image.descripcion}
                            </figcaption>
                        </figure>
                    </li>
                ))}

                <li>
                    <form
                        className="photoUpload"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="fileUpload" className="fileUpload">
                            <input
                                type="file"
                                id="fileUpload"
                                name="fileUpload"
                                accept="image/*"
                                onChange={submitImage}
                            />
                            <img src={addIcon} alt="addIcon" />
                        </label>
                        <input
                            type="text"
                            id="text"
                            placeholder="   Descripción"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </form>
                </li>
            </ul>
        </Fragment>
    );
}
