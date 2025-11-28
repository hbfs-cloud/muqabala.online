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
                <label class="form-label">Age (min-max)</label>
                <div class="d-flex gap-2">
                  <input type="number" class="form-control" placeholder="Min" v-model="filters.ageMin">
                  <input type="number" class="form-control" placeholder="Max" v-model="filters.ageMax">
                </div>
              </div>
              <div class="col-md-3">
                <label class="form-label">Ville</label>
                <select class="form-select" v-model="filters.city">
                  <option value="">Toutes</option>
                  <option value="Paris">Paris</option>
                  <option value="Lyon">Lyon</option>
                  <option value="Marseille">Marseille</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Origine</label>
                <select class="form-select" v-model="filters.origin">
                  <option value="">Toutes</option>
                  <option value="Maroc">Maroc</option>
                  <option value="Algérie">Algérie</option>
                  <option value="Tunisie">Tunisie</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div class="col-md-3 d-flex align-items-end">
                <button class="btn btn-outline-primary w-100" @click="applyFilters">
                  Appliquer
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
import { ref } from 'vue'
import CandidatePublicProfile from '../components/CandidatePublicProfile.vue'

const showFilters = ref(false)
const selectedCandidate = ref(null)

const filters = ref({
  ageMin: '',
  ageMax: '',
  city: '',
  origin: ''
})

// Mock Data
const candidates = ref([
  {
    id: 1,
    initials: 'AK',
    name: 'Ahmed K.',
    age: 28,
    city: 'Paris',
    origin: 'Maroc',
    bio: 'Ingénieur sérieux cherchant à fonder un foyer basé sur les valeurs islamiques.',
    height: 180,
    languages: 'Français, Arabe, Anglais',
    nationality: 'Française',
    study: 'Master 2',
    job: 'Ingénieur Logiciel',
    already_married: 'Jamais',
    already_kids: 'Aucun',
    practice: 'Prière quotidienne, Jumu\'a',
    hijab: 'Condition importante',
    trait: 'Calme, Réfléchi, Sportif',
    interests: 'Lecture, Randonnée, Tech',
    family_relations: 'Très proches',
    expectations: 'Une partenaire pieuse et bienveillante.',
    marriage_vision: 'Partenariat, Entraide, Éducation des enfants.',
    accept_kids: 'Non',
    accept_origin: 'Oui',
    blockings: 'Tabac, Non-pratique'
  },
  {
    id: 2,
    initials: 'SM',
    name: 'Sarah M.',
    age: 25,
    city: 'Lyon',
    origin: 'Algérie',
    bio: 'Étudiante en médecine, passionnée et investie dans la communauté.',
    height: 165,
    languages: 'Français, Arabe',
    nationality: 'Française',
    study: 'Doctorat en cours',
    job: 'Interne en Médecine',
    already_married: 'Jamais',
    already_kids: 'Aucun',
    practice: 'Voilée, Prière à l\'heure',
    hijab: 'Porté depuis 5 ans',
    trait: 'Dynamique, Empathique',
    interests: 'Bénévolat, Lecture, Voyage',
    family_relations: 'Bonnes',
    expectations: 'Un époux compréhensif vis-à-vis de mes études.',
    marriage_vision: 'Soutien mutuel, Projets communs.',
    accept_kids: 'À discuter',
    accept_origin: 'Oui',
    blockings: 'Manque de respect, Avarice'
  },
  {
    id: 3,
    initials: 'YB',
    name: 'Yassine B.',
    age: 32,
    city: 'Marseille',
    origin: 'Tunisie',
    bio: 'Entrepreneur, aime les voyages et la découverte.',
    height: 178,
    languages: 'Français, Anglais',
    nationality: 'Française',
    study: 'Licence Pro',
    job: 'Chef d\'entreprise',
    already_married: 'Divorcé',
    already_kids: '1 enfant',
    practice: 'Régulière',
    hijab: 'Souhaitable',
    trait: 'Ambitieux, Généreux',
    interests: 'Entrepreneuriat, Sport',
    family_relations: 'Normales',
    expectations: 'Stabilité et complicité.',
    marriage_vision: 'Fonder une grande famille.',
    accept_kids: 'Oui',
    accept_origin: 'Oui',
    blockings: 'Mensonge'
  }
])

const applyFilters = () => {
  console.log('Applying filters:', filters.value)
  // TODO: Call API with filters
}

const viewProfile = (candidate) => {
  selectedCandidate.value = candidate
}

const sendRequest = (candidate) => {
  console.log('Sending request to:', candidate.id)
  // TODO: API call
  alert('Demande envoyée avec succès !')
  selectedCandidate.value = null
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
