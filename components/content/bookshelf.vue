<script lang="ts" setup>
import booksJSON from "~/assets/data/books.json"
const books = ref([])


booksJSON.ISBN.forEach(async (isbn: string) => {
  try {
    const { data, pending, error, refresh } = await useFetch(`v1/get`, {
      method: 'GET',
      baseURL: "https://api.openbd.jp/",
      params: {
        isbn: isbn
      }
    })
    if (error.value) throw error.value
    books.value.push(data.value[0])
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <div class="dark">
    <div class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <div class="p-2 w-40 border bg-white dark:bg-gray-400 rounded">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <span class="text-xl">{{ book?.summary?.title }}</span>
              <span class="">{{ book?.summary?.author }}</span>
              <span class="">{{ book?.summary?.cover }}</span>
              <span class="">{{ book?.summary?.isbn }}</span>
              <span class="">{{ " 出版日: " + book?.summary?.pubdate }}</span>
              <span class="">{{ book?.summary?.series }}</span>
            </div>
            <div class="flex flex-row">
              <span class="">{{ book?.summary?.publisher }}</span>
              <!-- <span class="">{{ book?.summary?.price +"¥" }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-for="book in books">
      <p>
        {{ book?.onix }}
      </p>
      <p>-----------------------------------------------</p>
    </div>
  </div>
</template>