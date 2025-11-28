<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/logo.svg" alt="Muqabala" height="40" />
        </a>
        
        <div class="ms-auto">
          <a href="/login" class="btn btn-primary px-4">
            <i class="ri-user-line me-2"></i>
            <span>Se connecter</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="landingHero" class="landing-hero">
      <div class="container text-center">
        <h1 class="display-4 fw-bold mb-4">Bienvenue sur Muqabala</h1>
        <p class="lead mb-5 text-muted">
          Une démarche éthique, sérieuse et encadrée pour faciliter le mariage<br>
          au sein de la communauté de la Mosquée de Vauréal.
        </p>
        
        <div class="d-flex justify-content-center gap-3">
          <a href="/login" class="btn btn-primary btn-lg">Commencer ma démarche</a>
          <a href="#process" class="btn btn-outline-secondary btn-lg">Comment ça marche ?</a>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="section-py bg-body landing-process">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge bg-label-primary mb-2">Processus</span>
          <h2 class="h3">Comment ça marche ?</h2>
          <p class="text-muted">Un parcours simple et transparent, encadré par nos modérateurs.</p>
        </div>

        <div class="row g-4 justify-content-center">
          <!-- Step 1 -->
          <div class="col-lg-2 col-md-4 col-sm-6" v-for="step in processSteps" :key="step.number">
            <div class="card h-100 border-0 shadow-none process-card text-center">
              <div class="position-relative">
                <div class="process-icon-box">
                  <i :class="`${step.icon} ri-2x text-primary`"></i>
                </div>
                <div v-if="step.number < 5" class="process-connector"></div>
              </div>
              <h5 class="card-title mt-3">{{ step.number }}. {{ step.title }}</h5>
              <p class="card-text small text-muted">{{ step.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <div class="alert alert-primary d-inline-block" role="alert">
            <i class="ri-information-line me-2"></i>
            Le process peut être interrompu à tout moment par l'une des parties ou les modérateurs.
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-py bg-light">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-md-4" v-for="value in values" :key="value.title">
            <div class="card h-100 p-4">
              <div class="mb-3">
                <i :class="`${value.icon} ri-3x text-primary`"></i>
              </div>
              <h4>{{ value.title }}</h4>
              <p class="text-muted">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-py bg-primary text-white">
      <div class="container text-center">
        <h2 class="mb-4">Prêt à commencer votre démarche ?</h2>
        <p class="lead mb-4">Rejoignez notre communauté et trouvez votre moitié en toute sérénité.</p>
        <a href="/login" class="btn btn-light btn-lg">Créer mon profil</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-0">&copy; {{ currentYear }} Muqabala - Mosquée de Vauréal. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const processSteps = ref([
  {
    number: 1,
    title: 'Recherche',
    description: 'Consultez les profils anonymes et envoyez une demande.',
    icon: 'ri-user-search-line'
  },
  {
    number: 2,
    title: 'Accord',
    description: "Si l'intérêt est réciproque, la demande est validée.",
    icon: 'ri-check-double-line'
  },
  {
    number: 3,
    title: 'Validation',
    description: 'Les modérateurs vérifient et approuvent la mise en relation.',
    icon: 'ri-shield-check-line'
  },
  {
    number: 4,
    title: 'Rencontre',
    description: 'Organisation de RDVs physiques à la mosquée de Vauréal.',
    icon: 'ri-community-line'
  },
  {
    number: 5,
    title: 'Décision',
    description: 'Décision finale et implication des familles.',
    icon: 'ri-shake-hands-line'
  }
])

const values = ref([
  {
    title: 'Sécurisé & Privé',
    description: "Vos données sont protégées et votre identité n'est révélée qu'avec votre accord.",
    icon: 'ri-lock-2-line'
  },
  {
    title: 'Encadré & Éthique',
    description: 'Des modérateurs bénévoles accompagnent chaque étape du processus.',
    icon: 'ri-shield-user-line'
  },
  {
    title: 'Gratuit & Transparent',
    description: 'Aucun frais caché, un service au service de la communauté.',
    icon: 'ri-hand-heart-line'
  }
])
</script>

<style scoped>
.landing-page {
  padding-top: 76px; /* Height of fixed navbar */
}

.landing-hero {
  background: linear-gradient(135deg, #f0f2f5 0%, #e1e4e8 100%);
  padding-top: 5rem;
  padding-bottom: 5rem;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.section-py {
  padding: 5rem 0;
}

.process-icon-box {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  background: #fff;
  box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
  transition: all 0.3s ease;
}

.process-card:hover .process-icon-box {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(161, 172, 184, 0.6);
  background: #6366f1;
}

.process-card:hover .process-icon-box i {
  color: #fff !important;
}

.process-connector {
  position: absolute;
  top: 40px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #6366f1 0%, transparent 100%);
  z-index: -1;
}

.badge.bg-label-primary {
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.5rem 1rem;
  font-weight: 600;
}

.bg-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
}

@media (max-width: 991px) {
  .process-connector {
    display: none;
  }
}
</style>
