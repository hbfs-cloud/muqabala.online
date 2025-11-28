<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="layout-navbar container shadow-none py-0">
      <div class="navbar navbar-expand-lg landing-navbar border-top-0 px-4 px-md-8">
        <div class="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-6">
          <router-link to="/" class="app-brand-link text-decoration-none">
            <span class="app-brand-logo demo">
              <span style="color: #666cff">
                <img src="/favicon.svg" height="25px" alt="Logo" />
              </span>
            </span>
            <span class="app-brand-text demo menu-text fw-semibold ms-2 ps-1 text-dark">Pôle Mariage</span>
          </router-link>
        </div>

        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <li>
            <div v-if="authStore.isAuthenticated" class="navbar-nav-right d-flex align-items-center">
               <router-link to="/dashboard" class="btn btn-primary">Mon Espace</router-link>
            </div>
            <div v-else>
              <router-link to="/login" class="btn btn-primary px-2 px-sm-4 px-lg-2 px-xl-4">
                <span class="tf-icons ri-user-line me-md-1"></span>
                <span class="d-none d-md-block">Se connecter</span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="landingHero" class="section-py landing-hero position-relative">
        <div class="container text-center">
            <h1 class="display-4 fw-bold mb-4">Bienvenue sur Muqabala</h1>
            <p class="lead mb-5 text-muted">Une démarche éthique, sérieuse et encadrée pour faciliter le mariage<br>au sein de la communauté de la Mosquée de Vauréal.</p>
            
            <div v-if="!authStore.isAuthenticated" class="d-flex justify-content-center gap-3">
                <router-link to="/login" class="btn btn-primary btn-lg">Commencer ma démarche</router-link>
                <a href="#process" class="btn btn-outline-secondary btn-lg">Comment ça marche ?</a>
            </div>
            <div v-else class="d-flex justify-content-center gap-3">
                <router-link to="/dashboard" class="btn btn-primary btn-lg">Accéder à mon espace</router-link>
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="section-py bg-body landing-process py-5">
        <div class="container">
            <div class="text-center mb-5">
                <span class="badge bg-label-primary mb-2 text-primary bg-primary-subtle">Processus</span>
                <h2 class="h3">Comment ça marche ?</h2>
                <p class="text-muted">Un parcours simple et transparent, encadré par nos modérateurs.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- Step 1 -->
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="card h-100 border-0 shadow-none process-card text-center">
                        <div class="position-relative">
                            <div class="process-icon-box">
                                <i class="ri-user-search-line ri-2x text-primary"></i>
                            </div>
                            <div class="process-connector d-none d-lg-block"></div>
                        </div>
                        <h5 class="card-title mt-3">1. Recherche</h5>
                        <p class="card-text small text-muted">Consultez les profils anonymes et envoyez une demande.</p>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="card h-100 border-0 shadow-none process-card text-center">
                        <div class="position-relative">
                            <div class="process-icon-box">
                                <i class="ri-check-double-line ri-2x text-primary"></i>
                            </div>
                            <div class="process-connector d-none d-lg-block"></div>
                        </div>
                        <h5 class="card-title mt-3">2. Accord</h5>
                        <p class="card-text small text-muted">Si l'intérêt est réciproque, la demande est validée.</p>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="card h-100 border-0 shadow-none process-card text-center">
                        <div class="position-relative">
                            <div class="process-icon-box">
                                <i class="ri-shield-check-line ri-2x text-primary"></i>
                            </div>
                            <div class="process-connector d-none d-lg-block"></div>
                        </div>
                        <h5 class="card-title mt-3">3. Validation</h5>
                        <p class="card-text small text-muted">Les modérateurs vérifient et approuvent la mise en relation.</p>
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="card h-100 border-0 shadow-none process-card text-center">
                        <div class="position-relative">
                            <div class="process-icon-box">
                                <i class="ri-community-line ri-2x text-primary"></i>
                            </div>
                            <div class="process-connector d-none d-lg-block"></div>
                        </div>
                        <h5 class="card-title mt-3">4. Rencontre</h5>
                        <p class="card-text small text-muted">Organisation de RDVs physiques à la mosquée de Vauréal.</p>
                    </div>
                </div>

                <!-- Step 5 -->
                <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="card h-100 border-0 shadow-none process-card text-center">
                        <div class="position-relative">
                            <div class="process-icon-box">
                                <i class="ri-shake-hands-line ri-2x text-primary"></i>
                            </div>
                        </div>
                        <h5 class="card-title mt-3">5. Décision</h5>
                        <p class="card-text small text-muted">Décision finale et implication des familles.</p>
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
    <section class="section-py bg-light py-5">
        <div class="container">
            <div class="row g-4 text-center">
                <div class="col-md-4">
                    <div class="card h-100 p-4 border-0 shadow-sm">
                        <div class="mb-3">
                            <i class="ri-lock-2-line ri-3x text-primary"></i>
                        </div>
                        <h4>Sécurisé & Privé</h4>
                        <p class="text-muted">Vos données sont protégées et votre identité n'est révélée qu'avec votre accord.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 p-4 border-0 shadow-sm">
                        <div class="mb-3">
                            <i class="ri-scales-3-line ri-3x text-primary"></i>
                        </div>
                        <h4>Éthique & Halal</h4>
                        <p class="text-muted">Un cadre respectueux des principes islamiques, avec l'implication des tuteurs.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 p-4 border-0 shadow-sm">
                        <div class="mb-3">
                            <i class="ri-team-line ri-3x text-primary"></i>
                        </div>
                        <h4>Accompagné</h4>
                        <p class="text-muted">Une équipe de modérateurs bienveillants pour vous guider à chaque étape.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer bg-body footer-text py-5 border-top">
      <div class="container d-flex flex-wrap justify-content-between flex-md-row flex-column text-center text-md-start">
          <div class="mb-2 mb-md-0">
            <span class="footer-text">© {{ currentYear }}, </span>
            <a href="https://www.mosquee-vaureal.com/" target="_blank" class="footer-link fw-medium text-decoration-none">Mosquée de Vauréal</a>
          </div>
          <div>
            <a href="https://www.facebook.com/MosqueeVaureal/" class="footer-link me-4 text-decoration-none" target="_blank">
                <i class="ri-facebook-circle-fill ri-xl"></i>
            </a>
          </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-hero {
    background: linear-gradient(135deg, #f0f2f5 0%, #e1e4e8 100%);
    padding-top: 5rem;
    padding-bottom: 5rem;
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
    box-shadow: 0 .25rem 1rem rgba(161, 172, 184, 0.45);
    transition: all 0.3s ease;
}
.process-card:hover .process-icon-box {
    transform: translateY(-5px);
    box-shadow: 0 .5rem 1.5rem rgba(161, 172, 184, 0.6);
    background: #666cff;
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
    background: #e1e4e8;
    z-index: -1;
}
.text-primary {
    color: #666cff !important;
}
.btn-primary {
    background-color: #666cff;
    border-color: #666cff;
}
.btn-primary:hover {
    background-color: #5f62e0;
    border-color: #5f62e0;
}
.bg-primary-subtle {
    background-color: rgba(102, 108, 255, 0.15) !important;
    color: #666cff !important;
}
</style>
