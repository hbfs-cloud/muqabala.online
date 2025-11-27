<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../api/client'
import { useRouter } from 'vue-router'

const stats = ref(null)
const recentActivity = ref([])
const candidate = ref(null)
const isLoading = ref(true)
const router = useRouter()

const fetchDashboard = async () => {
  try {
    const response = await apiClient.get('/candidate/dashboard')
    stats.value = response.data.stats
    recentActivity.value = response.data.recent_activity
    candidate.value = response.data.candidate
  } catch (error) {
    console.error('Failed to fetch dashboard', error)
    if (error.response && error.response.status === 401) {
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboard()
})
</script>

<template>
  <div class="dashboard-container">
    <div v-if="isLoading" class="loading">Chargement...</div>
    <div v-else class="dashboard-content">
      <header class="dashboard-header">
        <h1>Bienvenue, {{ candidate?.name || 'Candidat' }}</h1>
        <p>Voici un aperçu de votre activité.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ stats?.requests_sent || 0 }}</div>
          <div class="stat-label">Demandes envoyées</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats?.requests_received || 0 }}</div>
          <div class="stat-label">Demandes reçues</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats?.matches || 0 }}</div>
          <div class="stat-label">Matchs</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats?.visits || 0 }}</div>
          <div class="stat-label">Visites du profil</div>
        </div>
      </div>

      <div class="activity-section">
        <h2>Activité Récente</h2>
        <ul v-if="recentActivity.length > 0" class="activity-list">
          <li v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
            <span class="activity-icon">
              <i v-if="activity.type === 'request_sent'" class="ri-send-plane-fill"></i>
              <i v-else class="ri-mail-download-fill"></i>
            </span>
            <div class="activity-details">
              <p class="activity-text">
                {{ activity.type === 'request_sent' ? 'Vous avez envoyé une demande à' : 'Vous avez reçu une demande de' }}
                <strong>{{ activity.target_name || 'Utilisateur' }}</strong>
              </p>
              <span class="activity-date">{{ new Date(activity.created_at).toLocaleDateString() }}</span>
            </div>
          </li>
        </ul>
        <p v-else class="no-activity">Aucune activité récente.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #666;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #7f8c8d;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #696cff;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.activity-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.activity-section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.activity-list {
  list-style: none;
  padding: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f1f1;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  background-color: #e8eaf6;
  color: #696cff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.activity-details {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  color: #34495e;
}

.activity-date {
  font-size: 0.85rem;
  color: #95a5a6;
}

.no-activity {
  color: #95a5a6;
  text-align: center;
  padding: 2rem;
}
</style>
