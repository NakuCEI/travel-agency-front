import { useEffect, useState } from 'react'; // Importación de hooks de react
import { useCartStore } from '../store/hooks'; // Importación del hook para manejar el carrito de compra
import { CartItem } from '../components/Products'; // Importación del componente para renderizar cada item del carrito
// Constantes de textos en pantalla
const productSingular = 'producto';
const myProducts = 'Mis productos';
const purchaseConfirmation = 'Confirmar compra';
const noticeMessage = 'Antes de confirmar la compra asegúrate de rellenar correctamente las fechas.';
const noProductsInCart = 'No hay productos en el carrito de compra.';

// Compnente CartPage
const CartPage = () => {
    // Se extraen constante y métodos del hook para el manejo del carrito de compra
    const { 
        cart, 
        getUserCart, 
        saveCartItem, 
        deleteCartItem, 
        getTotalAmount, 
        getPurchaseAvailable, 
        setEmptyCart 
    } = useCartStore();
    // useSate para almacenar el importe total del carrito de compra
    const [totalAmount, setTotalAmount] = useState(0);
    // useSate para guardar el estado de compra disponible
    const [purchaseAvailable, setpurchaseAvailable] = useState(false);

    // Método para confirmar compra y borrar el carrito del usuario
    const confirmPurchase = () => {
        setEmptyCart();
    };

    // Método para actualizar un producto adquirido y el carrito de compra
    const updateProduct = async (newProduct) => {
        await saveCartItem(newProduct);
        getUserCart();
    };

    // Método para eliminar un item del carrito de compra
    const removeProduct = (id) => {
        deleteCartItem(id);
    };

    // Método para actualizar la vista
    const updateView = () => {
        // Si hay elementos en el carrito se comprueba si se puede confirmar la compra
        (cart && cart.length > 0) && setpurchaseAvailable(getPurchaseAvailable());
        // Si hay elementos en el carrito se calcula el importe total
        (cart && cart.length > 0) && setTotalAmount(getTotalAmount());
    };
    
    // useEffect para actualizar la vista con cada cambio en el carrito de compra
    useEffect(() => {
        updateView();
    }, [cart]);
    
    // useEffect para actualizar la vista con el contenido del carrito de compra al renderizar el componente la primera vez
    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-2">
                <h1>{myProducts}</h1>
            </div>
            <div className="container mx-auto" style={{ maxWidth: "800px" }}>
                <div className="d-flex flex-column mb-2">
                    {/* Cuando hay elementos en el carrito de compra se renderizan los datos relativos a su número, importe y se muestra el botón de confirmar compra */}
                    {
                        (cart !== null && cart && cart.length > 0) ? 
                            (
                                <>
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                                        <div className="d-flex justify-content-between justify-content-sm-start align-items-center">
                                            <p className="mb-0 text-secondary h5">
                                                <span className="text-dark">{cart.length}</span> {`${productSingular}${cart.length === 1 ? '' : 's'}`}
                                            </p>
                                            <div className="vr mx-2"></div>
                                            <p className="mb-0 text-secondary h5">
                                                Total: <span className="text-dark">{totalAmount} €</span>
                                            </p>
                                        </div>
                                        <button 
                                            className="btn btn-primary mt-3 mt-sm-0 text-break" 
                                            disabled={!purchaseAvailable} 
                                            onClick={() => confirmPurchase()} 
                                        >{purchaseConfirmation}</button>
                                    </div>
                                    <p className="mt-2 text-secondary">{noticeMessage}</p>
                                </>
                            )
                            : null
                    }
                </div>
                <section className="p-3 bg-light text-dark border rounded-3">
                    <div className="row d-flex justify-content-center px-2">
                        {/* Si hay productos se muestran y si no se muestra un mensaje notificando que el carrito está vacío */}
                        {
                            (cart !== null && cart && cart.length > 0) ? 
                                (
                                    cart.map(item => (
                                        <CartItem  
                                            key={item._id} 
                                            product={item} 
                                            removeItem={removeProduct} 
                                            updateProduct={updateProduct} 
                                        />
                                    ))
                                )
                                : (
                                    <div className="d-flex justify-content-center">
                                        <p className="mb-0 h6">{noProductsInCart}</p>
                                    </div>
                                )
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CartPage;
