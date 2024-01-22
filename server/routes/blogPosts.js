// blogPosts.js
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/auth'); // Adjust the path as per your project structure

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one blog post
router.get('/:id', getBlogPost, (req, res) => {
    res.json(res.blogPost);
});

// Create a new blog post
router.post('/', authMiddleware, async (req, res) => {
    const blogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author, // This can be set based on the logged-in user
        tags: req.body.tags
    });

    try {
        const newBlogPost = await blogPost.save();
        res.status(201).json(newBlogPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog post
router.put('/:id', authMiddleware, getBlogPost, async (req, res) => {
    if (req.body.title != null) {
        res.blogPost.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blogPost.content = req.body.content;
    }
    // Add other fields as necessary

    try {
        const updatedBlogPost = await res.blogPost.save();
        res.json(updatedBlogPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post
router.delete('/:id', authMiddleware, getBlogPost, async (req, res) => {
    try {
        await res.blogPost.remove();
        res.json({ message: 'Deleted Blog Post' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get blog post object by ID
async function getBlogPost(req, res, next) {
    let blogPost;
    try {
        blogPost = await BlogPost.findById(req.params.id);
        if (blogPost == null) {
            return res.status(404).json({ message: 'Cannot find blog post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.blogPost = blogPost;
    next();
}

module.exports = router;
