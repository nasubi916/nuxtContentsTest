<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const isSpine = ref<boolean>(false)
const user_ISBNs = ref<string[]>([])
const books = ref<string[]>([])

// subscribeしている情報が変更された時､openDBにfetchしてbooksに追加する
const handleInserts = async (payload: any) => {
  user_ISBNs.value.push(payload.new)
  const { data: openDBData, error: openDBError } = await useFetch("/api/openDB", {
    method: 'GET',
    params: {
      isbn: payload.new.isbn
    }
  })
  if (openDBError.value) throw openDBError.value
  books.value.push(...openDBData.value)
}
// supabaseのusers_isbnテーブルに変更を監視する
client
  .channel('users_isbn')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'users_isbn',
  }, handleInserts)
  .subscribe((status) => {
    if (status === "SUBSCRIBED") console.log("started subscribe")
  })

// 初回ロード時にuser.value?.idに一致するデータをsupabaseから取得し､一致するデータをopenDBから取得する
onMounted(async () => {
  const { data: usersIsbnData, error: userIsbnError } = await client
    .from('users_isbn')
    .select("*")
  if (userIsbnError) throw userIsbnError
  user_ISBNs.value.push(...usersIsbnData)

  // 1000件以上登録されている場合は1000件までに制限する (openDBのAPI制限)
  if (user_ISBNs.value.length > 1000) user_ISBNs.value = user_ISBNs.value.slice(0, 1000)
  const { data: openDBData, error: openDBError } = await useFetch("/api/openDB", {
    method: 'GET',
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
    <UToggle color="primary" v-model="isSpine" size="2xl" />
    <div v-if="isSpine" class="flex flex-row flex-wrap items-end">
      <div v-for="book in books">
        <div v-if="book" class="block w-12 h-92">
          <div class="border-2 bg-primary-200">
            <div class=" [writing-mode:vertical-rl] text-gray-900 text-2xl flex">
              <div class="block">
                <span class="mb-5">{{ book?.summary?.title }}</span>
              </div>
              <span class="">{{ book?.summary?.author.split(',', 2)[0] + " " + book?.summary?.author.split(',', 2)[1] ??
                ""
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-row flex-wrap items-end">
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