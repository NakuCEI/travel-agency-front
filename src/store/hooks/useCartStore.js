import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api';
import { compareDates } from '../../helpers';
import { getCart, addToCart, removeItemCart, updateItemCart } from '../cart';

const CART_URL = '/cart/';

export const useCartStore = () => {

    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const saveCartItem = async (cartItem) => {
        
        try { 
            if (cartItem._id) {
                // actualizar
                await agencyApi.put(`/cart/${cartItem._id}`, cartItem);
                dispatch(updateItemCart({
                    ...cartItem, 
                    user
                }));

            } else {
                // crear
                const { data } = await agencyApi.post(CART_URL, cartItem);
                dispatch(addToCart({
                    ...cartItem, 
                    _id: data.cart._id
                }));
            };
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    const deleteCartItem = async (cartItemId) => {

        try {
            await agencyApi.delete(`${CART_URL}${cartItemId}`);
            dispatch(removeItemCart(cartItemId));
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    const getUserCart = async () => {
        
        try {
            const { data } = await agencyApi.get(`${CART_URL}${user.uid}`);
            dispatch(getCart(data.cart));
            
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.amount, 0);
    };

    const getPurchaseAvailable = () => {
        let isValid = 0;
        for (let i = 0; i < cart.length; i++) {
            const itemValid = compareDates(cart[i]);
            if (itemValid) {
                isValid++;
            }
        };
        return isValid === cart.length ? true : false;
    };

    return {
        cart, 
        getTotalAmount, 
        saveCartItem, 
        deleteCartItem, 
        getUserCart, 
        getPurchaseAvailable 
    };
};
