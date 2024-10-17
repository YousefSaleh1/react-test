import React from 'react';
import { Navigate } from 'react-router-dom';
import { TProtectedRouteProps } from '../types/types';

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ element }) => {
    const token = localStorage.getItem('token');

    return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
