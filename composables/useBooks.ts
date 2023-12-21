export const useBooks = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const userISBNs = ref<UserBook[]>([]);
  // userISBNsテーブルのデータを取得する
  const getUserISBNsData = async (): Promise<UserBook[]> => {
    const { data, error } = await client.from("user_isbn").select("*");
    if (error) throw error;
    return data as UserBook[];
  };
  // openDBにfetchしてbooksに追加する
  const getBooksData = async (ISBNs: string): Promise<BookData[]> => {
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
    // 本のデータをBookData型に変換する
    const booksData = data.value.map((book: BookResponse): BookData => {
      // 著者名の整形
      let author: string =
        book.onix.DescriptiveDetail.Contributor[0].PersonName.content;
      const authorArray = author.split(",");
      if (authorArray.length > 1)
        author = authorArray[0] + " " + authorArray[1];
      // 日付の整形
      let date: string =
        book.onix?.PublishingDetail?.PublishingDate[0]?.Date ?? "";
      date = date.slice(0, 4) + "/" + date.slice(4, 6) + "/" + date.slice(6, 8);
      if (date === "//") date = "不明";
      return {
        isbn: book.onix.RecordReference,
        title:
          book.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText
            .content,
        author,
        publisher: book.onix.PublishingDetail.Imprint.ImprintName,
        label: book.summary.series ?? "",
        date,
        price:
          book.onix?.ProductSupply?.SupplyDetail?.Price[0]?.PriceAmount ?? 0,
        page: book.onix.DescriptiveDetail?.extent?.[0]?.extentValue ?? 0,
      };
    });
    return booksData;
  };
  // subscribeしている情報が変更された時､openDBにfetchしてbooksに追加する
  const handleInserts = (payload: Payload): void => {
    if (payload.eventType === "DELETE") {
      userISBNs.value = userISBNs.value.filter((book) => {
        return book.id !== payload.old.id;
      });
    }
    if (payload.eventType === "INSERT") {
      userISBNs.value.push(payload.new);
    }
    if (payload.eventType === "UPDATE") {
      userISBNs.value = userISBNs.value.map((book) => {
        if (book.id === payload.old.id) return payload.new;
        return book;
      });
    }
  };
  // supabaseのusers_isbnテーブルの変更をsubscribeする
  const startSubscribe = (): void => {
    client
      .channel("user_isbn")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_isbn",
        },
        handleInserts,
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") console.log("started subscribe!!!");
      });
  };
  // user.value?.idをキーにしてデータを登録する
  const addBook = async (bookData: BookData): Promise<void> => {
    const { error } = await client
      .from("user_isbn")
      .insert({
        user_id: user.value?.id,
        isbn: bookData.isbn,
        book_data: bookData,
      })
      .select("id,user_id,isbn,created_at")
      .single();
    if (error) throw error;
  };
  // データの削除
  const deleteBook = async (id: string) => {
    const { error } = await client.from("user_isbn").delete().eq("id", id);
    if (error) throw error;
  };
  // データの再取得
  const reloadBook = async (userBooks: UserBook) => {
    const bookData = await getBooksData(userBooks.isbn);
    const { error } = await client
      .from("user_isbn")
      .update({ book_data: bookData[0] })
      .eq("id", userBooks.id);
    if (error) throw error;
  };
  // データの更新
  const updateBook = async (userBooks: UserBook) => {
    if (userBooks.id === "") return;
    const { error } = await client
      .from("user_isbn")
      .update({ book_data: userBooks.book_data })
      .eq("id", userBooks.id);
    if (error) throw error;
  };

  return {
    userISBNs,
    getUserISBNsData,
    getBooksData,
    startSubscribe,
    addBook,
    deleteBook,
    reloadBook,
    updateBook,
  };
};
