// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-10-28',
  runtimeConfig: {
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET || 'sua-chave-secreta-padrao',
    adminDefaultUser: process.env.ADMIN_DEFAULT_USER || 'admin',
    adminDefaultPass: process.env.ADMIN_DEFAULT_PASS || 'admin123',
    uploadDir: process.env.UPLOAD_DIR || './uploads',
    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api'
    }
  }
})
