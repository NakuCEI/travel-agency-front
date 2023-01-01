import { useDispatch, useSelector } from 'react-redux';
import { onOpenModal, onCloseModal } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const {isModalOpen} = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(onOpenModal());
    };

    const closeModal = () => {
        dispatch(onCloseModal());
    };

    return {
        isModalOpen, 
        openModal, 
        closeModal
    };
};
