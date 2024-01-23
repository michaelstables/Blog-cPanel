// src/components/PostCard.jsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const PostCard = ({ post, onEdit, onDelete }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.content}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(post)}>
                    Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => onDelete(post)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostCard;
