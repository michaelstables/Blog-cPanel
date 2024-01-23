// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchData, getRequest } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        if (authState.token) {
            localStorage.setItem('token', authState.token);
            checkAuthStatus(); // Call the checkAuthStatus function to validate the token
        } else {
            localStorage.removeItem('token');
            setAuthState({ ...authState, isAuthenticated: false, token: null, user: null });
        }
    }, [authState.token]);

    const checkAuthStatus = async () => {
        try {
            const user = await getRequest('/api/auth/validateToken'); // Adjust this endpoint as per your backend
            setAuthState({ ...authState, isAuthenticated: true, user });
        } catch (error) {
            console.error('Error validating token:', error);
            logout(); // Logout the user if token validation fails
        }
    };

    const register = async (userDetails) => {
        // ... existing registration code ...
    };

    const login = async (credentials) => {
        // ... existing login code ...
    };

    const logout = () => {
        localStorage.removeItem('token'); // Clear token from storage
        setAuthState({ ...authState, token: null, isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthState, login, logout, register, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
