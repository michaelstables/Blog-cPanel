// src/components/EditPost.jsx
import React, { useState } from 'react';
import { putRequest } from '../utils/api'; // Import API utility functions
import { Box, Button, TextField, Typography } from '@mui/material';
import ContentEditor from './form/ContentEditor'; // Import ContentEditor

const EditPost = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSave = async () => {
        try {
            await putRequest(`/api/blogposts/${post._id}`, { title, content });
            onSubmit(); // Notify parent of submission
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6">Editing Post: {post.title}</Typography>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
            <ContentEditor value={content} onChange={setContent} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
                <Button onClick={onCancel} variant="contained" color="secondary">
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditPost;
