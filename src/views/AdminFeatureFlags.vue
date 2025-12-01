<template>
  <DashboardLayout>
    <div class="admin-features">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1"><i class="ri-toggle-line me-2"></i>Fonctionnalités</h2>
          <p class="text-muted">Gestion des fonctionnalités et drapeaux (Feature Flags)</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Features List -->
      <div v-else>
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
                          :id="'toggle_' + feature.id"
                          :checked="feature.enabled"
                          @change="toggleFeature(feature)"
                          :disabled="toggling === feature.id"
                        >
                        <label class="form-check-label" :for="'toggle_' + feature.id">
                          {{ feature.enabled ? 'Activé' : 'Désactivé' }}
                        </label>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1" @click="editFeature(feature)">
                        <i class="ri-edit-line"></i>
                      </button>
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

      <!-- Edit Modal -->
      <div class="modal fade" id="editFeatureModal" tabindex="-1" ref="editModalRef">
        <div class="modal-dialog">
          <div class="modal-content">
            <form @submit.prevent="updateFeature">
              <div class="modal-header">
                <h5 class="modal-title">Modifier la fonctionnalité</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Nom</label>
                  <input type="text" class="form-control" v-model="editingFeature.display_name" disabled>
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" v-model="editingFeature.description" rows="3"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Disponible pour</label>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="editingFeature.for_candidates" id="edit_candidates">
                    <label class="form-check-label" for="edit_candidates">Candidats</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="editingFeature.for_moderators" id="edit_moderators">
                    <label class="form-check-label" for="edit_moderators">Modérateurs</label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="submit" class="btn btn-primary" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                  Enregistrer
                </button>
              </div>
            </form>
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
              <canvas ref="chartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import apiClient from '../api/client'
import Chart from 'chart.js/auto'
import { Modal } from 'bootstrap'

const loading = ref(true)
const groupedFeatures = ref({})
const toggling = ref(null)
const saving = ref(false)

const editModalRef = ref(null)
const statsModalRef = ref(null)
let editModal = null
let statsModal = null
let chartInstance = null
const chartCanvas = ref(null)

const editingFeature = ref({
  id: null,
  display_name: '',
  description: '',
  for_candidates: false,
  for_moderators: false
})

const selectedFeature = ref(null)

onMounted(async () => {
  await loadFeatures()
  editModal = new Modal(editModalRef.value)
  statsModal = new Modal(statsModalRef.value)
})

async function loadFeatures() {
  try {
    loading.value = true
    const response = await apiClient.get('/admin/features')
    groupedFeatures.value = response.data.grouped
  } catch (error) {
    console.error('Error loading features:', error)
    alert('Erreur lors du chargement des fonctionnalités')
  } finally {
    loading.value = false
  }
}

async function toggleFeature(feature) {
  try {
    toggling.value = feature.id
    const newState = !feature.enabled
    
    await apiClient.post('/admin/features/toggle', {
      id: feature.id,
      enabled: newState
    })
    
    feature.enabled = newState
  } catch (error) {
    console.error('Error toggling feature:', error)
    alert('Erreur lors de la mise à jour')
    // Revert UI state (checkbox is already toggled by browser, so we might need to force update if we used v-model, but here we use :checked)
    await loadFeatures() // Reload to be safe
  } finally {
    toggling.value = null
  }
}

function editFeature(feature) {
  editingFeature.value = {
    id: feature.id,
    display_name: feature.display_name,
    description: feature.description,
    for_candidates: !!feature.for_candidates,
    for_moderators: !!feature.for_moderators
  }
  editModal.show()
}

async function updateFeature() {
  try {
    saving.value = true
    await apiClient.post('/admin/features/update', {
      id: editingFeature.value.id,
      description: editingFeature.value.description,
      for_candidates: editingFeature.value.for_candidates,
      for_moderators: editingFeature.value.for_moderators
    })
    
    await loadFeatures()
    editModal.hide()
  } catch (error) {
    console.error('Error updating feature:', error)
    alert('Erreur lors de la mise à jour')
  } finally {
    saving.value = false
  }
}

async function showStats(feature) {
  selectedFeature.value = feature
  statsModal.show()
  
  try {
    const response = await apiClient.get(`/admin/features/stats/${feature.id}`)
    const stats = response.data.stats
    
    await nextTick()
    
    if (chartInstance) {
      chartInstance.destroy()
    }
    
    const ctx = chartCanvas.value.getContext('2d')
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stats.map(s => s.date),
        datasets: [{
          label: 'Utilisations journalières',
          data: stats.map(s => s.usage_count),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    })
    
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid rgba(0,0,0,0.125);
}
</style>
