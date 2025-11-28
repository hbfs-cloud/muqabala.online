import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS } from '../config/auth'
import apiClient from '../api/client'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const accessToken = ref(null)
    const expiresAt = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    // Computed
    const isAuthenticated = computed(() => {
        if (!accessToken.value || !expiresAt.value) return false
        return Date.now() < expiresAt.value
    })

    // Actions
    function setUser(userData) {
        user.value = userData
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userData))
    }

    function setToken(token, expiresIn = 86400) {
        accessToken.value = token
        const expirationTime = Date.now() + (expiresIn * 1000)
        expiresAt.value = expirationTime

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expirationTime.toString())
    }

    function clearAuth() {
        user.value = null
        accessToken.value = null
        expiresAt.value = null

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER_INFO)
        localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT)
    }

    function loadFromStorage() {
        try {
            const storedToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
            const storedUser = localStorage.getItem(STORAGE_KEYS.USER_INFO)
            const storedExpiry = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT)

            if (storedToken && storedExpiry) {
                const expiry = parseInt(storedExpiry)
                if (Date.now() < expiry) {
                    accessToken.value = storedToken
                    expiresAt.value = expiry
                    if (storedUser) {
                        user.value = JSON.parse(storedUser)
                    }
                    return true
                } else {
                    clearAuth()
                }
            }
        } catch (err) {
            console.error('Error loading auth from storage:', err)
            clearAuth()
        }
        return false
    }

    async function handleGoogleCallback(credential) {
        isLoading.value = true
        error.value = null

        try {
            // Send credential to backend API for verification
            const response = await apiClient.post('/auth/google', { credential })

            if (!response.data.success) {
                throw new Error(response.data.message || 'Authentication failed')
            }

            const { token, user: userData, expires_in } = response.data.data

            // Store user and token
            setUser(userData)
            setToken(token, expires_in)

            return userData
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Authentication failed'
            error.value = errorMessage
            console.error('Google auth error:', err)
            throw new Error(errorMessage)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchUserInfo() {
        if (!accessToken.value) {
            return null
        }

        try {
            const response = await apiClient.get('/auth/me')

            if (response.data.success) {
                setUser(response.data.data)
                return response.data.data
            }
        } catch (err) {
            console.error('Failed to fetch user info:', err)
            if (err.response?.status === 401) {
                clearAuth()
            }
        }
        return null
    }

    function logout() {
        // Call logout endpoint (optional, for logging)
        if (accessToken.value) {
            apiClient.post('/auth/logout').catch(() => {
                // Ignore errors on logout
            })
        }

        clearAuth()

        // Revoke Google token if needed
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect()
        }
    }

    // Initialize from storage on store creation
    loadFromStorage()

    return {
        // State
        user,
        accessToken,
        isLoading,
        error,

        // Computed
        isAuthenticated,

        // Actions
        setUser,
        setToken,
        clearAuth,
        loadFromStorage,
        handleGoogleCallback,
        fetchUserInfo,
        logout
    }
})
