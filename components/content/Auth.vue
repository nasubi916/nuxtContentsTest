<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container w-1/2">
    <form class="border-2 border-gray-600 bg-gray-400" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <p class="text-lg">Supabase + Nuxt 3</p>
        <p>Sign in via magic link with your email below</p>
        <div>
          <input type="email" placeholder="Your email" v-model="email" />
          <input type="submit" class="border-2 border-blue-600 bg-blue-400 rounded-lg m-1"
            :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
        </div>
      </div>
    </form>
  </div>
</template>