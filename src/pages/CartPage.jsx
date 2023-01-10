import { useEffect, useState } from 'react';
import { useCartStore } from '../store/hooks';
import { CartItem } from '../components/Products';

const CartPage = () => {
    
    const { cart, getUserCart, saveCartItem, deleteCartItem, getTotalAmount, getPurchaseAvailable } = useCartStore();
    const [totalAmount, setTotalAmount] = useState(0);
    const [purchaseAvailable, setpurchaseAvailable] = useState(false);

    const confirmPurchase = () => {
        console.log('confirmPurchase');
    };

    const updateProduct = async (newProduct) => {
        await saveCartItem(newProduct);
        getUserCart();
    };

    const removeProduct = (id) => {
        deleteCartItem(id);
    };

    const updateView = () => {
        (cart && cart.length > 0) && setpurchaseAvailable(getPurchaseAvailable());
        (cart && cart.length > 0) && setTotalAmount(getTotalAmount());
    };
    
    useEffect(() => {
        updateView();
    }, [cart]);
    
    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-2">
                <h1>My Cart</h1>
            </div>
            <div className="mx-auto" style={{ maxWidth: "800px" }}>
                <div className="d-flex flex-column mb-2">
                    {
                        (cart !== null && cart && cart.length > 0) ? 
                            (
                                <>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p className="mb-0 text-secondary h5">
                                                <span className="text-dark">{cart.length}</span> {`product${cart.length === 1 ? '' : 's'}`}
                                            </p>
                                            <div className="vr mx-2"></div>
                                            <p className="mb-0 text-secondary h5">
                                                Total: <span className="text-dark">{totalAmount} €</span>
                                            </p>
                                        </div>
                                        <button 
                                            className="btn btn-primary" 
                                            disabled={!purchaseAvailable} 
                                            onClick={() => confirmPurchase()} 
                                        >Confirm</button>
                                    </div>
                                    <p className="mt-2 text-secondary">Before confirming the purchase, be sure to fill in the dates.</p>
                                </>
                            )
                            : null
                    }
                </div>
                <section className="p-3 bg-light text-dark border rounded-3">
                    <div className="row d-flex justify-content-center px-2">
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
                                        <p className="mb-0 h6">No items in shopping cart</p>
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
