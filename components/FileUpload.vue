<template>
  <div class="mb-4">
    <label :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="id"
        ref="fileInput"
        type="file"
        :accept="accept"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @change="handleFileChange"
      />
      
      <div v-if="!file && !disabled" class="mt-2">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="mt-2 text-sm text-gray-600">
            Clique para selecionar ou arraste o arquivo aqui
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ acceptText }}
          </p>
        </div>
      </div>
      
      <div v-if="file" class="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-green-800">{{ file.name }}</p>
              <p class="text-xs text-green-600">{{ formatFileSize(file.size) }}</p>
            </div>
          </div>
          <button
            v-if="!disabled"
            type="button"
            class="text-red-400 hover:text-red-600"
            @click="removeFile"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-if="help" class="text-sm text-gray-600 mt-1">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  accept: string
  acceptText: string
  modelValue: File | null
  required?: boolean
  disabled?: boolean
  error?: string
  help?: string
  maxSizeMB?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  maxSizeMB: 5
})

const emit = defineEmits<{
  'update:modelValue': [file: File | null]
  'file-change': [file: File | null]
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const file = computed(() => props.modelValue)

const inputClasses = computed(() => {
  const baseClasses = 'form-input'
  const errorClasses = props.error ? 'border-red-500 focus:ring-red-500' : ''
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  
  return `${baseClasses} ${errorClasses} ${disabledClasses}`.trim()
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0] || null
  
  if (selectedFile) {
    // Validar tamanho do arquivo
    if (selectedFile.size > props.maxSizeMB * 1024 * 1024) {
      emit('file-change', null)
      return
    }
  }
  
  emit('update:modelValue', selectedFile)
  emit('file-change', selectedFile)
}

const removeFile = () => {
  emit('update:modelValue', null)
  emit('file-change', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
