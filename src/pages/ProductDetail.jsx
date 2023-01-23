import { useNavigate, useParams } from 'react-router-dom'; // Importación de hooks para manejar navegación
import { useAuthStore, useCartStore } from '../store/hooks'; // Importación de hooks para el usuario y el carrito de compra 
import { getProductById } from '../helpers'; // Importación de método para buscar producto por id
import { ProductCard } from '../components/Products'; // Importación de componente del card de cada producto

// Constantes para textos
const productNotFound = 'Producto no encontrado';
const goBack = 'Volver atrás';

// Componente ProductDetail
const ProductDetail = () => {

    // Objeto de navegación
    const navigate = useNavigate();
    // Constante para guardar el id del producto de la url
    const { id } = useParams();
    // Constante para guardar el producto encontrado con el id
    const product = getProductById(id) || null;
    // Método del estado del carrito de compra para guardar un producto
    const { saveCartItem } = useCartStore();
    // Constante de información del usuario
    const { user } = useAuthStore();

    // Método para retroceder en el historial de navegación
    const handleGoBack = () => {
        navigate(-1);
    };

    // Método para crear un objeto de producto para ser guardado en el carrito
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

    // Método para añadir un producto al carrito
    const handleAddToCart = () => {
        const newCartItem = getProductItem();
        saveCartItem(newCartItem);
    };

    return (
        <div className="d-flex flex-column justify-content-start align-items-center">
            <div className="w-100">
                {/* Si existe el producto se muestra su nombre y si no, se notifica que no se ha encontrado */}
                {
                    (product) ? 
                        (<h1 className="w-100 mb-4 text-left text-capitalize border-bottom border-secondary">{product.name}</h1>)
                        : (<h2 className="w-100 mb-4 text-center text-danger">{productNotFound}</h2>)
                }
            </div>
            <div className="row">
                {/* Si existe el producto se muestra su card y si no, se muestra el botón para retroceder en la navegación */}
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
