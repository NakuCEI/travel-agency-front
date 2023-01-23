import { configureStore } from '@reduxjs/toolkit'; // Método de configuración del store de estados
import { uiSlice } from './ui'; // Importación de función de estados de interfaz
import { authSlice } from './auth'; // Importación de función de estados de usuario
import { cartSlice } from './cart'; // Importación de función de estados de carrito de compra

/*
  store - Almacenamiento de estados de la aplicación (usuario, carrito de compra, modal)
*/
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer, 
    auth: authSlice.reducer, 
    cart: cartSlice.reducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
