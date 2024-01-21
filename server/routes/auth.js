const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/protected-route', auth, async (req, res) => {
    // Your protected route logic here
});


module.exports = router;
