<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const books = ref<string[]>([])
const loading = ref<boolean>(false)

// user.value?.idに一致するデータをsupabaseから取得する
const { data: userIsbnRelationData } = await useAsyncData('userIsbnRelation', async () => {
  const { data, error } = await client
    .from('userIsbnRelation')
    .select("*")
  if (error) throw error
  return data
})
// userIsbnRelationData.valueに一致するデータをopenDBから取得する
onMounted(async () => {
  try {
    const { data, pending, error, refresh } = await useFetch("v1/get", {
      method: 'GET',
      baseURL: "https://api.openbd.jp",
      params: {
        isbn: userIsbnRelationData.value?.map((d: any) => d.isbn)
      }
    })
    if (error.value) throw error.value
    console.log(data.value[0])
    books.value.push(data.value[0])
  } catch (e) {
    console.log(e)
  }
})
// user.value?.idをキーにしてデータを登録する
// const addBook = async () => {
//   loading.value = true
//   let { data } = await useAsyncData('userIsbnRelation', async () => {
//     const { data, error } = await client
//       .from('userIsbnRelation')
//       .insert({
//         user_id: user.value?.id,
//         isbn: "9784150413378"
//       })
//       .select("isbn")
//       .single()
//     if (error) throw error
//     console.log("1", data, user.value?.id)
//   })
//   console.log("2", data, user.value?.id)

//   loading.value = false

//   return data
// }

</script>
<template>
  <div class="dark">
    userISBNRelationData: {{userIsbnRelationData }}
    <!-- <form @submit.prevent="addBook()" class="flex flex-row">
      <input type="text" class="border rounded p-2" />
      <button type="submit" class="bg-blue-400 p-2 rounded-lg flex flex-row items-center">
        <span>本を追加</span>
      </button>
    </form> -->
    <div class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <div class="p-2 w-40 border bg-white dark:bg-gray-400 rounded">
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
      <p>
        {{ book?.onix }}
      </p>
      <p>-----------------------------------------------</p>
    </div>
  </div>
</template>