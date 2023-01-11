import { products } from '../data/dataProducts';
import { TOURS, TRAVELS } from '../constants';

const errorCategoryNotExists = 'La categoría no existe';

export const getAllProducts = () => {
    return products;
};

export const getProductById = (id) => {
    return products.find(product => product.id === id);
};

export const getProductsByCategory = (category) => {
    
    const validCategories = [TOURS, TRAVELS];

    if (!validCategories.includes(category)) {
        throw new Error(errorCategoryNotExists);
    } else {
        return products.filter(product => product.category === category);
    }
};

export const compareDates = (item) => {
    const startDate = new Date(item.start);
    const endDate = new Date(item.end);
    return (endDate >= startDate) ? true : false;
};
