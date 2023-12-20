<script setup lang="ts">
const push = usePush();
const { addBook, getUserISBNsData } = useBooks();
const inputISBN = ref<string>();
const loading = ref<boolean>(false);

// user.value?.idをキーにしてデータを登録する
const addBookWrapper = async (newISBN: string | undefined) => {
  // ISBNの形式チェック
  if (newISBN === undefined)
    return push.error({ message: "ISBNが入力されていません" });
  if (!newISBN.match(/^[0-9-]+$/))
    return push.error({ message: "ISBNは数値とハイフンのみです" });
  if (newISBN.length !== 10 && newISBN.length !== 13)
    return push.error({ message: "ISBNは10桁か13桁です" });
  // 既に登録されているかどうかのチェック
  const userISBNs = await getUserISBNsData();
  if (userISBNs.find((userISBN: any) => userISBN.isbn === newISBN))
    return push.error({ message: "ISBNは既に登録されています" });

  // 本のデータを登録する
  loading.value = true;
  await addBook(newISBN);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="dark flex justify-end">
    <form
      :disable="loading"
      class="flex flex-row"
      @submit.prevent="addBookWrapper(inputISBN)"
    >
      <UFormGroup label="ISBN" required>
        <UInput
          v-model="inputISBN"
          variant="outline"
          placeholder="input ISBN"
          autocomplete="off"
          name="newIsbn"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="inputISBN !== undefined"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="inputISBN = undefined"
            />
          </template>
        </UInput>
      </UFormGroup>
      <UButton
        :loading="loading"
        type="submit"
        class="bg-blue-400 p-2 rounded-lg flex flex-row items-center"
      >
        <span>本を登録</span>
      </UButton>
      <!-- <BarcodeReader /> -->
    </form>
  </div>
</template>
