<script setup lang="ts">
const { addBook } = useBooks();
const inputISBN = ref<string>();
const loading = ref<boolean>(false);

// user.value?.idをキーにしてデータを登録する
const addBookWrapper = async (newIsbn: string | undefined) => {
  // ISBNの形式チェック
  if (
    newIsbn === undefined ||
    newIsbn.length !== 13 ||
    !newIsbn.match(/^[0-9]+$/)
  )
    return;
  loading.value = true;
  await addBook(newIsbn);
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
