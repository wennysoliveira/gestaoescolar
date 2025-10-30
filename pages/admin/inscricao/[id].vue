<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Detalhes da Inscrição</h1>
            <p class="text-sm text-gray-600">{{ candidato?.nomeCompleto || 'Carregando...' }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/admin"
              class="btn-secondary"
            >
              ← Voltar
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-sm text-gray-500">Carregando...</p>
      </div>

      <div v-else-if="!candidato" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-2 text-sm text-gray-500">Candidato não encontrado</p>
      </div>

      <div v-else class="space-y-8">
        <!-- Informações Pessoais -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Informações Pessoais e Profissionais</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-500">Nome Completo</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.nomeCompleto }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">CPF</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatCPF(candidato.cpf) }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">E-mail</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.email }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Telefone</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.telefone }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Unidade de Ensino</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.unidadeEnsino }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Função Atual</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.funcaoAtual }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Formação Acadêmica</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.formacaoAcademica }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Tempo de Experiência em Gestão</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.tempoExperienciaGestao }} anos</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Sexo</label>
              <p class="mt-1 text-sm text-gray-900">{{ candidato.sexo || 'Não informado' }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-500">Data da Inscrição</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(candidato.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Pontuação de Títulos -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Pontuação de Títulos</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">Formação Acadêmica</span>
                <span class="text-sm font-bold text-blue-600">{{ candidato.scoreDetails.formacao }} pontos</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">Tempo no Magistério</span>
                <span class="text-sm font-bold text-blue-600">{{ candidato.scoreDetails.tempoMagisterio }} pontos</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">Experiência em Gestão</span>
                <span class="text-sm font-bold text-blue-600">{{ candidato.scoreDetails.experienciaGestao }} pontos</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-700">Cursos de Formação</span>
                <span class="text-sm font-bold text-blue-600">{{ candidato.scoreDetails.cursosFormacao }} pontos</span>
              </div>
            </div>
            
            <div class="flex items-center justify-center">
              <div class="text-center">
                <div class="text-4xl font-bold text-blue-600">{{ candidato.scoreDetails.total }}</div>
                <div class="text-sm text-gray-500">Pontos Totais</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Documentos Obrigatórios -->
        <DocumentList
          :documents="candidato.documents.filter(d => ['rg', 'cpf', 'comprovante_residencia', 'foto_3x4', 'qualificacao_profissional', 'declaracao_experiencia', 'titulo_eleitor', 'certificado_reservista'].includes(d.type))"
          title="Documentos Obrigatórios"
          :show-preview="true"
        />

        <!-- Títulos e Experiência -->
        <DocumentList
          :documents="candidato.documents.filter(d => ['doutorado', 'mestrado', 'pos_graduacao', 'experiencia_gestao', 'cursos_formacao'].includes(d.type))"
          title="Títulos e Experiência"
          :show-preview="true"
        />

        <!-- Plano de Gestão -->
        <div v-if="candidato.managementPlan" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Plano de Gestão Escolar</h2>
          
          <div class="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="h-8 w-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-green-800">Plano de Gestão Enviado</p>
                <p class="text-xs text-green-600">{{ candidato.managementPlan.filename }}</p>
                <p class="text-xs text-green-600">Enviado em {{ formatDate(candidato.managementPlan.uploadedAt) }}</p>
              </div>
            </div>
            
            <button
              @click="downloadDocument(candidato.managementPlan.id)"
              class="btn-primary"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Baixar
            </button>
          </div>
        </div>

        <!-- Recursos (se houver) -->
        <div v-if="candidato.resources && candidato.resources.length > 0" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Recursos</h2>
          
          <div class="space-y-4">
            <div
              v-for="recurso in candidato.resources"
              :key="recurso.id"
              class="p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ getResourceTypeLabel(recurso.type) }}</h3>
                  <p class="text-xs text-gray-500 mt-1">Enviado em {{ formatDate(recurso.submittedAt) }}</p>
                  <p v-if="recurso.description" class="text-sm text-gray-700 mt-2">{{ recurso.description }}</p>
                </div>
                
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getResourceStatusClass(recurso.status)">
                  {{ getResourceStatusLabel(recurso.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  title: 'Detalhes da Inscrição'
  // middleware: 'admin-auth' // Removido - acesso direto
})

// Estado
const loading = ref(true)
const candidato = ref(null)

// Obter ID da rota
const route = useRoute()
const candidatoId = route.params.id as string

// Carregar dados do candidato
const loadCandidato = async () => {
  loading.value = true
  
  try {
    const response = await $fetch(`/api/admin/inscricao/${candidatoId}`)
    
    if (response.success) {
      candidato.value = response.data
    }
    
  } catch (error) {
    console.error('Erro ao carregar candidato:', error)
  } finally {
    loading.value = false
  }
}

// Formatação
const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Download de documento
const downloadDocument = (documentId: string) => {
  window.open(`/api/admin/document/${documentId}`, '_blank')
}

// Labels para recursos
const getResourceTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    homologacao: 'Recurso contra Homologação',
    gabarito: 'Recurso contra Gabarito',
    resultado: 'Recurso contra Resultado Preliminar'
  }
  return labels[type] || type
}

const getResourceStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado'
  }
  return labels[status] || status
}

const getResourceStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Carregar dados iniciais
onMounted(() => {
  loadCandidato()
})
</script>
