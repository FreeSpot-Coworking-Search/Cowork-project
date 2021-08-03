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
    const [form, setForm] = useState({
        correo: '',
        nombre: '',
        apellidos: '',
        password: '',
        confirmPw: '',
        fecha_nacimiento: '',
    });

    useEffect(() => {
        const route = `${host}:${port}/api/admins/?id=${clientData.idAuth}`;
        const fetchData = async () => {
            const { data } = await getRequest(route);
            const { correo, nombre, apellidos, fecha_nacimiento } = data;
            let date = toFormDate(fecha_nacimiento);
            setForm({
                ...form,
                correo,
                nombre,
                apellidos,
                fecha_nacimiento: date,
            });
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
