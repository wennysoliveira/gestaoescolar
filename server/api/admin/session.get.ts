import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '~/server/utils/sessionStore'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME)
  if (!sessionId) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
  }

  // Renovar validade do cookie (30 min) sem depender de store em memória
  setCookie(event, SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === 'production'
  })

  return { ok: true }
})


