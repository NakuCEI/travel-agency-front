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
            state.status = AUTH_CHECKING;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = AUTH_AUTHORIZED;
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = AUTH_NOT_AUTHORIZED;
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { 
    onChecking, 
    onLogin, 
    onLogout, 
    onClearErrorMessage 
} = authSlice.actions;