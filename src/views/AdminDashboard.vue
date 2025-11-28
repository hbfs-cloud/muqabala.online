<template>
  <DashboardLayout>
    <div class="admin-dashboard">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-1"><i class="ri-admin-line me-2"></i>Dashboard Admin</h2>
          <p class="text-muted">Administration globale de la plateforme</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div v-else class="row g-4 mb-4">
        <!-- Total Users -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                <i class="ri-user-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.total_users || 0 }}</h3>
                <p class="text-muted mb-0 small">Utilisateurs</p>
                <small class="text-success">+{{ stats.new_users_month || 0 }} ce mois</small>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Total Candidates -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                <i class="ri-team-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.total_candidates || 0 }}</h3>
                <p class="text-muted mb-0 small">Candidats</p>
                <small class="text-muted">{{ stats.published_candidates || 0 }} publiés</small>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Total Requests -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                <i class="ri-mail-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.total_requests || 0 }}</h3>
                <p class="text-muted mb-0 small">Demandes</p>
                <small class="text-success">{{ stats.accepted_requests || 0 }} acceptées</small>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- System Health -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                <i class="ri-pulse-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.system_health || '100%' }}</h3>
                <p class="text-muted mb-0 small">Santé système</p>
                <small class="text-success">Opérationnel</small>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Charts & Analytics -->
      <div class="row g-4 mb-4">
        <!-- Activity Chart -->
        <div class="col-lg-8">
          <BaseCard>
            <h5 class="mb-3"><i class="ri-line-chart-line me-2"></i>Activité plateforme (30j)</h5>
            <div class="chart-placeholder text-center py-5">
              <i class="ri-bar-chart-box-line" style="font-size: 64px; color: #ccc;"></i>
              <p class="text-muted mt-3">Graphique d'activité (à implémenter)</p>
            </div>
          </BaseCard>
        </div>

        <!-- Quick Stats -->
        <div class="col-lg-4">
          <BaseCard>
            <h5 class="mb-3"><i class="ri-pie-chart-line me-2"></i>Statistiques rapides</h5>
            <div class="quick-stat mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Taux de conversion</span>
                <strong>{{ stats.conversion_rate || 0 }}%</strong>
              </div>
              <div class="progress" style="height: 6px;">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: (stats.conversion_rate || 0) + '%' }"
                ></div>
              </div>
            </div>

            <div class="quick-stat mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Profils complétés</span>
                <strong>{{ stats.profiles_completed || 0 }}%</strong>
              </div>
              <div class="progress" style="height: 6px;">
                <div
                  class="progress-bar bg-info"
                  :style="{ width: (stats.profiles_completed || 0) + '%' }"
                ></div>
              </div>
            </div>

            <div class="quick-stat">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Engagement moyen</span>
                <strong>{{ stats.avg_engagement || 0 }}%</strong>
              </div>
              <div class="progress" style="height: 6px;">
                <div
                  class="progress-bar bg-warning"
                  :style="{ width: (stats.avg_engagement || 0) + '%' }"
                ></div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Admin Actions -->
      <div class="row g-4">
        <!-- Recent Users -->
        <div class="col-lg-6">
          <BaseCard>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="ri-user-add-line me-2"></i>Nouveaux utilisateurs</h5>
              <a href="/admin/users" class="btn btn-sm btn-outline-primary">
                Voir tout
              </a>
            </div>

            <div v-if="recentUsers.length === 0" class="text-center text-muted py-4">
              <i class="ri-user-line" style="font-size: 48px;"></i>
              <p class="mt-2">Aucun nouvel utilisateur</p>
            </div>

            <div v-else class="list-group list-group-flush">
              <div
                v-for="user in recentUsers"
                :key="user.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ user.name }}</strong>
                  <br>
                  <small class="text-muted">{{ user.email }}</small>
                </div>
                <span class="badge bg-primary">{{ user.role }}</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- System Status -->
        <div class="col-lg-6">
          <BaseCard>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="ri-settings-line me-2"></i>État du système</h5>
              <a href="/admin/settings" class="btn btn-sm btn-outline-primary">
                Configuration
              </a>
            </div>

            <div class="system-status">
              <div class="status-item d-flex justify-content-between align-items-center mb-3">
                <div>
                  <i class="ri-database-2-line text-success me-2"></i>
                  <span>Base de données</span>
                </div>
                <span class="badge bg-success">Opérationnel</span>
              </div>

              <div class="status-item d-flex justify-content-between align-items-center mb-3">
                <div>
                  <i class="ri-mail-line text-success me-2"></i>
                  <span>Service Email</span>
                </div>
                <span class="badge bg-success">Opérationnel</span>
              </div>

              <div class="status-item d-flex justify-content-between align-items-center mb-3">
                <div>
                  <i class="ri-cloud-line text-success me-2"></i>
                  <span>Stockage</span>
                </div>
                <span class="badge bg-success">{{ stats.storage_used || '0' }}% utilisé</span>
              </div>

              <div class="status-item d-flex justify-content-between align-items-center">
                <div>
                  <i class="ri-robot-line text-success me-2"></i>
                  <span>Service IA</span>
                </div>
                <span class="badge bg-success">Opérationnel</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Quick Actions -->
        <div class="col-12">
          <BaseCard>
            <h5 class="mb-3"><i class="ri-lightning-line me-2"></i>Actions rapides</h5>
            <div class="row g-3">
              <div class="col-md-3">
                <a href="/admin/users" class="btn btn-outline-primary w-100">
                  <i class="ri-user-settings-line me-2"></i>
                  Gérer utilisateurs
                </a>
              </div>
              <div class="col-md-3">
                <a href="/admin/candidates" class="btn btn-outline-info w-100">
                  <i class="ri-team-line me-2"></i>
                  Gérer candidats
                </a>
              </div>
              <div class="col-md-3">
                <a href="/admin/settings" class="btn btn-outline-warning w-100">
                  <i class="ri-settings-3-line me-2"></i>
                  Paramètres
                </a>
              </div>
              <div class="col-md-3">
                <a href="/admin/logs" class="btn btn-outline-danger w-100">
                  <i class="ri-file-list-line me-2"></i>
                  Voir logs
                </a>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import BaseCard from '../components/BaseCard.vue'
import apiClient from '../api/client'

const loading = ref(true)
const stats = ref({
  total_users: 0,
  new_users_month: 0,
  total_candidates: 0,
  published_candidates: 0,
  total_requests: 0,
  accepted_requests: 0,
  system_health: '100%',
  conversion_rate: 0,
  profiles_completed: 0,
  avg_engagement: 0,
  storage_used: 0
})
const recentUsers = ref([])

onMounted(async () => {
  await loadDashboard()
})

async function loadDashboard() {
  try {
    loading.value = true

    // TODO: Replace with actual API endpoint when available
    // const response = await apiClient.get('/admin/dashboard/stats')

    // Mock data - replace with actual API call
    stats.value = {
      total_users: 156,
      new_users_month: 23,
      total_candidates: 142,
      published_candidates: 128,
      total_requests: 89,
      accepted_requests: 45,
      system_health: '100%',
      conversion_rate: 51,
      profiles_completed: 87,
      avg_engagement: 64,
      storage_used: 42
    }

    recentUsers.value = [
      // { id: 1, name: 'User A', email: 'user@example.com', role: 'candidate' }
    ]

    console.log('[INFO] Dashboard admin chargé')
  } catch (error) {
    console.error('[ERROR] Failed to load admin dashboard:', error)
  } finally {
    loading.value = false
  }
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

.chart-placeholder {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}

.system-status .status-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--bs-border-color);
}

.system-status .status-item:last-child {
  border-bottom: none;
}
</style>
