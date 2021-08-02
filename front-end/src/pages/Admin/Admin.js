import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useClient } from '../../hooks/useClient';
import { toFormDate } from '../../helpers/dateHelper';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ModificationFormAdmin from '../../components/Formularies/ModificationFormAdmin';

import editIcon from '../../assets/icons/edit-solid.png';
import saveIcon from '../../assets/icons/save-solid.png';
import swipeArrows from '../../assets/icons/swipe-arrows.png';

const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function Admin({ className }) {
    const { REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION } = process.env;
    const [visualization, setVisualization] = useState(1);
    const [fullView, setFullView] = useState(
        useMediaQuery({
            query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})`,
        })
    );

    // ****************
    // ** RESPONSIVE **
    // ****************

    const handleMediaQueryChange = (matches) => {
        setFullView(matches);
    };
    const isFullView = useMediaQuery(
        { query: `(min-width: ${REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION})` },
        undefined,
        handleMediaQueryChange
    );

    // ****************************
    // ** MAIN NAVIGATION CONFIG **
    // ****************************

    const sendButton = {
        action: performSubmit,
        icon: saveIcon,
        text: 'Guardar',
    };

    const resetButton = {
        action: () => setModification(!modification),
        icon: editIcon,
        text: 'Modificar',
    };

    const swipeButton = {
        action: () => setVisualization(visualization === 2 ? 1 : 2),
        icon: swipeArrows,
        text: 'Swipe',
    };

    let Links = [];

    switch (visualization) {
        case 1:
            if (fullView) Links = [sendButton, resetButton];
            else Links = [sendButton, resetButton, swipeButton];
            break;

        case 2:
            if (fullView) Links = [sendButton, resetButton];
            else Links = [sendButton, resetButton, swipeButton];
            break;

        default:
            break;
    }

    // *******************************
    // ** ESTADOS Y OBJETOS COMUNES **
    // *******************************

    const [clientData] = useClient();
    const [modification, setModification] = useState(false);

    const [form, setForm] = useState({
        correo: '',
        nombre: '',
        apellidos: '',
        password: '',
        confirmPw: '',
        fecha_nacimiento: '',
    });
    const [photo, setPhoto] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const route = `${host}:${port}/api/admins/?id=${clientData.idAuth}`;
        const fetchData = async () => {
            const { data } = await getRequest(route);
            console.log(data);
            const { correo, nombre, apellidos, fecha_nacimiento, foto } = data;
            let date = toFormDate(fecha_nacimiento);
            setForm({
                ...form,
                correo,
                nombre,
                apellidos,
                fecha_nacimiento: date,
            });
            setPhoto(foto);
        };

        fetchData();
    }, [clientData]);

    const params = {
        form,
        setForm,
        error,
        setError,
        message,
        setMessage,
        modification,
    };

    async function performSubmit() {
        try {
            if (!modification) {
                setError(
                    'Debes tener habilitada la modificación de usuarios para guardar los cambios.'
                );
                setTimeout(() => {
                    setError('');
                }, 5000);
                return;
            }
            if (form.password !== form.confirmPw) {
                setError('Revisa que las contraseñas ingresadas sean iguales.');
                setTimeout(() => {
                    setError('');
                }, 5000);

                return;
            }
            setMessage('Enviando datos');

            const route = `${host}:${port}/api/admins/?id=${clientData.idAuth}`;

            let data = new FormData();
            for (const key in form) {
                if (key === 'confirmPw') continue;
                if (form[key] === '') continue;
                data.append(key, form[key]);
            }

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            const response = await axios.put(route, data, config);
            if (response.status === 200) {
                setMessage('Cuenta modificada.');
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }
        } catch (error) {
            setMessage('');

            const {
                data: { message },
            } = error.response;

            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    async function getRequest(route) {
        try {
            const response = await axios(route);
            return response;
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

    // *********
    // ** JSX **
    // *********

    return (
        <>
            {fullView ? (
                <div className={className + ' mainSectionFullView'}>
                    <ModificationFormAdmin
                        className="mainSectionLeftArticle"
                        {...params}
                    />

                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    />

                    <div className="mainSectionRightArticle Borrame">
                        <p>2</p>
                    </div>
                </div>
            ) : (
                <div className={className + ' mainSectionSingleView'}>
                    {visualization === 1 ? (
                        <ModificationFormAdmin
                            className="mainSectionLeftArticle"
                            {...params}
                        />
                    ) : (
                        <div className="mainSectionLeftArticle Borrame">
                            <p>2</p>
                        </div>
                    )}

                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    />
                </div>
            )}
        </>
    );
}
