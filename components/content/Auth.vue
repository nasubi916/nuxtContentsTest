<script setup lang="ts">
import type { Provider } from '@supabase/supabase-js';
const supabase = useSupabaseClient();
const loading = ref(false);

const signInWithOAuth = async (useProvider: Provider) => {
  const loading = ref()
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: useProvider,
      options: {
        redirectTo: 'http://localhost:3000/dashboard'
      }
    });
    if (error) throw error;

  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container flex justify-normal">
    <button @click="signInWithOAuth('github')" class="bg-blue-400 p-2 rounded-lg flex flex-row items-center">
      <img src="https://github.com/github.png" alt="github" class="w-12 h-12 rounded-full" />
      <span v-if="loading">Loading ...</span>
      <span v-else>Sign in with GitHub</span>
    </button>
    <button @click="signInWithOAuth('google')" class="bg-red-400 p-2 rounded-lg  flex flex-row items-center">
      <img src="https://github.com/google.png" alt="google" class="w-12 h-12 rounded-full" />
      <span v-if="loading">Loading ...</span>
      <span v-else>Sign in with Google</span>
    </button>
  </div>
</template>