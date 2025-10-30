<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-700">{{ label }}</span>
      <span class="text-sm text-gray-500">{{ current }} de {{ total }}</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <p v-if="description" class="text-xs text-gray-600 mt-1">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  current: number
  total: number
  label?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Progresso'
})

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.current / props.total) * 100)
})
</script>
