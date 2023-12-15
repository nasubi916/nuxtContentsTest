<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const books = ref<string[]>([])
const newIsbn = ref<string>()
const loading = ref<boolean>(false)

// user.value?.idに一致するデータをsupabaseから取得する
const { data: users_isbn } = await useAsyncData('users_isbn', async () => {
  const { data, error } = await client
    .from('users_isbn')
    .select("*")
  if (error) throw error
  return data
})
// users_isbn.valueに一致するデータをopenDBから取得する
onMounted(async () => {
  try {
    if (!users_isbn.value) return
    const { data, pending, error, refresh } = await useFetch("v1/get", {
      method: 'GET',
      baseURL: "https://api.openbd.jp",
      params: {
        isbn: users_isbn.value.map((isbn: any) => isbn.isbn).join(",")
      }
    })
    if (error.value) throw error.value
    books.value.push(...data.value)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
})
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
  if (users_isbn.value?.some((isbn: any) => isbn.isbn === newIsbn.value)) return

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
  <div class="dark">
    <form @submit.prevent="addBook" class="flex flex-row">
      <input type="text" v-model="newIsbn" class="border rounded p-2" />
      <button type="submit" class="bg-blue-400 p-2 rounded-lg flex flex-row items-center">
        <span>本を追加</span>
      </button>
    </form>
    <div class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <div v-if="book" class="p-2 w-40 border bg-white dark:bg-gray-400 rounded">
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

    <div v-for="book in books">
      <p v-if="book">
        {{ book?.onix }}
      </p>
      <p>-----------------------------------------------</p>
    </div>
  </div>
</template>