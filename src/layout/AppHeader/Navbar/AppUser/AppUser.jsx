import { useState, useRef } from 'react';
import useClickOutside from '../../../../hooks/useClickOutside';
import { NavIcon } from '../NavIcon/NavIcon';
import './AppUser.css';

export const AppUser = ({ user, handleLogout }) => {

    const [isOpen, setIsOpen] = useState(false);
    const wrapperElementRef = useRef(null);

    const handleUserClick = () => {
        console.log('handleUserClick');
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
                src="/src/assets/img/user.svg" 
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
                            className="btn btn-dark btn-sm" 
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
