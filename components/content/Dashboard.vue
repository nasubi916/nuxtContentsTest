<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="container">
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>