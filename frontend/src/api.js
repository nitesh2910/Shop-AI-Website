import axios from 'axios';

const getBaseURL = () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:9090/api';
    return url.endsWith('/api') ? url : `${url}/api`;
};

const api = axios.create({
    baseURL: getBaseURL(),
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('userInfo');
            // Optional: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
