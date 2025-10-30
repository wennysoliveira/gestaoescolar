<template>
  <div class="mb-4">
    <label :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :class="selectClasses"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-if="help" class="text-sm text-gray-600 mt-1">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  id: string
  label: string
  modelValue: string
  options: Option[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  help?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectClasses = computed(() => {
  const baseClasses = 'form-input'
  const errorClasses = props.error ? 'border-red-500 focus:ring-red-500' : ''
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  
  return `${baseClasses} ${errorClasses} ${disabledClasses}`.trim()
})
</script>
