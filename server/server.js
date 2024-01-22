const express = require('express');
const app = express();
const connectDB = require('./config/database');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const blogPostRoutes = require('./routes/blogPosts');
app.use('/api/blogposts', blogPostRoutes);

// Establish Port and return server running notice
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
