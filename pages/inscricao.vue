<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Formulário de Inscrição</h1>
            <p class="text-sm text-gray-600">Seletivo de Gestores Escolares 2025</p>
          </div>
          <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">
            ← Voltar
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ProgressBar
        v-if="!isConfirmationMode"
        :current="currentSection"
        :total="4"
        label="Progresso do Formulário"
        :description="`Seção ${currentSection} de 4`"
      />
    </div>

    <!-- Form / Confirmação -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isConfirmationMode" class="bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Inscrição Confirmada!</h2>
          <p class="text-gray-600">Sua inscrição foi recebida e está sendo processada.</p>
        </div>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações da Inscrição</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Número do Protocolo</p>
              <p class="text-lg font-mono text-gray-900">{{ route.query.protocolo || confirmData?.protocolo }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Data da Inscrição</p>
              <p class="text-lg text-gray-900">{{ dataInscricao }}</p>
            </div>
            <div v-if="confirmData?.nomeCompleto">
              <p class="text-sm font-medium text-gray-500">Nome Completo</p>
              <p class="text-lg text-gray-900">{{ confirmData.nomeCompleto }}</p>
            </div>
            <div v-if="confirmData?.email">
              <p class="text-sm font-medium text-gray-500">E-mail</p>
              <p class="text-lg text-gray-900">{{ confirmData.email }}</p>
            </div>
            <div v-if="confirmData?.telefone">
              <p class="text-sm font-medium text-gray-500">Telefone</p>
              <p class="text-lg text-gray-900">{{ confirmData.telefone }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/plano-gestao" class="btn-primary inline-flex items-center justify-center px-6 py-3">Enviar Plano de Gestão</NuxtLink>
          <NuxtLink to="/" class="btn-secondary inline-flex items-center justify-center px-6 py-3">Voltar ao Início</NuxtLink>
        </div>
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-8">
        <!-- Seção 1: Informações Pessoais -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">1. Informações Pessoais e Profissionais</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <FormInput
              id="nomeCompleto"
              label="Nome Completo"
              v-model="form.nomeCompleto"
              :required="true"
              :error="getError('nomeCompleto')"
              @blur="validateField('nomeCompleto')"
            />
            
            <FormInput
              id="cpf"
              label="CPF"
              v-model="form.cpf"
              :required="true"
              :error="getError('cpf')"
              placeholder="000.000.000-00"
              @blur="validateField('cpf')"
              @input="formatCPF"
            />
            
            <FormInput
              id="email"
              label="E-mail"
              type="email"
              v-model="form.email"
              :required="true"
              :error="getError('email')"
              @blur="validateField('email')"
            />
            
            <FormInput
              id="telefone"
              label="Telefone"
              type="tel"
              v-model="form.telefone"
              :required="true"
              :error="getError('telefone')"
              placeholder="(11) 99999-9999"
              @blur="validateField('telefone')"
              @input="formatPhone"
            />
            
            <FormInput
              id="unidadeEnsino"
              label="Unidade de Ensino (Onde Atua Atualmente)"
              v-model="form.unidadeEnsino"
              :required="true"
              :error="getError('unidadeEnsino')"
              @blur="validateField('unidadeEnsino')"
            />
            
            <FormInput
              id="funcaoAtual"
              label="Função (Atual)"
              v-model="form.funcaoAtual"
              :required="true"
              :error="getError('funcaoAtual')"
              @blur="validateField('funcaoAtual')"
            />
            
            <FormSelect
              id="formacaoAcademica"
              label="Formação Acadêmica"
              v-model="form.formacaoAcademica"
              :options="formacaoOptions"
              :required="true"
              :error="getError('formacaoAcademica')"
              @update:modelValue="() => validateField('formacaoAcademica')"
              placeholder="Selecione sua formação"
            />
            
            <FormSelect
              id="sexo"
              label="Sexo"
              v-model="form.sexo"
              :options="sexoOptions"
              :required="true"
              :error="getError('sexo')"
              @update:modelValue="() => validateField('sexo')"
              placeholder="Selecione seu sexo"
            />
            
            <FormInput
              id="tempoExperienciaGestao"
              label="Tempo de Experiência em Gestão Escolar (em anos)"
              type="number"
              v-model="form.tempoExperienciaGestao"
              :required="true"
              :error="getError('tempoExperienciaGestao')"
              min="0"
              @blur="validateField('tempoExperienciaGestao')"
            />
          </div>
        </div>

        <!-- Seção 2: Documentos (temporariamente sem obrigatoriedade) -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">2. Documentos Comprobatórios (Upload Obrigatório)</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <FileUpload
              id="rg"
              label="Documento de Identificação (RG)"
              accept=".pdf,.jpg,.jpeg,.png"
              accept-text="PDF, JPG ou PNG (máx. 5MB)"
              v-model="files.rg"
              :required="false"
              :error="getError('rg')"
              @file-change="validateFile('rg', $event)"
            />
            
            <FileUpload
              id="cpf"
              label="CPF"
              accept=".pdf,.jpg,.jpeg,.png"
              accept-text="PDF, JPG ou PNG (máx. 5MB)"
              v-model="files.cpf"
              :required="false"
              :error="getError('cpf')"
              @file-change="validateFile('cpf', $event)"
            />
            
            <FileUpload
              id="comprovante_residencia"
              label="Comprovante de Residência"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.comprovante_residencia"
              :required="false"
              :error="getError('comprovante_residencia')"
              @file-change="validateFile('comprovante_residencia', $event)"
            />
            
            <FileUpload
              id="foto_3x4"
              label="Foto 3x4"
              accept=".jpg,.jpeg,.png"
              accept-text="JPG ou PNG (máx. 5MB)"
              v-model="files.foto_3x4"
              :required="false"
              :error="getError('foto_3x4')"
              @file-change="validateFile('foto_3x4', $event)"
            />
            
            <FileUpload
              id="qualificacao_profissional"
              label="Comprovantes da Qualificação Profissional"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.qualificacao_profissional"
              :required="false"
              :error="getError('qualificacao_profissional')"
              @file-change="validateFile('qualificacao_profissional', $event)"
            />
            
            <FileUpload
              id="declaracao_experiencia"
              label="Declaração de Experiência Profissional"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.declaracao_experiencia"
              :required="false"
              :error="getError('declaracao_experiencia')"
              @file-change="validateFile('declaracao_experiencia', $event)"
            />
            
            <FileUpload
              id="titulo_eleitor"
              label="Título de Eleitor e Comprovante de Quitação Eleitoral"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.titulo_eleitor"
              :required="false"
              :error="getError('titulo_eleitor')"
              @file-change="validateFile('titulo_eleitor', $event)"
            />
            
            <FileUpload
              v-if="form.sexo === 'Masculino'"
              id="certificado_reservista"
              label="Certificado de Reservista"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.certificado_reservista"
              :required="false"
              :error="getError('certificado_reservista')"
              @file-change="validateFile('certificado_reservista', $event)"
            />
          </div>
        </div>

        <!-- Seção 3: Títulos e Experiência -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">3. Títulos e Experiência (Para Análise de Títulos)</h2>
          <p class="text-sm text-gray-600 mb-6">Esta seção é opcional, mas essencial para a pontuação do candidato.</p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <FileUpload
              id="doutorado"
              label="ANEXO 2.1: Doutorado na Área da Educação"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.doutorado"
              :error="getError('doutorado')"
              @file-change="validateFile('doutorado', $event)"
            />
            
            <FileUpload
              id="mestrado"
              label="ANEXO 2.2: Mestrado na Área da Educação"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.mestrado"
              :error="getError('mestrado')"
              @file-change="validateFile('mestrado', $event)"
            />
            
            <FileUpload
              id="pos_graduacao"
              label="ANEXO 2.3: Pós-graduação lato sensu em Gestão Escolar"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.pos_graduacao"
              :error="getError('pos_graduacao')"
              @file-change="validateFile('pos_graduacao', $event)"
            />
            
            <FormInput
              id="tempo_magisterio"
              label="ANEXO 3.1: Tempo de efetivo exercício no magistério da rede municipal (em anos)"
              type="number"
              v-model="form.tempo_magisterio"
              :error="getError('tempo_magisterio')"
              min="0"
              max="20"
              help="Máximo 20 anos (1 ponto por ano)"
            />
            
            <FileUpload
              id="experiencia_gestao"
              label="ANEXO 3.2: Comprovante de Experiência em função de gestão"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.experiencia_gestao"
              :error="getError('experiencia_gestao')"
              @file-change="validateFile('experiencia_gestao', $event)"
            />
            
            <FileUpload
              id="cursos_formacao"
              label="ANEXO 3.3: Certificados de cursos de formação continuada"
              accept=".pdf"
              accept-text="PDF (máx. 5MB cada)"
              v-model="files.cursos_formacao"
              :error="getError('cursos_formacao')"
              @file-change="validateFile('cursos_formacao', $event)"
            />
          </div>
        </div>

        <!-- Seção 4: Plano de Gestão -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">4. Plano de Gestão Escolar</h2>
          
          <div v-if="!isManagementPlanPeriod" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
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
          
          <div v-else>
            <p class="text-sm text-gray-600 mb-4">
              O Plano de Gestão Escolar deve ser enviado no período de 15/12/2025 a 19/12/2025.
            </p>
            
            <FileUpload
              id="plano_gestao"
              label="Plano de Gestão Escolar"
              accept=".pdf"
              accept-text="PDF (máx. 5MB)"
              v-model="files.plano_gestao"
              :error="getError('plano_gestao')"
              @file-change="validateFile('plano_gestao', $event)"
            />
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            class="btn-secondary"
            @click="goBack"
            :disabled="currentSection === 1"
          >
            ← Anterior
          </button>
          
          <div class="flex space-x-4">
            <button
              type="submit"
              class="btn-primary"
              :disabled="isSubmitting || hasErrors"
            >
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar Inscrição</span>
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useFormValidation } from '~/composables/useFormValidation'
import { useDateRange } from '~/composables/useDateRange'
const route = useRoute()

// Meta
definePageMeta({
  title: 'Formulário de Inscrição'
})

// Composables
const { 
  errors, 
  isSubmitting, 
  validateCPF, 
  validateEmail, 
  validateFile: validateFileUtil,
  setError, 
  clearError, 
  clearAllErrors,
  hasErrors, 
  getError 
} = useFormValidation()

const { isManagementPlanPeriod, managementPlanMessage } = useDateRange()
const isConfirmationMode = computed(() => route.path.includes('/inscricao/confirmacao') || !!route.query.protocolo)

const dataInscricao = computed(() => {
  try {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return ''
  }
})

const confirmData = process.client
  ? JSON.parse(sessionStorage.getItem('inscricao_confirmacao') || 'null')
  : null

// Estado do formulário
const currentSection = ref(1)

const form = ref({
  nomeCompleto: '',
  cpf: '',
  email: '',
  telefone: '',
  unidadeEnsino: '',
  funcaoAtual: '',
  formacaoAcademica: '',
  sexo: '',
  tempoExperienciaGestao: 0,
  tempo_magisterio: 0
})

const files = ref<Record<string, File | null>>({
  rg: null,
  cpf: null,
  comprovante_residencia: null,
  foto_3x4: null,
  qualificacao_profissional: null,
  declaracao_experiencia: null,
  titulo_eleitor: null,
  certificado_reservista: null,
  doutorado: null,
  mestrado: null,
  pos_graduacao: null,
  experiencia_gestao: null,
  cursos_formacao: null,
  plano_gestao: null
})

// Opções dos selects
const formacaoOptions = [
  { value: 'Licenciatura', label: 'Licenciatura' },
  { value: 'Especialização', label: 'Especialização' },
  { value: 'Mestrado', label: 'Mestrado' },
  { value: 'Doutorado', label: 'Doutorado' }
]

const sexoOptions = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' }
]

// Formatação de campos
const formatCPF = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  form.value.cpf = value
}

const formatPhone = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d{5})(\d)/, '$1-$2')
  form.value.telefone = value
}

// Validações
const validateField = (field: string) => {
  clearError(field)
  
  switch (field) {
    case 'nomeCompleto':
      if (!form.value.nomeCompleto || form.value.nomeCompleto.length < 2) {
        setError(field, 'Nome deve ter pelo menos 2 caracteres')
      }
      break
    case 'cpf':
      if (!form.value.cpf) {
        setError(field, 'CPF é obrigatório')
      } else if (!validateCPF(form.value.cpf)) {
        setError(field, 'CPF inválido')
      }
      break
    case 'email':
      if (!form.value.email) {
        setError(field, 'E-mail é obrigatório')
      } else if (!validateEmail(form.value.email)) {
        setError(field, 'E-mail inválido')
      }
      break
    case 'telefone':
      if (!form.value.telefone) {
        setError(field, 'Telefone é obrigatório')
      }
      break
    case 'unidadeEnsino':
      if (!form.value.unidadeEnsino || form.value.unidadeEnsino.length < 2) {
        setError(field, 'Unidade de ensino é obrigatória')
      }
      break
    case 'funcaoAtual':
      if (!form.value.funcaoAtual || form.value.funcaoAtual.length < 2) {
        setError(field, 'Função atual é obrigatória')
      }
      break
    case 'formacaoAcademica':
      if (!form.value.formacaoAcademica) {
        setError(field, 'Formação acadêmica é obrigatória')
      }
      break
    case 'sexo':
      if (!form.value.sexo) {
        setError(field, 'Sexo é obrigatório')
      }
      break
    case 'tempoExperienciaGestao':
      if (form.value.tempoExperienciaGestao < 0) {
        setError(field, 'Tempo de experiência deve ser maior ou igual a 0')
      }
      break
  }
}

const validateFile = (field: string, file: File | null) => {
  clearError(field)
  
  if (!file) return
  
  const allowedTypes = field === 'foto_3x4' 
    ? ['image/jpeg', 'image/jpg', 'image/png']
    : ['application/pdf']
  
  const error = validateFileUtil(file, allowedTypes, 5)
  if (error) {
    setError(field, error)
  }
}

// Navegação
const goBack = () => {
  if (currentSection.value > 1) {
    currentSection.value--
  }
}

// Ações do formulário

const submitForm = async () => {
  // Validar todos os campos obrigatórios
  clearAllErrors()
  const requiredFields = ['nomeCompleto', 'cpf', 'email', 'telefone', 'unidadeEnsino', 'funcaoAtual', 'formacaoAcademica', 'sexo']
  requiredFields.forEach(field => validateField(field))
  
  // Temporariamente sem obrigatoriedade de documentos: pula checagem
  
  if (hasErrors.value) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    const formData = new FormData()
    
    // Adicionar dados do formulário
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, String(value))
    })
    
    // Adicionar arquivos
    Object.entries(files.value).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file)
      }
    })
    
    const response = await $fetch('/api/inscricao', {
      method: 'POST',
      body: formData
    })
    
    if (process.client) console.log('Resposta inscrição:', response)
    const protocolo = (response as any)?.protocolo || `SEG-${Date.now().toString(36).toUpperCase()}`
    // Persistir dados básicos para a página de confirmação
    if (process.client) {
      const confirm = {
        protocolo,
        nomeCompleto: form.value.nomeCompleto,
        email: form.value.email,
        telefone: form.value.telefone,
        createdAt: new Date().toISOString()
      }
      sessionStorage.setItem('inscricao_confirmacao', JSON.stringify(confirm))
      // Redirecionar (forçado) para página de confirmação
      window.location.href = `/inscricao/confirmacao?protocolo=${encodeURIComponent(protocolo)}`
    }
    return
    
  } catch (error: any) {
    console.error('Erro na inscrição:', error)
    const msg = error?.data?.statusMessage || error?.message || 'Erro ao enviar inscrição'
    if (process.client) alert(msg)
  } finally {
    isSubmitting.value = false
  }
}

// Removida a persistência automática dos selects para não pré-preencher em primeira carga
</script>
