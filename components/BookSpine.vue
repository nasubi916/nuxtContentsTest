<script lang="ts" setup>
const { deleteBook } = useBooks();
const p = defineProps<{
  book: UserBooks;
}>();
const isOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
});

const deleteBookWrapper = async (id: string) => {
  loading.value = true;
  await deleteBook(id);
  setTimeout(() => {
    loading.value = false;
    isOpen.value = false;
  }, 1000);
};
</script>

<template>
  <div v-if="p.book" class="w-12 max-h-[300px] min-h-[300px] text-center">
    <UButton
      label="Open"
      variant="solid"
      class="w-12 h-92 text-center"
      @click="isOpen = true"
    >
      <div class="[writing-mode:vertical-rl] flex flex-row w-full h-full">
        <span
          class="mt-3 mb-5 truncate font-bold text-2xl max-w-fit max-h-fit"
          >{{ p.book.book_data?.title }}</span
        ><span class="text-xl m-auto mb-3 whitespace-nowrap">
          {{ p.book.book_data?.author }}</span
        >
        <span class="text-xs items-center mb-3 whitespace-nowrap">
          {{ p.book.book_data?.label }}
        </span>
      </div>
    </UButton>
    <UModal v-model="isOpen">
      <BookModal :book="p.book">
        <UButton
          :loading="loading"
          icon="i-heroicons-trash"
          variant="outline"
          @click="deleteBookWrapper(p.book.id)"
        />
      </BookModal>
    </UModal>
  </div>
</template>
