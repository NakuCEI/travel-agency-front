import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../store/hooks';
import { getProductById } from '../helpers';
import { ProductCard } from '../components/Products';

const productNotFound = 'Producto no encontrado';
const goBack = 'Volver atrás';

const ProductDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const product = getProductById(id) || null;
    const { saveCartItem } = useCartStore();
    const { user } = useAuthStore();

    const handleGoBack = () => {
        navigate(-1);
    };

    const getProductItem = () => {
        const todaysDate = new Date().toISOString().slice(0, -8);
        return {
            reservation: product.id, 
            amount: product.price, 
            start: todaysDate, 
            end: todaysDate, 
            user: user.uid 
        };
    };

    const handleAddToCart = () => {
        const newCartItem = getProductItem();
        saveCartItem(newCartItem);
    };

    return (
        <div className="d-flex flex-column justify-content-start align-items-center">
            <div className="w-100">
                {
                    (product) ? 
                        (<h1 className="w-100 mb-4 text-left text-capitalize border-bottom border-secondary">{product.name}</h1>)
                        : (<h2 className="w-100 mb-4 text-center text-danger">{productNotFound}</h2>)
                }
            </div>
            <div className="row">
                {
                    (product) ? 
                        (
                            <ProductCard 
                                {...product} 
                                clickGoBack={handleGoBack} 
                                clickAddToCart={handleAddToCart} 
                            />
                        )
                        : (
                            <div className="d-flex justify-content-center">
                                <button onClick={() => handleGoBack()} className='btn btn-secondary btn-sm'>{goBack}</button>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ProductDetail;
