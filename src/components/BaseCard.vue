<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h5 class="mb-0">{{ title }}</h5>
      </slot>
    </div>
    
    <div :class="bodyClasses">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const classes = ['card']
  if (props.hover) classes.push('card-hover')
  if (props.clickable) classes.push('cursor-pointer')
  return classes.join(' ')
})

const bodyClasses = computed(() => {
  const classes = ['card-body']
  if (props.noPadding) classes.push('p-0')
  return classes.join(' ')
})
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
