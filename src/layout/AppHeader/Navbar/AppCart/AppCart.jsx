import { useEffect } from 'react'; // Importación de hook de react
import { NavLink } from 'react-router-dom'; // Importación de elemento de navegación
import { ROUTE_CART } from '../../../../router/constants'; // Importación de ruta de carrito de compra
import { useCartStore } from '../../../../store/hooks'; // Importación de hook de carrito de compra
import { NavIcon } from '../NavIcon/NavIcon'; // Importación de componente icono
import './AppCart.css'; // Importación de estilos

// Constante para imagen del enlace del carrito de compra
const shoppingCartImage = '../../../../assets/img/shopping-cart.svg';

// Componente AppCart
export const AppCart = () => {
    
    // Constante del carrito de compra y método del estado del hook de carrito de compra
    const { cart, getUserCart } = useCartStore();

    // Método para comprobar si el link está activo
    const checkActiveClass = ({isActive}) => {
        return isActive ? 'active-link' : '';
    };
    
    // useEffect para cargar la información del carrito de compra del usuario al renderizarse el componente
    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <div className="cart-wrapper">
            <NavLink to={`${ROUTE_CART}`} className={(args) => checkActiveClass(args)}>
                <span>
                    <NavIcon 
                        alt="Cart" 
                        src={shoppingCartImage} 
                    />
                    {/* Si hay elementos en el carrito de compra se muestra icono con su cantidad */}
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
