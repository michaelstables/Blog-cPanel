const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cors = require('cors'); // Import the cors package

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Use CORS (with default configuration for now, allowing requests from any origin)
// You can customize it later if needed
app.use(cors());

// Define Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const blogPostRoutes = require('./routes/blogPosts');
app.use('/api/blogposts', blogPostRoutes);

// Establish Port and return server running notice
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
