import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../store/auth';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../store/hooks';
import AppFormInput from '../AppFormInput/AppFormInput';

const newUserText = '¿Usuario nuevo? Por favor regístrate.';
const registerTitle = 'Registro';
const registerButtonText = 'Registrar';

const registerFormInputs = {
    registerName: '', 
    registerEmail: '', 
    registerPassword: '', 
    registerPassword2: '' 
};

export const AppFormRegister = () => {

    const dispatch = useDispatch();
    const { startRegister } = useAuthStore();
    const [ isRegisterFormAvailable, setisRegisterFormAvailable ] = useState(false);

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
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        onInputChange: onRegisterInputChange 
    } = useForm(registerFormInputs);

    useEffect(() => {
        setisRegisterFormAvailable((registerName.length > 3 && registerEmail.length > 3 && (registerPassword.length > 5 && registerPassword.length < 11) && (registerPassword2.length > 5 && registerPassword2.length < 11)));
    }, [registerName, registerEmail, registerPassword, registerPassword2, isRegisterFormAvailable]);


    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-start">
            <p className="mb-1">{newUserText}</p>
            <h3 className="mb-2">{registerTitle}</h3>
            <form onSubmit={checkRegisterSubmit} className="w-100">
                <div className="w-100 mb-3 has-validation">
                <AppFormInput 
                        name="registerName" 
                        placeholder="Nombre" 
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
                        placeholder="Contraseña" 
                        value={registerPassword} 
                        onChange={onRegisterInputChange} 
                    />
                    <AppFormInput 
                        name="registerPassword2" 
                        placeholder="Repetir contraseña" 
                        value={registerPassword2} 
                        onChange={onRegisterInputChange} 
                    />
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <button 
                        type="submit" 
                        className="btn btn-dark py-1 px-3"
                        disabled={!isRegisterFormAvailable}
                    >{registerButtonText}</button>
                </div>
            </form>
        </div>
    );
};
