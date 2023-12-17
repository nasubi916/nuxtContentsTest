<script setup lang="ts">
const { addBook } = useBooks()
const inputISBN = ref<string>()
const loading = ref<boolean>(false)

//!連続登録やめろ
// user.value?.idをキーにしてデータを登録する
const addBookWrapper = async (newIsbn: string | undefined) => {
  // ISBNの形式チェック
  if (newIsbn === undefined || newIsbn.length !== 13 || !newIsbn.match(/^[0-9]+$/)) return
  loading.value = true
  addBook(newIsbn)
  loading.value = false
}
</script>

<template>
  <div class="dark flex justify-end">
    <form @submit.prevent="addBookWrapper(inputISBN)" class="flex flex-row">
      <UFormGroup label="ISBN" required>
        <UInput variant="outline" placeholder="input ISBN" autocomplete="off" v-model="inputISBN" name="newIsbn"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="inputISBN !== undefined" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
              @click="inputISBN = undefined" />
          </template>
        </UInput>
      </UFormGroup>
      <UButton :loading="loading" type="submit" class="bg-blue-400 p-2 rounded-lg flex flex-row items-center">
        <span>本を登録</span>
      </UButton>
      <!-- <BarcodeReader /> -->
    </form>
  </div>
</template>