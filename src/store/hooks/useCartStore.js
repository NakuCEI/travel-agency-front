import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api';
import { getCart, addToCart, removeItemCart, updateItemCart } from '../cart';

export const useCartStore = () => {

    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startSavingItem = async (cartItem) => {
        console.log('cartItem: ', cartItem);
        console.log('user: ', user);
        try { 
            if (cartItem._id) {
                // actualizar
                await agencyApi.put(`/cart/${cartItem._id}`, cartItem);
                dispatch(updateItemCart({...cartItem, user}));
            }else {
                // crear
                const { data } = await agencyApi.post('/cart/', cartItem);
                console.log('data: ', data);

                dispatch(addToCart({
                    ...cartItem, 
                    _id: data.cart._id
                }));
            };
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const startDeleteCartItem = async (cartItemId) => {
        console.log('cartItemId: ', cartItemId);

        try {
            await agencyApi.delete(`/cart/${cartItemId}`);
            dispatch(removeItemCart(cartItemId));
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const startGettingStoreCart = async () => {
        console.log('user: ', user);
        
        try {
            const { data } = await agencyApi.get(`/cart/${user.uid}`);
            console.log('data: ', data);
            console.log('data.cart: ', data.cart);

            dispatch(getCart(data.cart));
            
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.amount, 0);
    };

    return {
        cart, 
        getTotalAmount, 
        startSavingItem, 
        startDeleteCartItem, 
        startGettingStoreCart 
    };
};
