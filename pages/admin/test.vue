<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">Teste de Login</h1>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <p>Se você está vendo esta página, o login funcionou!</p>
        <p class="mt-2">Cookies: {{ cookies }}</p>
        
        <button @click="testLogin" class="btn-primary mt-4">
          Testar Login
        </button>
        
        <button @click="logout" class="btn-secondary mt-4 ml-2">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta
definePageMeta({
  title: 'Teste de Login'
})

const cookies = ref('')

const testLogin = async () => {
  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin123'
      }
    })
    
    console.log('Login response:', response)
    alert('Login realizado com sucesso!')
    
    // Recarregar página para ver cookies
    window.location.reload()
    
  } catch (error) {
    console.error('Erro no login:', error)
    alert('Erro no login: ' + error.data?.statusMessage)
  }
}

const logout = () => {
  // Limpar cookies
  document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'admin-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  
  alert('Logout realizado!')
  window.location.reload()
}

onMounted(() => {
  cookies.value = document.cookie
})
</script>
