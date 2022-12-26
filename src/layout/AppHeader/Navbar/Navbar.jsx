import { AppCart } from './AppCart/AppCart';
import { AppUser } from './AppUser/AppUser';
import './Navbar.css';

export const Navbar = ({ isLogged }) => {

    const userTest = {
        user: {
            name: 'Test'
        }
    }

    const handleLogout = () => {
        console.log('handleLogout');
    };

    return (
        <nav className="d-flex justify-content-around justify-content-sm-between align-items-center py-2">
            <div className='navbar-nav'>
                <ul className='menu'>
                    <li>Home</li>
                    <li>Tours</li>
                    <li>Travels</li>
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
                    ) : null
            }
        </nav>
    );
};
