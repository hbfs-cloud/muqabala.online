<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-gray-800 mb-0">Recherche de Candidats</h2>
          <button class="btn btn-primary" @click="showFilters = !showFilters">
            <i class="ri-filter-3-line me-1"></i> Filtres
          </button>
        </div>

        <!-- Filtres -->
        <div v-if="showFilters" class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <label class="form-label">Âge</label>
                <div class="d-flex gap-2 align-items-center">
                  <input type="number" class="form-control" placeholder="Min" v-model.number="filters.ageMin">
                  <span>-</span>
                  <input type="number" class="form-control" placeholder="Max" v-model.number="filters.ageMax">
                </div>
              </div>

              <div class="col-md-3">
                <label class="form-label">Taille (cm)</label>
                <div class="d-flex gap-2 align-items-center">
                  <input type="number" class="form-control" placeholder="Min" v-model.number="filters.heightMin">
                  <span>-</span>
                  <input type="number" class="form-control" placeholder="Max" v-model.number="filters.heightMax">
                </div>
              </div>

              <div class="col-md-3">
                <MultiSelect
                  v-model="filters.origins"
                  :options="countryOptions"
                  label="Origines"
                  placeholder="Sélectionner des origines"
                />
              </div>

              <div class="col-md-3">
                <MultiSelect
                  v-model="filters.studies"
                  :options="educationOptions"
                  label="Niveaux d'étude"
                  placeholder="Sélectionner des niveaux"
                />
              </div>

              <div class="col-12 d-flex gap-2 justify-content-end">
                <button class="btn btn-outline-secondary" @click="resetFilters">
                  <i class="ri-refresh-line me-1"></i> Réinitialiser
                </button>
                <button class="btn btn-primary" @click="applyFilters">
                  <i class="ri-search-line me-1"></i> Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Résultats -->
        <div class="row g-4">
          <div v-for="candidate in candidates" :key="candidate.id" class="col-md-6 col-xl-4">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center">
                <div class="avatar-circle mx-auto mb-3 bg-primary-subtle text-primary">
                  {{ candidate.initials }}
                </div>
                <h5 class="card-title">{{ candidate.name }}</h5>
                <p class="text-muted mb-2">{{ candidate.age }} ans • {{ candidate.city }}</p>
                <p class="card-text small text-muted line-clamp-2 mb-4">
                  {{ candidate.bio }}
                </p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-outline-primary btn-sm" @click="viewProfile(candidate)">
                    <i class="ri-eye-line me-1"></i> Voir Profil
                  </button>
                  <button class="btn btn-primary btn-sm" @click="sendRequest(candidate)">
                    <i class="ri-user-add-line me-1"></i> Demande
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Détail Candidat -->
    <div v-if="selectedCandidate" class="modal-backdrop fade show"></div>
    <div v-if="selectedCandidate" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title">Fiche Candidat</h5>
            <button type="button" class="btn-close" @click="selectedCandidate = null"></button>
          </div>
          <div class="modal-body bg-light">
            <CandidatePublicProfile :candidate="selectedCandidate" />
          </div>
          <div class="modal-footer border-top-0">
            <button type="button" class="btn btn-outline-secondary" @click="selectedCandidate = null">Fermer</button>
            <button type="button" class="btn btn-primary" @click="sendRequest(selectedCandidate)">
              <i class="ri-send-plane-line me-1"></i> Envoyer une demande
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCountriesArray, getEducationArray } from '../config/filterConstants'
import MultiSelect from '../components/MultiSelect.vue'
import CandidatePublicProfile from '../components/CandidatePublicProfile.vue'
import apiClient from '../api/client'

const showFilters = ref(false)
const selectedCandidate = ref(null)
const loading = ref(false)

const filters = ref({
  ageMin: 18,
  ageMax: 60,
  heightMin: 140,
  heightMax: 210,
  origins: [],
  studies: []
})

const countryOptions = getCountriesArray()
const educationOptions = getEducationArray()

const candidates = ref([])

onMounted(() => {
  loadCandidates()
})

async function loadCandidates() {
  try {
    loading.value = true
    const response = await apiClient.get('/candidate/candidates-list', {
      params: filters.value
    })

    if (response.data && response.data.data) {
      candidates.value = response.data.data.map(item => ({
        id: item.id,
        uuid: item.uuid,
        initials: getInitials(item.candidate),
        name: item.candidate.age + ' ans',
        age: item.candidate.age,
        bio: item.candidate.trait || 'Aucune description',
        ...item.candidate,
        values: item.values,
        rate: item.rate
      }))
    }
  } catch (error) {
    console.error('Failed to load candidates:', error)
  } finally {
    loading.value = false
  }
}

function getInitials(candidate) {
  // Generate random initials for privacy
  return String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
         String.fromCharCode(65 + Math.floor(Math.random() * 26))
}

function resetFilters() {
  filters.value = {
    ageMin: 18,
    ageMax: 60,
    heightMin: 140,
    heightMax: 210,
    origins: [],
    studies: []
  }
  loadCandidates()
}

const applyFilters = () => {
  loadCandidates()
}

const viewProfile = (candidate) => {
  selectedCandidate.value = candidate
}

const sendRequest = async (candidate) => {
  try {
    await apiClient.post('/candidate/request', {
      target_candidate_uuid: candidate.uuid
    })

    // Success notification
    showToast('success', 'Demande envoyée avec succès !', 'La personne recevra votre demande')
    selectedCandidate.value = null
  } catch (error) {
    console.error('Failed to send request:', error)
    showToast('error', 'Erreur', 'Impossible d\'envoyer la demande. Veuillez réessayer.')
  }
}

function showToast(type, title, message) {
  console.log(`[${type.toUpperCase()}] ${title}: ${message}`)
}
</script>

<style scoped>
.hover-card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s;
}

.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
