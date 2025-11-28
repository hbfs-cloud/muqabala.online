<template>
  <DashboardLayout>
    <div class="candidate-dashboard">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-1">Bienvenue, {{ user?.name }} 👋</h2>
          <p class="text-muted">Voici un aperçu de votre activité</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-md-3 col-sm-6">
          <BaseCard hover>
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                <i class="ri-eye-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.profile_views || 0 }}</h3>
                <p class="text-muted mb-0 small">Vues de profil</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-3 col-sm-6">
          <BaseCard hover>
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                <i class="ri-mail-send-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.sent_requests || 0 }}</h3>
                <p class="text-muted mb-0 small">Demandes envoyées</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-3 col-sm-6">
          <BaseCard hover>
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                <i class="ri-mail-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.received_requests || 0 }}</h3>
                <p class="text-muted mb-0 small">Demandes reçues</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-3 col-sm-6">
          <BaseCard hover>
            <div class="d-flex align-items-center">
              <div class="stat-icon bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                <i class="ri-heart-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.favorites || 0 }}</h3>
                <p class="text-muted mb-0 small">Favoris</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Profile Completion -->
      <div class="row g-4 mb-4">
        <div class="col-md-8">
          <BaseCard title="Activité Récente">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
            </div>

            <div v-else-if="recentRequests.length === 0" class="text-center py-4 text-muted">
              <i class="ri-inbox-line ri-3x mb-3 d-block"></i>
              <p>Aucune activité récente</p>
              <router-link to="/candidate/candidates" class="btn btn-primary">
                Commencer la recherche
              </router-link>
            </div>

            <div v-else class="list-group list-group-flush">
              <div
                v-for="request in recentRequests"
                :key="request.id"
                class="list-group-item"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="mb-1">Demande #{{ request.id }}</h6>
                    <small class="text-muted">{{ formatDate(request.updated_at) }}</small>
                  </div>
                  <span :class="`badge bg-${getStatusColor(request.status)}`">
                    {{ getStatusLabel(request.status) }}
                  </span>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-4">
          <BaseCard title="Complétion du Profil">
            <div class="text-center mb-3">
              <div class="progress-circle mx-auto" :style="{ '--progress': stats.profile_completion || 0 }">
                <span class="progress-value">{{ stats.profile_completion || 0 }}%</span>
              </div>
            </div>

            <p class="text-muted small mb-3">
              Un profil complet augmente vos chances de trouver la bonne personne.
            </p>

            <router-link to="/candidate/profile" class="btn btn-outline-primary w-100">
              <i class="ri-edit-line me-2"></i>
              Compléter mon profil
            </router-link>
          </BaseCard>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row g-4">
        <div class="col-md-4">
          <BaseCard hover clickable @click="$router.push('/candidate/candidates')">
            <div class="text-center">
              <i class="ri-search-line ri-3x text-primary mb-3"></i>
              <h5>Rechercher des profils</h5>
              <p class="text-muted small">Découvrez des profils compatibles</p>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-4">
          <BaseCard hover clickable @click="$router.push('/candidate/requests')">
            <div class="text-center">
              <i class="ri-mail-line ri-3x text-success mb-3"></i>
              <h5>Mes demandes</h5>
              <p class="text-muted small">Gérez vos demandes en cours</p>
            </div>
          </BaseCard>
        </div>

        <div class="col-md-4">
          <BaseCard hover clickable @click="$router.push('/candidate/photos')">
            <div class="text-center">
              <i class="ri-image-line ri-3x text-info mb-3"></i>
              <h5>Mes photos</h5>
              <p class="text-muted small">Gérez vos photos de profil</p>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import apiClient from '../api/client'
import DashboardLayout from '../components/DashboardLayout.vue'
import BaseCard from '../components/BaseCard.vue'

const authStore = useAuthStore()

const loading = ref(true)
const stats = ref({
  profile_views: 0,
  sent_requests: 0,
  received_requests: 0,
  favorites: 0,
  profile_completion: 0
})
const recentRequests = ref([])

const user = computed(() => authStore.user)

onMounted(async () => {
  await loadDashboard()
})

async function loadDashboard() {
  try {
    loading.value = true
    const response = await apiClient.get('/candidate/dashboard')
    
    if (response.data.success) {
      stats.value = response.data.data.stats
      recentRequests.value = response.data.data.recent_requests || []
    }
  } catch (error) {
    console.error('Failed to load dashboard:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Aujourd\'hui'
  if (days === 1) return 'Hier'
  if (days < 7) return `Il y a ${days} jours`
  
  return date.toLocaleDateString('fr-FR')
}

function getStatusColor(status) {
  const colors = {
    'pending': 'warning',
    'accepted': 'success',
    'rejected': 'danger',
    'wait_target_response': 'info'
  }
  return colors[status] || 'secondary'
}

function getStatusLabel(status) {
  const labels = {
    'pending': 'En attente',
    'accepted': 'Acceptée',
    'rejected': 'Refusée',
    'wait_target_response': 'En attente de réponse'
  }
  return labels[status] || status
}
</script>

<style scoped>
.stat-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #6366f1 calc(var(--progress) * 1%),
    #e2e8f0 0
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-circle::before {
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: white;
}

.progress-value {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--bs-heading-color);
}
</style>
