export const useBooks = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const user_ISBNs = ref([])//!型宣言しよね
  const books = ref([])//!型宣言しよね

  const getUser_ISBNsData = async () => {
    const { data, error } = await client
      .from('users_isbn')
      .select("*")
    if (error) throw error
    return data
  }

  const getBooksData = async (ISBNs: string) => {
    // 1000件以上登録されている場合は1000件までに制限する (openDBのAPI制限)
    if (ISBNs.split(",").length > 1000) ISBNs = ISBNs.split(",").slice(0, 1000).join(",")
    const { data, error } = await useFetch("/api/openDB", {
      method: 'GET',
      params: {
        isbn: ISBNs
      }
    })
    if (error.value) throw new Error(error.value.message)
    return data.value
  }

  // subscribeしている情報が変更された時､openDBにfetchしてbooksに追加する
  const handleInserts = async (payload) => {
    const { data, error } = await useFetch("/api/openDB", {
      method: 'GET',
      params: {
        isbn: payload.new.isbn
      }
    })
    if (error.value) throw error.value
    user_ISBNs.value.push(payload.new)
    books.value.push(...data.value)
  }

  // supabaseのusers_isbnテーブルの変更をsubscribeする
  const startSubscribe = () => {
    client
      .channel('users_isbn')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'users_isbn',
      }, handleInserts)
      .subscribe((status) => {
        if (status === "SUBSCRIBED") console.log("started subscribe!!!")
      })
  }

  // user.value?.idをキーにしてデータを登録する
  const addBook = async (newIsbn: string | undefined) => {
    // 既に登録済みの場合は登録しない //!機能してない
    if (user_ISBNs.value.map((book) => { return book.isbn }).includes(newIsbn)) return

    const { data, error } = await client
      .from('users_isbn')
      .insert({
        user_id: user.value?.id,
        isbn: newIsbn
      })
      .select("id,user_id,isbn,created_at")
      .single()
    if (error) throw error
    return data
  }

  return {
    user_ISBNs,
    books,
    getUser_ISBNsData,
    getBooksData,
    startSubscribe,
    addBook
  }
}
