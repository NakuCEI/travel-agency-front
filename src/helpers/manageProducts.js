import { products } from '../data/dataProducts'; // JSON de los datos de los productos
import { TOURS, TRAVELS } from '../constants'; // Constantes de los nombres de las rutas

// Mensaje para la categoría que no exista
const errorCategoryNotExists = 'La categoría no existe';

// Método para recopilar todos los productos
export const getAllProducts = () => {
    return products;
};

// Método para recoger un producto por su id
export const getProductById = (id) => {
    return products.find(product => product.id === id);
};

// Método para devolver todos los productos de una categoría
export const getProductsByCategory = (category) => {
    // Array con las categorías disponibles
    const validCategories = [TOURS, TRAVELS];

    // Comprobación de la categoría solicitada
    if (!validCategories.includes(category)) {
        // Si la categoría no está en el array de categorías disponibles se lanza un error con el mensaje
        throw new Error(errorCategoryNotExists);
    } else {
        // Si la categoría existe se filtran los productos y se devuelven los productos de la categoría solicitada
        return products.filter(product => product.category === category);
    }
};

// Método para comparar fechas. El item contiene una fecha de inicio y una fecha de fin
export const compareDates = (item) => {
    const startDate = new Date(item.start).getTime(); // Valor numérico de la fecha de inicio
    const endDate = new Date(item.end).getTime(); // Valor numérico de la fecha de fin
    // Se compara si las fechas son distintas y si la fecha final es mayor que la fecha inicial y se devuelve si es correcto o no
    return (endDate !== startDate && endDate >= startDate) ? true : false;
};
