import { z } from 'zod'

// Validação de CPF
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '')
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false
  
  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false
  
  // Validação do segundo dígito verificador
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
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validação de telefone brasileiro
export function validatePhone(phone: string): boolean {
  // Sem validação de quantidade de dígitos
  return true
}

// Schema de validação para inscrição
export const inscricaoSchema = z.object({
  nomeCompleto: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  unidadeEnsino: z.string().min(2, 'Unidade de ensino é obrigatória'),
  funcaoAtual: z.string().min(2, 'Função atual é obrigatória'),
  formacaoAcademica: z.enum(['Licenciatura', 'Especialização', 'Mestrado', 'Doutorado'], {
    errorMap: () => ({ message: 'Formação acadêmica inválida' })
  }),
  tempoExperienciaGestao: z.number().min(0, 'Tempo de experiência deve ser maior ou igual a 0'),
  sexo: z.enum(['Masculino', 'Feminino']).optional()
})

// Schema para validação de arquivos
export const fileSchema = z.object({
  filename: z.string(),
  mimeType: z.string(),
  size: z.number().max(5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB'),
  buffer: z.instanceof(Buffer)
})

// Tipos de documentos obrigatórios
export const DOCUMENT_TYPES = {
  RG: 'rg',
  CPF: 'cpf',
  COMPROVANTE_RESIDENCIA: 'comprovante_residencia',
  FOTO_3X4: 'foto_3x4',
  QUALIFICACAO_PROFISSIONAL: 'qualificacao_profissional',
  DECLARACAO_EXPERIENCIA: 'declaracao_experiencia',
  TITULO_ELEITOR: 'titulo_eleitor',
  CERTIFICADO_RESERVISTA: 'certificado_reservista'
} as const

// Tipos de títulos
export const TITLE_TYPES = {
  DOUTORADO: 'doutorado',
  MESTRADO: 'mestrado',
  POS_GRADUACAO: 'pos_graduacao',
  TEMPO_MAGISTERIO: 'tempo_magisterio',
  EXPERIENCIA_GESTAO: 'experiencia_gestao',
  CURSOS_FORMACAO: 'cursos_formacao'
} as const
