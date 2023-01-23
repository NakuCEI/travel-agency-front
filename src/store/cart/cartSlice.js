import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del carrito de compra
const cartInitialState = {
    cart: null
};

/*
  cartSlice - Reductores, creadores de acción y estado de carrito de compra
  - name: Nombre para el slice
  - initialState: Estado inicial para el carrito de compra
  - reducers: acciones para las modificaciones de estado
*/
export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        // Acción para establecer el estado del carrito de compra
        // El contenido del payload es el carrito de compra que se actualiza en el estado (state.cart)
        getCart: (state, {payload}) => {
            state.cart = payload;
        }, 
        // Acción para añadir un elemento en el estado del carrito de compra
        // El contenido del payload es el nuevo ítem que se añade al carrito de compra y que se actualiza en el estado (state.cart)
        addToCart: (state, {payload}) => {
            state.cart = [...state.cart, payload];
        }, 
        /* Acción para eliminar un elemento en el estado del carrito de compra
        - El contenido del payload es el identificador del ítem que se elimina del carrito de compra.
        - En la constante "newCart" se guardan los ítems filtrados con identificador distinto al ítem eliminado
         y que se actualiza en el estado (state.cart)
        */
        removeItemCart: (state, {payload}) => {
            const newCart = state.cart.filter(item => item._id !== payload);
            state.cart = newCart;
        }, 
        /* Acción para actualizar un elemento en el estado del carrito de compra
        - El contenido del payload es el identificador del ítem que se ha actualizado del carrito de compra.
        - En la constante "updatedCart" se localiza el ítem actualizado mediante el identificador y se actualiza en el estado (state.cart)
        */
        updateItemCart: (state, {payload}) => {
            const updatedCart = state.cart.map(item => {
                if (item.id === payload._id) {
                    item = payload;
                }
                return item;
            });
            state.cart = updatedCart;
        },
        /* Acción para inicializar el contenido del carrito de compra
        */
        emptyCart: (state) => {
            state.cart = cartInitialState.cart;
        } 
    }
});

// Exportación de las acciones de mutación de estado
export const { 
    getCart,  
    addToCart, 
    removeItemCart, 
    updateItemCart, 
    emptyCart 
} = cartSlice.actions;
