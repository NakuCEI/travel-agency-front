import { getProductsByCategory } from '../helpers';
import { TRAVELS } from '../constants';
import { ProductItem } from '../components/Products';

const ProductsTravels = () => {
    
    const products = getProductsByCategory(TRAVELS);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-2">
                <h1>Travels</h1>
            </div>
            <section className='row'>
                {
                    products.map(product => (
                        <ProductItem key={product.id} {...product} />
                    ))
                }
            </section>
        </div>
    );
};

export default ProductsTravels;
