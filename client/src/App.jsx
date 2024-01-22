import React, { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/navigation/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx'; // Ensure the path is correct

// Import your page components
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Registration from './pages/Registration';

const App = () => {
    const [theme, setTheme] = useState('light');
    const { authState } = useContext(AuthContext); // Use AuthContext

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Router>
                <Navbar onToggleTheme={toggleTheme} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/" element={authState.isAuthenticated ? <Dashboard /> : <Login />} />
                    <Route path="/content-management" element={authState.isAuthenticated ? <ContentManagement /> : <Login />} />
                    <Route path="/user-management" element={authState.isAuthenticated ? <UserManagement /> : <Login />} />
                    <Route path="/settings" element={authState.isAuthenticated ? <Settings /> : <Login />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
