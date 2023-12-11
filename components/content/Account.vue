<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container w-1/2">
    <form  class="border-2 border-gray-600 bg-gray-400" @submit.prevent="updateProfile">
      <div class="m-1">
        <label for="email">Email: </label>
        <input class="border-2 border-gray-600 bg-gray-400" type="text" :value="user.email" disabled />
      </div>
      <div class="m-1">
        <label for="username">Username: </label>
        <input class="border-2 border-gray-600 bg-gray-400" type="text" v-model="username" />
      </div>

      <div>
        <input type="submit" class="border-2 border-blue-600 bg-blue-400 rounded-lg m-1"
          :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
        <button class="border-2 border-blue-600 bg-blue-400 rounded-lg m-1" @click="signOut" :disabled="loading">Sign
          Out</button>
      </div>

    </form>
  </div>
</template>