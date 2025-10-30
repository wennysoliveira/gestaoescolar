import { destroyAdminSession, SESSION_COOKIE_NAME } from '~/server/utils/sessionStore'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME)
  destroyAdminSession(sessionId)
  deleteCookie(event, SESSION_COOKIE_NAME, { path: '/' })
  return { success: true }
})


