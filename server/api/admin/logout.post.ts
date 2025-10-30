import { SESSION_COOKIE_NAME } from '~/server/utils/sessionStore'

export default defineEventHandler(async (event) => {
  deleteCookie(event, SESSION_COOKIE_NAME, { path: '/' })
  return { success: true }
})


