import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../helpers';
import { ProductCard } from '../components/Products';

const ProductDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const product = getProductById(id) || null;

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        console.log('handleAddToCart');
    };

    return (
        <div className="d-flex flex-column justify-content-start align-items-center">
            <div className="w-100">
                {
                    (product) ? 
                        (<h1 className="w-100 mb-4 text-left text-capitalize border-bottom border-secondary">{product.name}</h1>)
                        : (<h2 className="w-100 mb-4 text-center text-danger">Product Not Found</h2>)
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
                                <button onClick={() => handleGoBack()} className='btn btn-secondary btn-sm'>Go back</button>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ProductDetail;
