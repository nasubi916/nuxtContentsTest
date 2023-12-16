<script setup lang="ts">
import type { BookAdder } from '#build/components';

const user = useSupabaseUser()
</script>

<template>
  <div class="flex flex-col">
    <p class="text-2xl font-bold">本棚</p>
    <BookAdder />
    <Bookshelf />
  </div>
</template>