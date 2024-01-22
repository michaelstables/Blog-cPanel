// src/pages/Registration.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection after successful registration
import { Button, TextField, Paper, Typography } from '@mui/material';
import { postRequest } from '../utils/api'; // Import postRequest
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Registration = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        // Add other fields as necessary
    });
    const { setAuthState } = useContext(AuthContext); // Use AuthContext
    const navigate = useNavigate(); // For redirecting after successful registration

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postRequest('/api/auth/register', userDetails); // Use postRequest for registration
            console.log(data); // Log the response (for debugging)

            // Assuming your API returns a structure like { token: "...", user: {...} }
            if (data.token) {
                setAuthState({ token: data.token, isAuthenticated: true, user: data.user }); // Update auth state
                navigate('/'); // Redirect to the dashboard or another protected route
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error); // Handle registration error
        }
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                {/* Add other fields as necessary */}
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                    Register
                </Button>
            </form>
        </Paper>
    );
};

export default Registration;
