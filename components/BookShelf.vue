<script setup lang="ts">
const { userISBNs, getUserISBNsData, startSubscribe } = useBooks();

// 初回ロード時にデータを取得する､その後はsubscribeで更新を受け取る
onMounted(async () => {
  const initUserISBNs = await getUserISBNsData();
  userISBNs.value = initUserISBNs;
  // 必要なデータを登録時に､DBに保存したのでAPIにリクエストを送る必要がない
  // userISBNs配列に対応する本のデータをbooks配列に格納する
  // const initData = await getBooksData(
  //   initUserISBNs.map((data: any) => data.isbn).join(","),
  // );
  // userISBNs.value = initUserISBNs.map((userISBN: any) => {
  //   const book = initData.find((book: any) => book.isbn === userISBN.isbn);
  //   return {
  //     ...userISBN,
  //     book_data: book,
  //   };
  // });
  startSubscribe();
});
</script>

<template>
  <div class="dark">
    <div class="absolute bottom-0 flex flex-row items-end h-5/6">
      <div v-for="book in userISBNs" :key="book.id">
        <BookSpine v-if="book" :book="book" />
      </div>
    </div>
  </div>
</template>
