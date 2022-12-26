import { NavIcon } from '../NavIcon/NavIcon';
import './AppCart.css';

export const AppCart = () => {

    const cart = [1, 2, 3]

    return (
        <div className="cart-wrapper">
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
        </div>
    );
};
