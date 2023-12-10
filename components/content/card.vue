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
        <input type="text" v-model="query" class="rounded-md mx-2"/>
        <button type="submit" @click.prevent="submit()">Submit</button>
        <p>{{ book }}</p>
      </form>
      <slot />
    </div>
  </div>
</template>
