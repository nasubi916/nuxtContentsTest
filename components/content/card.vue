<!-- components/content/Card.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const query = ref()
const book = ref()

const submit = async () => {
  const { data, pending, error, refresh } = await useFetch(`get?isbn=${query.value}`, {
    method: 'GET',
    baseURL: "https://api.openbd.jp/v1",
  })
  console.log(data.value)
  if (error.value) {
    console.log(error.value)
  }
  book.value = data.value
  return data.value
}
</script>

<template>
  <div class="dark">
    <div class="p-2 border bg-white dark:bg-gray-400 rounded">
      <form>
        <input type="text" v-model="query" class="rounded-md mx-2" />
        <button type="submit" @click.prevent="submit()">Submit</button>
      </form>
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
      <slot />
    </div>
  </div>
</template>
