<script lang="ts" setup>
const p = defineProps<{
  book: any
}>()

</script>

<template>
  <div>
    <UButton variant="outline" class="block w-24 h-92 text-center">
        <div class=" [writing-mode:vertical-rl] text-cool-900 text-2xl flex justify-center">
            <span class="mb-5 whitespace-nowrap truncate">{{ p.book?.summary?.title }}</span>
          <span class="whitespace-nowrap">{{ p.book?.summary?.author.split(',', 2)[0] + " " + p.book?.summary?.author.split(',', 2)[1] ??
            ""
          }}</span>
        </div>
    </UButton>
  </div>
</template>
