import { useState, useEffect } from 'react';
import { useClient } from './useClient';
import { toFormDate } from '../helpers/dateHelper';
const {
  REACT_APP_API_LOCAL_SERVER_HOST: host,
  REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;
const axios = require('axios');

const useForm = ({ setError }) => {
  const [clientData, setClientData] = useClient();
  const { tipo } = clientData;

  const clientOptions = {
    administrador: {
      initialForm: {
        correo: '',
        nombre: '',
        apellidos: '',
        password: '',
        confirmPw: '',
        fecha_nacimiento: '',
      },
      id: clientData.idAuth,
      route: 'admins',
    },
    usuario: {
      initialForm: {
        correo: '',
        nombre_usuario: '',
        nombre: '',
        apellidos: '',
        password: '',
        confirmPw: '',
        fecha_nacimiento: '',
        telefono: '',
        bio: '',
      },
      id: clientData.idUser,
      route: 'users',
    },
  };

  const [form, setForm] = useState(clientOptions[tipo].initialForm);

  useEffect(() => {
    const route = `${host}/api/${clientOptions[tipo].route}/?id=${clientOptions[tipo].id}`;
    const fetchData = async () => {
      const { data } = await getRequest(route);

      if (tipo === 'administrador') {
        const { correo, nombre, apellidos, fecha_nacimiento } = data;
        const date = toFormDate(fecha_nacimiento);

        setForm({
          ...form,
          correo,
          nombre,
          apellidos,
          fecha_nacimiento: date,
          password: '',
          confirmPw: '',
        });
      } else {
        const {
          correo,
          nombre,
          apellidos,
          fecha_nacimiento,
          nombre_usuario,
          telefono,
          bio,
        } = data;
        const date = toFormDate(fecha_nacimiento);

        setForm({
          ...form,
          correo,
          nombre,
          apellidos,
          fecha_nacimiento: date,
          nombre_usuario,
          telefono,
          bio,
          password: '',
          confirmPw: '',
        });
      }
    };

    fetchData();
  }, [clientData]);

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

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setForm({ ...form, [name]: value });
  }

  return { clientData, setClientData, form, handleInputChange };
};

export default useForm;
