<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="container">
    <div v-if="user">
      <Account />
      <Bookshelf />
    </div>
    <Auth v-else />
  </div>
</template>