<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { GoogleLogin } from 'vue3-google-login'
import apiClient from '../api/client'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  const success = await authStore.login(email.value, password.value)
  isLoading.value = false
  
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Identifiants incorrects'
  }
}

const handleGoogleLogin = async (response) => {
  try {
    isLoading.value = true
    // Send the credential to the backend
    const res = await apiClient.post('/oauth2-google', {
      credential: response.credential
    })
    
    // Assuming backend returns user info and sets cookie
    if (res.data.success) {
        authStore.user = res.data.user
        authStore.isAuthenticated = true
        router.push('/dashboard')
    } else {
        error.value = 'Erreur lors de la connexion Google'
    }
  } catch (err) {
    console.error('Google login error', err)
    error.value = 'Erreur lors de la connexion Google'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="votre@email.com" />
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required placeholder="••••••••" />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
        
        <div class="divider">
            <span>OU</span>
        </div>
        
        <div class="google-login-wrapper">
            <GoogleLogin :callback="handleGoogleLogin" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #667eea;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #5a6fd1;
}

.submit-btn:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  background: #fdeaea;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>
