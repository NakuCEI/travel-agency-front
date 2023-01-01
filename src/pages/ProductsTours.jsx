import { getProductsByCategory } from '../helpers';
import { TOURS } from '../constants';
import { ProductItem } from '../components/Products';

const ProductsTours = () => {
    
    const products = getProductsByCategory(TOURS);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-2">
                <h1>Tours</h1>
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

export default ProductsTours;
