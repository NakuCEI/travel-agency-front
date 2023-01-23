import { createSlice } from '@reduxjs/toolkit';
import { AUTH_CHECKING, AUTH_AUTHORIZED, AUTH_NOT_AUTHORIZED } from '../constants'; // Constantes de estado de autorización de acceso del usuario

// Estado inicial del usuario
const authInitialState = {
    status: AUTH_CHECKING, 
    user: {}, 
    errorMessage: undefined
};

/*
  authSlice - Reductores, creadores de acción y estado del usuario
  - name: Nombre para el slice
  - initialState: Estado inicial para el usuario
  - reducers: acciones para las modificaciones de estado
*/
export const authSlice = createSlice({
    name: 'auth', 
    initialState: authInitialState,
    reducers: {
        /* Acción de estado de verificación de la autentificación del usuario. 
            Se ejecuta cuando se está realizando la comprobación de la validez del estado de un usuario.
        */
        onChecking: (state) => {
            state.status = AUTH_CHECKING;
            state.user = {};
            state.errorMessage = undefined;
        },
        /* Acción de estado de confirmación de la autentificación del usuario. 
            Se ejecuta cuando se ha comprobado la validez del estado de un usuario.
            El payload actualiza la información del usuario verificado.
        */
        onLogin: (state, { payload }) => {
            state.status = AUTH_AUTHORIZED;
            state.user = payload;
            state.errorMessage = undefined;
        },
        /* Acción de estado de cierre de sesión por parte del usuario. 
            El payload actualiza el mensaje de error.
        */
        onLogout: (state, { payload }) => {
            state.status = AUTH_NOT_AUTHORIZED;
            state.user = {};
            state.errorMessage = payload;
        },
        /* Acción de estado de eliminación de error
        */
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

// Exportación de las acciones de mutación de estado
export const { 
    onChecking, 
    onLogin, 
    onLogout, 
    onClearErrorMessage 
} = authSlice.actions;