<script setup lang="ts">
import type { BookAdder } from '#build/components';

const user = useSupabaseUser()
</script>

<template>
  <UCard>
    <template #header>
      <BookAdder />
    </template>
    <Bookshelf />
    <template #footer>
      test
    </template>
  </UCard>
</template>