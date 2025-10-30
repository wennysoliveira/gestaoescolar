import { computed } from 'vue'

export function useDateRange() {
  // Verificar se estamos no período do plano de gestão (15/12/2025 a 19/12/2025)
  const isManagementPlanPeriod = computed(() => {
    const now = new Date()
    const startDate = new Date('2025-12-15T00:00:00')
    const endDate = new Date('2025-12-19T23:59:59')
    
    return now >= startDate && now <= endDate
  })

  // Verificar se estamos no período de recursos contra homologação (18/11 a 19/11/2025)
  const isHomologationResourcePeriod = computed(() => {
    const now = new Date()
    const startDate = new Date('2025-11-18T00:00:00')
    const endDate = new Date('2025-11-19T23:59:59')
    
    return now >= startDate && now <= endDate
  })

  // Verificar se estamos no período de recursos contra gabarito (09/12 a 10/12/2025)
  const isGabaritoResourcePeriod = computed(() => {
    const now = new Date()
    const startDate = new Date('2025-12-09T00:00:00')
    const endDate = new Date('2025-12-10T23:59:59')
    
    return now >= startDate && now <= endDate
  })

  // Verificar se estamos no período de recursos contra resultado preliminar (30/01 a 31/01/2026)
  const isResultResourcePeriod = computed(() => {
    const now = new Date()
    const startDate = new Date('2026-01-30T00:00:00')
    const endDate = new Date('2026-01-31T23:59:59')
    
    return now >= startDate && now <= endDate
  })

  // Obter mensagem de período para o plano de gestão
  const managementPlanMessage = computed(() => {
    if (isManagementPlanPeriod.value) {
      return 'Período ativo para envio do Plano de Gestão'
    }
    
    const now = new Date()
    const startDate = new Date('2025-12-15T00:00:00')
    
    if (now < startDate) {
      return 'O envio do Plano de Gestão estará disponível de 15/12/2025 a 19/12/2025'
    } else {
      return 'O período para envio do Plano de Gestão já encerrou (15/12/2025 a 19/12/2025)'
    }
  })

  return {
    isManagementPlanPeriod,
    isHomologationResourcePeriod,
    isGabaritoResourcePeriod,
    isResultResourcePeriod,
    managementPlanMessage
  }
}
