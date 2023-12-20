<script lang="ts" setup>
const { deleteBook } = useBooks();
const p = defineProps<{
  book: UserISBN;
}>();
const isOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

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
  <div v-if="p.book" class="max-h-fit">
    <UButton
      label="Open"
      variant="solid"
      class="w-12 text-center"
      @click="isOpen = true"
    >
      <div
        class="[writing-mode:vertical-rl] text-cool-900 text-2xl flex justify-center"
      >
        <span class="mb-5 whitespace-nowrap truncate">{{
          p.book.book_data?.title
        }}</span>
        <span class="whitespace-nowrap">{{ p.book.book_data?.author }}</span>
      </div>
    </UButton>
    <UModal v-model="isOpen">
      <div class="p-4">
        <UButton
          :loading="loading"
          icon="i-heroicons-trash"
          variant="outline"
          class="left-0 top-0"
          @click="deleteBookWrapper(p.book.id)"
        />
        <p>
          {{ book.book_data }}
        </p>
      </div>
    </UModal>
  </div>
</template>
