import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // Importación de hooks y elemento de navegación
import { useAuthStore, useUiStore } from '../../../store/hooks'; // Importación de hooks de manejo de usuario y modal
import { AUTH_AUTHORIZED } from '../../../store/constants'; // Importación de constante de usuario autorizado
import { 
    ROUTE_CART,
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS 
} from '../../../router/constants'; // Importación de constantes para los valores de rutas de los enlaces
import { AppCart } from './AppCart/AppCart'; // Importación de componente para el enlace al carrito de compra
import { AppUser } from './AppUser/AppUser'; // Importación de componente para el botón de usuario
import './Navbar.css'; // Importación de estilos

// Componente Navbar
export const Navbar = () => {

    // Objeto de navegación
    const navigate = useNavigate();
    // Constante para la ruta de navegación
    const { pathname } = useLocation();
    // Constantes de información del usuario y método de logout del hook de usuario
    const {user, status, startLogout} = useAuthStore();
    // Método del hook de control de la modal
    const {openModal} = useUiStore();

    // Método para comprobar la url
    const checkUrl = () => {
        // Si la url corresponde al carrito se retrocede en el historial de navegación
        if (ROUTE_CART === pathname) {
            navigate(-1);
        }
    };
    
    // Método para abrir la ventana modal
    const handleUserLogin = () => {
        openModal();
    };

    // Método para cerrar la sesión del usuario
    const handleLogout = () => {
        startLogout();
        checkUrl();
    };

    // Método para comprobar si el link está activo
    const checkActiveClass = ({isActive}) => {
        return isActive ? 'active-link' : '';
    };

    return (
        <nav className="d-flex justify-content-around justify-content-sm-between align-items-center py-2">
            <div className='navbar-nav'>
                <ul className='menu'>
                    <li><NavLink className={(args) => checkActiveClass(args)} to={ROUTE_HOME}>Home</NavLink></li>
                    <li><NavLink className={(args) => checkActiveClass(args)} to={ROUTE_TOURS}>Tours</NavLink></li>
                    <li><NavLink className={(args) => checkActiveClass(args)} to={ROUTE_TRAVELS}>Viajes</NavLink></li>
                </ul>
            </div>
            {/* Si el usuario está autentificado se muestra el enlace del carrito de compra y el botón de usuario
            y en caso contrario se muestra el botón de login */}
            {
                (status === AUTH_AUTHORIZED) ? 
                    (
                        <>          
                            <div className="vr mx-3"></div>
                            <div className="d-flex">
                                <AppCart />
                                {user ? <AppUser user={user} handleLogout={handleLogout} /> : null}
                            </div>
                        </>
                    ) : (
                        <div className="p-2 ms-4">
                            <button 
                                className="w-100 btn btn-danger py-0 py-1 rounded-1" 
                                onClick={() => handleUserLogin()} 
                            >
                                LOGIN
                            </button>
                        </div>
                    )
            }
        </nav>
    );
};
