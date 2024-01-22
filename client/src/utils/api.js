const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = async (endpoint, options = {}) => {
    const response = await fetch(`${apiUrl}${endpoint}`, options);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Implement other utility functions for POST, PUT, DELETE, etc.
