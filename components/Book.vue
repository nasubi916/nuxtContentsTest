<script lang="ts" setup>
const { user_ISBNs, books, getUser_ISBNsData, getBooksData, startSubscribe, deleteBook } = useBooks()
const p = defineProps<{
  book: any
}>()
const isOpen = ref<boolean>(false)
const loading = ref<boolean>(false)

const deleteBookWrapper = async (id: number) => {
  loading.value = true
  await deleteBook(id)
  setTimeout(() => {
    loading.value = false
    isOpen.value = false
  }, 1000);
}

</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" variant="outline" class="block w-24 h-92 text-center">
      <div class=" [writing-mode:vertical-rl] text-cool-900 text-2xl flex justify-center">
        <span class="mb-5 whitespace-nowrap truncate">{{ p.book?.summary?.title }}</span>
        <span class="whitespace-nowrap">{{ p.book?.summary?.author.split(',', 2)[0] + " " +
          p.book?.summary?.author.split(',', 2)[1] ??
          ""
        }}</span>
      </div>
    </UButton>
    <UModal v-model="isOpen">
      <div class="p-4">
        <UButton @click="deleteBookWrapper(p.book.id)" :loading="loading" icon="i-heroicons-trash" variant="outline"
          class="float-right" />
        <p>
          {{ book?.onix }}
        </p>
      </div>
    </UModal>
  </div>
</template>
