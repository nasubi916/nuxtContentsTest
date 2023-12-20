<script lang="ts" setup>
const { reloadBook } = useBooks();
const p = defineProps<{
  book: UserBooks;
}>();

const isOpen = ref<boolean>(false);
const loading = ref<boolean>(false);

const reloadBookDataWrapper = async (userBooks: UserBooks) => {
  loading.value = true;
  await reloadBook(userBooks);
  setTimeout(() => {
    isOpen.value = false;
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div>
    <div class="p-4">
      <slot />
      <div class="flex">
        <img
          src="https://picsum.photos/200/300"
          alt="book"
          class="mb-1 w-48 h-72 rounded-md shadow-md"
        />
        <div class="p-3"></div>
        <div class="flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-3xl">{{ p.book.book_data.title }}</span>
            <span class="text-xl">著者: {{ p.book.book_data.author }}</span>
            <div class="flex flex-col my-5">
              <span class="text-lg"
                >レーベル: {{ p.book.book_data.label }}</span
              >
              <span class="text-lg"
                >出版社: {{ p.book.book_data.publisher }}</span
              >
              <span class="text-lg">出版日: {{ p.book.book_data?.date }}</span>
              <span class="text-lg">定価: {{ p.book.book_data?.price }}円</span>
            </div>
            <span v-if="p.book.book_data.page === 0" class="text-xl"
              >ページ数: 不明</span
            >
            <span v-else class="text-xl"
              >ページ数: {{ p.book.book_data.page }}ページ</span
            >
            <span class="text-sm">ISBN: {{ p.book.book_data?.isbn }}</span>
          </div>
        </div>
      </div>
      <UDivider class="my-1" />
      <div class="flex flex-row gap-2">
        <div class="flex flex-row justify-between items-center">
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
        </div>
        <div class="flex flex-row ml-auto gap-x-2">
          <UButton
            icon="i-heroicons-arrow-path-rounded-square-20-solid"
            variant="outline"
            @click="isOpen = true"
          />
          <UModal v-model="isOpen">
            <UCard>
              <p class="text-xl text-yellow-500 p-1">確認 情報を初期化します</p>
              <UButton :loading="loading" @click="reloadBookDataWrapper(book)">
                更新する
              </UButton>
            </UCard>
          </UModal>
          <UButton icon="i-heroicons-pencil-square-solid" variant="outline" />
          <UButton icon="i-heroicons-bookmark" variant="outline" />
          <UButton icon="i-heroicons-book-open" variant="outline" />
        </div>
      </div>
    </div>
  </div>
</template>
