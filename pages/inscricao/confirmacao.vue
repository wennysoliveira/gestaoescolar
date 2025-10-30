<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Inscrição Realizada com Sucesso!</h1>
            <p class="text-sm text-gray-600">Seletivo de Gestores Escolares 2025</p>
          </div>
          <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">
            ← Voltar ao Início
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- Ícone de Sucesso -->
        <div class="text-center mb-8">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Inscrição Confirmada!</h2>
          <p class="text-gray-600">Sua inscrição foi recebida e está sendo processada.</p>
        </div>

        <!-- Informações da Inscrição -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações da Inscrição</h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Número do Protocolo</p>
              <p class="text-lg font-mono text-gray-900">{{ protocolo }}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500">Data da Inscrição</p>
              <p class="text-lg text-gray-900">{{ formatDate(new Date()) }}</p>
            </div>
          </div>
        </div>

        <!-- Próximos Passos -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Próximos Passos</h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span class="text-sm font-medium text-blue-600">1</span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">Aguardar Homologação</h4>
                <p class="text-sm text-gray-600">
                  Sua inscrição será analisada pela comissão. O resultado será divulgado em até 5 dias úteis.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span class="text-sm font-medium text-blue-600">2</span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">Enviar Plano de Gestão</h4>
                <p class="text-sm text-gray-600">
                  Entre 15/12/2025 e 19/12/2025, você poderá enviar seu Plano de Gestão Escolar.
                </p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span class="text-sm font-medium text-blue-600">3</span>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">Aguardar Resultado Final</h4>
                <p class="text-sm text-gray-600">
                  O resultado final será divulgado em 12/02/2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cronograma -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Cronograma</h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etapa</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inscrições</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30/10/2025 a 15/11/2025</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Concluído
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recursos contra Homologação</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18/11/2025 a 19/11/2025</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recursos contra Gabarito</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09/12/2025 a 10/12/2025</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Entrega de Títulos e Plano de Gestão</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/12/2025 a 19/12/2025</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recursos contra Resultado Preliminar</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30/01/2026 a 31/01/2026</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendente
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Homologação Final</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/02/2026</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pendente
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/plano-gestao"
            class="btn-primary inline-flex items-center justify-center px-6 py-3"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Enviar Plano de Gestão
          </NuxtLink>
          
          <NuxtLink
            to="/"
            class="btn-secondary inline-flex items-center justify-center px-6 py-3"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar ao Início
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  title: 'Inscrição Confirmada'
})

// Obter protocolo da URL
const route = useRoute()
const protocolo = route.query.protocolo as string

// Função para formatar data
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
