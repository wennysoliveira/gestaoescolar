export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  try {
    const headers = process.server ? useRequestHeaders(['cookie']) : undefined
    await $fetch('/api/admin/session', {
      method: 'GET',
      credentials: 'include',
      headers
    })
  } catch (err) {
    return navigateTo('/admin/login')
  }
})
