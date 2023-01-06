import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/hooks';

import { 
    ROUTE_ROOT, 
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS, 
    ROUTE_DETAIL_PRODUCT, 
    ROUTE_CART 
} from './constants';

import HomePage from '../pages/HomePage';
import ProductsTours from '../pages/ProductsTours';
import ProductsTravels from '../pages/ProductsTravels';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';

export const AppRouter = () => {

    const { checkToken } = useAuthStore();

    useEffect(() => {
        checkToken();
    }, []);

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
