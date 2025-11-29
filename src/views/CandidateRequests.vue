<template>
  <div class="container-fluid p-4">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-else-if="!selectedRequest" class="row">
      <div class="col-12">
        <h2 class="mb-4 text-gray-800">Mes Demandes</h2>
        <div v-if="requests.length === 0" class="text-center py-5">
          <i class="ri-mail-line" style="font-size: 64px; color: #ccc;"></i>
          <h5 class="mt-3 text-muted">Aucune demande</h5>
          <p class="text-muted">Vous n'avez pas encore de demandes de rencontre</p>
        </div>
        <div v-else class="row g-4">
          <div v-for="req in requests" :key="req.id" class="col-md-6 col-xl-4">
            <div class="card h-100 border-0 shadow-sm hover-card cursor-pointer" @click="selectRequest(req)">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="d-flex align-items-center">
                    <div class="avatar-circle bg-primary-subtle text-primary me-3">
                      {{ req.other.initials }}
                    </div>
                    <div>
                      <h5 class="card-title mb-0">{{ req.other.name }}</h5>
                      <small class="text-muted">{{ req.lastUpdate }}</small>
                    </div>
                  </div>
                  <span :class="['badge', getStatusBadgeClass(req.status)]">
                    {{ getStatusLabel(req.status) }}
                  </span>
                </div>
                <p class="card-text text-muted line-clamp-2">
                  {{ req.lastMessage }}
                </p>
              </div>
              <div class="card-footer bg-transparent border-top-0 pt-0 pb-3">
                <button class="btn btn-sm btn-outline-primary w-100">
                  Voir le dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Détail d'une demande (Nouveau Design) -->
    <div v-else class="request-detail">
      <!-- Bouton Retour -->
      <button class="btn btn-link text-decoration-none mb-3 ps-0" @click="selectedRequest = null">
        <i class="ri-arrow-left-line me-1"></i> Retour aux demandes
      </button>

      <!-- Header du dossier -->
      <div class="request-header mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2 class="mb-1 text-white"><i class="ri-file-list-3-line me-2"></i>Dossier de Rencontre</h2>
            <div class="text-white-50">Avec {{ selectedRequest.other.name }}</div>
          </div>
          <span :class="['badge fs-6', getStatusBadgeClass(selectedRequest.status)]">
            {{ getStatusLabel(selectedRequest.status) }}
          </span>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="actions-section mb-4">
        <h5 class="mb-3"><i class="ri-tools-line me-2"></i>Actions Disponibles</h5>
        
        <div v-if="selectedRequest.status === 'wait_response'" class="d-flex gap-2">
          <button class="btn btn-success" @click="handleAction('accept')">
            <i class="ri-check-line me-1"></i> Accepter
          </button>
          <button class="btn btn-danger" @click="handleAction('refuse')">
            <i class="ri-close-line me-1"></i> Refuser
          </button>
        </div>

        <div v-else-if="selectedRequest.status === 'accepted'" class="d-flex gap-2 align-items-center">
          <button class="btn btn-primary" @click="openChat">
            <i class="ri-chat-1-line me-1"></i> Accéder au Chat
          </button>
          <div class="alert alert-success mb-0 py-2 px-3 ms-2">
            <i class="ri-checkbox-circle-line me-2"></i> Le dossier a été finalisé de manière positive
          </div>
        </div>

        <div v-else class="alert alert-info mb-0">
          <i class="ri-information-line me-2"></i> Aucune action n'est attendue de votre part pour le moment.
        </div>
      </div>

      <!-- Onglets -->
      <ul class="nav nav-tabs nav-fill mb-3" role="tablist">
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'profile' }" 
            @click="activeTab = 'profile'"
          >
            <i class="ri-user-line me-1"></i> Profil de l'autre partie
          </button>
        </li>
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'history' }" 
            @click="activeTab = 'history'"
          >
            <i class="ri-time-line me-1"></i> Historique
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <!-- Tab Profil -->
        <div v-if="activeTab === 'profile'" class="card border-0 shadow-sm">
          <div class="card-body">
            <CandidatePublicProfile :candidate="selectedRequest.other" />
          </div>
        </div>

        <!-- Tab Historique -->
        <div v-if="activeTab === 'history'" class="card border-0 shadow-sm">
          <div class="card-body">
            <ul class="timeline mb-0">
              <li v-for="(event, index) in selectedRequest.history" :key="index" class="timeline-item mb-4">
                <span :class="['timeline-point', getTimelinePointClass(event.type)]"></span>
                <div class="timeline-event">
                  <div class="d-flex justify-content-between mb-1">
                    <h6 class="mb-0 fw-bold">{{ event.title }}</h6>
                    <small class="text-muted">{{ event.date }}</small>
                  </div>
                  <p class="mb-0 text-muted">{{ event.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CandidatePublicProfile from '../components/CandidatePublicProfile.vue'
import apiClient from '../api/client'

const selectedRequest = ref(null)
const activeTab = ref('profile')
const requests = ref([])
const loading = ref(true)

onMounted(async () => {
  await loadRequests()
})

async function loadRequests() {
  try {
    loading.value = true
    const response = await apiClient.get('/candidate/requests-list')

    if (response.data && response.data.data) {
      requests.value = response.data.data.map(req => {
        const isInitiator = req.isInitiator
        const otherCandidate = isInitiator ? req.target : req.initiator

        return {
          id: req.id,
          status: req.status,
          isInitiator: isInitiator,
          lastUpdate: formatDate(req.updated_at),
          lastMessage: getStatusMessage(req.status),
          other: {
            uuid: otherCandidate.uuid,
            name: `${otherCandidate.age || '?'} ans`,
            initials: getInitials(otherCandidate.uuid),
            age: otherCandidate.age,
            origin: otherCandidate.origin,
            nationality: otherCandidate.nationality,
            languages: otherCandidate.languages,
            height: otherCandidate.height,
            study: otherCandidate.study,
            work: otherCandidate.work,
            already_married: otherCandidate.already_married,
            already_kids: otherCandidate.already_kids,
            accepted_other_kids: otherCandidate.accepted_other_kids,
            accepted_other_origins: otherCandidate.accepted_other_origins,
            practice: otherCandidate.practice,
            hijab: otherCandidate.hijab,
            trait: otherCandidate.trait,
            interests: otherCandidate.interests,
            your_family: otherCandidate.your_family,
            search: otherCandidate.search,
            consort: otherCandidate.consort,
            kids_education_perspective: otherCandidate.kids_education_perspective,
            blockings: otherCandidate.blockings,
            expectations: otherCandidate.expectations,
            other: otherCandidate.other,
            primary_photo: req.primary_photo
          },
          history: req.history || []
        }
      })
    }

    console.log('[SUCCESS] Demandes chargées:', requests.value.length)
  } catch (error) {
    console.error('[ERROR] Failed to load requests:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return 'Il y a quelques minutes'
  if (diffHours < 24) return `Il y a ${diffHours} heures`
  if (diffHours < 48) return 'Hier'
  return date.toLocaleDateString('fr-FR')
}

function getStatusMessage(status) {
  const messages = {
    'wait_response': 'En attente de réponse',
    'wait_target_response': 'En attente de réponse de l\'autre partie',
    'accepted': 'Demande acceptée',
    'refused': 'Demande refusée',
    'cancelled': 'Demande annulée'
  }
  return messages[status] || 'Statut inconnu'
}

function getInitials(name) {
  if (!name) return '??'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}
const selectRequest = (req) => {
  selectedRequest.value = req
  activeTab.value = 'profile'
}

const getStatusLabel = (status) => {
  const labels = {
    wait_response: 'En attente',
    accepted: 'Accepté',
    refused: 'Refusé',
    cancelled: 'Annulé'
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    wait_response: 'bg-primary',
    accepted: 'bg-success',
    refused: 'bg-danger',
    cancelled: 'bg-warning text-dark'
  }
  return classes[status] || 'bg-secondary'
}

const getTimelinePointClass = (type) => {
  const classes = {
    success: 'timeline-point-success',
    danger: 'timeline-point-danger',
    info: 'timeline-point-primary'
  }
  return classes[type] || 'timeline-point-primary'
}

const handleAction = async (action) => {
  try {
    const endpoint = action === 'accept' ? '/candidate/request/accept' : '/candidate/request/refuse'
    await apiClient.post(endpoint, {
      request_id: selectedRequest.value.id
    })
    console.log(`[SUCCESS] Demande ${action === 'accept' ? 'acceptée' : 'refusée'}`)
    selectedRequest.value.status = action === 'accept' ? 'accepted' : 'refused'
  } catch (error) {
    console.error('[ERROR] Failed to handle action:', error)
  }
}

const openChat = () => {
  console.log('[INFO] Navigation vers le chat')
}
</script>

<style scoped>
.hover-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
}

/* Styles du dossier (copiés du PHP amélioré) */
.request-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
}

.actions-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.nav-tabs .nav-link {
  font-weight: 600;
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link:hover {
  border-color: transparent;
  color: #667eea;
}

.nav-tabs .nav-link.active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
  background: transparent;
}

/* Timeline */
.timeline-item {
  padding-left: 2rem;
  position: relative;
  border-left: 2px solid #e9ecef;
  margin-left: 6px;
  padding-bottom: 1rem;
}

.timeline-item:last-child {
  border-left: none;
}

.timeline-point {
  position: absolute;
  left: -7px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #e9ecef;
}

.timeline-point-success { background: #28a745; }
.timeline-point-danger { background: #dc3545; }
.timeline-point-primary { background: #667eea; }

/* Info Sections */
.info-section {
  margin-bottom: 2rem;
}

.info-section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.info-row {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-label {
  font-weight: 600;
  color: #4a5568;
  min-width: 200px;
}

.info-value {
  color: #2d3748;
}
</style>
