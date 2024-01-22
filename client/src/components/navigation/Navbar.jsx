// src/components/navigation/Navbar.jsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Navbar = ({ onToggleTheme }) => {
    const { authState, logout } = useContext(AuthContext); // Use AuthContext
    const navigate = useNavigate(); // For navigating after logout

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to login page
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CPanel for MERN Applications
                </Typography>
                {/* Conditional Navigation Links */}
                {authState.isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/content-management">Content Management</Button>
                        <Button color="inherit" component={Link} to="/user-management">User Management</Button>
                        <Button color="inherit" component={Link} to="/settings">Settings</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
                {/* Theme Toggle Button */}
                <IconButton onClick={onToggleTheme} color="inherit">
                    {authState.theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
