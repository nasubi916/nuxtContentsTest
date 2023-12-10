<script lang="ts" setup>
import booksJSON from "~/assets/data/books.json"
const books = ref([])


booksJSON.ISBN.forEach(async(isbn: string) => {
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
  <div v-for="book in books">
    {{ "ISBN: " + book?.isbn }}
    {{ "タイトル: " + book?.title }}
    {{ "著者: " + book?.author}}
  </div>
</template>