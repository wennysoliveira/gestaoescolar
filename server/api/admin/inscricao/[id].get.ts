import { prisma } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  try {
    // Verificar autenticação
    const session = getCookie(event, 'admin-session')
    if (!session || session !== 'true') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Não autorizado'
      })
    }

    const candidateId = getRouterParam(event, 'id')
    
    if (!candidateId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do candidato é obrigatório'
      })
    }

    // Buscar candidato com todos os dados relacionados
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        documents: {
          orderBy: { uploadedAt: 'asc' }
        },
        titles: {
          orderBy: { uploadedAt: 'asc' }
        },
        managementPlan: true,
        resources: {
          orderBy: { submittedAt: 'desc' }
        }
      }
    })

    if (!candidate) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Candidato não encontrado'
      })
    }

    // Calcular pontuação detalhada
    let score = 0
    const scoreDetails = {
      formacao: 0,
      tempoMagisterio: 0,
      experienciaGestao: 0,
      cursosFormacao: 0,
      total: 0
    }

    // Pontuação por formação acadêmica
    if (candidate.formacaoAcademica === 'Doutorado') {
      scoreDetails.formacao = 15
      score += 15
    } else if (candidate.formacaoAcademica === 'Mestrado') {
      scoreDetails.formacao = 10
      score += 10
    } else if (candidate.formacaoAcademica === 'Especialização') {
      scoreDetails.formacao = 5
      score += 5
    }

    // Pontuação por tempo de magistério
    const tempoMagisterio = candidate.titles.find(t => t.type === 'tempo_magisterio')?.value || 0
    scoreDetails.tempoMagisterio = Math.min(tempoMagisterio, 20)
    score += scoreDetails.tempoMagisterio

    // Pontuação por experiência em gestão
    const experienciaGestao = candidate.titles.find(t => t.type === 'experiencia_gestao')?.value || 0
    scoreDetails.experienciaGestao = Math.min(experienciaGestao * 3, 30)
    score += scoreDetails.experienciaGestao

    // Pontuação por cursos de formação
    const cursosFormacao = candidate.titles.filter(t => t.type === 'cursos_formacao').length
    scoreDetails.cursosFormacao = Math.min(cursosFormacao, 20)
    score += scoreDetails.cursosFormacao

    scoreDetails.total = score

    return {
      success: true,
      data: {
        ...candidate,
        scoreDetails
      }
    }

  } catch (error: any) {
    console.error('Erro ao buscar detalhes do candidato:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
