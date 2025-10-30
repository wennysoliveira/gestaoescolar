<template>
  <div class="mb-4">
    <label :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-if="help" class="text-sm text-gray-600 mt-1">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'password'
  modelValue: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  help?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string | number]
  blur: []
  focus: []
}>()

const inputClasses = computed(() => {
  const baseClasses = 'form-input'
  const errorClasses = props.error ? 'border-red-500 focus:ring-red-500' : ''
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  
  return `${baseClasses} ${errorClasses} ${disabledClasses}`.trim()
})
</script>
