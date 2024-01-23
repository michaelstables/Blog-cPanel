const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', (req, res) => {
    console.log('Registering user:', req.body);
    registerUser(req, res);
});

router.post('/login', (req, res) => {
    console.log('User attempting to login:', req.body);
    loginUser(req, res);
});

router.get('/protected-route', auth, async (req, res) => {
    console.log('Accessing protected route');
    // Your protected route logic here
});

router.get('/validateToken', auth, (req, res) => {
    console.log('Validating token');
    // If the request reaches here, it means the token is valid (as it passed the 'auth' middleware)
    // You can add more checks or return the user data as needed
    res.json({ valid: true, message: 'Token is valid' });
});

module.exports = router;
