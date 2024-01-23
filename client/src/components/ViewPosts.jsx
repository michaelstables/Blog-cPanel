// src/components/ViewPosts.jsx
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getRequest, deleteRequest } from '../utils/api'; // Import API utility functions
import {
    Box,
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import EditPost from './EditPost';

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [editingPost, setEditingPost] = useState(null); // Holds the post being edited
    const [postToDelete, setPostToDelete] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (limit = 5, title = '', tags = '') => {
        try {
            const endpoint = `/api/blogposts?limit=${limit}${title ? `&title=${title}` : ''}${tags ? `&tags=${tags}` : ''}`;
            const data = await getRequest(endpoint);
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleFetchAll = () => {
        fetchPosts('', titleFilter, tagFilter); // Passing 'undefined' for 'limit' will fetch all posts
    };

    const handleFilterChange = (field, value) => {
        if (field === 'title') {
            setTitleFilter(value);
        } else if (field === 'tags') {
            setTagFilter(value);
        }
    };

    const handleRunFilter = () => {
        fetchPosts('', titleFilter, tagFilter);
        // Clear filter fields after running the filter
        setTitleFilter('');
        setTagFilter('');
    };

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleEditSubmit = () => {
        fetchPosts(); // Refetch posts to get the updated list
        setEditingPost(null); // Exit edit mode
        // Clear filter fields after editing a post
        setTitleFilter('');
        setTagFilter('');
    };

    const handleDeleteConfirmation = (post) => {
        setPostToDelete(post);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPostToDelete(null);
    };

    const handleDelete = async () => {
        if (postToDelete) {
            try {
                await deleteRequest(`/api/blogposts/${postToDelete._id}`);
                setPosts(posts.filter(post => post._id !== postToDelete._id));
                handleCloseDialog();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (editingPost) {
        return <EditPost post={editingPost} onSubmit={handleEditSubmit} onCancel={() => setEditingPost(null)} />;
    }

    return (
        <Box>
            <TextField label="Filter by title" value={titleFilter} onChange={(e) => handleFilterChange('title', e.target.value)} fullWidth margin="normal" />
            <TextField label="Filter by tags (comma separated)" value={tagFilter} onChange={(e) => handleFilterChange('tags', e.target.value)} fullWidth margin="normal" />
            <Button onClick={handleRunFilter} variant="contained" color="primary" sx={{ mr: 2 }}>
                Run Filter
            </Button>
            <Button onClick={handleFetchAll} variant="contained" color="primary">
                Fetch All Posts
            </Button>
            {posts.map((post) => (
                <Card key={post._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{post.title}</Typography>
                        {/* Sanitize and render the HTML content */}
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => handleEdit(post)}>
                            Edit
                        </Button>
                        <Button size="small" color="secondary" onClick={() => handleDeleteConfirmation(post)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ViewPosts;
