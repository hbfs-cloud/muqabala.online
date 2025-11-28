<template>
  <DashboardLayout>
    <div class="candidate-favorites">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-1"><i class="ri-star-line me-2"></i>Mes Favoris</h2>
          <p class="text-muted">Profils que vous avez marqués comme favoris</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="favorites.length === 0" class="text-center py-5">
        <i class="ri-star-line" style="font-size: 64px; color: #ccc;"></i>
        <h5 class="mt-3 text-muted">Aucun favori pour le moment</h5>
        <p class="text-muted">Marquez des profils comme favoris pour les retrouver facilement ici</p>
        <router-link to="/candidate/candidates" class="btn btn-primary mt-3">
          <i class="ri-search-line me-1"></i> Découvrir des profils
        </router-link>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="row g-4">
        <div v-for="favorite in favorites" :key="favorite.id" class="col-md-6 col-xl-4">
          <BaseCard hover>
            <div class="text-center">
              <div class="avatar-circle mx-auto mb-3 bg-primary-subtle text-primary">
                {{ favorite.initials }}
              </div>
              <h5>{{ favorite.age }} ans</h5>
              <p class="text-muted mb-2">
                {{ favorite.origin }} • {{ favorite.study }}
              </p>
              <div class="mb-3">
                <span v-if="favorite.compatibility" class="badge bg-success">
                  {{ favorite.compatibility }}% Compatible
                </span>
              </div>
              <p class="card-text small text-muted line-clamp-2 mb-4">
                {{ favorite.bio || 'Aucune description' }}
              </p>

              <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-outline-primary btn-sm" @click="viewProfile(favorite)">
                  <i class="ri-eye-line me-1"></i> Voir
                </button>
                <button class="btn btn-primary btn-sm" @click="sendRequest(favorite)">
                  <i class="ri-send-plane-line me-1"></i> Demande
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="removeFavorite(favorite)">
                  <i class="ri-star-fill"></i>
                </button>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Modal Profil -->
      <div v-if="selectedCandidate" class="modal-backdrop fade show"></div>
      <div v-if="selectedCandidate" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <h5 class="modal-title">Profil Favori</h5>
              <button type="button" class="btn-close" @click="selectedCandidate = null"></button>
            </div>
            <div class="modal-body bg-light">
              <CandidatePublicProfile :candidate="selectedCandidate" />
            </div>
            <div class="modal-footer border-top-0">
              <button type="button" class="btn btn-outline-secondary" @click="selectedCandidate = null">Fermer</button>
              <button type="button" class="btn btn-outline-danger" @click="removeFavorite(selectedCandidate)">
                <i class="ri-star-fill me-1"></i> Retirer des favoris
              </button>
              <button type="button" class="btn btn-primary" @click="sendRequest(selectedCandidate)">
                <i class="ri-send-plane-line me-1"></i> Envoyer une demande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import BaseCard from '../components/BaseCard.vue'
import CandidatePublicProfile from '../components/CandidatePublicProfile.vue'
import apiClient from '../api/client'

const loading = ref(true)
const favorites = ref([])
const selectedCandidate = ref(null)

onMounted(async () => {
  await loadFavorites()
})

async function loadFavorites() {
  try {
    loading.value = true
    const response = await apiClient.get('/candidate/favorites')

    if (response.data && response.data.data) {
      favorites.value = response.data.data.map(item => ({
        id: item.id,
        uuid: item.uuid,
        initials: getInitials(),
        age: item.candidate.age,
        origin: item.candidate.origin || 'Non spécifié',
        study: item.candidate.study || 'Non spécifié',
        bio: item.candidate.trait,
        compatibility: item.rate ? Math.round(item.rate * 20) : null,
        ...item.candidate
      }))
    }
  } catch (error) {
    console.error('Failed to load favorites:', error)
  } finally {
    loading.value = false
  }
}

function getInitials() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
         String.fromCharCode(65 + Math.floor(Math.random() * 26))
}

function viewProfile(favorite) {
  selectedCandidate.value = favorite
}

async function sendRequest(favorite) {
  try {
    await apiClient.post('/candidate/request', {
      target_candidate_uuid: favorite.uuid
    })

    console.log('[SUCCESS] Demande envoyée avec succès')
    selectedCandidate.value = null
  } catch (error) {
    console.error('[ERROR] Failed to send request:', error)
  }
}

async function removeFavorite(favorite) {
  try {
    await apiClient.delete(`/candidate/favorites/${favorite.uuid}`)

    console.log('[SUCCESS] Favori retiré')
    selectedCandidate.value = null
    await loadFavorites()
  } catch (error) {
    console.error('[ERROR] Failed to remove favorite:', error)
  }
}
</script>

<style scoped>
.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 2rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
