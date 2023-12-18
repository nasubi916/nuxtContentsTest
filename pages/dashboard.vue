<script setup lang="ts"></script>

<template>
  <UCard>
    <template #header>
      <p class="text-2xl text-cool">Dashboard</p>
      <div class="flex justify-between">
        <BookSearcher />
        <BookAdder />
      </div>
    </template>
    <BookShelf />
    <template #footer> test </template>
  </UCard>
</template>
