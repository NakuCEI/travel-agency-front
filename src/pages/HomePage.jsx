import { ProductItem } from '../components/Products';
import { getAllProducts } from '../helpers';

export const HomePage = () => {
    
    const products = getAllProducts();

    return (
        <section className='row'>
            {
                products.map(product => (
                    <ProductItem key={product.id} {...product} />
                ))
            }
        </section>
    );
};
