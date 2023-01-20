import { useState, useRef } from 'react';
import { useClickOutside } from '../../../../hooks';
import { NavIcon } from '../NavIcon/NavIcon';
import './AppUser.css';

const userImage = '../../../../assets/img/user.svg';
const closeSessionText = 'Cerrar sesión';

export const AppUser = ({ user, handleLogout }) => {

    const [isOpen, setIsOpen] = useState(false);
    const wrapperElementRef = useRef(null);

    const handleUserClick = () => {
        setIsOpen(!isOpen);
    };

    const clickOutsidehandler = () => {
        setIsOpen(false);
    };
    
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
