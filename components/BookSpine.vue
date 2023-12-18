<script lang="ts" setup>
const { deleteBook } = useBooks();
const p = defineProps<{
  book: BookResponse;
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
  <div>
    <UButton
      label="Open"
      variant="outline"
      class="block w-24 h-92 text-center"
      @click="isOpen = true"
    >
      <div
        class="[writing-mode:vertical-rl] text-cool-900 text-2xl flex justify-center"
      >
        <span class="mb-5 whitespace-nowrap truncate">{{
          p.book?.summary?.title
        }}</span>
        <span class="whitespace-nowrap">{{
          p.book?.summary?.author.split(",", 2)[0] +
            " " +
            p.book?.summary?.author.split(",", 2)[1] ?? ""
        }}</span>
      </div>
    </UButton>
    <UModal v-model="isOpen">
      <div class="p-4">
        <UButton
          :loading="loading"
          icon="i-heroicons-trash"
          variant="outline"
          class="float-right"
          @click="deleteBookWrapper(p.book.onix.recordReference)"
        />
        <p>
          {{ book?.onix }}
        </p>
      </div>
    </UModal>
  </div>
</template>
