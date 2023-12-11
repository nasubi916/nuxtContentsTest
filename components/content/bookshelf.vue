<script lang="ts" setup>
import booksJSON from "~/assets/data/books.json"
const books = ref([])


booksJSON.ISBN.forEach(async (isbn: string) => {
  const { data, pending, error, refresh } = await useFetch(`get?isbn=${isbn}`, {
    method: 'GET',
    baseURL: "https://api.openbd.jp/v1",
  })
  if (error.value) {
    console.log(error.value)
  }
  books.value.push(data.value[0]?.summary)
})
</script>
<template>
  <div class="dark">
    <div v-for="book in books">
      <div class="p-2 border bg-white dark:bg-gray-400 rounded">
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div class="flex flex-col">
              <span class="text-xl">{{ " タイトル: " + book?.title }}</span>
              <span class="">{{ " 著者: " + book?.author }}</span>
              <span class="">{{ " ページ数: " + book?.cover }}</span>
              <span class="">{{ " ISBN: " + book?.isbn }}</span>
              <span class="">{{ " 出版社: " + book?.publisher }}</span>
              <span class="">{{ " 出版日: " + book?.pubdate }}</span>
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-col">
              <span class="">{{ " 価格: " + book?.price }}</span>
            </div>
            <div class="flex flex-col">
              <span class="">{{ " シリーズ: " + book?.series }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>