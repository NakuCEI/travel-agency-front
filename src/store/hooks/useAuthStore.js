import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api';
import { onChecking, onLogin, onClearErrorMessage, onLogout } from '../auth';

const tokenKey = 'token';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        console.log(email, password);

        dispatch(onChecking());
        console.log(' ---------- START LOGIN ---------- ');

        try {

            const { data } = await agencyApi.post('/auth', { email, password });
            console.log('data: ', data);

            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            console.log('usuario: ', usuario);
            
            dispatch(onLogin(usuario));
            
        } catch (error) {
            console.log('error: ', error);
            console.log('error.response: ', error.response);
            dispatch(onLogout('Nombre o usuario incorrectos.'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 3000);
        }
    };

    const startRegister = async ({ name, email, password }) => {
        console.log(name, email, password);
        dispatch(onChecking());
        console.log(' ---------- START REGISTER ---------- ');

        try {
            
            const { data } = await agencyApi.post('/auth/new', { name, email, password });
            console.log('data: ', data);

            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            console.log('usuario: ', usuario);
            
            dispatch(onLogin(usuario));
            
        } catch (error) {
            console.log('error.response: ', error.response);
            dispatch(onLogout(error.response?.data.msg || error));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 3000);
        }
    };

    const startLogout = () => {
        console.log('startLogout');
        localStorage.clear();
        dispatch(onLogout());
    };

    const checkToken = async () => {
        console.log('checkToken');
        const token = localStorage.getItem(tokenKey);
        console.log('token: ', token);

        if (!token) {
            return dispatch(onLogout());
        }

        try {

            const { data } = await agencyApi.get('/auth/renew');
            console.log('data: ', data);
            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            console.log('usuario: ', usuario);
            
            dispatch(onLogin(usuario));
            
        } catch (error) {
            console.log('error: ', error);
            dispatch(onLogout());
        }
    };

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
