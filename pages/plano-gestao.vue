<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Envio do Plano de Gestão Escolar</h1>
            <p class="text-sm text-gray-600">Seletivo de Gestores Escolares 2025</p>
          </div>
          <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">
            ← Voltar
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Status do Período -->
      <div v-if="!isManagementPlanPeriod" class="mb-8">
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex">
            <svg class="h-5 w-5 text-yellow-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 class="text-sm font-medium text-yellow-800">Período não disponível</h3>
              <p class="text-sm text-yellow-700 mt-1">{{ managementPlanMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulário -->
      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Plano de Gestão Escolar</h2>
          <p class="text-gray-600">
            Envie seu Plano de Gestão Escolar no período de 15/12/2025 a 19/12/2025.
          </p>
        </div>

        <form @submit.prevent="submitPlan" class="space-y-6">
          <!-- Campo CPF -->
          <FormInput
            id="cpf"
            label="CPF do Candidato"
            v-model="form.cpf"
            :required="true"
            :error="getError('cpf')"
            placeholder="000.000.000-00"
            @blur="validateField('cpf')"
            @input="formatCPF"
            help="Digite o CPF usado na inscrição"
          />

          <!-- Upload do Plano -->
          <FileUpload
            id="plano_gestao"
            label="Plano de Gestão Escolar"
            accept=".pdf"
            accept-text="PDF (máx. 5MB)"
            v-model="files.plano_gestao"
            :required="true"
            :error="getError('plano_gestao')"
            @file-change="validateFile('plano_gestao', $event)"
          />

          <!-- Informações sobre o Plano -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="text-sm font-medium text-blue-900 mb-2">Orientações para o Plano de Gestão</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• O documento deve estar em formato PDF</li>
              <li>• Tamanho máximo: 5MB</li>
              <li>• O plano deve conter suas propostas para a gestão escolar</li>
              <li>• Inclua objetivos, estratégias e metas para a unidade escolar</li>
              <li>• Seja específico e detalhado em suas propostas</li>
            </ul>
          </div>

          <!-- Botões -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              class="btn-secondary"
              @click="resetForm"
              :disabled="isSubmitting"
            >
              Limpar
            </button>
            
            <button
              type="submit"
              class="btn-primary"
              :disabled="isSubmitting || hasErrors"
            >
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar Plano de Gestão</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Informações Adicionais -->
      <div class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações Importantes</h3>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Período de Envio</h4>
              <p class="text-sm text-gray-600">
                O Plano de Gestão só pode ser enviado entre 15/12/2025 e 19/12/2025.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Inscrição Obrigatória</h4>
              <p class="text-sm text-gray-600">
                Você deve ter realizado a inscrição no processo seletivo para enviar o plano.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg class="h-5 w-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-gray-900">Apenas um Envio</h4>
              <p class="text-sm text-gray-600">
                Cada candidato pode enviar apenas um Plano de Gestão. Não é possível substituir o arquivo após o envio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFormValidation } from '~/composables/useFormValidation'
import { useDateRange } from '~/composables/useDateRange'

// Meta
definePageMeta({
  title: 'Plano de Gestão Escolar'
})

// Composables
const { 
  errors, 
  isSubmitting, 
  validateCPF, 
  validateFile: validateFileUtil,
  setError, 
  clearError, 
  hasErrors, 
  getError 
} = useFormValidation()

const { isManagementPlanPeriod, managementPlanMessage } = useDateRange()

// Estado do formulário
const form = ref({
  cpf: ''
})

const files = ref<Record<string, File | null>>({
  plano_gestao: null
})

// Formatação de CPF
const formatCPF = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  form.value.cpf = value
}

// Validações
const validateField = (field: string) => {
  clearError(field)
  
  if (field === 'cpf') {
    if (!form.value.cpf) {
      setError(field, 'CPF é obrigatório')
    } else if (!validateCPF(form.value.cpf)) {
      setError(field, 'CPF inválido')
    }
  }
}

const validateFile = (field: string, file: File | null) => {
  clearError(field)
  
  if (!file) {
    setError(field, 'Arquivo é obrigatório')
    return
  }
  
  const allowedTypes = ['application/pdf']
  const error = validateFileUtil(file, allowedTypes, 5)
  if (error) {
    setError(field, error)
  }
}

// Ações do formulário
const resetForm = () => {
  form.value.cpf = ''
  files.value.plano_gestao = null
  clearError('cpf')
  clearError('plano_gestao')
}

const submitPlan = async () => {
  // Validar campos
  validateField('cpf')
  validateFile('plano_gestao', files.value.plano_gestao)
  
  if (hasErrors.value) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    const formData = new FormData()
    formData.append('cpf', form.value.cpf)
    
    if (files.value.plano_gestao) {
      formData.append('plano_gestao', files.value.plano_gestao)
    }
    
    const response = await $fetch('/api/plano-gestao', {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      // Mostrar mensagem de sucesso
      alert('Plano de Gestão enviado com sucesso!')
      resetForm()
    }
    
  } catch (error: any) {
    console.error('Erro no envio do plano:', error)
    alert('Erro ao enviar o plano de gestão. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
