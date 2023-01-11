import { useEffect, useState } from 'react';
import { AUTH_AUTHORIZED, AUTH_CHECKING } from '../../store/constants';
import { useAuthStore, useUiStore } from '../../store/hooks';
import AppErrorMessage from '../AppErrorMessage/AppErrorMessage';
import Spinner from '../Spinner/Spinner';
import { AppFormLogin } from './AppFormLogin';
import { AppFormRegister } from './AppFormRegister';

export const AppForms = () => {
    
    const { errorMessage } = useAuthStore();
    const { status } = useAuthStore();
    const { isModalOpen, closeModal } = useUiStore();
    const [ isChecking, setIsChecking ] = useState(false);
    
    const checkStatusState = () => {
        setIsChecking(status === AUTH_CHECKING);
        if (status === AUTH_AUTHORIZED && isModalOpen) {
            closeModal();
        }
    };
    
    useEffect(() => {
        checkStatusState();
    }, [status]);
    

    return (
        <>
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
