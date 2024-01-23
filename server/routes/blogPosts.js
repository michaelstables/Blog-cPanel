// blogPosts.js
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/auth');

// Get blog posts with filtering options
router.get('/', async (req, res) => {
    const { title, tags, limit } = req.query;
    console.log(`Received request with title: ${title}, tags: ${tags}, limit: ${limit}`); // Logging for debugging

    let query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }
    if (tags) {
        query.tags = { $in: tags.split(',') };
    }

    let queryOptions = { sort: { timestamp: -1 } };
    if (limit) {
        queryOptions.limit = parseInt(limit);
    }

    try {
        const posts = await BlogPost.find(query, null, queryOptions);
        console.log(`Sending ${posts.length} posts`); // Logging for debugging
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get one blog post by ID
router.get('/:id', getBlogPost, (req, res) => {
    console.log(`Fetching blog post with id: ${req.params.id}`);
    res.json(res.blogPost);
});

// Create a new blog post
router.post('/', authMiddleware, async (req, res) => {
    console.log('Creating new blog post:', req.body);
    const blogPost = new BlogPost({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        tags: req.body.tags
    });

    try {
        const newBlogPost = await blogPost.save();
        console.log('Created new blog post:', newBlogPost);
        res.status(201).json(newBlogPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update a blog post by ID
router.put('/:id', authMiddleware, getBlogPost, async (req, res) => {
    console.log(`Updating blog post with id: ${req.params.id}`);
    if (req.body.title != null) {
        res.blogPost.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blogPost.content = req.body.content;
    }
    // Add other fields as necessary

    try {
        const updatedBlogPost = await res.blogPost.save();
        console.log('Updated blog post:', updatedBlogPost);
        res.json(updatedBlogPost);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post by ID
router.delete('/:id', authMiddleware, getBlogPost, async (req, res) => {
    console.log(`Deleting blog post with id: ${req.params.id}`);
    try {
        await res.blogPost.remove();
        console.log('Deleted blog post');
        res.json({ message: 'Deleted Blog Post' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get blog post object by ID
async function getBlogPost(req, res, next) {
    let blogPost;
    try {
        blogPost = await BlogPost.findById(req.params.id);
        if (blogPost == null) {
            console.log('Blog post not found:', req.params.id);
            return res.status(404).json({ message: 'Cannot find blog post' });
        }
    } catch (err) {
        console.error('Error finding blog post:', err);
        return res.status(500).json({ message: err.message });
    }

    res.blogPost = blogPost;
    next();
}

module.exports = router;
