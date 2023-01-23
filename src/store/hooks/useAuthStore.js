/*
    Importaciones de react-redux:
    - useDispatch: referencia de la función dispatch del store para lanzar acciones.
    - useSelector: permite acceder a un estado del store
*/
import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api'; // API de la aplicación
import { onChecking, onLogin, onClearErrorMessage, onLogout } from '../auth'; // Métodos de las acciones de estado del usuario
import { 
    getTokenLocalStorage, 
    removeTokenLocalStorage, 
    setTokenLocalStorage 
} from '../../helpers/manageLocalStorage'; // Funciones para gestionar el token del LocalStorage

// Constante para la ruta de usuarios
const AUTH_URL = '/auth';
// Tiempo en milisegundos en pantalla de la notificación de error
const timeOutMiliseconds = 3000;

// useAuthStore - Hook para manejar el estado del usuario
export const useAuthStore = () => {

    // Desestructuración de variables desde el estado del usuario
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    // Constante "dispatch" para lanzar acciones del estado
    const dispatch = useDispatch();

    // startLogin: función para registrar un usuario ya creado
    const startLogin = async ({ email, password }) => {
        // Se recogen los parámetros de email y password del formulario

        // Se lanza la acción de comprobación del usuario
        dispatch(onChecking());

        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la llamada a la API se usa el método post y se envía el email y password del usuario
            // En "data" se guarda la información recibida
            const { data } = await agencyApi.post(AUTH_URL, { email, password });
            // En Localtorage se guarda el token recibido
            setTokenLocalStorage(data.token);

            // En el objeto "usuario" se guarda el nombre e id del usuario
            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
            // Se registra el usuario en el estado de la aplicación
            dispatch(onLogin(usuario));
            
        } catch (error) {
            // Se lanza error en el registro del usuario
            dispatchError(error);
        }
    };

    // startRegister: función para registrar un usuario nuevo
    const startRegister = async ({ name, email, password }) => {
        // Se recogen los parámetros de name, email y password del formulario

        // Se lanza la acción de comprobación del usuario
        dispatch(onChecking());

        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la llamada a la API se usa el método post y se envía el name, email y password del usuario
            // En "data" se guarda la información recibida
            const { data } = await agencyApi.post(`${AUTH_URL}/new`, { name, email, password });
            // En Localtorage se guarda el token recibido
            setTokenLocalStorage(data.token);

            // En el objeto "usuario" se guarda el nombre e id del usuario
            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
            // Se registra el usuario en el estado de la aplicación
            dispatch(onLogin(usuario));
            
        } catch (error) {
            // Se lanza error en el registro del usuario
            dispatchError(error);
        }
    };

    // startLogout: función para eliminar registro de un usuario
    const startLogout = () => {
        // Se elimina el token del LocalStorage
        removeTokenLocalStorage();
        // Se elimina el usuario del estado de la aplicación
        dispatch(onLogout());
    };

    // checkToken: función para comprobar el token del LocalStorage
    const checkToken = async () => {
        // En la constante "token" se guarda el valor del token
        const token = getTokenLocalStorage();

        // Si no hay token se elimina el usuario del estado de la aplicación
        if (!token) {
            return dispatch(onLogout());
        }

        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la llamada mediante el método get se recoge un nuevo token
            const { data } = await agencyApi.get(`${AUTH_URL}/renew`);
            // En Localtorage se guarda el token recibido
            setTokenLocalStorage(data.token);

            // En el objeto "usuario" se guarda el nombre e id del usuario
            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
            // Se registra el usuario en el estado de la aplicación
            dispatch(onLogin(usuario));
            
        } catch (error) {
            // En caso de error se lanza por consola y se elimina el usuario del estado de la aplicación
            console.log('error: ', error);
            dispatch(onLogout());
        }
    };

    // dispatchError: función para mostrar notificación de error
    const dispatchError = (error) => {
        // Se muestra el error por consola
        console.log('error: ', error);
        // En una variable se guarda el mensaje de error
        let messageError = null;
        // Según el objeto de error se almacena su valor
        if (error.response?.data?.errors?.email?.msg) {
            messageError = error.response.data.errors.email.msg;
        } else if (error.response?.data?.msg) {
            messageError = error.response.data.msg;
        } else if (error.message) {
            messageError = error.message;
        };
        // Se lanza la acción para mostrar la notificación del mensaje de error
        dispatch(onLogout(messageError));
        // Con un setTimeout se controla la aparición de la notificación del error
        setTimeout(() => {
            dispatch(onClearErrorMessage());
        }, timeOutMiliseconds);
    };

    // Exposición de constantes y métodos para manejar el estado del usuario
    return {
        status, 
        user, 
        errorMessage, 
        startLogin, 
        startRegister, 
        startLogout, 
        checkToken 
    }
};
