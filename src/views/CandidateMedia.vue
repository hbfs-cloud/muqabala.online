<template>
  <DashboardLayout>
    <div class="candidate-media">
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="mb-1"><i class="ri-image-line me-2"></i>Mes Médias</h2>
          <p class="text-muted">Gérez vos photos, vidéos et audios</p>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="row mb-4">
        <div class="col-12">
          <BaseCard>
            <h5 class="mb-3"><i class="ri-upload-cloud-line me-2"></i>Télécharger un média</h5>
            <div class="mb-3">
              <input
                type="file"
                ref="fileInput"
                class="form-control"
                accept="image/*,video/*,audio/*"
                @change="handleFileSelect"
              >
              <small class="text-muted">
                Formats acceptés : JPEG, PNG, WebP, MP4, WebM, MP3, WAV
              </small>
            </div>

            <div v-if="uploadProgress > 0" class="mb-3">
              <div class="progress">
                <div
                  class="progress-bar"
                  :style="{ width: uploadProgress + '%' }"
                  role="progressbar"
                >
                  {{ uploadProgress }}%
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary"
              @click="uploadMedia"
              :disabled="!selectedFile || uploading"
            >
              <i class="ri-upload-line me-1"></i>
              {{ uploading ? 'Téléchargement...' : 'Télécharger' }}
            </button>
          </BaseCard>
        </div>
      </div>

      <!-- Visibility Settings -->
      <div class="row mb-4">
        <div class="col-12">
          <BaseCard>
            <h5 class="mb-3"><i class="ri-eye-line me-2"></i>Politique de visibilité</h5>
            <div class="mb-3">
              <select
                v-model="visibilityPolicy"
                class="form-select"
                @change="updateVisibilityPolicy"
              >
                <option value="private">Privé - Personne ne peut voir</option>
                <option value="match_only">Matchs uniquement - Visible après match</option>
                <option value="reciprocal">Réciproque - Échange mutuel requis</option>
                <option value="public">Public - Visible par tous</option>
              </select>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="media.length === 0" class="text-center py-5">
        <i class="ri-image-line" style="font-size: 64px; color: #ccc;"></i>
        <h5 class="mt-3 text-muted">Aucun média pour le moment</h5>
        <p class="text-muted">Téléchargez vos premières photos, vidéos ou audios</p>
      </div>

      <!-- Media Grid -->
      <div v-else class="row g-4">
        <div v-for="item in media" :key="item.id" class="col-md-6 col-xl-4">
          <BaseCard hover>
            <div class="media-item">
              <!-- Media Preview -->
              <div class="media-preview mb-3">
                <!-- Photo -->
                <div v-if="item.media_type === 'photo'" class="photo-preview">
                  <img
                    :src="`/api/v1/candidate/photo/${item.id}`"
                    :alt="`Media ${item.id}`"
                    class="img-fluid rounded"
                  >
                </div>

                <!-- Video -->
                <div v-else-if="item.media_type === 'video'" class="video-preview">
                  <video
                    :src="`/api/v1/candidate/photo/${item.id}`"
                    class="img-fluid rounded"
                    controls
                  ></video>
                  <div class="media-type-badge">
                    <i class="ri-video-line"></i> Vidéo
                    <span v-if="item.duration" class="ms-1">{{ formatDuration(item.duration) }}</span>
                  </div>
                </div>

                <!-- Audio -->
                <div v-else-if="item.media_type === 'audio'" class="audio-preview">
                  <div class="audio-placeholder">
                    <i class="ri-music-line" style="font-size: 64px;"></i>
                  </div>
                  <audio
                    :src="`/api/v1/candidate/photo/${item.id}`"
                    class="w-100 mt-2"
                    controls
                  ></audio>
                  <div class="media-type-badge">
                    <i class="ri-music-line"></i> Audio
                    <span v-if="item.duration" class="ms-1">{{ formatDuration(item.duration) }}</span>
                  </div>
                </div>
              </div>

              <!-- Status Badges -->
              <div class="mb-3">
                <span
                  v-if="item.is_primary"
                  class="badge bg-success me-1"
                >
                  <i class="ri-star-fill"></i> Principal
                </span>
                <span
                  :class="{
                    'badge': true,
                    'bg-warning': item.status === 'pending',
                    'bg-success': item.status === 'approved',
                    'bg-danger': item.status === 'rejected'
                  }"
                  class="me-1"
                >
                  {{ getStatusLabel(item.status) }}
                </span>
                <span v-if="item.is_hidden" class="badge bg-secondary">
                  <i class="ri-eye-off-line"></i> Caché
                </span>
              </div>

              <!-- Actions -->
              <div class="d-flex justify-content-center gap-2 flex-wrap">
                <button
                  v-if="!item.is_primary && item.status === 'approved'"
                  class="btn btn-outline-success btn-sm"
                  @click="setPrimary(item)"
                  title="Définir comme principal"
                >
                  <i class="ri-star-line"></i>
                </button>

                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="toggleHidden(item)"
                  :title="item.is_hidden ? 'Afficher' : 'Masquer'"
                >
                  <i :class="item.is_hidden ? 'ri-eye-line' : 'ri-eye-off-line'"></i>
                </button>

                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteMedia(item)"
                  title="Supprimer"
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
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
const media = ref([])
const visibilityPolicy = ref('private')
const selectedFile = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const fileInput = ref(null)

onMounted(async () => {
  await loadMedia()
})

async function loadMedia() {
  try {
    loading.value = true
    const response = await apiClient.get('/candidate/photo/list')

    if (response.data) {
      media.value = response.data.photos || []
      visibilityPolicy.value = response.data.settings?.visibility_policy || 'private'
    }
  } catch (error) {
    console.error('[ERROR] Failed to load media:', error)
  } finally {
    loading.value = false
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    uploadProgress.value = 0
  }
}

async function uploadMedia() {
  if (!selectedFile.value) return

  try {
    uploading.value = true
    uploadProgress.value = 0

    const formData = new FormData()
    formData.append('photo', selectedFile.value)

    const response = await apiClient.post('/candidate/photo/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    })

    if (response.data.success) {
      console.log('[SUCCESS] Média téléchargé avec succès')
      selectedFile.value = null
      if (fileInput.value) {
        fileInput.value.value = ''
      }
      uploadProgress.value = 0
      await loadMedia()
    }
  } catch (error) {
    console.error('[ERROR] Failed to upload media:', error)
    uploadProgress.value = 0
  } finally {
    uploading.value = false
  }
}

async function updateVisibilityPolicy() {
  try {
    await apiClient.post('/candidate/photo/settings', {
      visibility_policy: visibilityPolicy.value
    })

    console.log('[SUCCESS] Politique de visibilité mise à jour')
  } catch (error) {
    console.error('[ERROR] Failed to update visibility policy:', error)
  }
}

async function setPrimary(item) {
  try {
    await apiClient.post('/candidate/photo/primary', {
      id: item.id
    })

    console.log('[SUCCESS] Média principal mis à jour')
    await loadMedia()
  } catch (error) {
    console.error('[ERROR] Failed to set primary media:', error)
  }
}

async function toggleHidden(item) {
  try {
    const response = await apiClient.post('/candidate/photo/toggle-hidden', {
      id: item.id
    })

    if (response.data.success) {
      console.log('[SUCCESS] Visibilité du média modifiée')
      await loadMedia()
    }
  } catch (error) {
    console.error('[ERROR] Failed to toggle hidden:', error)
  }
}

async function deleteMedia(item) {
  try {
    await apiClient.post('/candidate/photo/delete', {
      id: item.id
    })

    console.log('[SUCCESS] Média supprimé')
    await loadMedia()
  } catch (error) {
    console.error('[ERROR] Failed to delete media:', error)
  }
}

function getStatusLabel(status) {
  const labels = {
    'pending': 'En attente',
    'approved': 'Approuvé',
    'rejected': 'Rejeté'
  }
  return labels[status] || status
}

function formatDuration(seconds) {
  if (!seconds) return ''
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.media-item {
  text-align: center;
}

.media-preview {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.photo-preview img,
.video-preview video {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}

.audio-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #667eea;
}

.media-type-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.progress {
  height: 25px;
}

.progress-bar {
  transition: width 0.3s ease;
}
</style>
