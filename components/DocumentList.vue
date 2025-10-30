<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
    
    <div v-if="documents.length === 0" class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-2 text-sm text-gray-500">Nenhum documento encontrado</p>
    </div>
    
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="document in documents"
        :key="document.id"
        class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center">
              <svg class="h-8 w-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ getDocumentTypeLabel(document.type) }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ document.filename }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ formatFileSize(document.size) }} • {{ formatDate(document.uploadedAt) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 ml-2">
            <button
              class="text-blue-600 hover:text-blue-800 p-1"
              :title="`Baixar ${getDocumentTypeLabel(document.type)}`"
              @click="downloadDocument(document)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            
            <button
              v-if="showPreview && isPreviewable(document.mimeType)"
              class="text-green-600 hover:text-green-800 p-1"
              :title="`Visualizar ${getDocumentTypeLabel(document.type)}`"
              @click="previewDocument(document)"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Document {
  id: string
  type: string
  filename: string
  size: number
  uploadedAt: string
  mimeType: string
}

interface Props {
  documents: Document[]
  title: string
  showPreview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPreview: false
})

const documentTypeLabels: Record<string, string> = {
  rg: 'Documento de Identificação (RG)',
  cpf: 'CPF',
  comprovante_residencia: 'Comprovante de Residência',
  foto_3x4: 'Foto 3x4',
  qualificacao_profissional: 'Comprovantes de Qualificação Profissional',
  declaracao_experiencia: 'Declaração de Experiência Profissional',
  titulo_eleitor: 'Título de Eleitor e Quitação Eleitoral',
  certificado_reservista: 'Certificado de Reservista',
  doutorado: 'Doutorado em Educação',
  mestrado: 'Mestrado em Educação',
  pos_graduacao: 'Pós-graduação em Gestão Escolar',
  experiencia_gestao: 'Experiência em Gestão Escolar',
  cursos_formacao: 'Cursos de Formação Continuada',
  plano_gestao: 'Plano de Gestão Escolar'
}

const getDocumentTypeLabel = (type: string): string => {
  return documentTypeLabels[type] || type
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const isPreviewable = (mimeType: string): boolean => {
  return mimeType.startsWith('image/') || mimeType === 'application/pdf'
}

const downloadDocument = (document: Document) => {
  window.open(`/api/admin/document/${document.id}`, '_blank')
}

const previewDocument = (document: Document) => {
  if (document.mimeType.startsWith('image/')) {
    // Abrir imagem em nova aba
    window.open(`/api/admin/document/${document.id}`, '_blank')
  } else if (document.mimeType === 'application/pdf') {
    // Abrir PDF em nova aba
    window.open(`/api/admin/document/${document.id}`, '_blank')
  }
}
</script>
