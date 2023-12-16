<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div> 
    <p class="text-2xl font-bold">本棚</p>
    <Bookshelf/>
  </div>
</template>