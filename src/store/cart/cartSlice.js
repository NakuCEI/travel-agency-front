import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
    cart: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        getCart: (state, {payload}) => {
            state.cart = payload;
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
    addToCart, 
    removeItemCart, 
    updateItemCart 
} = cartSlice.actions;
