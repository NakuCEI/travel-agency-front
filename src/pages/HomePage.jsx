import { getAllProducts } from '../helpers';
import { ProductItem } from '../components/Products';

const HomePage = () => {
    
    const products = getAllProducts();

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-2">
                <h1>Home</h1>
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

export default HomePage;
