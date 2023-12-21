<script lang="ts" setup>
const { deleteBook } = useBooks();
const p = defineProps<{
  book: UserBook;
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
  <div v-if="p.book">
    <UButton
      color=""
      label="Open"
      variant="soft"
      class="w-12 bg-primary text-center"
      @click="isOpen = true"
    >
      <div
        class="[writing-mode:vertical-rl] flex flex-row max-h-[450px] min-h-[300px]"
      >
        <span
          class="mt-3 mb-5 truncate font-bold text-2xl max-w-fit max-h-fit"
          >{{ p.book.book_data?.title }}</span
        ><span class="text-xl m-auto mb-3 whitespace-nowrap">
          {{ p.book.book_data?.author }}</span
        >
        <span class="text-xs items-center whitespace-nowrap">
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
