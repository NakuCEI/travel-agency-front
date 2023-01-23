import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; // Inportación de elementos para el manejo de rutas
import { useAuthStore } from '../store/hooks'; // Importación del hook para el manejo de usuario
// Importación de constantes para las rutas
import { 
    ROUTE_ROOT, 
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS, 
    ROUTE_DETAIL_PRODUCT, 
    ROUTE_CART 
} from './constants';
// Importación de componentes de las vistas
import HomePage from '../pages/HomePage';
import ProductsTours from '../pages/ProductsTours';
import ProductsTravels from '../pages/ProductsTravels';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';

// Componente "AppRouter"
export const AppRouter = () => {
    // Comprobación de token en LocalStorage para saber si hay usuario
    const { checkToken } = useAuthStore();
    // Con useEffect se ejecuta la comprobación de token al renderizarse el componente
    useEffect(() => {
        checkToken();
    }, []);
    // En el componente "Routes" se anidan las rutas de la aplicación con su ruta respectiva y el componente para renderizar
    return (
        <Routes>
            <Route path={ROUTE_HOME} element={<HomePage />} />
            <Route path={ROUTE_TOURS} element={<ProductsTours />} />
            <Route path={ROUTE_TRAVELS} element={<ProductsTravels />} />
            <Route path={ROUTE_DETAIL_PRODUCT} element={<ProductDetail />} />
            <Route path={ROUTE_CART} element={<CartPage />} />
            <Route path={ROUTE_ROOT} element={<Navigate to={ROUTE_HOME} />} />
        </Routes>
    );
};
