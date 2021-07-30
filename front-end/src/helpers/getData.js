import axios from 'axios';

export default async function getData(endPoint, queryParams) {
  const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
  } = process.env;
  const registrationRoute = `${host}:${port}${endPoint}`;
  try {
    const response = await axios.get(registrationRoute, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
