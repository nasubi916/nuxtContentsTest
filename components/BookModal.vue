<script lang="ts" setup>
const p = defineProps<{
  book: UserISBN;
}>();
</script>
<template>
  <div>
    <div class="p-4">
      <slot />
      <div class="flex">
        <div class="flex flex-col justify-between">
          <img src="https://picsum.photos/200/300" alt="book" class="mb-1" />
          <UDivider class="my-1" />
          <div class="flex flex-row gap-2">
            <UButton icon="i-heroicons-bookmark-20-solid" variant="outline" />
            <UButton icon="i-heroicons-book-open-20-solid" variant="outline" />
            <div class="flex flex-row justify-between items-center">
              <UIcon name="i-heroicons-star-20-solid" variant="outline" />
              <UIcon name="i-heroicons-star-20-solid" variant="outline" />
              <UIcon name="i-heroicons-star-20-solid" variant="outline" />
              <UIcon name="i-heroicons-star-20-solid" variant="outline" />
              <UIcon name="i-heroicons-star-20-solid" variant="outline" />
            </div>
          </div>
        </div>
        <div class="p-1"></div>
        <div class="flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-2xl">{{ p.book.book_data.title }}</span>
            <span class="text-xl">著者: {{ p.book.book_data.author }}</span>
            <span class="text-xl">レーベル: {{ p.book.book_data.label }}</span>
            <span class="text-xl"
              >出版社: {{ p.book.book_data.publisher }}</span
            >
            <span class="text-xl">出版日: {{ p.book.book_data?.date }}</span>
            <span class="text-xl">定価: {{ p.book.book_data?.price }}円</span>
          </div>
          <div class="flex flex-col gap-2">
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
    </div>
  </div>
</template>
