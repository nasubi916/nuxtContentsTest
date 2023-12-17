<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="justify-start bg-primary-400 p-2 flex items-center">
      <ULink to="/" class="mr-2 flex items-center">
        <UIcon name="i-heroicons-book-open" class="w-24 h-16" />
        <p class="font-extrabold text-3xl text-white">Virtual Bookshelf</p>
      </ULink>
      <UIcon name="i-heroicons-book-open" class="w-full h-full" />
      <AccountMenu class="mr-2" />
    </nav>
    <slot />
  </div>
</template>