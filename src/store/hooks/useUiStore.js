/*
    Importaciones de react-redux:
    - useDispatch: referencia de la función dispatch del store para lanzar acciones.
    - useSelector: permite acceder a un estado del store
*/
import { useDispatch, useSelector } from 'react-redux';
// Importación de acciones para modificar el estado de elementos de interfaz (modal en este caso)
import { onOpenModal, onCloseModal } from '../ui/uiSlice';

// useUiStore - Hook para manejar el estado de los elementos de interfaz
export const useUiStore = () => {

    // Desestructuración de la propiedad "isModalOpen" del estado de la modal
    const {isModalOpen} = useSelector((state) => state.ui);
    // Constante "dispatch" para lanzar acciones del estado
    const dispatch = useDispatch();

    // Función para abrir la modal
    const openModal = () => {
        dispatch(onOpenModal());
    };

    // Función para cerrar la modal
    const closeModal = () => {
        dispatch(onCloseModal());
    };

    // Exposición de constante y métodos para manejar el estado del modal
    return {
        isModalOpen, 
        openModal, 
        closeModal
    };
};
