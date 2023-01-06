import { createSlice } from '@reduxjs/toolkit';
import { AUTH_CHECKING, AUTH_AUTHORIZED, AUTH_NOT_AUTHORIZED } from '../constants';

const authInitialState = {
    status: AUTH_CHECKING, 
    user: {}, 
    errorMessage: undefined
};

export const authSlice = createSlice({
    name: 'auth', 
    initialState: authInitialState,
    reducers: {
        onChecking: (state) => {
            console.log(' - authSlice - onChecking - ');
            state.status = AUTH_CHECKING;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            console.log(' - authSlice - onLogin - ');
            console.log('payload: ', payload);
            state.status = AUTH_AUTHORIZED;
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            console.log(' - authSlice - onLogout - ');
            state.status = AUTH_NOT_AUTHORIZED;
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: (state) => {
            console.log(' - authSlice - onClearErrorMessage - ');
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage } = authSlice.actions;