import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/navigation/Navbar'; // Adjust the path as per your project structure
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline /> {/* It helps with consistent rendering across browsers */}
            <Router>
                <Navbar onToggleTheme={toggleTheme} theme={theme} />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/content-management" element={<ContentManagement />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
