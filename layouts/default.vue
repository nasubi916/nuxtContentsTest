<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="flex justify-start m-2">
      <NuxtLink to="/" class="p-3 border bg-blue-400 dark:bg-gray-400 rounded">Home</NuxtLink>
      <NuxtLink to="/about" class="p-3 order bg-red-400 dark:bg-gray-400 rounded">About</NuxtLink>
      <Account class="ml-auto mr-2" />
    </nav>
    <slot />
  </div>
</template>