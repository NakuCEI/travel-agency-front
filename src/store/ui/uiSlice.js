import { createSlice } from '@reduxjs/toolkit';

/*
  uiSlice - Reductores, creadores de acción y estado de elementos de interfaz (modal)
  - name: Nombre para el slice
  - initialState: Estado inicial para los elementos de interfaz
  - reducers: acciones para las modificaciones de estado
*/
export const uiSlice = createSlice({
    name: 'ui', 
    initialState: {
        // Estado booleano para indicar si la modal está abierta o cerrada
        isModalOpen: false
    },
    reducers: {
        // Acción para el estado de modal abierta
        onOpenModal: (state) => {
            state.isModalOpen = true;
        },
        // Acción para el estado de modal cerrada
        onCloseModal: (state) => {
            state.isModalOpen = false;
        }
    }
});

// Exportación de las acciones de mutación de estado
export const { onOpenModal, onCloseModal } = uiSlice.actions;
