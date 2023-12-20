<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(false);
const logout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await navigateTo("/");
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="h-screen w-screen">
    <div
      class="absolute inset-0 flex justify-center items-center container mx-auto"
    >
      <UCard class="w-1/2 h-92 min-h-max">
        <p class="text-xl text-yellow-500 p-1">確認</p>
        <div class="flex flex-col justify-center items-center">
          <UButton color="primary" :loading="loading" @click="logout">
            <span> ログアウト </span>
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
