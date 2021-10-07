import axios from 'axios';

export default async function getData(endPoint, queryParams) {
  const { REACT_APP_API_LOCAL_SERVER_HOST: host } = process.env;
  const registrationRoute = `${host}${endPoint}`;
  try {
    const response = await axios.get(registrationRoute, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
