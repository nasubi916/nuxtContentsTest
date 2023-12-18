export const useBooks = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const user_ISBNs = ref<Users_isbn[]>([]);
  const books = ref<BookResponse[]>([]);

  const getUser_ISBNsData = async (): Promise<Users_isbn[]> => {
    const { data, error } = await client.from("users_isbn").select("*");
    if (error) throw error;
    return data as Users_isbn[];
  };

  const getBooksData = async (ISBNs: string): Promise<BookResponse[]> => {
    // 1000件以上登録されている場合は1000件までに制限する (openDBのAPI制限)
    if (ISBNs.split(",").length > 1000)
      ISBNs = ISBNs.split(",").slice(0, 1000).join(",");
    const { data, error } = await useFetch("/api/openDB", {
      method: "GET",
      params: {
        isbn: ISBNs,
      },
    });
    if (error.value) throw new Error(error.value.message);
    if (data.value === null) throw new Error("No data");
    return data.value as BookResponse[];
  };

  // subscribeしている情報が変更された時､openDBにfetchしてbooksに追加する
  const handleInserts = async (payload: PayloadUsers_isbn): Promise<void> => {
    console.log(payload);
    if (payload.eventType === "DELETE") {
      user_ISBNs.value = user_ISBNs.value.filter((book) => {
        return book.id !== payload.old.id;
      });
      return;
    }
    if (payload.eventType === "INSERT") {
      const { data, error } = await useFetch("/api/openDB", {
        method: "GET",
        params: {
          isbn: payload.new.isbn,
        },
      });
      if (error.value) throw error.value;
      if (data.value === null) throw new Error("No data");
      user_ISBNs.value.push(payload.new);
      books.value.push(...data.value);
    }
  };

  // supabaseのusers_isbnテーブルの変更をsubscribeする
  const startSubscribe = (): void => {
    client
      .channel("users_isbn")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users_isbn",
        },
        handleInserts,
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") console.log("started subscribe!!!");
      });
  };

  // user.value?.idをキーにしてデータを登録する
  const addBook = async (newIsbn: string | undefined): Promise<void> => {
    // 既に登録済みの場合は登録しない //!機能してない
    if (
      !newIsbn ||
      user_ISBNs.value
        .map((book) => {
          return book.isbn;
        })
        .includes(newIsbn)
    )
      return;

    const { error } = await client
      .from("users_isbn")
      .insert({
        user_id: user.value?.id,
        isbn: newIsbn,
      })
      .select("id,user_id,isbn,created_at")
      .single();
    if (error) throw error;
  };

  // データの削除
  const deleteBook = async (id: string) => {
    const { error } = await client.from("users_isbn").delete().eq("id", id);
    if (error) throw error;
  };

  return {
    user_ISBNs,
    books,
    getUser_ISBNsData,
    getBooksData,
    startSubscribe,
    addBook,
    deleteBook,
  };
};
