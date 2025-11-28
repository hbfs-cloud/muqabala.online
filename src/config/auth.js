// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = '222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com'

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://demo.muqabala.online'

// App Configuration
export const APP_NAME = 'Muqabala'
export const APP_URL = import.meta.env.VITE_APP_URL || 'https://[username].github.io/muqabala.online/'

// OAuth Scopes
export const GOOGLE_SCOPES = [
    'openid',
    'profile',
    'email'
].join(' ')

// Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'muqabala_access_token',
    USER_INFO: 'muqabala_user_info',
    EXPIRES_AT: 'muqabala_expires_at'
}
