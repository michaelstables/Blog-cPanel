// src/utils/api.js
const apiUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const checkStatusAndParseJSON = async (response) => {
    if (!response.ok) {
        // Attempt to parse error body
        const errorBody = await response.json().catch(() => ({})); // Default to empty object if JSON parsing fails
        const error = new Error(errorBody.message || `Request failed, status: ${response.status}`);
        error.data = errorBody; // Attach the parsed body (if any) to the error object
        throw error;
    }
    return response.json();
};

export const fetchData = async (endpoint, options = {}) => {
    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });
    return checkStatusAndParseJSON(response);
};

export const postRequest = async (endpoint, body, customOptions = {}) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const getRequest = async (endpoint, customOptions = {}) => {
    const options = {
        method: 'GET',
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const putRequest = async (endpoint, body, customOptions = {}) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};

export const deleteRequest = async (endpoint, customOptions = {}) => {
    const options = {
        method: 'DELETE',
        ...customOptions,
    };
    return await fetchData(endpoint, options);
};
