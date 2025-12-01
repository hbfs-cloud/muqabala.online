<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" href="/">
          <img src="/logo.svg" alt="Muqabala" height="40" />
          <div class="d-flex flex-column">
            <span class="fw-bold text-dark" style="font-size: 1.1rem;">Mosquée de Vauréal</span>
            <span class="small text-muted" style="font-size: 0.8rem; letter-spacing: 1px;">PÔLE MARIAGE</span>
          </div>
        </a>
        
        <div class="ms-auto">
          <router-link to="/login" class="btn btn-primary px-4">
            <i class="ri-user-line me-2"></i>
            <span>Se connecter</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="landingHero" class="landing-hero position-relative overflow-hidden">
      <div class="container">
        <div class="row align-items-center gy-5">
          <div class="col-lg-6 text-center text-lg-start">
            <div class="d-inline-flex align-items-center bg-label-primary rounded-pill px-3 py-1 mb-4">
              <i class="ri-shield-check-line me-2"></i>
              <span class="fw-medium small">Plateforme Éthique & Sécurisée</span>
            </div>
            <h1 class="display-4 fw-bold mb-4" style="line-height: 1.2;">
              Trouvez votre moitié dans un cadre <span class="text-primary">bienveillant</span> et <span class="text-primary">respectueux</span>.
            </h1>
            <p class="lead mb-5 text-muted">
              Muqabala facilite le mariage au sein de la communauté de la Mosquée de Vauréal. 
              Une démarche encadrée par des modérateurs pour garantir sérieux et sérénité.
            </p>
            
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <router-link to="/login" class="btn btn-primary btn-lg">
                <i class="ri-user-add-line me-2"></i>Commencer ma démarche
              </router-link>
              <button @click="scrollToProcess" class="btn btn-outline-secondary btn-lg">
                <i class="ri-play-circle-line me-2"></i>Comment ça marche ?
              </button>
            </div>

            <div class="mt-5 d-flex align-items-center justify-content-center justify-content-lg-start gap-4">
              <div class="d-flex align-items-center">
                <div class="avatar-group me-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-label-success"><i class="ri-check-line"></i></span>
                  </div>
                </div>
                <span class="small fw-medium text-muted">Profils Vérifiés</span>
              </div>
              <div class="d-flex align-items-center">
                <div class="avatar-group me-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-label-info"><i class="ri-shield-user-line"></i></span>
                  </div>
                </div>
                <span class="small fw-medium text-muted">Modération Active</span>
              </div>
              <div class="d-flex align-items-center">
                <div class="avatar-group me-2">
                  <div class="avatar avatar-sm">
                    <span class="avatar-initial rounded-circle bg-label-warning"><i class="ri-lock-2-line"></i></span>
                  </div>
                </div>
                <span class="small fw-medium text-muted">100% Privé</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="position-relative d-inline-block">
              <!-- Decorative Elements -->
              <div class="position-absolute top-0 start-0 translate-middle p-2 bg-warning rounded-circle mt-5 ms-5" style="width: 15px; height: 15px;"></div>
              <div class="position-absolute bottom-0 end-0 translate-middle p-2 bg-primary rounded-circle mb-5 me-5" style="width: 20px; height: 20px;"></div>
              
              <!-- Main Image/Illustration Placeholder -->
              <div class="card border-0 shadow-lg" style="transform: rotate(-2deg);">
                <div class="card-body p-2">
                  <img src="https://placehold.co/600x400/f8f9fa/696cff?text=Muqabala" alt="Mariage" class="img-fluid rounded" style="max-height: 400px;" onerror="this.src='https://placehold.co/600x400/f8f9fa/696cff?text=Muqabala';">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section-py bg-white">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-md-4">
            <h2 class="text-primary mb-0 display-6 fw-bold">100%</h2>
            <p class="text-muted mb-0">Gratuit & Bénévole</p>
          </div>
          <div class="col-md-4">
            <h2 class="text-primary mb-0 display-6 fw-bold">Sécurisé</h2>
            <p class="text-muted mb-0">Données protégées</p>
          </div>
          <div class="col-md-4">
            <h2 class="text-primary mb-0 display-6 fw-bold">Éthique</h2>
            <p class="text-muted mb-0">Conforme aux valeurs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="section-py bg-body landing-process">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge bg-label-primary mb-2">Notre Méthode</span>
          <h2 class="h3 mb-3">Un parcours simple et transparent</h2>
          <p class="text-muted col-lg-6 mx-auto">Nous avons conçu un processus en 5 étapes pour garantir que chaque rencontre se fasse dans les meilleures conditions possibles.</p>
        </div>

        <div class="row g-4 justify-content-center">
          <div class="col-lg-2 col-md-4 col-sm-6" v-for="step in processSteps" :key="step.number">
            <div class="card h-100 border-0 shadow-none process-card text-center">
              <div class="position-relative">
                <div class="process-icon-box">
                  <i :class="`${step.icon} ri-2x text-primary`"></i>
                </div>
                <div v-if="step.number < 5" class="process-connector"></div>
                <div class="process-step-number">{{ step.number }}</div>
              </div>
              <h5 class="card-title mt-3">{{ step.title }}</h5>
              <p class="card-text small text-muted">{{ step.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <div class="alert alert-primary d-inline-block shadow-sm border-0" role="alert">
            <i class="ri-information-line me-2"></i>
            <strong>Important :</strong> Le processus peut être interrompu à tout moment, sans pression.
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-py bg-light position-relative overflow-hidden">
      <!-- Background Elements -->
      <div class="position-absolute top-0 start-0 w-100 h-100" style="background: radial-gradient(circle at 0% 0%, rgba(105, 108, 255, 0.05) 0%, transparent 50%); pointer-events: none;"></div>

      <div class="container position-relative">
        <div class="text-center mb-5">
          <span class="badge bg-label-primary mb-2">Nos Valeurs</span>
          <h2 class="h3 mb-3">Pourquoi choisir Muqabala ?</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-4" v-for="value in values" :key="value.title">
            <div class="card h-100 p-4 border-0 shadow-sm transition-hover">
              <div class="mb-4">
                <div :class="`avatar avatar-lg rounded ${value.bgClass}`">
                  <span class="avatar-initial rounded"><i :class="`${value.icon} ri-2x`"></i></span>
                </div>
              </div>
              <h4>{{ value.title }}</h4>
              <p class="text-muted">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-py bg-body">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="text-center mb-5">
              <span class="badge bg-label-primary mb-2">FAQ</span>
              <h2 class="h3 mb-3">Questions Fréquentes</h2>
            </div>

            <div class="accordion accordion-flush" id="accordionFAQ">
              <div class="accordion-item border mb-3 rounded overflow-hidden" v-for="(faq, index) in faqs" :key="index">
                <h2 class="accordion-header" :id="`heading${index}`">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`" aria-expanded="false" :aria-controls="`collapse${index}`">
                    {{ faq.question }}
                  </button>
                </h2>
                <div :id="`collapse${index}`" class="accordion-collapse collapse" :aria-labelledby="`heading${index}`" data-bs-parent="#accordionFAQ">
                  <div class="accordion-body text-muted">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-py bg-primary position-relative overflow-hidden">
      <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%); pointer-events: none;"></div>
      <div class="container text-center position-relative text-white">
        <h2 class="display-6 fw-bold mb-4 text-white">Prêt à franchir le pas ?</h2>
        <p class="lead mb-5 opacity-75">Rejoignez une communauté bienveillante et commencez votre recherche dans un cadre sain.</p>
        <router-link to="/login" class="btn btn-light btn-lg shadow-lg">
          <i class="ri-user-add-line me-2"></i>Créer mon profil gratuitement
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer bg-body footer-text">
      <div class="footer-bottom py-5">
        <div class="container d-flex flex-wrap justify-content-between flex-md-row flex-column text-center text-md-start">
          <div class="mb-2 mb-md-0">
            <span class="footer-text">© {{ currentYear }} Mosquée de Vauréal</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="text-end d-none d-md-block">
              <small class="d-block fw-bold text-dark">Mosquée de la Paix "Assalam"</small>
              <small class="d-block text-muted">6 Place Louise Michel, 95490 Vauréal</small>
            </div>
            <a href="https://www.mosquee-vaureal.com/" target="_blank">
              <img src="/logo.svg" alt="Mosquée Vauréal" height="40">
            </a>
          </div>
          <div>
            <a href="https://www.facebook.com/MosqueeVaureal/" class="footer-link me-4" target="_blank">
              <i class="ri-facebook-circle-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const scrollToProcess = () => {
  const element = document.getElementById('process')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const processSteps = ref([
  {
    number: 1,
    title: 'Recherche',
    description: "Consultez les profils anonymes et envoyez une demande d'intérêt.",
    icon: 'ri-user-search-line'
  },
  {
    number: 2,
    title: 'Accord',
    description: "Si l'intérêt est réciproque, la demande est pré-validée.",
    icon: 'ri-check-double-line'
  },
  {
    number: 3,
    title: 'Validation',
    description: 'Les modérateurs vérifient la compatibilité et approuvent la mise en relation.',
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
    description: 'Décision finale et implication officielle des familles.',
    icon: 'ri-shake-hands-line'
  }
])

const values = ref([
  {
    title: 'Sécurisé & Privé',
    description: "Votre vie privée est notre priorité. Vos photos sont floutées par défaut et votre identité n'est révélée qu'avec votre accord explicite.",
    icon: 'ri-lock-2-line',
    bgClass: 'bg-label-primary'
  },
  {
    title: 'Éthique & Halal',
    description: 'Un cadre respectueux des principes islamiques. Nous encourageons l\'implication des tuteurs (Wali) dès que possible.',
    icon: 'ri-scales-3-line',
    bgClass: 'bg-label-success'
  },
  {
    title: 'Accompagnement Humain',
    description: 'Contrairement aux applications classiques, une équipe de modérateurs bénévoles vous guide et veille au bon déroulement.',
    icon: 'ri-team-line',
    bgClass: 'bg-label-info'
  }
])

const faqs = ref([
  {
    question: "Est-ce que l'inscription est payante ?",
    answer: "Non, l'inscription et l'utilisation de la plateforme sont entièrement gratuites. C'est un service bénévole offert par la Mosquée de Vauréal pour la communauté."
  },
  {
    question: "Mes photos sont-elles visibles par tout le monde ?",
    answer: "Non. Par défaut, vos photos sont floutées pour tous les utilisateurs. Elles ne deviennent visibles qu'après une demande d'accès spécifique et votre validation explicite."
  },
  {
    question: "Qui sont les modérateurs ?",
    answer: "Les modérateurs sont des membres de confiance de la communauté de la Mosquée de Vauréal, sélectionnés pour leur sérieux et leur discrétion."
  }
])
</script>

<style scoped>
.landing-page {
  padding-top: 76px;
}

.landing-hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 8rem;
  padding-bottom: 6rem;
}

.section-py {
  padding: 5rem 0;
}

.process-icon-box {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.process-card:hover .process-icon-box {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(105, 108, 255, 0.2);
  background: rgba(255, 255, 255, 0.98);
  border-color: #696cff;
}

.process-card:hover .process-icon-box i {
  color: #696cff !important;
}

.process-step-number {
  position: absolute;
  top: -10px;
  right: 50%;
  transform: translateX(50%);
  background: #ffab00;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.process-connector {
  position: absolute;
  top: 45px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #E5E7EB;
  z-index: -1;
}

.bg-label-primary {
  background-color: rgba(105, 108, 255, 0.1) !important;
  color: #5f62e0 !important;
}

.bg-label-success {
  background-color: #d1fadf !important;
  color: #065f46 !important;
}

.bg-label-info {
  background-color: #cffafe !important;
  color: #164e63 !important;
}

.bg-label-warning {
  background-color: #fef3c7 !important;
  color: #92400e !important;
}

.transition-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.transition-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

@media (max-width: 991px) {
  .process-connector {
    display: none;
  }
}
</style>
