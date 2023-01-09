import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../store/hooks";
import AppFormInput from "../AppFormInput/AppFormInput";

const loginFormInputs = {
    loginEmail: '', 
    loginPassword: '' 
};

export const AppFormLogin = () => {

    const { startLogin } = useAuthStore();
    const [ isLoginFormAvailable, setisLoginFormAvailable ] = useState(false);

    const checkLoginSubmit = (ev) => {
        ev.preventDefault();
        if (isLoginFormAvailable) {
            startLogin({email: loginEmail, password: loginPassword});
        }
    };

    const { 
        loginEmail, 
        loginPassword, 
        onInputChange: onLoginInputChange 
    } = useForm(loginFormInputs);

    useEffect(() => {
        setisLoginFormAvailable((loginEmail.length > 3 && (loginPassword.length > 5 && loginPassword.length < 11)));
    }, [loginEmail, loginPassword, isLoginFormAvailable]);
    

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-start">
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
    );
};
