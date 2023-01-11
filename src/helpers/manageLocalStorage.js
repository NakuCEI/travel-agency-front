import { KEY_TOKEN } from '../constants';

export const getTokenLocalStorage = () => {
    return localStorage.getItem(KEY_TOKEN);
};

export const setTokenLocalStorage = (value) => {
    localStorage.setItem(KEY_TOKEN, value);
};

export const removeTokenLocalStorage = () => {
    localStorage.removeItem(KEY_TOKEN);
};
