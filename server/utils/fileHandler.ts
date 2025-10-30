import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'

// Garantir que o diretório de upload existe
export async function ensureUploadDir(cpf: string) {
  const candidateDir = path.join(UPLOAD_DIR, cpf.replace(/\D/g, ''))
  await fs.mkdir(candidateDir, { recursive: true })
  return candidateDir
}

// Salvar arquivo
export async function saveFile(
  file: { buffer: Buffer; mimeType: string; filename: string },
  cpf: string,
  type: string
): Promise<{ filepath: string; filename: string }> {
  const candidateDir = await ensureUploadDir(cpf)
  
  // Gerar nome único para o arquivo
  const extension = path.extname(file.filename)
  const uniqueFilename = `${type}_${randomUUID()}${extension}`
  const filepath = path.join(candidateDir, uniqueFilename)
  
  // Salvar arquivo
  await fs.writeFile(filepath, file.buffer)
  
  return {
    filepath: filepath.replace(/\\/g, '/'), // Normalizar separadores
    filename: uniqueFilename
  }
}

// Ler arquivo
export async function readFile(filepath: string): Promise<Buffer> {
  return await fs.readFile(filepath)
}

// Verificar se arquivo existe
export async function fileExists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath)
    return true
  } catch {
    return false
  }
}

// Validar tipo MIME
export function validateMimeType(mimeType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimeType)
}

// Tipos MIME permitidos
export const ALLOWED_MIME_TYPES = {
  PDF: ['application/pdf'],
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png'],
  ALL: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
} as const
