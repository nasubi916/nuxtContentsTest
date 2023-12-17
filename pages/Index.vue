<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <UCard>
    <p class="text-2xl font-bold">本棚</p>
      <UButton>
        <NuxtLink to="/Login">
          Log in / Sign up
        </NuxtLink>
      </UButton>
    </UCard>
  </div>
</template>
