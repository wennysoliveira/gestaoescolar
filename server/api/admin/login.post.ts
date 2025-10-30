import { createSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '~/server/utils/sessionStore'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, username, password } = body || {}

    if ((!email && !username) || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Usuário e senha são obrigatórios'
      })
    }

    const validUsername = 'admin'
    const validPassword = 'sr102030@'

    const isUserOk = (username && username === validUsername) || (email && email === validUsername)
    if (!isUserOk || password !== validPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciais inválidas'
      })
    }

    const sessionId = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    createSession(sessionId, validUsername)

    setCookie(event, SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
      secure: process.env.NODE_ENV === 'production'
    })

    return { success: true }
  } catch (error: any) {
    if (error?.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Erro interno do servidor' })
  }
})
