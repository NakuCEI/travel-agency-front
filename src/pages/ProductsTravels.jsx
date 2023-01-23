import { getProductsByCategory } from '../helpers'; // Importación de método para buscar productos por categoría
import { TRAVELS } from '../constants'; // Importación de constante de la categoría
import { ProductItem } from '../components/Products'; // Importación de componente del card de cada producto

// Componente ProductsTravels
const ProductsTravels = () => {
    
    // Constante para guardar los productos encontrados con la categoría
    const products = getProductsByCategory(TRAVELS);

    // En un bucle se generan los productos
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
