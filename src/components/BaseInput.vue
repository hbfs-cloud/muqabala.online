<template>
  <div class="mb-3">
    <label v-if="label" class="form-label fw-bold">{{ label }}</label>
    
    <textarea
      v-if="type === 'textarea'"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
    ></textarea>
    
    <input
      v-else
      :type="type"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  rows: {
    type: [String, Number],
    default: 3
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-label {
  color: #4a5568;
  font-size: 0.875rem;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style>
