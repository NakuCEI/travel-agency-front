import { createSlice } from '@reduxjs/toolkit';
import { getCartLocalStorage } from '../../helpers/manageLocalStorage';

const cartInitialState = {
    cart: getCartLocalStorage()
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        getCart: (state, {payload}) => {
            state.cart = payload;
        }, 
        removeCart: (state) => {
            state.cart = null;
        },
        addToCart: (state, {payload}) => {
            state.cart = [...state.cart, payload];
        }, 
        removeItemCart: (state, {payload}) => {
            const newCart = state.cart.filter(item => item._id !== payload);
            state.cart = newCart;
        }, 
        updateItemCart: (state, {payload}) => {
            const updatedCart = state.cart.map(item => {
                if (item.id === payload._id) {
                    item = payload;
                }
                return item;
            });
            state.cart = updatedCart;
        }
    }
});

export const { 
    getCart, 
    removeCart, 
    addToCart, 
    removeItemCart, 
    updateItemCart 
} = cartSlice.actions;
