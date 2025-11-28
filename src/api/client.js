import axios from 'axios'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost'

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
})

// Add JWT token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('muqabala_access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear auth
            localStorage.removeItem('muqabala_access_token')
            localStorage.removeItem('muqabala_user_info')
            localStorage.removeItem('muqabala_expires_at')

            // Redirect to login if not already there
            if (window.location.pathname !== '/login' && !window.location.hash.includes('/login')) {
                window.location.hash = '#/login'
            }
        }
        return Promise.reject(error)
    }
)

export default apiClient
