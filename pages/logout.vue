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
        <div class="flex flex-col justify-center items-center">
          <UButton color="primary" :loading="loading" @click="logout">
            <span> 本当にログアウトしますか? </span>
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
