import { useEffect, useState } from 'react'; // Importación de hooks de react
import { useForm } from '../../hooks'; // Importación de hook del formulario
import { useAuthStore } from '../../store/hooks'; // Importación de hook de gestión del usuario
import AppFormInput from '../AppFormInput/AppFormInput'; // Importación de componente input del formulario
import { 
    MAX_PASSWORD_LENGTH, 
    MIN_FORM_VALUE_LENGTH, 
    MIN_PASSWORD_LENGTH 
} from '../../constants'; // Importación de constantes para los valores campos

// Constantes para textos
const yetUserText = '¿Ya eres usuario? Por favor loguéate.';
const loginTitle = 'Login';
const loginButtonText = 'Login';

// Estado inicial del formulario
const loginFormInputs = {
    loginEmail: '', 
    loginPassword: '' 
};

// Componente AppFormLogin
export const AppFormLogin = () => {

    // Método de login del hook de usuario
    const { startLogin } = useAuthStore();
    // useState para almacenar la validez del valor del formulario
    const [ isLoginFormAvailable, setisLoginFormAvailable ] = useState(false);

    // Método para comprobar la validez del formulario
    const checkLoginSubmit = (ev) => {
        ev.preventDefault();
        // Si el formulario es válido se lanza el login en la API
        if (isLoginFormAvailable) {
            startLogin({email: loginEmail, password: loginPassword});
        }
    };

    // Uso de valores del formulario para el hook
    const { 
        loginEmail, 
        loginPassword, 
        onInputChange: onLoginInputChange 
    } = useForm(loginFormInputs);

    // useEffect para ejecutar con los cambios en los campos del formulario
    // Establece la validez del formulario
    useEffect(() => {
        setisLoginFormAvailable((
            loginEmail.length >= MIN_FORM_VALUE_LENGTH && 
            (
                loginPassword.length >= MIN_PASSWORD_LENGTH && 
                loginPassword.length <= MAX_PASSWORD_LENGTH
            )
        ));
    }, [
        loginEmail, 
        loginPassword, 
        isLoginFormAvailable
    ]);
    
    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-start">
            <p className="mb-1">{yetUserText}</p>
            <h3 className="mb-2">{loginTitle}</h3>
            <form onSubmit={checkLoginSubmit} className="w-100 mb-4">
                <div className="w-100 mb-3">
                    <AppFormInput  
                        name="loginEmail" 
                        placeholder="Email" 
                        value={loginEmail} 
                        onChange={onLoginInputChange} 
                    />
                    <AppFormInput 
                        type="password" 
                        name="loginPassword" 
                        placeholder="Contraseña" 
                        value={loginPassword}  
                        onChange={onLoginInputChange} 
                    />
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <button 
                        type="submit" 
                        className="btn btn-dark py-1 px-3" 
                        disabled={!isLoginFormAvailable}
                    >{loginButtonText}</button>
                </div>
            </form>
        </div>
    );
};
