/*
    Importaciones de react-redux:
    - useDispatch: referencia de la función dispatch del store para lanzar acciones.
    - useSelector: permite acceder a un estado del store
*/
import { useDispatch, useSelector } from 'react-redux';
import { agencyApi } from '../../api'; // API de la aplicación
import { getCart, addToCart, removeItemCart, updateItemCart, emptyCart } from '../cart'; // Métodos de las acciones de estado del carrito de compra
import { compareDates } from '../../helpers'; // Función para manejo de fechas

// Constante para la ruta del carrito de compra
const CART_URL = '/cart/';

// useCartStore - Hook para manejar el estado del carrito de compra
export const useCartStore = () => {

    // Desestructuración de "cart" con el estado del carrito de compra
    const { cart } = useSelector((state) => state.cart);
    // Desestructuración de "user" con el estado del usuario
    const { user } = useSelector((state) => state.auth);
    // Constante "dispatch" para lanzar acciones del estado
    const dispatch = useDispatch();

    // saveCartItem: función para crear/ actualizar un ítem en el carrito de compra
    const saveCartItem = async (cartItem) => {
        // cartItem es el objeto del nuevo ítem
        // Bloque try/ catch para manejar la llamada a la API
        try { 
            // Se comprueba si el "cartItem" tiene identificador
            if (cartItem._id) {
                // Al tener identificador es un ítem existente y por lo tanto hay que actualizarlo
                // En la llamada se emplea el método put y en la ruta se envía el id del ítem y en el body se manda el objeto del ítem con la información
                await agencyApi.put(`${CART_URL}${cartItem._id}`, cartItem);
                // Se actualiza el nuevo ítem en el estado del carrito
                dispatch(updateItemCart({
                    ...cartItem, 
                    user
                }));

            } else {
                // Al no tener identificador es un ítem nuevo y por lo tanto hay que crearlo
                // En la llamada se emplea el método post y en el body se manda el objeto del ítem con la información
                const { data } = await agencyApi.post(CART_URL, cartItem);
                // Se crea el nuevo ítem en el estado del carrito
                dispatch(addToCart({
                    ...cartItem, 
                    _id: data.cart._id
                }));
            };
        } catch (error) {
            // En caso de error se lanza por consola
            console.log('Error: ', error.message);
        }
    };

    // deleteCartItem: función para eliminar un ítem en el carrito de compra
    const deleteCartItem = async (cartItemId) => {
        // cartItemId es el identificador del ítem a eliminar
        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la llamada se emplea el método delete y en la ruta se envía el id del ítem a eliminar
            await agencyApi.delete(`${CART_URL}${cartItemId}`);
            // Se elimina el ítem en el estado del carrito enviando el id
            dispatch(removeItemCart(cartItemId));
        } catch (error) {
            // En caso de error se lanza por consola
            console.log('Error: ', error.message);
        }
    };

    // getUserCart: función para recopilar los ítems en el carrito de compra de un usuario
    const getUserCart = async () => {
        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la constante "data" se guardan los ítems del carrito de compra del usuario
            // En la llamada se emplea el método get y en la ruta se envía el id del usuario
            const { data } = await agencyApi.get(`${CART_URL}${user.uid}`);
            // Se actualiza el estado del carrito de compra con la información recibida
            dispatch(getCart(data.cart));
            
        } catch (error) {
            // En caso de error se lanza por consola
            console.log('Error: ', error.message);
        }
    };

    // setEmptyCart: función para eliminar los ítems en el carrito de compra de un usuario
    const setEmptyCart = async () => {
        // Bloque try/ catch para manejar la llamada a la API
        try {
            // En la llamada se emplea el método delete y en la ruta se envía el id del usuario
            await agencyApi.delete(`${CART_URL}/delete/${user.uid}`);
            // Se actualiza el estado del carrito de compra vaciándolo en el store
            dispatch(emptyCart());
            
        } catch (error) {
            // En caso de error se lanza por consola
            console.log('Error: ', error.message);
        }
    };

    // getTotalAmount: función para calcular el importe total de los ítems en el carrito de compra
    const getTotalAmount = () => {
        // Se recorren los ítems del carrito y se suman sus importes
        return cart.reduce((total, item) => total + item.amount, 0);
    };

    // getPurchaseAvailable: función para validar el estado de las fechas de los ítems del carrito de compra
    const getPurchaseAvailable = () => {
        // Variable para guardar el número de ítems con fechas válidas
        let isValid = 0;
        // Se recorren los ítems y se comparan las fechas e inicio y fin de cada producto
        for (let i = 0; i < cart.length; i++) {
            const itemValid = compareDates(cart[i]);
            // Si las fechas son válidas se incrementa el valor de la variable "itemValid"
            if (itemValid) {
                isValid++;
            }
        };
        // Se comprueba que el número de fechas correctas es igual al de productos del carrito de compra
        return isValid === cart.length ? true : false;
    };

    // Exposición de constante y métodos para manejar el estado del carrito de compra
    return {
        cart, 
        getTotalAmount, 
        saveCartItem, 
        deleteCartItem, 
        getUserCart, 
        setEmptyCart, 
        getPurchaseAvailable 
    };
};
