<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Seletivo de Gestores Escolares</h1>
            <p class="text-lg text-gray-600">Prefeitura Municipal de Santa Rita</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Ano 2025</p>
            <p class="text-sm text-gray-500">Edital nº 001/2025</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Informações do Seletivo -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Informações do Processo Seletivo</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Período de Inscrições</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Início:</strong> 30 de outubro de 2025</p>
              <p><strong>Fim:</strong> 15 de novembro de 2025</p>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Período de Envio do Plano de Gestão</h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Início:</strong> 15 de dezembro de 2025</p>
              <p><strong>Fim:</strong> 19 de dezembro de 2025</p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 class="font-semibold text-blue-900 mb-2">Documentos Obrigatórios</h4>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• Documento de Identificação (RG)</li>
            <li>• CPF</li>
            <li>• Comprovante de Residência</li>
            <li>• Foto 3x4</li>
            <li>• Comprovantes de Qualificação Profissional</li>
            <li>• Declaração de Experiência Profissional</li>
            <li>• Título de Eleitor e Comprovante de Quitação Eleitoral</li>
            <li>• Certificado de Reservista (apenas para o sexo masculino)</li>
          </ul>
        </div>
      </div>

      <!-- Ações -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Realizar Inscrição</h3>
          <p class="text-gray-600 mb-6">
            Preencha o formulário de inscrição e envie todos os documentos obrigatórios.
          </p>
          <NuxtLink
            to="/inscricao"
            class="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Fazer Inscrição
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Enviar Plano de Gestão</h3>
          <p class="text-gray-600 mb-6">
            Envie seu Plano de Gestão Escolar no período estabelecido.
          </p>
          <NuxtLink
            to="/plano-gestao"
            class="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Enviar Plano
          </NuxtLink>
        </div>
      </div>

      <!-- Cronograma -->
      <div class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Cronograma do Processo Seletivo</h3>
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
                    Ativo
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
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Prefeitura Municipal de Santa Rita</h3>
          <p class="text-gray-300">Sistema de Seleção de Gestores Escolares 2025</p>
          <p class="text-sm text-gray-400 mt-2">© 2025 - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  </div>
</template>