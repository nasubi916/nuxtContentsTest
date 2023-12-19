<script setup lang="ts">
const { userISBNs, books, getUserISBNsData, getBooksData, startSubscribe } =
  useBooks();

// 初回ロード時にデータを取得する､その後はsubscribeで更新を受け取る
onMounted(async () => {
  const initUserISBNs = await getUserISBNsData();
  userISBNs.value.push(...initUserISBNs);
  const initData = await getBooksData(
    userISBNs.value.map((data: any) => data.isbn).join(","),
  );
  books.value.push(...initData);
  startSubscribe();
});
</script>

<template>
  <div class="dark">
    <div class="flex flex-row flex-wrap items-end">
      <div v-for="book in books" :key="book.summary.ISBN">
        <BookSpine v-if="book" :book="book" />
      </div>
    </div>
  </div>
</template>
