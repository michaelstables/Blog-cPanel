// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

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
            setAuthState({ ...authState, isAuthenticated: true });
        } else {
            localStorage.removeItem('token');
            setAuthState({ ...authState, isAuthenticated: false, token: null, user: null });
        }
    }, [authState.token]);

    const register = async (userDetails) => {
        // ... existing registration code ...
    };

    const login = async (credentials) => {
        // ... existing login code ...
    };

    const logout = () => {
        localStorage.removeItem('token'); // Clear token from storage
        setAuthState({ ...authState, token: null, isAuthenticated: false, user: null });
        // Removed navigate('/login'); - we'll handle redirection in the component itself
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthState, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
