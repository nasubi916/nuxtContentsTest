<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);
const dropBox = ref(false)
const loading = ref(false)

const logout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await navigateTo('/');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="rounded flex flex-row items-center bg-white">
    <button @click="dropBox = !dropBox">
      <img v-if="user" :src="profile" class="rounded-full w-12 h-12 border-2 border-blue-400" />
      <img v-else src="https://picsum.photos/48/48" class="rounded-full w-12 h-12 border-2 border-blue-400" />
    </button>
    <div v-if="dropBox"
      class="absolute top-16 right-0 mx-3 w-48 bg-white rounded-lg shadow-xl border-2 border-b-2 border-gray-600">
      <div v-if="user" class="flex flex-col items-center justify-center">
        <p class="text-lg font-bold text-blue-600 dark:text-gray-400">{{ name }}</p>
        <div class="border-b-2 border-gray-600 w-full"></div>
        <NuxtLink @click="dropBox = !dropBox" to="/dashboard"
          class="bg-blue-400 hover:bg-blue-500 p-2 text-center w-full h-full">
          <span>Dashboard</span>
        </NuxtLink>
        <div class="border-b-2 border-gray-600 w-full"></div>
        <button @click="logout(), dropBox = !dropBox"
          class="bg-blue-400 hover:bg-blue-500 p-2 items-center w-full h-full">
          <span v-if="loading">Loading ...</span>
          <span v-else>Logout</span>
        </button>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <p class="text-lg font-bold text-blue-600 dark:text-gray-400">please login</p>
        <div class="border-b-2 border-gray-600 w-full"></div>
        <NuxtLink @click="dropBox = !dropBox" to="/login"
          class="bg-blue-400 hover:bg-blue-500 p-2 text-center w-full h-full">
          <span>Login</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>