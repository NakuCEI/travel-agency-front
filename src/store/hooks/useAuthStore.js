import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api';
import { onChecking, onLogin, onClearErrorMessage, onLogout } from '../auth';

const tokenKey = 'token';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {

            const { data } = await agencyApi.post('/auth', { email, password });

            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
            dispatch(onLogin(usuario));
            
        } catch (error) {
            console.log('error: ', error);
            let messageError = null;
            if (error.response?.data?.msg) {
                messageError = error.response.data.msg;
            } else if (error.response?.data?.errors?.email?.msg) {
                messageError = error.response.data.errors.email.msg;
            }
            dispatch(onLogout(messageError));
            /* setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 3000); */
        }
    };

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());

        try {
            
            const { data } = await agencyApi.post('/auth/new', { name, email, password });
            
            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
            dispatch(onLogin(usuario));
            
        } catch (error) {
            console.log('error: ', error);
            let messageError = null;

            if (error.response?.data?.msg) {
                messageError = error.response.data.msg;
            } else if (error.response?.data?.errors?.email?.msg) {
                messageError = error.response.data.errors.email.msg;
            }
            dispatch(onLogout(messageError));
            //dispatch(onLogout(error.response?.data.msg || error));
            /* setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 3000); */
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    const checkToken = async () => {
        const token = localStorage.getItem(tokenKey);

        if (!token) {
            return dispatch(onLogout());
        }

        try {

            const { data } = await agencyApi.get('/auth/renew');
            localStorage.setItem(tokenKey, data.token);

            const usuario = {
                name: data.user.name, 
                uid: data.user.uid
            };
            
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
