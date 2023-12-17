<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="justify-start bg-primary-400 p-2 flex items-center">
      <p class="font-extrabold text-3xl text-white">Virtual Bookshelf</p>
      <UIcon name="i-heroicons-book-open-20-solid" class="w-full h-full" />
      <AccountMenu class="mr-2" />
    </nav>
    <slot />
  </div>
</template>