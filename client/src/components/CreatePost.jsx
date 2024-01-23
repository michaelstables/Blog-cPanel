// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import ContentEditor from './form/ContentEditor';
import { postRequest } from '../utils/api';

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [postTags, setPostTags] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleSavePost = async () => {
        try {
            const newPost = await postRequest('/api/blogposts', {
                title: postTitle,
                content: editorContent,
                tags: postTags.split(',').map(tag => tag.trim())
            });
            // Reset the form or handle the new post
            setEditorContent('');
            setPostTitle('');
            setPostTags('');
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <div>
            <TextField
                label="Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Tags"
                value={postTags}
                onChange={(e) => setPostTags(e.target.value)}
                fullWidth
                margin="normal"
                helperText="Separate tags with commas. Tags are used to categorize your posts and improve searchability."
            />
            <ContentEditor value={editorContent} onChange={handleEditorChange} />
            <Button onClick={handleSavePost} variant="contained" color="primary" style={{ marginTop: 16 }}>
                Save Post
            </Button>
        </div>
    );
};

export default CreatePost;
