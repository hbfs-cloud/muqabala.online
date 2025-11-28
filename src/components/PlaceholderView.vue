<template>
  <DashboardLayout>
    <div class="text-center py-5">
      <i :class="`${icon} ri-4x text-primary mb-4`"></i>
      <h2>{{ title }}</h2>
      <p class="text-muted">{{ description }}</p>
      <p class="small text-muted">Cette page est en cours de développement</p>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../components/DashboardLayout.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'ri-pages-line'
  }
})
</script>
