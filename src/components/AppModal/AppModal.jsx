import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useUiStore } from '../../hooks/useUiStore';
import './AppModal.css';

export const AppModal = ({children}) => {

    const {isModalOpen, closeModal} = useUiStore();
    const modalElementRef = useRef(null);

    const handleCloseModal = () => {
        console.log('closeModal');
        closeModal();
    };
    
    useClickOutside([modalElementRef], handleCloseModal, isModalOpen);

    return (
        <>
            {
                isModalOpen ? 
                    (
                        <div 
                            className={`modal fade ${ isModalOpen ? 'show' : ''}`} 
                            tabIndex="-1" 
                            aria-labelledby="modalLabel" 
                            aria-hidden="true"
                        >
                            <div 
                                className="modal-dialog modal-dialog-centered modal-dialog-scrollable position-relative"
                            >
                                <div ref={modalElementRef} className="modal-content h-100">
                                    <button 
                                        type="button" 
                                        className="btn-close btn-close-position" 
                                        data-bs-dismiss="modal" 
                                        aria-label="Close" 
                                        onClick={() => handleCloseModal()} 
                                    ></button>
                                    {children}
                                </div>
                            </div>
                        </div>
                    )
                    : null
            }
        </>
    );
};
