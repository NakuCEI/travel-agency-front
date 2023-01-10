import axios from 'axios';
import { getEnvs, getTokenLocalStorage } from '../helpers';

const { VITE_API_URL } = getEnvs();

const agencyApi = axios.create({
    baseURL: VITE_API_URL
});

agencyApi.interceptors.request.use(config => {

    const tokenValue = getTokenLocalStorage();

    config.headers = {
        ...config.headers, 
        'x-token': tokenValue
    };

    return config;
});

export default agencyApi;
