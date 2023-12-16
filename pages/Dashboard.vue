<script setup lang="ts">
import type { BookAdder } from '#build/components';

const user = useSupabaseUser()
</script>

<template>
  <div>
    <p class="text-2xl font-bold">本棚</p>
    <BookAdder />
    <BarcodeReader />
    <Bookshelf />
  </div>
</template>