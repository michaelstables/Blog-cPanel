// src/utils/api.js
const apiUrl = import.meta.env.VITE_API_URL;

console.log('API URL:', apiUrl);

// Function to retrieve the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token') || null; // Adjust based on where you store the token
};

const defaultHeaders = {
    'Content-Type': 'application/json',
};


// Function to add the Authorization header if a token exists
const addAuthHeader = (existingHeaders) => {
    const token = getAuthToken();
    if (token) {
        console.log('Authorization Header: Bearer ' + token); // Logging the Authorization header for troubleshooting
        return {
            ...existingHeaders,
            'Authorization': `Bearer ${token}`
        };
    }
    return existingHeaders;
};

// Function to check status and parse JSON
const checkStatusAndParseJSON = async (response) => {
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Network response was not ok.');
    }
    return response.json();
};

export const fetchData = async (endpoint, options = {}) => {
    let headers = addAuthHeader({
        ...defaultHeaders,
        ...options.headers,
    });

    // Include Authorization header for requests that need authentication
    if (!endpoint.includes('/login') && !endpoint.includes('/register')) {
        headers = addAuthHeader(headers);
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers,
    });
    return checkStatusAndParseJSON(response);
};

export const postRequest = async (endpoint, body, customOptions = {}) => {
    const options = {
        method: 'POST',
        headers: addAuthHeader({ ...defaultHeaders, ...customOptions.headers }),
        body: JSON.stringify(body),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const getRequest = async (endpoint, customOptions = {}) => {
    const options = {
        method: 'GET',
        headers: addAuthHeader({ ...defaultHeaders, ...customOptions.headers }),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const putRequest = async (endpoint, body, customOptions = {}) => {
    const options = {
        method: 'PUT',
        headers: addAuthHeader({ ...defaultHeaders, ...customOptions.headers }),
        body: JSON.stringify(body),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const deleteRequest = async (endpoint, customOptions = {}) => {
    const options = {
        method: 'DELETE',
        headers: addAuthHeader({ ...defaultHeaders, ...customOptions.headers }),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};
