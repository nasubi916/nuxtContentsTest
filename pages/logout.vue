<script setup lang="ts" >
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);
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
  <div>
    <button @click="logout">本当にログアウトしますか?</button>
  </div>
</template>
