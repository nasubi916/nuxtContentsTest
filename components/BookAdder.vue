<script setup lang="ts">
import { useAsyncData } from '#imports';

const client = useSupabaseClient();
const user = useSupabaseUser();

const newIsbn = ref<string>()
const loading = ref<boolean>(false)

// user.value?.idをキーにしてデータを登録する
const addBook = async () => {
  // 未ログインの場合は登録しない
  if (!user.value?.id) return
  // 未入力の場合は登録しない
  if (!newIsbn.value) return
  // 13桁以外禁止
  if (newIsbn.value.length !== 13) return
  //数字以外禁止
  if (!newIsbn.value.match(/^[0-9]+$/)) return
  // 既に登録済みの場合は登録しない
  // if (users_isbn.value?.some((isbn: any) => isbn.isbn === newIsbn.value)) return

  // 登録処理
  loading.value = true;
  let { data } = await useAsyncData('users_isbn', async () => {
    const { data, error } = await client
      .from('users_isbn')
      .insert({
        user_id: user.value?.id,
        isbn: newIsbn.value
      })
      .select("id,user_id,isbn,created_at")
      .single()
    console.log(data, user.value?.id)
    if (error) throw error
  })

  loading.value = false
  return data
}

</script>
<template>
  <div class="dark flex justify-end">
    <form @submit.prevent="addBook" class="flex flex-row">
      <UFormGroup label="ISBN" required>
        <UInput variant="outline" placeholder="input ISBN" autocomplete="off" v-model="newIsbn" name="newIsbn"
          :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="newIsbn !== undefined" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
              @click="newIsbn = undefined" />
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