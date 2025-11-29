<template>
  <DashboardLayout>
    <div class="moderator-dashboard">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-1"><i class="ri-shield-user-line me-2"></i>Dashboard Modérateur</h2>
          <p class="text-muted">Gérez les validations et modérations</p>
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
        <!-- Pending Photos -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                <i class="ri-image-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.pending_photos || 0 }}</h3>
                <p class="text-muted mb-0 small">Photos en attente</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Pending Candidates -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                <i class="ri-user-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.pending_candidates || 0 }}</h3>
                <p class="text-muted mb-0 small">Profils en attente</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Reports -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                <i class="ri-alert-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.reports || 0 }}</h3>
                <p class="text-muted mb-0 small">Signalements</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- New Candidates This Week -->
        <div class="col-md-6 col-xl-3">
          <BaseCard hover>
            <div class="d-flex align-items-start">
              <div class="stat-icon bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                <i class="ri-user-add-line ri-2x"></i>
              </div>
              <div>
                <h3 class="mb-0">{{ stats.new_candidates_week || 0 }}</h3>
                <p class="text-muted mb-0 small">Nouveaux (7j)</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Pending Actions -->
      <div class="row g-4">
        <!-- Pending Photos List -->
        <div class="col-lg-6">
          <BaseCard>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="ri-image-line me-2"></i>Photos à valider</h5>
              <a href="/moderator/photos" class="btn btn-sm btn-outline-primary">
                Voir tout
              </a>
            </div>

            <div v-if="pendingPhotos.length === 0" class="text-center text-muted py-4">
              <i class="ri-checkbox-circle-line" style="font-size: 48px;"></i>
              <p class="mt-2">Aucune photo en attente</p>
            </div>

            <div v-else class="list-group list-group-flush">
              <div
                v-for="photo in pendingPhotos"
                :key="photo.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ photo.candidate_name }}</strong>
                  <br>
                  <small class="text-muted">ID: {{ photo.candidate_uuid }}</small>
                </div>
                <a
                  :href="`/moderator/candidates/${photo.candidate_uuid}`"
                  class="btn btn-sm btn-primary"
                >
                  Voir
                </a>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Pending Candidates List -->
        <div class="col-lg-6">
          <BaseCard>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="ri-user-line me-2"></i>Profils à valider</h5>
              <a href="/moderator/candidates" class="btn btn-sm btn-outline-primary">
                Voir tout
              </a>
            </div>

            <div v-if="pendingCandidates.length === 0" class="text-center text-muted py-4">
              <i class="ri-checkbox-circle-line" style="font-size: 48px;"></i>
              <p class="mt-2">Aucun profil en attente</p>
            </div>

            <div v-else class="list-group list-group-flush">
              <div
                v-for="candidate in pendingCandidates"
                :key="candidate.uuid"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ candidate.name }}</strong>
                  <br>
                  <small class="text-muted">UUID: {{ candidate.uuid }}</small>
                </div>
                <a
                  :href="`/moderator/candidates/${candidate.uuid}`"
                  class="btn btn-sm btn-primary"
                >
                  Valider
                </a>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Reports List -->
        <div class="col-12">
          <BaseCard>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0"><i class="ri-alert-line me-2"></i>Signalements récents</h5>
            </div>

            <div v-if="reports.length === 0" class="text-center text-muted py-4">
              <i class="ri-checkbox-circle-line" style="font-size: 48px;"></i>
              <p class="mt-2">Aucun signalement</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Candidat</th>
                    <th>Raison</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="report in reports" :key="report.id">
                    <td>
                      <strong>{{ report.candidate_name }}</strong>
                      <br>
                      <small class="text-muted">{{ report.candidate_uuid }}</small>
                    </td>
                    <td>{{ report.reason }}</td>
                    <td>
                      <a
                        :href="`/moderator/candidates/${report.candidate_uuid}`"
                        class="btn btn-sm btn-primary"
                      >
                        Examiner
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  pending_photos: 0,
  pending_candidates: 0,
  reports: 0,
  new_candidates_week: 0
})
const pendingPhotos = ref([])
const pendingCandidates = ref([])
const reports = ref([])

onMounted(async () => {
  await loadDashboard()
})

async function loadDashboard() {
  try {
    loading.value = true

    const response = await apiClient.get('/moderator/dashboard/stats')

    if (response.data) {
      stats.value = response.data.stats
      pendingPhotos.value = response.data.pending_photos || []
      pendingCandidates.value = response.data.pending_candidates || []
      reports.value = response.data.reports || []
    }

    console.log('[SUCCESS] Dashboard modérateur chargé')
  } catch (error) {
    console.error('[ERROR] Failed to load moderator dashboard:', error)
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
</style>
