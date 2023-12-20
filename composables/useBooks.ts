export const useBooks = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const userISBNs = ref<UserISBN[]>([]);

  const getUserISBNsData = async (): Promise<UserISBN[]> => {
    const { data, error } = await client.from("user_isbn").select("*");
    if (error) throw error;
    return data as UserISBN[];
  };

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
    const booksData = data.value.map((book: BookResponse) => {
      return {
        isbn: book.onix.recordReference ?? "",
        title:
          book.onix.descriptiveDetail.collection.titleDetail.titleElement[0]
            .titleText.content ?? "",
        author:
          book.onix.descriptiveDetail.contributor[0].personName.content ?? "",
        publisher: book.onix.publishingDetail.publisher.publisherName ?? "",
        label: book.onix.publishingDetail.imprint.imprintName ?? "",
        date: book.onix.publishingDetail.publishingDate[0].date ?? "",
        price: book.onix.productSupply.supplyDetail.price[0].priceAmount ?? 0,
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
  const addBook = async (newIsbn: string | undefined): Promise<void> => {
    // 既に登録済みの場合は登録しない //!機能してない
    if (
      !newIsbn ||
      userISBNs.value
        .map((book) => {
          return book.isbn;
        })
        .includes(newIsbn)
    )
      return;

    // openDBから本のデータを取得
    const booksData = await getBooksData(newIsbn);

    const { error } = await client
      .from("user_isbn")
      .insert({
        user_id: user.value?.id,
        isbn: newIsbn,
        book_data: booksData[0],
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

  return {
    userISBNs,
    getUserISBNsData,
    getBooksData,
    startSubscribe,
    addBook,
    deleteBook,
  };
};
