// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection after login
import { Button, TextField, Paper, Typography } from '@mui/material';
import { postRequest } from '../utils/api'; // Import postRequest
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { setAuthState } = useContext(AuthContext); // Use AuthContext
    const navigate = useNavigate(); // For redirecting after successful login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postRequest('/api/auth/login', credentials); // Use postRequest for login

            console.log(data); // Log the response (for debugging)

            // Assuming your API returns a structure like { token: "...", user: {...} }
            if (data.token) {
                setAuthState({ token: data.token, isAuthenticated: true, user: data.user }); // Update auth state
                navigate('/'); // Redirect to the dashboard or another protected route
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error); // Handle login error
        }
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
