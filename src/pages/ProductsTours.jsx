import { getProductsByCategory } from '../helpers'; // Importación de método para buscar productos por categoría
import { TOURS } from '../constants'; // Importación de constante de la categoría
import { ProductItem } from '../components/Products'; // Importación de componente del card de cada producto

// Componente ProductsTours
const ProductsTours = () => {
    
    // Constante para guardar los productos encontrados por la categoría
    const products = getProductsByCategory(TOURS);

    // En un bucle se generan los productos
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
