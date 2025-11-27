<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="landing-page">
    <div class="position-relative">
      <div class="authentication-wrapper authentication-basic container-p-y p-4 p-sm-0">
        <div class="authentication-inner py-6">
          <!-- Landing Card -->
          <div class="card p-md-7 p-1">
            <!-- Logo -->
            <div class="app-brand justify-content-center mt-5">
              <a href="/" class="app-brand-link gap-2">
                <span class="app-brand-logo demo">
                  <span style="color: #666cff">
                    <svg width="25" viewBox="0 0 25 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <defs>
                        <path d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z" id="path-1"></path>
                        <path d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z" id="path-3"></path>
                        <path d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.607502 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z" id="path-4"></path>
                        <path d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z" id="path-5"></path>
                      </defs>
                      <g id="g-app-brand" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                          <g id="Icon" transform="translate(27.000000, 15.000000)">
                            <g id="Mask" transform="translate(0.000000, 8.000000)">
                              <mask id="mask-2" fill="white">
                                <use xlink:href="#path-1"></use>
                              </mask>
                              <use fill="#696cff" xlink:href="#path-1"></use>
                              <g id="Path-3" mask="url(#mask-2)">
                                <use fill="#696cff" xlink:href="#path-3"></use>
                                <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-3"></use>
                              </g>
                              <g id="Path-4" mask="url(#mask-2)">
                                <use fill="#696cff" xlink:href="#path-4"></use>
                                <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-4"></use>
                              </g>
                            </g>
                            <g id="Triangle" transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) ">
                              <use fill="#696cff" xlink:href="#path-5"></use>
                              <use fill-opacity="0.2" fill="#FFFFFF" xlink:href="#path-5"></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </span>
                <span class="app-brand-text demo text-heading fw-semibold">Pôle Mariage</span>
              </a>
            </div>
            <!-- /Logo -->

            <div class="card-body mt-1 text-center">
              <h4 class="mb-1">Bienvenue sur la plateforme mariage 👋</h4>
              <p class="mb-5">Trouvez votre moitié en toute confiance</p>

              <div class="mb-5">
                <button class="btn btn-primary btn-lg d-grid w-100" @click="goToLogin">
                  Se connecter
                </button>
              </div>

              <div class="features mt-5">
                <div class="feature-item mb-4">
                  <i class="ri-shield-check-line feature-icon"></i>
                  <h6>Sécurisé et Confidentiel</h6>
                  <p class="text-muted">Vos données sont protégées</p>
                </div>
                <div class="feature-item mb-4">
                  <i class="ri-user-heart-line feature-icon"></i>
                  <h6>Profils Vérifiés</h6>
                  <p class="text-muted">Tous les profils sont validés par notre équipe</p>
                </div>
                <div class="feature-item">
                  <i class="ri-customer-service-2-line feature-icon"></i>
                  <h6>Accompagnement Personnalisé</h6>
                  <p class="text-muted">Notre équipe vous accompagne dans votre démarche</p>
                </div>
              </div>
            </div>
          </div>
          <!-- /Landing Card -->
          <img
            alt="mask"
            src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/illustrations/auth-basic-login-mask-light.png"
            class="authentication-image d-none d-lg-block"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css');

.landing-page {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.authentication-wrapper {
  display: flex;
  flex-basis: 100%;
  min-height: 100vh;
  width: 100%;
}

.authentication-wrapper .authentication-inner {
  width: 100%;
}

.authentication-basic .authentication-inner {
  max-width: 460px;
  position: relative;
}

.card {
  background-clip: padding-box;
  box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, 0.1);
  border-radius: 0.5rem;
  background-color: #fff;
  border: 0 solid #d9dee3;
}

.app-brand {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.app-brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.app-brand-text {
  font-size: 1.75rem;
  letter-spacing: -0.5px;
  text-transform: lowercase;
  color: #566a7f;
}

.btn-primary {
  color: #fff;
  background-color: #696cff;
  border-color: #696cff;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(105, 108, 255, 0.4);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #5f62e0;
  border-color: #5f62e0;
  transform: translateY(-2px);
  box-shadow: 0 0.25rem 0.5rem 0 rgba(105, 108, 255, 0.4);
}

.btn-lg {
  padding: 0.875rem 1.75rem;
  font-size: 1.125rem;
}

.features {
  text-align: center;
}

.feature-item {
  padding: 1rem;
}

.feature-icon {
  font-size: 2.5rem;
  color: #696cff;
  margin-bottom: 0.5rem;
}

.feature-item h6 {
  color: #566a7f;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-item p {
  font-size: 0.875rem;
  margin-bottom: 0;
}

.authentication-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

/* Utilities */
.w-100 { width: 100% !important; }
.d-grid { display: grid !important; }
.mb-1 { margin-bottom: 0.25rem !important; }
.mb-4 { margin-bottom: 1rem !important; }
.mb-5 { margin-bottom: 1.5rem !important; }
.mt-1 { margin-bottom: 0.25rem !important; }
.mt-5 { margin-top: 1.5rem !important; }
.p-4 { padding: 1.5rem !important; }
.text-center { text-align: center !important; }
.text-muted { color: #a1acb8 !important; }
.position-relative { position: relative !important; }
</style>
