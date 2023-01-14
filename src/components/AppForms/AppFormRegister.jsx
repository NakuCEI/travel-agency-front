import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../store/auth';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../store/hooks';
import AppFormInput from '../AppFormInput/AppFormInput';
import { 
    MAX_PASSWORD_LENGTH, 
    MIN_FORM_VALUE_LENGTH, 
    MIN_PASSWORD_LENGTH 
} from '../../constants';

const newUserText = '¿Usuario nuevo? Por favor regístrate.';
const registerTitle = 'Registro';
const registerButtonText = 'Registrar';
const errorPasswordsNotEqual = 'Las contraseñas introducidas no coinciden';

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
            dispatch(onLogout(errorPasswordsNotEqual));
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
        setisRegisterFormAvailable((
            registerName.length >= MIN_FORM_VALUE_LENGTH && 
            registerEmail.length >= MIN_FORM_VALUE_LENGTH && 
            (
                registerPassword.length >= MIN_PASSWORD_LENGTH && 
                registerPassword.length <= MAX_PASSWORD_LENGTH
            ) && (
                registerPassword2.length >= MIN_PASSWORD_LENGTH && 
                registerPassword2.length <= MAX_PASSWORD_LENGTH
            )
            ));
    }, [
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        isRegisterFormAvailable
    ]);

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
                        type="password" 
                        name="registerPassword" 
                        placeholder="Contraseña" 
                        value={registerPassword} 
                        onChange={onRegisterInputChange} 
                    />
                    <AppFormInput 
                        type="password" 
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
