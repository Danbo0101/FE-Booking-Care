import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const roleId = useSelector((state) => state.user.account.roleId);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(roleId)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
