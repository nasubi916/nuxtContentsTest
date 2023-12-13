<script setup lang="ts">
defineProps<{
  icon: { type: string, default: "svg" }
  title: { type: string, default: "title" }
  description: { type: string, default: "description" }
}>()

</script>

<template>
  <div class="p-6 border bg-white dark:bg-black dark:border-gray-700 rounded">
    {{ icon }}
    <h2 class="text-3xl font-semibold mb-2">
      {{ title }}
    </h2>
    <p>{{ description }}</p>
  </div>
</template>
