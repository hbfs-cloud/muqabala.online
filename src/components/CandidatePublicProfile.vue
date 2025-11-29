<template>
  <div class="candidate-public-profile">
    <!-- Header Simplifié -->
    <div class="d-flex align-items-center mb-4">
      <div class="avatar-circle bg-primary-subtle text-primary me-3">
        {{ candidate.initials }}
      </div>
      <div>
        <h3 class="mb-0">{{ candidate.name }}</h3>
        <div class="text-muted">
          {{ candidate.age }} ans • {{ candidate.city }} • {{ candidate.origin }}
        </div>
      </div>
    </div>

    <!-- Primary Photo (if available) -->
    <div v-if="candidate.primary_photo" class="mb-4">
      <div class="primary-photo-container">
        <img
          v-if="candidate.primary_photo.media_type === 'photo'"
          :src="`/api/v1/candidate/photo/${candidate.primary_photo.id}`"
          alt="Photo de profil"
          class="img-fluid rounded primary-photo"
        />
        <video
          v-else-if="candidate.primary_photo.media_type === 'video'"
          :src="`/api/v1/candidate/photo/${candidate.primary_photo.id}`"
          controls
          class="img-fluid rounded primary-photo"
        ></video>
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
          <i class="ri-user-line me-1"></i> Profil
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'personal' }" 
          @click="activeTab = 'personal'"
        >
          <i class="ri-heart-line me-1"></i> Infos Personnelles
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'search' }" 
          @click="activeTab = 'search'"
        >
          <i class="ri-search-line me-1"></i> Recherche
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <!-- Tab Profil -->
      <div v-if="activeTab === 'profile'" class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="info-section">
            <div class="info-section-title">Informations de Base</div>
            <InfoRow label="Age" :value="candidate.age ? candidate.age + ' ans' : '-'" />
            <InfoRow label="Origine" :value="candidate.origin" />
            <InfoRow label="Taille" :value="candidate.height ? candidate.height + ' cm' : '-'" />
            <InfoRow label="Langues parlées" :value="candidate.languages" />
            <InfoRow label="Nationalité(s)" :value="candidate.nationality" />
          </div>

          <div class="info-section">
            <div class="info-section-title">Formation & Profession</div>
            <InfoRow label="Niveau d'étude" :value="candidate.study" />
            <InfoRow label="Diplôme / Profession" :value="candidate.work" />
          </div>

          <div class="info-section">
            <div class="info-section-title">Situation Familiale</div>
            <InfoRow label="Déjà marié(e)" :value="candidate.already_married" />
            <InfoRow label="Enfants à charge" :value="candidate.already_kids" />
            <InfoRow label="Accepte personne déjà mariée avec enfants" :value="candidate.accepted_other_kids" />
            <InfoRow label="Accepte origine différente" :value="candidate.accepted_other_origins" />
          </div>
        </div>
      </div>

      <!-- Tab Personnel -->
      <div v-if="activeTab === 'personal'" class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="info-section">
            <div class="info-section-title">Pratique Religieuse</div>
            <InfoRow label="Pratique religieuse" :value="candidate.practice" />
            <InfoRow label="Voile" :value="candidate.hijab" />
          </div>

          <div class="info-section">
            <div class="info-section-title">Personnalité</div>
            <InfoRow label="Caractère" :value="candidate.trait" />
            <InfoRow label="Centres d'intérêts" :value="candidate.interests" />
            <InfoRow label="Rapports avec la famille" :value="candidate.your_family" />
          </div>
        </div>
      </div>

      <!-- Tab Recherche -->
      <div v-if="activeTab === 'search'" class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="info-section">
            <div class="info-section-title">Profil Recherché</div>
            <InfoRow label="L'époux/épouse qui te correspond ?" :value="candidate.search" />
            <InfoRow label="Attentes envers l'époux/épouse" :value="candidate.consort" />
          </div>

          <div class="info-section">
            <div class="info-section-title">Vision du Mariage</div>
            <InfoRow label="Attentes du mariage" :value="candidate.expectations" />
            <InfoRow label="Education des enfants" :value="candidate.kids_education_perspective" />
          </div>

          <div class="info-section">
            <div class="info-section-title">Critères</div>
            <InfoRow label="Critères rédhibitoires" :value="candidate.blockings" />
          </div>

          <div v-if="candidate.other" class="info-section">
            <div class="info-section-title">Autres Informations</div>
            <InfoRow label="Maladie ou Autre" :value="candidate.other" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
})

const activeTab = ref('profile')

// Petit composant local pour les lignes d'info
const InfoRow = {
  props: ['label', 'value'],
  template: `
    <div class="info-row">
      <div class="info-label">{{ label }}</div>
      <div class="info-value">{{ value || '-' }}</div>
    </div>
  `
}
</script>

<style scoped>
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
  flex: 1;
}

@media (max-width: 768px) {
  .info-row {
    flex-direction: column;
  }
  .info-label {
    min-width: 100%;
    margin-bottom: 0.25rem;
  }
}

.primary-photo-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.primary-photo {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
