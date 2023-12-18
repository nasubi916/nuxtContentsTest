<script setup lang="ts">
const { user_ISBNs, books, getUser_ISBNsData, getBooksData, startSubscribe } = useBooks()

const isSpine = ref<boolean>(true)

// 初回ロード時にデータを取得する､その後はsubscribeで更新を受け取る
onMounted(async () => {
  const initUser_ISBNs = await getUser_ISBNsData()
  user_ISBNs.value.push(...initUser_ISBNs)
  const initData = await getBooksData(user_ISBNs.value.map((data: any) => data.isbn).join(","))
  books.value.push(...initData)
  startSubscribe()
})
</script>

<template>
  <div class="dark">
    <UToggle color="primary" v-model="isSpine" size="2xl" />
    <div v-if="isSpine" class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <Book :book="book" v-if="book"/>
      </div>
    </div>

    <div v-else class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <div class="p-1"></div>
        <div v-if="book" class="p-2 w-40 h-56 border bg-white dark:bg-gray-400 rounded">
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
  </div>
</template>