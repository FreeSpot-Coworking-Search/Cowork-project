import axios from 'axios';
import { getHost } from './environmentHelpers';

export default async function getData(endPoint, queryParams) {
    const registrationRoute = `${getHost()}${endPoint}`;
    try {
        const response = await axios.get(registrationRoute, {
            params: queryParams,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
