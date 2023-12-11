<script setup lang="ts">
</script>

<template>
  <div>
    <!-- ナビゲーションバーを作る -->
    <nav class="flex justify-start">
      <NuxtLink to="/" class="p-2 border bg-white dark:bg-gray-400 rounded">Home</NuxtLink>
      <NuxtLink to="/about" class="p-2 border bg-white dark:bg-gray-400 rounded">About</NuxtLink>
      <NuxtLink to="/dashboard" class="ml-auto mr-3 p-2 border bg-white dark:bg-gray-400 rounded">Dashboard</NuxtLink>
    </nav>
    <slot />
  </div>
</template>