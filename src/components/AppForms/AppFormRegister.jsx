import { useEffect, useState } from 'react'; // Importación de hooks de react
import { useDispatch } from 'react-redux'; // Importación de useDispatch para lanzar acciones del store
import { onLogout } from '../../store/auth'; // Importación de método para lanzar errores
import { useAuthStore } from '../../store/hooks'; // Importación de hook de gestión del usuario
import { useForm } from '../../hooks'; // Importación de hook del formulario
import AppFormInput from '../AppFormInput/AppFormInput'; // Importación de componente input del formulario
import { 
    MAX_PASSWORD_LENGTH, 
    MIN_FORM_VALUE_LENGTH, 
    MIN_PASSWORD_LENGTH 
} from '../../constants'; // Importación de constantes para los valores campos

// Constantes para textos
const newUserText = '¿Usuario nuevo? Por favor regístrate.';
const registerTitle = 'Registro';
const registerButtonText = 'Registrar';
const errorPasswordsNotEqual = 'Las contraseñas introducidas no coinciden';

// Estado inicial del formulario
const registerFormInputs = {
    registerName: '', 
    registerEmail: '', 
    registerPassword: '', 
    registerPassword2: '' 
};

// Componente AppFormRegister
export const AppFormRegister = () => {

    // Constante "dispatch" para lanzar acciones del estado
    const dispatch = useDispatch();
    // Método de registro del hook de usuario
    const { startRegister } = useAuthStore();
    // useState para almacenar la validez del valor del formulario
    const [ isRegisterFormAvailable, setisRegisterFormAvailable ] = useState(false);

    // Método para comprobar la validez del formulario
    const checkRegisterSubmit = (ev) => {
        ev.preventDefault();
        // Si los campos de contraseña no son iguales se lanza error
        if (registerPassword !== registerPassword2) {
            dispatch(onLogout(errorPasswordsNotEqual));
        }
        // Si el formulario es válido y los campos de contraseña son iguales se lanza el registro en la API
        if (isRegisterFormAvailable && registerPassword === registerPassword2) {
            startRegister({name: registerName, email: registerEmail, password: registerPassword});
        }
    };

    // Uso de valores del formulario para el hook
    const { 
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        onInputChange: onRegisterInputChange 
    } = useForm(registerFormInputs);

    // useEffect para ejecutar con los cambios en los campos del formulario
    // Establece la validez del formulario
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
