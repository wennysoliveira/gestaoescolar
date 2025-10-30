<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p class="text-sm text-gray-600">Seletivo de Gestores Escolares 2025</p>
          </div>
        <div class="flex items-center space-x-4">
          <button @click="handleLogout" class="px-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Sair</button>
        </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total de Inscrições</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalInscricoes }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Inscrições Completas</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.inscricoesCompletas }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Planos de Gestão</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.planosGestao }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pontuação Média</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pontuacaoMedia }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros e Busca -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Nome, CPF ou email..."
              class="form-input"
              @input="debouncedSearch"
            />
          </div>
          
          <div class="md:w-48">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              v-model="statusFilter"
              class="form-input"
              @change="applyFilters"
            >
              <option value="">Todos</option>
              <option value="completo">Completo</option>
              <option value="incompleto">Incompleto</option>
            </select>
          </div>
          
          <div class="md:w-48">
            <label for="formacao" class="block text-sm font-medium text-gray-700 mb-1">Formação</label>
            <select
              id="formacao"
              v-model="formacaoFilter"
              class="form-input"
              @change="applyFilters"
            >
              <option value="">Todas</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Especialização">Especialização</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>
          </div>
          
          <div class="md:w-32">
            <label class="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
            <button
              @click="clearFilters"
              class="btn-secondary w-full"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      <!-- Tabela de Inscrições -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Inscrições</h3>
        </div>
        
        <div v-if="loading" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-sm text-gray-500">Carregando...</p>
        </div>
        
        <div v-else-if="inscricoes.length === 0" class="p-8 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-2 text-sm text-gray-500">Nenhuma inscrição encontrada</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidato</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formação</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontuação</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="inscricao in inscricoes"
                :key="inscricao.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ inscricao.nomeCompleto }}</div>
                    <div class="text-sm text-gray-500">{{ inscricao.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCPF(inscricao.cpf) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ inscricao.formacaoAcademica }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ inscricao.score }} pontos
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getStatusClass(inscricao)">
                    {{ getStatusText(inscricao) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(inscricao.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <NuxtLink
                    :to="`/admin/inscricao/${inscricao.id}`"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Ver Detalhes
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Mostrando {{ (pagination.page - 1) * pagination.limit + 1 }} a 
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} de 
              {{ pagination.total }} resultados
            </div>
            
            <div class="flex space-x-2">
              <button
                @click="changePage(pagination.page - 1)"
                :disabled="pagination.page === 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md">
                {{ pagination.page }} de {{ pagination.totalPages }}
              </span>
              
              <button
                @click="changePage(pagination.page + 1)"
                :disabled="pagination.page === pagination.totalPages"
                class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
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
  title: 'Dashboard Administrativo'
  // middleware: 'admin-auth' // Removido - acesso direto
})

// Estado
const loading = ref(false)
const inscricoes = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const formacaoFilter = ref('')

const stats = ref({
  totalInscricoes: 0,
  inscricoesCompletas: 0,
  planosGestao: 0,
  pontuacaoMedia: 0
})

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0
})

// Dados originais para filtros
const allInscricoes = ref([])

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    applyFilters()
  }, 500)
}

// Dados de exemplo
const sampleData = [
  {
    id: '1',
    nomeCompleto: 'João Silva Santos',
    cpf: '12345678901',
    email: 'joao@email.com',
    formacaoAcademica: 'Mestrado',
    score: 15,
    createdAt: new Date().toISOString(),
    _count: { documents: 8, titles: 3 },
    managementPlan: null
  },
  {
    id: '2',
    nomeCompleto: 'Maria Oliveira Costa',
    cpf: '98765432100',
    email: 'maria@email.com',
    formacaoAcademica: 'Doutorado',
    score: 25,
    createdAt: new Date().toISOString(),
    _count: { documents: 7, titles: 5 },
    managementPlan: { filename: 'plano_gestao.pdf' }
  },
  {
    id: '3',
    nomeCompleto: 'Pedro Santos Lima',
    cpf: '11122233344',
    email: 'pedro@email.com',
    formacaoAcademica: 'Especialização',
    score: 8,
    createdAt: new Date().toISOString(),
    _count: { documents: 6, titles: 2 },
    managementPlan: null
  },
  {
    id: '4',
    nomeCompleto: 'Ana Paula Ferreira',
    cpf: '55566677788',
    email: 'ana@email.com',
    formacaoAcademica: 'Licenciatura',
    score: 5,
    createdAt: new Date().toISOString(),
    _count: { documents: 8, titles: 1 },
    managementPlan: { filename: 'plano_ana.pdf' }
  },
  {
    id: '5',
    nomeCompleto: 'Carlos Eduardo Silva',
    cpf: '99988877766',
    email: 'carlos@email.com',
    formacaoAcademica: 'Mestrado',
    score: 18,
    createdAt: new Date().toISOString(),
    _count: { documents: 5, titles: 4 },
    managementPlan: null
  },
  {
    id: '6',
    nomeCompleto: 'Fernanda Costa Lima',
    cpf: '44433322211',
    email: 'fernanda@email.com',
    formacaoAcademica: 'Doutorado',
    score: 30,
    createdAt: new Date().toISOString(),
    _count: { documents: 9, titles: 6 },
    managementPlan: { filename: 'plano_fernanda.pdf' }
  }
]

// Carregar inscrições
const loadInscricoes = async () => {
  loading.value = true
  
  try {
    // Carregar dados de exemplo
    allInscricoes.value = sampleData
    applyFilters()
    
  } catch (error) {
    console.error('Erro ao carregar inscrições:', error)
  } finally {
    loading.value = false
  }
}

// Aplicar filtros
const applyFilters = () => {
  let filtered = [...allInscricoes.value]
  
  // Filtro de busca
  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.nomeCompleto.toLowerCase().includes(search) ||
      item.cpf.includes(search) ||
      item.email.toLowerCase().includes(search)
    )
  }
  
  // Filtro de status
  if (statusFilter.value) {
    if (statusFilter.value === 'completo') {
      filtered = filtered.filter(item => item._count.documents >= 7)
    } else if (statusFilter.value === 'incompleto') {
      filtered = filtered.filter(item => item._count.documents < 7)
    }
  }
  
  // Filtro de formação
  if (formacaoFilter.value) {
    filtered = filtered.filter(item => item.formacaoAcademica === formacaoFilter.value)
  }
  
  // Aplicar paginação
  const start = (pagination.value.page - 1) * pagination.value.limit
  const end = start + pagination.value.limit
  
  inscricoes.value = filtered.slice(start, end)
  
  // Atualizar paginação
  pagination.value.total = filtered.length
  pagination.value.totalPages = Math.ceil(filtered.length / pagination.value.limit)
  
  // Calcular estatísticas
  stats.value.totalInscricoes = allInscricoes.value.length
  stats.value.inscricoesCompletas = allInscricoes.value.filter((i: any) => i._count.documents >= 7).length
  stats.value.planosGestao = allInscricoes.value.filter((i: any) => i.managementPlan).length
  stats.value.pontuacaoMedia = allInscricoes.value.length > 0 
    ? Math.round(allInscricoes.value.reduce((sum: number, i: any) => sum + i.score, 0) / allInscricoes.value.length)
    : 0
}

// Mudar página
const changePage = (page: number) => {
  pagination.value.page = page
  applyFilters()
}

// Limpar filtros
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  formacaoFilter.value = ''
  pagination.value.page = 1
  applyFilters()
}

// Status helpers
const getStatusText = (inscricao: any) => {
  if (inscricao._count.documents >= 7) return 'Completo'
  return 'Incompleto'
}

const getStatusClass = (inscricao: any) => {
  if (inscricao._count.documents >= 7) {
    return 'bg-green-100 text-green-800'
  }
  return 'bg-yellow-100 text-yellow-800'
}

// Formatação
const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

// Função para limpar todos os cookies
const clearAllCookies = () => {
  if (process.client) {
    // Obter todos os cookies
    const cookies = document.cookie.split(';')
    
    // Limpar cada cookie
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      
      // Limpar com diferentes configurações
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`
    })
    
    // Limpar localStorage e sessionStorage
    localStorage.clear()
    sessionStorage.clear()
  }
}

// Logout
const handleLogout = async () => {
  if (!confirm('Tem certeza que deseja sair?')) return
  try {
    await $fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
  } finally {
    await navigateTo('/admin/login')
  }
}

// Carregar dados iniciais
onMounted(() => {
  loadInscricoes()
})
</script>
