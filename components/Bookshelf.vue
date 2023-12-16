<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const books = ref<string[]>([])
const newIsbn = ref<string>()
const user_ISBNs = ref<string[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
  // user.value?.idに一致するデータをsupabaseから取得する
  const { data: usersIsbnData, error: userIsbnError } = await client
    .from('users_isbn')
    .select("*")
  if (userIsbnError) throw userIsbnError
  user_ISBNs.value.push(...usersIsbnData)

  // users_isbn.valueに一致するデータをopenDBから取得する
  if (!user_ISBNs.value) return
  const { data: openDBData, error: openDBError } = await useFetch("v1/get", {
    method: 'GET',
    baseURL: "https://api.openbd.jp",
    params: {
      isbn: user_ISBNs.value.map((isbn: any) => isbn.isbn).join(",")
    }
  })
  if (openDBError.value) throw openDBError.value
  books.value.push(...openDBData.value)
})
</script>
<template>
  <div class="dark">
    <div class="flex flex-row flex-wrap items-end">
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

    <div v-for="book in books">
      <p v-if="book">
        {{ book?.onix }}
      </p>
      <p>-----------------------------------------------</p>
    </div>
  </div>
</template>