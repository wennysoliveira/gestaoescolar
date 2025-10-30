<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            :class="column.class"
          >
            {{ column.label }}
          </th>
          <th v-if="hasActions" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-gray-50"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            :class="column.class"
          >
            <slot
              :name="`cell-${column.key}`"
              :value="row[column.key]"
              :row="row"
              :index="index"
            >
              {{ formatCellValue(row[column.key], column) }}
            </slot>
          </td>
          <td v-if="hasActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <slot name="actions" :row="row" :index="index">
              <button
                class="text-blue-600 hover:text-blue-900 mr-3"
                @click="$emit('edit', row, index)"
              >
                Editar
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                @click="$emit('delete', row, index)"
              >
                Excluir
              </button>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="data.length === 0" class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-2 text-sm text-gray-500">Nenhum item encontrado</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  class?: string
  formatter?: (value: any) => string
}

interface Props {
  data: any[]
  columns: Column[]
  hasActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasActions: false
})

defineEmits<{
  edit: [row: any, index: number]
  delete: [row: any, index: number]
}>()

const formatCellValue = (value: any, column: Column): string => {
  if (column.formatter) {
    return column.formatter(value)
  }
  
  if (value === null || value === undefined) {
    return '-'
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Sim' : 'Não'
  }
  
  if (value instanceof Date) {
    return value.toLocaleDateString('pt-BR')
  }
  
  return String(value)
}
</script>
