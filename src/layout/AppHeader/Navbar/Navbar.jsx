import { NavLink } from 'react-router-dom';
import { AppCart } from './AppCart/AppCart';
import { AppUser } from './AppUser/AppUser';
import { 
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS 
} from '../../../router/constants';
import './Navbar.css';

export const Navbar = ({ isLogged, handleUserLogin }) => {

    const userTest = {
        user: {
            name: 'Test'
        }
    }

    const handleLogout = () => {
        console.log('handleLogout');
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
                    <li><NavLink className={(args) => checkActiveClass(args)} to={ROUTE_TRAVELS}>Travels</NavLink></li>
                </ul>
            </div>
            {
                isLogged ? 
                    (
                        <>          
                            <div className="vr mx-3"></div>
                            <div className="d-flex">
                                <AppCart />
                                <AppUser user={userTest} handleLogout={handleLogout} />
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
