import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("here");
    console.log(isAuthenticated);
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
};

export default PrivateRoutes;