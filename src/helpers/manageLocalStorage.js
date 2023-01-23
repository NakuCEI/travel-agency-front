import { KEY_TOKEN } from '../constants'; // Constante de nombre de la clave del token

// Método para devolver el valor del token en LocalStorage
export const getTokenLocalStorage = () => {
    return localStorage.getItem(KEY_TOKEN);
};

// Método para asignar el valor del token en LocalStorage
export const setTokenLocalStorage = (value) => {
    localStorage.setItem(KEY_TOKEN, value);
};

// Método para eliminar la clave y el valor del token en LocalStorage
export const removeTokenLocalStorage = () => {
    localStorage.removeItem(KEY_TOKEN);
};
