// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { authState } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={authState.isAuthenticated ? Component : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;
