import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';

import MainNavigation from '../../components/MainNavigation/MainNavigation';
import RegistrationFormUser from '../../components/Formularies/RegistrationFormUser';

import { SaveIcon, ResetIcon } from '../../components/Icons/Icons';

const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

export default function UserRegistration({ className }) {
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
    icon: <SaveIcon className="mainNavigationButtonIcon" />,
    text: 'Registrarse',
  };

  const resetButton = {
    action: resetForm,
    icon: <ResetIcon className="mainNavigationButtonIcon" />,
    text: 'Resetear',
  };

  let Links = [];

  switch (visualization) {
    case 1:
      if (fullView) Links = [sendButton, resetButton];
      else Links = [sendButton, resetButton];
      break;

    case 2:
      if (fullView) Links = [sendButton, resetButton];
      else Links = [sendButton, resetButton];
      break;

    default:
      break;
  }

  // *******************************
  // ** ESTADOS Y OBJETOS COMUNES **
  // *******************************
  const [form, setForm] = useState({
    correo: '',
    nombre_usuario: '',
    nombre: '',
    apellidos: '',
    password: '',
    confirmPw: '',
    fecha_nacimiento: '',
    telefono: '',
    bio: '',
  });
  const [photo, setPhoto] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const params = {
    form,
    setForm,
    photo,
    setPhoto,
    error,
    setError,
    message,
    setMessage,
  };

  let history = useHistory();

  async function performSubmit() {
    try {
      if (form.password !== form.confirmPw) {
        setError('Revisa que las contraseñas ingresadas sean iguales.');
        setTimeout(() => {
          setError('');
        }, 5000);

        return;
      }
      setMessage('Enviando datos');

      const route = `${host}:${port}/api/users/`;

      let data = new FormData();
      for (const key in form) {
        if (key === 'confirmPw') continue;
        data.append(key, form[key]);
      }
      data.append('photo', photo);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const response = await axios.post(route, data, config);
      if (response.status === 200) {
        setMessage(
          'Cuenta creada, falta activar la misma. Para ello, hemos enviado un mail al correo indicado con el enlace de activación. Muchas gracias.'
        );
        setTimeout(() => {
          history.push('/');
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

  function resetForm() {
    setForm({
      correo: '',
      nombre_usuario: '',
      nombre: '',
      apellidos: '',
      password: '',
      confirmPw: '',
      fecha_nacimiento: '',
      telefono: '',
      bio: '',
    });
  }

  // *********
  // ** JSX **
  // *********

  return (
    <>
      {fullView ? (
        <div className={className + ' mainSectionFullView'}>
          <RegistrationFormUser
            className="mainSectionLeftArticle"
            {...params}
          />

          <MainNavigation links={Links} className="mainSectionNavigation" />
        </div>
      ) : (
        <div className={className + ' mainSectionSingleView'}>
          {visualization === 1 ? (
            <RegistrationFormUser
              className="mainSectionLeftArticle"
              {...params}
            />
          ) : (
            ''
          )}

          <MainNavigation links={Links} className="mainSectionNavigation" />
        </div>
      )}
    </>
  );
}
