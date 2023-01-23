import { useEffect, useState } from 'react'; // Importación de hooks de react
import { AUTH_AUTHORIZED, AUTH_CHECKING } from '../../store/constants'; // Importación de constantes de estado de autentificación de usuario
import { useAuthStore, useUiStore } from '../../store/hooks'; // Importación de hook de gestión de usuario y de control de estado de modal
import AppErrorMessage from '../AppErrorMessage/AppErrorMessage'; // Importación de componente de mensaje de error
import Spinner from '../Spinner/Spinner'; // Importación de compoente Spinner
import { AppFormLogin } from './AppFormLogin'; // Importación de formulario de login
import { AppFormRegister } from './AppFormRegister'; // Importación de formulario de registro

// Componente AppForms
export const AppForms = () => {
    
    // Constantes para el mensaje de error y el status del hook del usuario
    const { errorMessage, status } = useAuthStore();
    // Valores del hook de control de estado de modal
    const { isModalOpen, closeModal } = useUiStore();
    // useSate para almacenar el valor de comprobación de usuario
    const [ isChecking, setIsChecking ] = useState(false);
    
    // Método para comprobar el estado de comprobación del status del usuario
    // Si el usuario está autentificado y el modal está abierto, éste se cierra
    const checkStatusState = () => {
        setIsChecking(status === AUTH_CHECKING);
        if (status === AUTH_AUTHORIZED && isModalOpen) {
            closeModal();
        }
    };
    
    // useEffect a ejecutar con los cambios de estado del status
    useEffect(() => {
        checkStatusState();
    }, [status]);
    

    return (
        <>
            {/* Mientras se esté comprobando el status del usuario se muestra el Spinner */}
            {
                (isChecking) ? 
                    (
                        <div 
                            className="w-100 h-100 position-absolute d-flex justify-content-center align-items-center bg-secondary opacity-50"
                            style={{ top: 0, left: 0, zIndex: 2 }}
                        >
                            <Spinner light />
                        </div>
                    )
                    : (null)
            }
            {/* Si hay algún error se muestra */}
            {
                (errorMessage) ? 
                    (
                        <div 
                            className="position-absolute start-50 translate-middle" 
                            style={{ top: '50px !important', width: '90%', zIndex: 1 }}
                        >
                            <AppErrorMessage message={errorMessage} />
                        </div>
                    )
                    : null
            }
            <div className="d-flex flex-column justify-content-start align-items-center position-relative overflow-auto">
                <AppFormLogin />
                <AppFormRegister />
            </div>
        </>
    );
};
