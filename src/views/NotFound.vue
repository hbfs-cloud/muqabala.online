<template>
  <div class="not-found">
    <div class="container text-center py-5">
      <i class="ri-error-warning-line ri-5x text-danger mb-4"></i>
      <h1 class="display-4">404</h1>
      <p class="lead">Page non trouvée</p>
      <router-link to="/" class="btn btn-primary mt-3">
        <i class="ri-home-line me-2"></i>
        Retour à l'accueil
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
