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
  <div>
    <button @click="logout">本当にログアウトしますか?</button>
  </div>
</template>
