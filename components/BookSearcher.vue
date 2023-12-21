<script setup lang="ts">
const search = ref<string>("");
const selectedStatus = ref<string[]>([]);
const todoStatus = [
  { label: "積読", value: "unread" },
  { label: "読書中", value: "reading" },
  { label: "読了", value: "read" },
];
</script>

<template>
  <div>
    search...
    <div class="flex items-center justify-between gap-3 px-4 pt-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Search..."
      />
      <USelectMenu
        v-model="selectedStatus"
        :options="todoStatus"
        multiple
        placeholder="filter"
        class="w-40"
      />
    </div>
  </div>
</template>
