import React, { useState, useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/navigation/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';

// Import your page components
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Registration from './pages/Registration';
import HomePage from './pages/HomePage.jsx'

const App = () => {
    const [theme, setTheme] = useState('dark');
    const { authState, checkAuthStatus } = useContext(AuthContext); // Use AuthContext

    useEffect(() => {
        // Function to validate the current auth status with the backend
        console.log('Checking authentication status with the backend...');
        checkAuthStatus();
        // This empty dependency array ensures that the effect runs only once after the initial render
    }, []); // Empty dependency array means this effect runs once on mount

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const ProtectedRoute = ({ children }) => {
        if (!authState.isAuthenticated) {
            console.log('Redirecting to login as user is not authenticated');
            // Redirect them to the /login page
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Router>
                <Navbar onToggleTheme={toggleTheme} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/" element={authState.isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/content-management" element={<ProtectedRoute><ContentManagement /></ProtectedRoute>} />
                    <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    {/* Add more protected routes as needed */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
