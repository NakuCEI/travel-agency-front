import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { AUTH_AUTHORIZED, AUTH_CHECKING } from "../../store/constants";
import { useAuthStore, useUiStore } from "../../store/hooks";
import AppErrorMessage from "../AppErrorMessage/AppErrorMessage";
import Spinner from "../Spinner/Spinner";

const loginFormInputs = {
    loginEmail: '', 
    loginPassword: '' 
};

const registerFormInputs = {
    registerName: '', 
    registerEmail: '', 
    registerPassword: '', 
    registerPassword2: '' 
};

export const LoginForm = () => {
    
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    const { status } = useAuthStore();
    const {isModalOpen, closeModal} = useUiStore();
    const [isChecking, setIsChecking] = useState(false);

    const { 
        loginEmail, 
        loginPassword, 
        onInputChange: onLoginInputChange 
    } = useForm(loginFormInputs);
    
    const { 
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        onInputChange: onRegisterInputChange 
    } = useForm(registerFormInputs);

    const loginSubmit = (ev) => {
        ev.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    };

    const registerSubmit = (ev) => {
        //console.log('errorMessage: ', errorMessage);
        ev.preventDefault();
        if (registerPassword !== registerPassword2) {
            console.log('Datos incorrectos', 'Las contraseñas no coinciden', 'error');
            //Swal.fire('Datos incorrectos', 'Las contraseñas no coinciden', 'error');
            //return;
        }
        if (registerPassword === registerPassword2) {
            startRegister({name: registerName, email: registerEmail, password: registerPassword});
        }
    };

    const checkStatusState = () => {
        setIsChecking(status === AUTH_CHECKING);
        if (status === AUTH_AUTHORIZED && isModalOpen) {
            closeModal();
        }
    };

    /* useEffect(() => {
        if (errorMessage !== undefined) {
            //Swal.fire('Datos incorrectos', errorMessage, 'error');
            console.log('errorMessage: ', errorMessage);
            setErrorRegister(errorMessage);
        }
    }, [errorMessage]); */

    useEffect(() => {
        checkStatusState();
    }, [status]);
    
    console.log('errorMessage: ', errorMessage);
    

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
                <div className={`w-100 d-flex flex-column justify-content-center align-items-start mb-2 ${isChecking ? 'pe-none' : ''}`}>
                    <p className="mb-1">Already user? Please login.</p>
                    <h3 className="mb-2">Login</h3>
                    <form onSubmit={loginSubmit} className="w-100 mb-4">
                        <div className="w-100 mb-3">
                            <input  
                                type="text" 
                                name="loginEmail" 
                                value={loginEmail} 
                                placeholder="Email" 
                                className="form-control mb-2" 
                                onChange={onLoginInputChange} 
                            />
                            <input  
                                type="text" 
                                name="loginPassword" 
                                value={loginPassword} 
                                placeholder="Password" 
                                className="form-control" 
                                onChange={onLoginInputChange} 
                            />
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <button type="submit" className="btn btn-dark py-1 px-3">Login</button>
                        </div>
                    </form>
                </div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-start">
                    <p className="mb-1">New user? Please register.</p>
                    <h3 className="mb-2">Register</h3>
                    <form onSubmit={registerSubmit} className="w-100">
                        <div className="w-100 mb-3 has-validation">
                            <input  
                                type="text" 
                                name="registerName" 
                                value={registerName} 
                                placeholder="Name" 
                                className="form-control mb-2" 
                                onChange={onRegisterInputChange} 
                            />
                            <input  
                                type="text" 
                                name="registerEmail" 
                                value={registerEmail} 
                                placeholder="Email" 
                                className="form-control mb-2" 
                                onChange={onRegisterInputChange} 
                            />
                            <input  
                                type="text" 
                                name="registerPassword" 
                                value={registerPassword} 
                                placeholder="Password" 
                                className="form-control mb-2" 
                                onChange={onRegisterInputChange} 
                            />
                            <input  
                                type="text" 
                                name="registerPassword2" 
                                value={registerPassword2} 
                                placeholder="Repeat password" 
                                className="form-control" 
                                onChange={onRegisterInputChange} 
                            />
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <button type="submit" className="btn btn-dark py-1 px-3">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
