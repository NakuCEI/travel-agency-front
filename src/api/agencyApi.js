import axios from 'axios';
import { getEnvs } from '../helpers';

const { VITE_API_URL } = getEnvs();

const agencyApi = axios.create({
    baseURL: VITE_API_URL
});

agencyApi.interceptors.request.use(config => {

    const tokenValue = localStorage.getItem('token');

    config.headers = {
        ...config.headers, 
        'x-token': tokenValue
    };

    return config;
});

export default agencyApi;
