<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const dropBox = ref(false)

const name = computed(
  () => user?.value.user_metadata.full_name
);
const profile = computed(
  () => user?.value.user_metadata.avatar_url
);

const rootDashboard = async () => {
  try {
    await navigateTo('/dashboard');
  } catch (error) {
    alert(error.error_description || error.message)
  }
};
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await navigateTo('/login');
  } catch (error) {
    alert(error.error_description || error.message)
  }
};
</script>

<template>
  <div v-if="user" class="rounded p-3 flex flex-row items-center bg-white">
    <button @click="dropBox = !dropBox">
      <img class="rounded-full w-12 h-12 border-2 border-blue-400" :src="profile" />
    </button>
    <div v-if="dropBox"
      class="absolute top-16 right-0 w-48 bg-white rounded-lg shadow-xl border-2 border-b-2 border-gray-600">
      <div class="flex flex-col items-center justify-center">
        <p class="text-lg font-bold text-blue-600 dark:text-gray-400">{{ name }}</p>
        <div class="border-b-2 border-gray-600 w-full"></div>
        <button @click="rootDashboard(), dropBox = !dropBox"
          class="bg-blue-400 hover:bg-blue-500 p-2 items-center w-full h-full">
          <span>Dashboard</span>
        </button>
        <div class="border-b-2 border-gray-600 w-full"></div>
        <button @click="logout(), dropBox = !dropBox"
          class="bg-blue-400 hover:bg-blue-500 p-2 items-center w-full h-full">
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <button class="rounded-full w-12 h-12 border-2 border-blue-400">
      image
    </button>
  </div>
</template>