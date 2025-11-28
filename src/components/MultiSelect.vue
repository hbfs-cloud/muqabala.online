<template>
  <div class="multi-select" ref="containerRef">
    <label v-if="label" class="form-label">{{ label }}</label>

    <div class="multi-select-input" @click="toggleDropdown">
      <div class="selected-items" v-if="selectedItems.length > 0">
        <span
          v-for="item in selectedItems"
          :key="item.value"
          class="badge bg-primary me-1"
        >
          {{ item.label }}
          <i class="ri-close-line ms-1" @click.stop="removeItem(item.value)"></i>
        </span>
      </div>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <i class="ri-arrow-down-s-line ms-auto"></i>
    </div>

    <div v-if="isOpen" class="multi-select-dropdown">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control form-control-sm mb-2"
        placeholder="Rechercher..."
        @click.stop
      >
      <div class="options-list">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="option-item"
          :class="{ 'selected': isSelected(option.value) }"
          @click="toggleOption(option)"
        >
          <input
            type="checkbox"
            :checked="isSelected(option.value)"
            class="form-check-input me-2"
          >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    required: true
  },
  label: String,
  placeholder: {
    type: String,
    default: 'Sélectionner...'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref(null)

const selectedItems = computed(() => {
  return props.options.filter(opt => props.modelValue.includes(opt.value))
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options

  const query = searchQuery.value.toLowerCase()
  return props.options.filter(opt =>
    opt.label.toLowerCase().includes(query)
  )
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

function isSelected(value) {
  return props.modelValue.includes(value)
}

function toggleOption(option) {
  const newValue = isSelected(option.value)
    ? props.modelValue.filter(v => v !== option.value)
    : [...props.modelValue, option.value]

  emit('update:modelValue', newValue)
}

function removeItem(value) {
  emit('update:modelValue', props.modelValue.filter(v => v !== value))
}

function handleClickOutside(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.multi-select {
  position: relative;
}

.multi-select-input {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  min-height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: white;
}

.multi-select-input:hover {
  border-color: #adb5bd;
}

.selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  flex: 1;
}

.placeholder {
  color: #6c757d;
  flex: 1;
}

.multi-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  margin-top: 0.25rem;
  padding: 0.5rem;
  z-index: 1000;
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
  max-height: 300px;
  overflow-y: auto;
}

.options-list {
  max-height: 220px;
  overflow-y: auto;
}

.option-item {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
}

.option-item:hover {
  background: #f8f9fa;
}

.option-item.selected {
  background: #e7f1ff;
}
</style>
