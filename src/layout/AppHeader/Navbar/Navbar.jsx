import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore, useUiStore } from '../../../store/hooks';
import { AUTH_AUTHORIZED } from '../../../store/constants';
import { 
    ROUTE_CART,
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS 
} from '../../../router/constants';
import { AppCart } from './AppCart/AppCart';
import { AppUser } from './AppUser/AppUser';
import './Navbar.css';

export const Navbar = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {user, status, startLogout} = useAuthStore();
    const {openModal} = useUiStore();

    const checkUrl = () => {
        if (ROUTE_CART === pathname) {
            navigate(-1);
        }
    };

    const handleUserLogin = () => {
        openModal();
    };

    const handleLogout = () => {
        startLogout();
        checkUrl();
    };

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
