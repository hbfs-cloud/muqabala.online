<template>
  <DashboardLayout>
    <div class="moderator-system">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="py-3 mb-0">
          <i class="ri-settings-3-line me-2"></i>Système & Statistiques
        </h4>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-2" @click="loadData">
            <i class="ri-refresh-line me-1"></i> Actualiser
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link" :class="{ active: activeTab === 'status' }" @click="activeTab = 'status'" type="button"><i class="ri-shut-down-line me-1"></i> Etat du Service</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :class="{ active: activeTab === 'performance' }" @click="activeTab = 'performance'" type="button"><i class="ri-bar-chart-box-line me-1"></i> Indicateurs</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :class="{ active: activeTab === 'stats' }" @click="activeTab = 'stats'" type="button"><i class="ri-pie-chart-line me-1"></i> Statistiques</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :class="{ active: activeTab === 'features' }" @click="activeTab = 'features'" type="button"><i class="ri-toggle-line me-1"></i> Fonctionnalités</button>
        </li>
      </ul>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <div v-else class="tab-content">
        
        <!-- Tab: Status -->
        <div v-if="activeTab === 'status'" class="tab-pane fade show active">
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="card h-100">
                <h5 class="card-header">
                  <i class="ri-shut-down-line me-2"></i>Etat du Service
                </h5>
                <div class="card-body">
                  <form @submit.prevent="updateSettings">
                    <div class="form-check form-switch mb-3">
                      <input class="form-check-input" type="checkbox" id="maintenance_mode" v-model="settings.maintenance_mode">
                      <label class="form-check-label" for="maintenance_mode">
                        <i class="ri-pause-circle-line me-1"></i>Suspendre temporairement le service
                      </label>
                    </div>
                    <div class="alert alert-info d-flex align-items-center mb-3" role="alert">
                      <i class="ri-information-line me-2"></i>
                      <small>En activant cette option, les candidats pourront toujours accéder à leur profil et leurs conversations, mais les nouvelles mises en relation seront suspendues.</small>
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="maintenance_message">Message personnalisé</label>
                      <textarea class="form-control" id="maintenance_message" v-model="settings.maintenance_message" rows="4"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" :disabled="saving">
                      <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                      Enregistrer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Performance -->
        <div v-if="activeTab === 'performance'" class="tab-pane fade show active">
          <div class="row g-4 mb-4">
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-start justify-content-between">
                    <div>
                      <span>RDVs Planifiés</span>
                      <div class="d-flex align-items-end mt-2">
                        <h4 class="mb-0 me-2">{{ stats.rdvs }}</h4>
                        <small class="text-primary">({{ stats.rdv_rate }}%)</small>
                      </div>
                    </div>
                    <span class="badge bg-label-primary rounded p-2"><i class="ri-calendar-check-line ri-xl"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Add other performance cards similarly -->
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-start justify-content-between">
                    <div>
                      <span>Matchs Validés</span>
                      <div class="d-flex align-items-end mt-2">
                        <h4 class="mb-0 me-2">{{ stats.matches }}</h4>
                      </div>
                    </div>
                    <span class="badge bg-label-success rounded p-2"><i class="ri-check-double-line ri-xl"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Stats -->
        <div v-if="activeTab === 'stats'" class="tab-pane fade show active">
          <div class="row g-4 mb-4">
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-header">
                  <h5 class="card-title m-0">Répartition Hommes / Femmes</h5>
                </div>
                <div class="card-body">
                  <ul class="p-0 m-0">
                    <li class="d-flex mb-4 pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-primary"><i class="ri-men-line"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <h6 class="mb-0">Hommes</h6>
                          <small class="text-muted">Actifs: {{ stats.men_active }}</small>
                        </div>
                        <div class="user-progress">
                          <h6 class="mb-0">{{ stats.men_active + stats.men_inactive }}</h6>
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mb-4 pb-1">
                      <div class="avatar flex-shrink-0 me-3">
                        <span class="avatar-initial rounded bg-label-danger"><i class="ri-women-line"></i></span>
                      </div>
                      <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div class="me-2">
                          <h6 class="mb-0">Femmes</h6>
                          <small class="text-muted">Actives: {{ stats.women_active }}</small>
                        </div>
                        <div class="user-progress">
                          <h6 class="mb-0">{{ stats.women_active + stats.women_inactive }}</h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-header">
                  <h5 class="card-title m-0">Origines</h5>
                </div>
                <div class="card-body">
                  <canvas ref="originsChartCanvas"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Features -->
        <div v-if="activeTab === 'features'" class="tab-pane fade show active">
          <div v-for="(features, category) in groupedFeatures" :key="category" class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0 text-capitalize">{{ category.replace(/_/g, ' ') }}</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th style="width: 25%">Nom</th>
                      <th style="width: 35%">Description</th>
                      <th style="width: 15%">Cibles</th>
                      <th style="width: 10%">État</th>
                      <th style="width: 15%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="feature in features" :key="feature.id">
                      <td class="ps-4">
                        <strong>{{ feature.display_name }}</strong><br>
                        <small class="text-muted"><code>{{ feature.name }}</code></small>
                      </td>
                      <td>{{ feature.description }}</td>
                      <td>
                        <span v-if="feature.for_candidates" class="badge bg-info text-dark me-1">Candidats</span>
                        <span v-if="feature.for_moderators" class="badge bg-warning text-dark">Modérateurs</span>
                      </td>
                      <td>
                        <div class="form-check form-switch">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            :id="'mod_toggle_' + feature.id"
                            :checked="feature.enabled"
                            @change="toggleFeature(feature)"
                            :disabled="toggling === feature.id"
                          >
                          <label class="form-check-label" :for="'mod_toggle_' + feature.id">
                            {{ feature.enabled ? 'Activé' : 'Désactivé' }}
                          </label>
                        </div>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-outline-info" @click="showStats(feature)">
                          <i class="ri-bar-chart-line"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <!-- Stats Modal -->
      <div class="modal fade" id="statsModal" tabindex="-1" ref="statsModalRef">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Statistiques : {{ selectedFeature?.display_name }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <canvas ref="usageChartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import apiClient from '../api/client'
import Chart from 'chart.js/auto'
import { Modal } from 'bootstrap'

const loading = ref(true)
const activeTab = ref('status')
const stats = ref({})
const settings = ref({
  maintenance_mode: false,
  maintenance_message: ''
})
const groupedFeatures = ref({})
const saving = ref(false)
const toggling = ref(null)

const statsModalRef = ref(null)
let statsModal = null
const selectedFeature = ref(null)
const usageChartCanvas = ref(null)
let usageChartInstance = null

const originsChartCanvas = ref(null)
let originsChartInstance = null

onMounted(async () => {
  await loadData()
  statsModal = new Modal(statsModalRef.value)
})

watch(activeTab, async (newTab) => {
  if (newTab === 'stats') {
    await nextTick()
    renderOriginsChart()
  }
})

async function loadData() {
  try {
    loading.value = true
    const response = await apiClient.get('/moderator/system')
    
    stats.value = response.data.stats
    settings.value = {
      maintenance_mode: response.data.settings.maintenance_mode === '1',
      maintenance_message: response.data.settings.maintenance_message || ''
    }
    groupedFeatures.value = response.data.groupedFeatures
    
    if (activeTab.value === 'stats') {
      await nextTick()
      renderOriginsChart()
    }
  } catch (error) {
    console.error('Error loading system data:', error)
    alert('Erreur lors du chargement des données')
  } finally {
    loading.value = false
  }
}

async function updateSettings() {
  try {
    saving.value = true
    await apiClient.post('/moderator/system/update', {
      maintenance_mode: settings.value.maintenance_mode ? 'on' : 'off',
      maintenance_message: settings.value.maintenance_message
    })
    alert('Paramètres mis à jour')
  } catch (error) {
    console.error('Error updating settings:', error)
    alert('Erreur lors de la mise à jour')
  } finally {
    saving.value = false
  }
}

async function toggleFeature(feature) {
  try {
    toggling.value = feature.id
    const newState = !feature.enabled
    
    await apiClient.post('/moderator/features/toggle', {
      id: feature.id,
      enabled: newState
    })
    
    feature.enabled = newState
  } catch (error) {
    console.error('Error toggling feature:', error)
    alert('Erreur lors de la mise à jour')
    await loadData()
  } finally {
    toggling.value = null
  }
}

async function showStats(feature) {
  selectedFeature.value = feature
  statsModal.show()
  
  try {
    const response = await apiClient.get(`/moderator/features/stats/${feature.id}`)
    const statsData = response.data.stats
    
    await nextTick()
    
    if (usageChartInstance) {
      usageChartInstance.destroy()
    }
    
    const ctx = usageChartCanvas.value.getContext('2d')
    usageChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: statsData.map(s => s.date),
        datasets: [{
          label: 'Utilisations journalières',
          data: statsData.map(s => s.usage_count),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    })
    
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

function renderOriginsChart() {
  if (!originsChartCanvas.value || !stats.value.origins) return
  
  if (originsChartInstance) {
    originsChartInstance.destroy()
  }
  
  const ctx = originsChartCanvas.value.getContext('2d')
  const originsData = stats.value.origins
  
  originsChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: originsData.map(item => item.origin || 'Non spécifié'),
      datasets: [{
        data: originsData.map(item => item.count),
        backgroundColor: [
          '#666cff', '#0dcf9b', '#fd7e14', '#ff3e1d', '#696cff', '#71dd37', '#03c3ec', '#8592a3'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  })
}
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid rgba(0,0,0,0.125);
}
</style>
