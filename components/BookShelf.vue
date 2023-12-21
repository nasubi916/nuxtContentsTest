<script setup lang="ts">
const { userISBNs, getUserISBNsData, startSubscribe } = useBooks();
const { isChip, chipColor } = useConfig();

// 初回ロード時にデータを取得する､その後はsubscribeで更新を受け取る
onMounted(async () => {
  const initUserISBNs = await getUserISBNsData();
  userISBNs.value = initUserISBNs;
  startSubscribe();
});
</script>

<template>
  <div class="dark">
    <div class="p-10"></div>
    <div class="bottom-0 flex flex-row items-end gap-1">
      <div v-for="book in userISBNs" :key="book.id">
        <UChip
          :show="isChip"
          :color="
            book.state === `yet`
              ? chipColor.yet
              : book.state === `still`
                ? chipColor.still
                : chipColor.done
          "
        >
          <BookSpine v-if="book" :book="book" />
        </UChip>
      </div>
    </div>
  </div>
</template>
