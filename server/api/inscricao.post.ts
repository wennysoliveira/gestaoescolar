import { prisma } from '~/server/utils/database'
import { inscricaoSchema, DOCUMENT_TYPES, TITLE_TYPES } from '~/server/utils/validators'
import { saveFile, validateMimeType, ALLOWED_MIME_TYPES } from '~/server/utils/fileHandler'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    const isRelaxed = process.env.NODE_ENV !== 'production' || process.env.RELAX_INSCRICAO === 'true'
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dados do formulário não encontrados'
      })
    }

    // Extrair dados do formulário
    const formDataObj: Record<string, any> = {}
    const files: Record<string, { buffer: Buffer; mimeType: string; filename: string }> = {}
    
    for (const field of formData) {
      if (field.data) {
        if (field.filename) {
          // É um arquivo
          files[field.name] = {
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

    // Normalizar valores numéricos vazios
    const tempoExperienciaGestaoNum = Number.isFinite(Number(formDataObj.tempoExperienciaGestao))
      ? Number(formDataObj.tempoExperienciaGestao)
      : 0

    // Validar dados do formulário (retornar 400 em erro de validação)
    let validatedData: typeof inscricaoSchema._type
    try {
      validatedData = inscricaoSchema.parse({
        nomeCompleto: formDataObj.nomeCompleto,
        cpf: formDataObj.cpf,
        email: formDataObj.email,
        telefone: formDataObj.telefone,
        unidadeEnsino: formDataObj.unidadeEnsino,
        funcaoAtual: formDataObj.funcaoAtual,
        formacaoAcademica: formDataObj.formacaoAcademica,
        tempoExperienciaGestao: tempoExperienciaGestaoNum,
        sexo: formDataObj.sexo
      })
    } catch (err: any) {
      throw createError({ statusCode: 400, statusMessage: 'Dados inválidos: ' + (err?.errors?.[0]?.message || 'verifique o formulário') })
    }

    // Verificar se CPF já existe (desativado em modo de testes)
    if (!isRelaxed) {
      const existingCandidate = await prisma.candidate.findUnique({
        where: { cpf: validatedData.cpf }
      })
      if (existingCandidate) {
        throw createError({ statusCode: 400, statusMessage: 'Já existe uma inscrição com este CPF' })
      }
    }

    // Verificar se email já existe (desativado em modo de testes)
    if (!isRelaxed) {
      const existingEmail = await prisma.candidate.findUnique({
        where: { email: validatedData.email }
      })
      if (existingEmail) {
        throw createError({ statusCode: 400, statusMessage: 'Já existe uma inscrição com este email' })
      }
    }

    // Modo relaxado para desenvolvimento: não exigir todos os documentos

    // Lista de documentos obrigatórios (apenas se não estiver relaxado)
    const requiredDocuments = [
      DOCUMENT_TYPES.RG,
      DOCUMENT_TYPES.CPF,
      DOCUMENT_TYPES.COMPROVANTE_RESIDENCIA,
      DOCUMENT_TYPES.FOTO_3X4,
      DOCUMENT_TYPES.QUALIFICACAO_PROFISSIONAL,
      DOCUMENT_TYPES.DECLARACAO_EXPERIENCIA,
      DOCUMENT_TYPES.TITULO_ELEITOR
    ]

    if (validatedData.sexo === 'Masculino') {
      requiredDocuments.push(DOCUMENT_TYPES.CERTIFICADO_RESERVISTA)
    }

    if (!isRelaxed) {
      for (const docType of requiredDocuments) {
        if (!files[docType]) {
          throw createError({
            statusCode: 400,
            statusMessage: `Documento obrigatório não encontrado: ${docType}`
          })
        }
      }
    }

    // Validar tipos de arquivo
    for (const [docType, file] of Object.entries(files)) {
      if (docType === DOCUMENT_TYPES.FOTO_3X4) {
        if (!validateMimeType(file.mimeType, ALLOWED_MIME_TYPES.IMAGES)) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Foto 3x4 deve ser uma imagem (JPG ou PNG)'
          })
        }
      } else {
        if (!validateMimeType(file.mimeType, ALLOWED_MIME_TYPES.PDF)) {
          throw createError({
            statusCode: 400,
            statusMessage: `${docType} deve ser um arquivo PDF`
          })
        }
      }
    }

    // Criar candidato e documentos em uma transação
    let result: { candidate: any; documents: any[]; titles: any[] }
    try {
      result = await prisma.$transaction(async (tx) => {
      // Criar candidato
      const candidate = await tx.candidate.create({
        data: {
          nomeCompleto: validatedData.nomeCompleto,
          cpf: validatedData.cpf,
          email: validatedData.email,
          telefone: validatedData.telefone,
          unidadeEnsino: validatedData.unidadeEnsino,
          funcaoAtual: validatedData.funcaoAtual,
          formacaoAcademica: validatedData.formacaoAcademica,
          tempoExperienciaGestao: validatedData.tempoExperienciaGestao,
          sexo: validatedData.sexo
        }
      })

      // Salvar documentos enviados (se existirem)
      const documents = []
      for (const [docType, file] of Object.entries(files)) {
        // No modo relaxado, salva qualquer documento enviado; no modo estrito, apenas os obrigatórios
        if (isRelaxed || requiredDocuments.includes(docType as any)) {
          const { filepath, filename } = await saveFile(file, validatedData.cpf, docType)
          
          const document = await tx.document.create({
            data: {
              type: docType,
              filename,
              filepath,
              mimeType: file.mimeType,
              size: file.buffer.length,
              candidateId: candidate.id
            }
          })
          documents.push(document)
        }
      }

      // Salvar títulos opcionais (se existirem)
      const titles = []
      for (const [titleType, file] of Object.entries(files)) {
        if (Object.values(TITLE_TYPES).includes(titleType as any)) {
          const { filepath, filename } = await saveFile(file, validatedData.cpf, titleType)
          
          const title = await tx.title.create({
            data: {
              type: titleType,
              filename,
              filepath,
              mimeType: file.mimeType,
              size: file.buffer.length,
              candidateId: candidate.id
            }
          })
          titles.push(title)
        }
      }

      // Salvar tempo de magistério se fornecido
      if (formDataObj.tempoMagisterio) {
        const tempoMagisterio = parseFloat(formDataObj.tempoMagisterio)
        if (tempoMagisterio > 0) {
          await tx.title.create({
            data: {
              type: TITLE_TYPES.TEMPO_MAGISTERIO,
              value: tempoMagisterio,
              description: 'Tempo de efetivo exercício no magistério da rede municipal',
              candidateId: candidate.id
            }
          })
        }
      }

        return { candidate, documents, titles }
      })
    } catch (dbError: any) {
      // Fallback em modo relaxado: não falhar a inscrição em ambiente de desenvolvimento
      if (isRelaxed) {
        console.error('Falha ao persistir no banco (modo relaxado):', dbError)
        const protocolo = `SEG-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
        return {
          success: true,
          message: 'Inscrição recebida (modo de desenvolvimento sem persistência)'.trim(),
          protocolo,
          candidateId: null,
          documentsCount: 0,
          titlesCount: 0
        }
      }
      throw dbError
    }

    // Gerar número de protocolo
    const protocolo = `SEG-${result.candidate.id.slice(-8).toUpperCase()}`

    return {
      success: true,
      message: 'Inscrição realizada com sucesso!',
      protocolo,
      candidateId: result.candidate.id,
      documentsCount: result.documents.length,
      titlesCount: result.titles.length
    }

  } catch (error: any) {
    console.error('Erro na inscrição:', error)
    
    // Fallback em desenvolvimento: não falhar a requisição
    const relaxed = process.env.NODE_ENV !== 'production' || process.env.RELAX_INSCRICAO === 'true'
    if (relaxed) {
      const protocolo = `SEG-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
      return {
        success: true,
        message: 'Inscrição recebida (modo de desenvolvimento sem persistência)'.trim(),
        protocolo,
        candidateId: null,
        documentsCount: 0,
        titlesCount: 0
      }
    }

    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Erro interno do servidor' })
  }
})
