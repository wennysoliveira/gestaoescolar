import { getAdminSession, isAdminSessionExpired, touchAdminSession, destroyAdminSession, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '~/server/utils/sessionStore'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME)
  const record = getAdminSession(sessionId)

  if (!record) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
  }

  if (isAdminSessionExpired(record)) {
    destroyAdminSession(sessionId)
    deleteCookie(event, SESSION_COOKIE_NAME, { path: '/' })
    throw createError({ statusCode: 401, statusMessage: 'Sessão expirada' })
  }

  touchAdminSession(sessionId!)

  setCookie(event, SESSION_COOKIE_NAME, sessionId!, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === 'production'
  })

  return { ok: true }
})


