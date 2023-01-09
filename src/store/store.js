import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui';
import { authSlice } from './auth';
import { cartSlice } from './cart';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer, 
    auth: authSlice.reducer, 
    cart: cartSlice.reducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
