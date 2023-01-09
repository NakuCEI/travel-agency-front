const storageUserKey = 'user';
const storageCartKey = 'cart';

export const getUserLocalStorage = () => {
    return JSON.parse(localStorage.getItem(storageUserKey)) || null;
};

export const setUserLocalStorage = (user) => {
    localStorage.setItem(storageUserKey, JSON.stringify(user));
};

export const removeUserLocalStorage = () => {
    localStorage.removeItem(storageUserKey);
};

export const getCartLocalStorage = () => {
    return JSON.parse(localStorage.getItem(storageCartKey)) || null;
};

export const setCartLocalStorage = (cart) => {
    console.log('cart: ', cart);
    localStorage.setItem(storageCartKey, JSON.stringify(cart));
};

export const removeCartLocalStorage = () => {
    localStorage.removeItem(storageCartKey);
};
