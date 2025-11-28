<template>
  <div class="login-page">
    <!-- Navbar -->
    <nav class="navbar navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/logo.svg" alt="Muqabala" height="40" />
        </a>
      </div>
    </nav>

    <!-- Login Container -->
    <div class="login-container">
      <div class="login-card">
        <div class="text-center mb-4">
          <h2 class="fw-bold mb-2">Bienvenue sur Muqabala</h2>
          <p class="text-muted">Connectez-vous pour continuer</p>
        </div>

        <!-- Google One Tap Button -->
        <div id="google-signin-button" class="mb-4"></div>

        <!-- Error Message -->
        <div v-if="error" class="alert alert-danger" role="alert">
          <i class="ri-error-warning-line me-2"></i>
          {{ error }}
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Connexion en cours...</span>
          </div>
          <p class="mt-2 text-muted">Connexion en cours...</p>
        </div>

        <!-- Info -->
        <div class="mt-4 text-center">
          <p class="text-muted small">
            <i class="ri-shield-check-line me-1"></i>
            Connexion sécurisée via Google
          </p>
          <p class="text-muted small mb-0">
            Première connexion ? Votre profil sera créé automatiquement.
          </p>
        </div>

        <!-- Back to Home -->
        <div class="text-center mt-4">
          <a href="/" class="btn btn-outline-secondary">
            <i class="ri-arrow-left-line me-2"></i>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { GOOGLE_CLIENT_ID } from '../config/auth'

const router = useRouter()
const authStore = useAuthStore()
const error = ref('')
const isLoading = ref(false)

// Initialize Google Sign-In
onMounted(() => {
  // Check if already authenticated
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
    return
  }

  // Load Google Sign-In script
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = initializeGoogleSignIn
  document.head.appendChild(script)
})

function initializeGoogleSignIn() {
  if (!window.google) {
    error.value = 'Erreur de chargement de Google Sign-In'
    return
  }

  // Initialize Google Sign-In
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCallback,
    auto_select: true, // Auto-select if user previously signed in
    cancel_on_tap_outside: false
  })

  // Render the button
  window.google.accounts.id.renderButton(
    document.getElementById('google-signin-button'),
    {
      theme: 'outline',
      size: 'large',
      width: 350,
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left'
    }
  )

  // Display the One Tap prompt
  window.google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log('One Tap not displayed:', notification.getNotDisplayedReason())
    }
  })
}

async function handleGoogleCallback(response) {
  isLoading.value = true
  error.value = ''

  try {
    // Handle the credential with the auth store
    const userData = await authStore.handleGoogleCallback(response.credential)
    
    console.log('User authenticated:', userData)
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Erreur lors de la connexion. Veuillez réessayer.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e1e4e8 100%);
  display: flex;
  flex-direction: column;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.login-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  color: var(--bs-heading-color);
  font-size: 1.75rem;
}

#google-signin-button {
  display: flex;
  justify-content: center;
}

/* Ensure Google button is centered */
#google-signin-button > div {
  margin: 0 auto;
}

.alert {
  border-radius: 0.75rem;
  border: none;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 576px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
</style>
