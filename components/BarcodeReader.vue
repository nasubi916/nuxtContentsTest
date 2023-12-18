<script setup lang="ts">
const isbn = ref<string>();
const decodedText = ref("");
</script>

<template>
  <div>
    <p>ISBN: {{ isbn }}</p>
  </div>
</template>
