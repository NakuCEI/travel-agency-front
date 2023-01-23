import { useState, useRef } from 'react'; // Importación de hooks de react
import { useClickOutside } from '../../../../hooks'; // Importación de hook de control de pulsación de un elemento
import { NavIcon } from '../NavIcon/NavIcon'; // Importación de componente de icono
import './AppUser.css'; // Importación de estilos

// Constantes para imagen de usuario y texto de mensaje de cierre de sesión
const userImage = '../../../../assets/img/user.svg';
const closeSessionText = 'Cerrar sesión';

// Componente AppUser
// Recibe como parámetro el usuario registrado y el evento de cierre de sesión
export const AppUser = ({ user, handleLogout }) => {

    // useState para almacenar el estado de la ventana modal
    const [isOpen, setIsOpen] = useState(false);
    // Referencia de elemento del componente
    const wrapperElementRef = useRef(null);

    // Método para cerrar la modal
    const handleUserClick = () => {
        setIsOpen(!isOpen);
    };

    // Método para cerrar la modal si se pulsa fuera de ésta
    const clickOutsidehandler = () => {
        setIsOpen(false);
    };
    
    // Uso del hook para controlar el estado de la modal en función de las pulsaciones recibidas
    useClickOutside([wrapperElementRef], clickOutsidehandler, isOpen);

    return (
        <div ref={wrapperElementRef} className={`user-wrapper ms-3 ${ isOpen ? 'user-link-active' : ''}`}>
            <NavIcon 
                alt="User" 
                src={userImage} 
                iconClick={() => handleUserClick()} 
            />
            <div className={`user-info shadow rounded bg-light border border-secondary ${isOpen ? 'd-flex' : 'd-none'}`}>
                <div className="user-info_content p-2 text-secondary">
                    <div>
                        <p className="mb-0 text-break lh-1">{user.name}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <hr />
                        <button 
                            className="btn btn-dark btn-sm py-0" 
                            onClick={() => handleLogout()}
                        >
                            {closeSessionText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
