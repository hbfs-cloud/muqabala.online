<template>
  <div class="container-fluid p-4">
    <div class="row">
      <div class="col-12">
        <!-- Header -->
        <div class="profile-header mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="avatar-circle bg-white text-primary me-3 shadow-sm">
                <i class="ri-user-line ri-2x"></i>
              </div>
              <div>
                <h2 class="mb-1 text-white">Mon Profil</h2>
                <div class="text-white-50">Gérez vos informations et préférences</div>
              </div>
            </div>
            <button class="btn btn-light" @click="saveProfile">
              <i class="ri-save-line me-1"></i> Enregistrer
            </button>
          </div>
        </div>

        <!-- Onglets -->
        <ul class="nav nav-tabs nav-fill mb-4" role="tablist">
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: activeTab === 'general' }" 
              @click="activeTab = 'general'"
            >
              <i class="ri-user-line me-1"></i> Informations Générales
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: activeTab === 'personal' }" 
              @click="activeTab = 'personal'"
            >
              <i class="ri-heart-line me-1"></i> Informations Personnelles
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: activeTab === 'search' }" 
              @click="activeTab = 'search'"
            >
              <i class="ri-search-line me-1"></i> Recherche & Attentes
            </button>
          </li>
        </ul>

        <!-- Contenu des Onglets -->
        <div class="tab-content">
          <!-- Tab Général -->
          <div v-if="activeTab === 'general'" class="card border-0 shadow-sm">
            <div class="card-body">
              <!-- Identité -->
              <div class="info-section">
                <div class="info-section-title">Identité</div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <BaseInput label="Nom complet" v-model="profile.name" />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Email" v-model="profile.email" type="email" disabled />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Téléphone" v-model="profile.phone" />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Date de naissance" v-model="profile.birthday" type="date" />
                  </div>
                  <div class="col-md-12">
                    <BaseInput label="Ville de résidence" v-model="profile.address" />
                  </div>
                </div>
              </div>

              <!-- Profil -->
              <div class="info-section">
                <div class="info-section-title">Profil</div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold">Genre</label>
                    <select class="form-select" v-model="profile.gender">
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Origine" v-model="profile.origin" />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Nationalité" v-model="profile.nationality" />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Taille (cm)" v-model="profile.height" type="number" />
                  </div>
                  <div class="col-md-12">
                    <BaseInput label="Langues parlées" v-model="profile.languages" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Personnel -->
          <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm">
            <div class="card-body">
              <!-- Formation -->
              <div class="info-section">
                <div class="info-section-title">Formation & Profession</div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <BaseInput label="Niveau d'étude" v-model="profile.study" />
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Diplôme / Profession" v-model="profile.work" />
                  </div>
                </div>
              </div>

              <!-- Situation Familiale -->
              <div class="info-section">
                <div class="info-section-title">Situation Familiale</div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold">Déjà marié(e) ?</label>
                    <select class="form-select" v-model="profile.already_married">
                      <option value="no">Jamais</option>
                      <option value="divorced">Divorcé(e)</option>
                      <option value="widowed">Veuf/Veuve</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold">Enfants à charge</label>
                    <select class="form-select" v-model="profile.already_kids">
                      <option value="0">Aucun</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3 ou plus</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <BaseInput label="Rapports avec la famille" v-model="profile.your_family" type="textarea" />
                  </div>
                </div>
              </div>

              <!-- Religion -->
              <div class="info-section">
                <div class="info-section-title">Pratique Religieuse</div>
                <div class="row g-3">
                  <div class="col-12">
                    <BaseInput label="Ta pratique religieuse" v-model="profile.practice" type="textarea" />
                  </div>
                  <div class="col-12">
                    <BaseInput 
                      :label="profile.gender === 'female' ? 'Portes-tu le voile ?' : 'Est-ce que le port du voile est une condition ?'" 
                      v-model="profile.hijab" 
                      type="textarea" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Recherche -->
          <div v-if="activeTab === 'search'" class="card border-0 shadow-sm">
            <div class="card-body">
              <!-- Recherche -->
              <div class="info-section">
                <div class="info-section-title">Profil Recherché</div>
                <div class="row g-3">
                  <div class="col-12">
                    <BaseInput label="Quel est selon toi le/la musulman(e) qui te correspond ?" v-model="profile.search" type="textarea" rows="4" />
                  </div>
                  <div class="col-12">
                    <BaseInput label="Quelles sont tes attentes de ton époux/épouse ?" v-model="profile.consort" type="textarea" rows="4" />
                  </div>
                </div>
              </div>

              <!-- Critères -->
              <div class="info-section">
                <div class="info-section-title">Critères</div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold">Accepte personne déjà mariée avec enfants ?</label>
                    <select class="form-select" v-model="profile.accepted_other_kids">
                      <option value="yes">Oui</option>
                      <option value="no">Non</option>
                      <option value="maybe">À discuter</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold">Accepte origine différente ?</label>
                    <select class="form-select" v-model="profile.accepted_other_origins">
                      <option value="yes">Oui</option>
                      <option value="no">Non</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <BaseInput label="Quels sont tes critères rédhibitoires ?" v-model="profile.blockings" type="textarea" />
                  </div>
                </div>
              </div>

              <!-- Vision -->
              <div class="info-section">
                <div class="info-section-title">Vision du Mariage</div>
                <div class="row g-3">
                  <div class="col-12">
                    <BaseInput label="Quelles sont tes attentes du mariage ?" v-model="profile.expectations" type="textarea" rows="4" />
                  </div>
                  <div class="col-12">
                    <BaseInput label="Envisage-tu d'avoir des enfants et quelle est ta vision de leur éducation ?" v-model="profile.kids_education_perspective" type="textarea" rows="4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api/client'

const authStore = useAuthStore()
const activeTab = ref('general')

const profile = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: '',
  birthday: '',
  address: '',
  gender: 'male',
  origin: '',
  nationality: '',
  height: '',
  languages: '',
  study: '',
  work: '',
  already_married: 'no',
  already_kids: '0',
  your_family: '',
  practice: '',
  hijab: '',
  search: '',
  consort: '',
  accepted_other_kids: 'yes',
  accepted_other_origins: 'yes',
  blockings: '',
  expectations: '',
  kids_education_perspective: ''
})

const saveProfile = async () => {
  try {
    await api.post('/candidate/profile/update', profile.value)
    console.log('[SUCCESS] Profil enregistré avec succès')
  } catch (error) {
    console.error('[ERROR] Failed to save profile:', error)
  }
}

onMounted(async () => {
  try {
    const response = await api.get('/candidate/profile')
    if (response.data) {
      profile.value = { ...profile.value, ...response.data }
    }
  } catch (error) {
    console.error('[ERROR] Failed to load profile:', error)
  }
})
</script>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
}

.avatar-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
}

.nav-tabs .nav-link {
  font-weight: 600;
  color: #6c757d;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 1rem;
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

.info-section {
  margin-bottom: 2rem;
}

.info-section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}
</style>
