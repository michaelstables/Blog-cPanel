import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import CreatePost from '../components/CreatePost';
import ViewPosts from '../components/ViewPosts';
import EditPost from '../components/EditPost';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0); // Index of the active tab

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return <ViewPosts />;
            case 1:
                return <CreatePost />;
            case 2:
                return <EditPost />;
            default:
                return <Typography>Content not found!</Typography>;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Dashboard Tabs">
                <Tab label="View Posts" />
                <Tab label="Create Post" />
            </Tabs>
            <Box sx={{ p: 3 }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Dashboard;
