<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="flex justify-start">
      <NuxtLink to="/" class="p-2 border bg-blue-400 dark:bg-gray-400 rounded">Home</NuxtLink>
      <NuxtLink to="/about" class="p-2 border bg-red-400 dark:bg-gray-400 rounded">About</NuxtLink>
      <Account class="ml-auto mr-2" />
    </nav>
    <slot />
  </div>
</template>