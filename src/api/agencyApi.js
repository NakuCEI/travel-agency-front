import axios from 'axios'; // Importación de axios para manejar las llamadas http.
import { getEnvs, getTokenLocalStorage } from '../helpers'; // Importación de métodos para manejar las llamadas.

// Dirección url de la API
const { VITE_API_URL } = getEnvs();

// Instancia axios de la API
const agencyApi = axios.create({
    baseURL: VITE_API_URL
});

// Configuración del interceptor para las peticiones de la aplicación
agencyApi.interceptors.request.use(config => {

    // Valor del token en el LocalStorage
    const tokenValue = getTokenLocalStorage();

    // En la cabecera de las peticiones se añade la prop "x-token" con el valor del token
    config.headers = {
        ...config.headers, 
        'x-token': tokenValue
    };

    return config;
});

// Exportación de la API
export default agencyApi;
