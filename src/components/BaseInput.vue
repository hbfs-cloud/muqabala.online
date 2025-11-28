<template>
  <div class="mb-3">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    
    <div class="input-group" :class="{ 'has-validation': error }">
      <span v-if="prepend" class="input-group-text">
        <i v-if="prependIcon" :class="prependIcon"></i>
        <span v-else>{{ prepend }}</span>
      </span>
      
      <input
        :id="inputId"
        :type="type"
        :class="inputClasses"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <span v-if="append" class="input-group-text">
        <i v-if="appendIcon" :class="appendIcon"></i>
        <span v-else>{{ append }}</span>
      </span>
    </div>
    
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
    
    <small v-if="hint && !error" class="form-text text-muted">
      {{ hint }}
    </small>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: null
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
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  hint: {
    type: String,
    default: null
  },
  prepend: {
    type: String,
    default: null
  },
  prependIcon: {
    type: String,
    default: null
  },
  append: {
    type: String,
    default: null
  },
  appendIcon: {
    type: String,
    default: null
  },
  min: {
    type: [String, Number],
    default: null
  },
  max: {
    type: [String, Number],
    default: null
  },
  step: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const classes = ['form-control']
  if (props.error) classes.push('is-invalid')
  return classes.join(' ')
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
