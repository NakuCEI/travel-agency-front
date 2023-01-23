import { useRef } from 'react'; // Importación de hook de react
import { useClickOutside } from '../../hooks'; // Importación de hook de control de click fuera de elemento
import { useUiStore } from '../../store/hooks'; // Importación de hook de control de estado de modal
import './AppModal.css'; // Importación de estilos

// Componente AppModal
// Recibe como parámetro un componente para anidar
export const AppModal = ({children}) => {
    // Valores del hook de control de estado de modal
    const {isModalOpen, closeModal} = useUiStore();
    // Referencia para el modal
    const modalElementRef = useRef(null);

    // Método par acerrar el modal
    const handleCloseModal = () => {
        closeModal();
    };
    
    // Uso del hook para detectar clicks fuera del modal
    // Se pasa como parámetros la referencia del modal, el evento de cierre y la variable que controla la visibilidad
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
                                <div ref={modalElementRef} className="modal-content p-4">
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
