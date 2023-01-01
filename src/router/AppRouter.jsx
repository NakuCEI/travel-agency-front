import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { 
    ROUTE_ROOT, 
    ROUTE_HOME, 
    ROUTE_TOURS, 
    ROUTE_TRAVELS, 
    ROUTE_DETAIL_PRODUCT, 
    ROUTE_CART 
} from './constants';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const ProductsTours = React.lazy(() => import('../pages/ProductsTours'));
const ProductsTravels = React.lazy(() => import('../pages/ProductsTravels'));
const ProductDetail = React.lazy(() => import('../pages/ProductDetail'));
const CartPage = React.lazy(() => import('../pages/CartPage'));
const Spinner = React.lazy(() => import('../components/Spinner/Spinner'));

export const AppRouter = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path={ROUTE_HOME} element={<HomePage />} />
                <Route path={ROUTE_TOURS} element={<ProductsTours />} />
                <Route path={ROUTE_TRAVELS} element={<ProductsTravels />} />
                <Route path={ROUTE_DETAIL_PRODUCT} element={<ProductDetail />} />
                <Route path={ROUTE_CART} element={<CartPage />} />
                <Route path={ROUTE_ROOT} element={<Navigate to={ROUTE_HOME} />} />
            </Routes>
        </Suspense>
    );
};
