import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://muqabala.online',
    withCredentials: true, // Important for session cookies if using cookie-based auth
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default apiClient;
