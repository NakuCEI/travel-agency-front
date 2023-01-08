import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onLogout } from "../../store/auth";
import { useForm } from "../../hooks";
import { AUTH_AUTHORIZED, AUTH_CHECKING } from "../../store/constants";
import { useAuthStore, useUiStore } from "../../store/hooks";
import AppFormInput from "../AppFormInput/AppFormInput";
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
    
    const dispatch = useDispatch();
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    const { status } = useAuthStore();
    const { isModalOpen, closeModal } = useUiStore();
    const [ isChecking, setIsChecking ] = useState(false);
    const [ isLoginFormAvailable, setisLoginFormAvailable ] = useState(false);
    const [ isRegisterFormAvailable, setisRegisterFormAvailable ] = useState(false);

    const checkLoginSubmit = (ev) => {
        ev.preventDefault();
        if (isLoginFormAvailable) {
            startLogin({email: loginEmail, password: loginPassword});
        }
    };

    const checkRegisterSubmit = (ev) => {
        ev.preventDefault();
        if (registerPassword !== registerPassword2) {
            dispatch(onLogout('Passwords are not the same'));
        }
        if (isRegisterFormAvailable && registerPassword === registerPassword2) {
            startRegister({name: registerName, email: registerEmail, password: registerPassword});
        }
    };

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

    const checkStatusState = () => {
        setIsChecking(status === AUTH_CHECKING);
        if (status === AUTH_AUTHORIZED && isModalOpen) {
            closeModal();
        }
    };

    useEffect(() => {
        setisLoginFormAvailable((loginEmail.length > 3 && (loginPassword.length > 5 && loginPassword.length < 11)));
    }, [loginEmail, loginPassword, isLoginFormAvailable]);

    useEffect(() => {
        setisRegisterFormAvailable((registerName.length > 3 && registerEmail.length > 3 && (registerPassword.length > 5 && registerPassword.length < 11) && (registerPassword2.length > 5 && registerPassword2.length < 11)));
    }, [registerName, registerEmail, registerPassword, registerPassword2, isRegisterFormAvailable]);

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
                <div className={`w-100 d-flex flex-column justify-content-center align-items-start mb-2 ${isChecking ? 'pe-none' : ''}`}>
                    <p className="mb-1">Already user? Please login.</p>
                    <h3 className="mb-2">Login</h3>
                    <form onSubmit={checkLoginSubmit} className="w-100 mb-4">
                        <div className="w-100 mb-3">
                            <AppFormInput  
                                name="loginEmail" 
                                placeholder="Email" 
                                value={loginEmail} 
                                onChange={onLoginInputChange} 
                            />
                            <AppFormInput  
                                name="loginPassword" 
                                placeholder="Password" 
                                value={loginPassword}  
                                onChange={onLoginInputChange} 
                            />
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <button 
                                type="submit" 
                                className="btn btn-dark py-1 px-3" 
                                disabled={!isLoginFormAvailable}
                            >Login</button>
                        </div>
                    </form>
                </div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-start">
                    <p className="mb-1">New user? Please register.</p>
                    <h3 className="mb-2">Register</h3>
                    <form onSubmit={checkRegisterSubmit} className="w-100">
                        <div className="w-100 mb-3 has-validation">
                        <AppFormInput 
                                name="registerName" 
                                placeholder="Name" 
                                value={registerName} 
                                onChange={onRegisterInputChange} 
                            />
                            <AppFormInput 
                                name="registerEmail" 
                                placeholder="Email" 
                                value={registerEmail} 
                                onChange={onRegisterInputChange} 
                            />
                            <AppFormInput 
                                name="registerPassword" 
                                placeholder="Password" 
                                value={registerPassword} 
                                onChange={onRegisterInputChange} 
                            />
                            <AppFormInput 
                                name="registerPassword2" 
                                placeholder="Repeat password" 
                                value={registerPassword2} 
                                onChange={onRegisterInputChange} 
                            />
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <button 
                                type="submit" 
                                className="btn btn-dark py-1 px-3"
                                disabled={!isRegisterFormAvailable}
                            >Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
