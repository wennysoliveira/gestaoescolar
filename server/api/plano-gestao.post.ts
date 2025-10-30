import { prisma } from '~/server/utils/database'
import { saveFile, validateMimeType, ALLOWED_MIME_TYPES } from '~/server/utils/fileHandler'

export default defineEventHandler(async (event) => {
  try {
    // Verificar se estamos no período correto (15/12/2025 a 19/12/2025)
    const now = new Date()
    const startDate = new Date('2025-12-15T00:00:00')
    const endDate = new Date('2025-12-19T23:59:59')
    
    if (now < startDate || now > endDate) {
      throw createError({
        statusCode: 400,
        statusMessage: 'O upload do Plano de Gestão só é permitido entre 15/12/2025 e 19/12/2025'
      })
    }

    const formData = await readMultipartFormData(event)
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dados do formulário não encontrados'
      })
    }

    // Extrair dados do formulário
    const formDataObj: Record<string, any> = {}
    let planoFile: { buffer: Buffer; mimeType: string; filename: string } | null = null
    
    for (const field of formData) {
      if (field.data) {
        if (field.filename) {
          // É o arquivo do plano
          planoFile = {
            buffer: field.data,
            mimeType: field.type || 'application/octet-stream',
            filename: field.filename
          }
        } else {
          // É um campo de texto
          formDataObj[field.name] = field.data.toString()
        }
      }
    }

    // Validar se o arquivo foi enviado
    if (!planoFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Arquivo do Plano de Gestão é obrigatório'
      })
    }

    // Validar CPF
    const cpf = formDataObj.cpf
    if (!cpf) {
      throw createError({
        statusCode: 400,
        statusMessage: 'CPF é obrigatório'
      })
    }

    // Verificar se o candidato existe
    const candidate = await prisma.candidate.findUnique({
      where: { cpf: cpf.replace(/\D/g, '') }
    })

    if (!candidate) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Candidato não encontrado'
      })
    }

    // Verificar se já existe um plano de gestão para este candidato
    const existingPlan = await prisma.managementPlan.findUnique({
      where: { candidateId: candidate.id }
    })

    if (existingPlan) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Já existe um Plano de Gestão enviado para este candidato'
      })
    }

    // Validar tipo de arquivo (deve ser PDF)
    if (!validateMimeType(planoFile.mimeType, ALLOWED_MIME_TYPES.PDF)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'O Plano de Gestão deve ser um arquivo PDF'
      })
    }

    // Salvar arquivo
    const { filepath, filename } = await saveFile(planoFile, candidate.cpf, 'plano_gestao')

    // Criar registro do plano de gestão
    const managementPlan = await prisma.managementPlan.create({
      data: {
        filename,
        filepath,
        mimeType: planoFile.mimeType,
        size: planoFile.buffer.length,
        candidateId: candidate.id
      }
    })

    return {
      success: true,
      message: 'Plano de Gestão enviado com sucesso!',
      managementPlanId: managementPlan.id,
      candidateName: candidate.nomeCompleto
    }

  } catch (error: any) {
    console.error('Erro no upload do plano de gestão:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
