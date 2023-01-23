import { getAllProducts } from '../helpers'; // Importación de método para cargar los productos
import { ProductItem } from '../components/Products'; // Importación de componente de cada producto

// Componente HomePage
const HomePage = () => {
    // Constante para guardar los productos
    const products = getAllProducts();

    // En un bucle se generan los productos
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
