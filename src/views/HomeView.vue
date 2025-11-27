<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="title">Muqabala Online</h1>
      <p class="subtitle">Rencontres sérieuses et éthiques</p>
      <button @click="navigateToLogin" class="cta-button">Se Connecter</button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Inter', sans-serif;
}

.hero-section {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #696cff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(105, 108, 255, 0.4);
}
</style>
