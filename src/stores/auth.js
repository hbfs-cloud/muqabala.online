import { defineStore } from 'pinia'
import apiClient from '../api/client'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false
    }),
    actions: {
        async login(email, password) {
            try {
                // Adjust endpoint as per actual backend API
                const response = await apiClient.post('/login', { email, password });
                this.user = response.data.user;
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                console.error('Login failed', error);
                return false;
            }
        },
        async checkAuth() {
            try {
                const response = await apiClient.get('/api/me'); // Hypothetical endpoint
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            }
        }
    }
})
