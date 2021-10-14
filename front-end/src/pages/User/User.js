import { useState, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import useForm from '../../hooks/useForm';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import ModificationFormUser from '../../components/Formularies/ModificationFormUser';
import CircularSuspense from '../../components/CircularSuspense/CircularSuspense';

import {
    SaveIcon,
    EditIcon,
    ImageIcon,
    InfoIcon,
} from '../../components/Icons/Icons';
import { getHost } from '../../helpers/environmentHelpers';

const ImageCard = lazy(() => import('../../components/ImageCard/ImageCard'));

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

    const saveButton = {
        action: performSubmit,
        icon: <SaveIcon className="mainNavigationButtonIcon" />,
        text: 'Guardar',
    };

    const modifyButton = {
        action: () => setModification(!modification),
        icon: <EditIcon className="mainNavigationButtonIcon" />,
        text: 'Modificar',
    };

    const photoButton = {
        action: () => setVisualization(2),
        icon: <ImageIcon className="mainNavigationButtonIcon" />,
        text: 'Foto',
    };
    const infoButton = {
        action: () => setVisualization(1),
        icon: <InfoIcon className="mainNavigationButtonIcon" />,
        text: 'Datos',
    };

    let Links = [];

    switch (visualization) {
        case 1:
            if (fullView) Links = [saveButton, modifyButton];
            else Links = [saveButton, modifyButton, photoButton];
            break;

        case 2:
            if (fullView) Links = [saveButton, modifyButton];
            else Links = [infoButton];
            break;

        default:
            break;
    }

    // *******************************
    // ** ESTADOS Y OBJETOS COMUNES **
    // *******************************

    const [modification, setModification] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const { clientData, setClientData, form, handleInputChange } =
        useForm(setError);

    const params = {
        form,
        handleInputChange,
        error,
        setError,
        message,
        setMessage,
        modification,
        id: clientData.idUser,
        setClientData,
    };

    async function performSubmit() {
        try {
            if (!modification) {
                setError(
                    'Debes tener habilitada la modificación antes de poder guardar los cambios.'
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
            const route = `${getHost()}/api/users/?id=${clientData.idUser}`;

            let data = new FormData();
            for (const key in form) {
                if (key === 'confirmPw') continue;
                if (form[key] === '') continue;
                data.append(key, form[key]);
            }

            const response = await axios.put(route, data);
            if (response.status === 200) {
                setMessage('Cuenta modificada.');
                setTimeout(() => {
                    setMessage('');
                }, 5000);

                setClientData({
                    ...clientData,
                    name: form.nombre,
                });

                setModification(false);
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

    // *********
    // ** JSX **
    // *********

    return (
        <>
            {fullView ? (
                <div className={className + ' mainSectionFullView'}>
                    <ModificationFormUser
                        className="mainSectionLeftArticle"
                        {...params}
                    />

                    <MainNavigation
                        links={Links}
                        className="mainSectionNavigation"
                    />
                    <CircularSuspense>
                        <ImageCard className="mainSectionRightArticle" />
                    </CircularSuspense>
                </div>
            ) : (
                <div className={className + ' mainSectionSingleView'}>
                    {visualization === 1 ? (
                        <ModificationFormUser
                            className="mainSectionLeftArticle"
                            {...params}
                        />
                    ) : (
                        <CircularSuspense>
                            <ImageCard className="mainSectionLeftArticle" />
                        </CircularSuspense>
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
