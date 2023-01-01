import { NavLink } from 'react-router-dom';
import { ROUTE_CART } from '../../../../router/constants';
import { NavIcon } from '../NavIcon/NavIcon';
import './AppCart.css';

export const AppCart = () => {

    const checkActiveClass = ({isActive}) => {
        return isActive ? 'active-link' : '';
    };

    const cart = [1, 2, 3]

    return (
        <div className="cart-wrapper">
            <NavLink to={`${ROUTE_CART}`} className={(args) => checkActiveClass(args)}>
                <span>
                    <NavIcon 
                        alt="Cart" 
                        src="/src/assets/img/shopping-cart.svg" 
                    />
                    {
                        (cart && cart.length) ? 
                            (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.length}
                                    <span className="visually-hidden">Cart items</span>
                                </span>
                            )
                            : (null)
                    }
                </span>
            </NavLink>
        </div>
    );
};
