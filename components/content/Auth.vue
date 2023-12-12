<script setup>
const supabase = useSupabaseClient();

const loginWithGithub = async () => {
  const loading = ref()
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false;
  }
};
const loginWithGoogle = async () => {
  const loading = ref()
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container flex justify-normal">
    <button @click="loginWithGithub()" class="bg-blue-400 p-2 rounded-lg flex flex-row items-center">
      <img src="https://github.com/github.png" alt="github" class="w-12 h-12 rounded-full" />
      <span v-if="loading">Loading ...</span>
      <span v-else>Sign in with GitHub</span>
    </button>
    <button @click="loginWithGoogle()" class="bg-red-400 p-2 rounded-lg  flex flex-row items-center">
      <img src="https://github.com/google.png" alt="google" class="w-12 h-12 rounded-full" />
      <span v-if="loading">Loading ...</span>
      <span v-else>Sign in with Google</span>
    </button>
  </div>
</template>