import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggleTheme, theme }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CPanel for MERN Applications
                </Typography>
                {/* Navigation Links */}
                <Button color="inherit" component={Link} to="/">Dashboard</Button>
                <Button color="inherit" component={Link} to="/content-management">Content Management</Button>
                <Button color="inherit" component={Link} to="/user-management">User Management</Button>
                <Button color="inherit" component={Link} to="/settings">Settings</Button>
                {/* Theme Toggle Button */}
                <IconButton onClick={onToggleTheme} color="inherit">
                    {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
