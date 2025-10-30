import { ref, computed } from 'vue'

export function useFormValidation() {
  const errors = ref<Record<string, string>>({})
  const isSubmitting = ref(false)

  // Validação de CPF
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '')
    
    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false
    
    return true
  }

  // Validação de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validação de telefone brasileiro
  const validatePhone = (phone: string): boolean => {
    // Sem validação de quantidade de dígitos
    return true
  }

  // Validação de arquivo
  const validateFile = (file: File, allowedTypes: string[], maxSizeMB: number = 5): string | null => {
    if (!file) return 'Arquivo é obrigatório'
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Arquivo deve ter no máximo ${maxSizeMB}MB`
    }
    
    if (!allowedTypes.includes(file.type)) {
      return `Tipo de arquivo não permitido. Permitidos: ${allowedTypes.join(', ')}`
    }
    
    return null
  }

  // Adicionar erro
  const setError = (field: string, message: string) => {
    errors.value[field] = message
  }

  // Remover erro
  const clearError = (field: string) => {
    delete errors.value[field]
  }

  // Limpar todos os erros
  const clearAllErrors = () => {
    errors.value = {}
  }

  // Verificar se tem erros
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  // Verificar se campo tem erro
  const hasError = (field: string) => !!errors.value[field]

  // Obter erro do campo
  const getError = (field: string) => errors.value[field] || ''

  return {
    errors,
    isSubmitting,
    validateCPF,
    validateEmail,
    validatePhone,
    validateFile,
    setError,
    clearError,
    clearAllErrors,
    hasErrors,
    hasError,
    getError
  }
}
