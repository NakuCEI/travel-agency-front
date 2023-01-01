import { products } from '../data/dataProducts';
import { TOURS, TRAVELS } from '../constants';

const errorCategoryNotExists = 'La categoría no existe';

export const getProductsByCategory = (category) => {
    
    const validCategories = [TOURS, TRAVELS];

    if (!validCategories.includes(category)) {
        throw new Error(errorCategoryNotExists);
    } else {
        return products.filter(product => product.category === category);
    }
};
