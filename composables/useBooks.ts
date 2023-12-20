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
    console.log(data.value);
    const booksData = data.value.map((book: BookResponse): BookData => {
      let author: string =
        book.onix.DescriptiveDetail.Contributor[0].PersonName.content;
      const authorArray = author.split(",");
      if (authorArray.length > 1)
        author = authorArray[0] + " " + authorArray[1];
      return {
        isbn: book.onix.RecordReference,
        title:
          book.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText
            .content,
        author,
        publisher: book.onix.PublishingDetail.Imprint.ImprintName,
        label: book.summary.series ?? "",
        date: book.onix.PublishingDetail.PublishingDate[0].Date,
        price: book.onix.ProductSupply.SupplyDetail.Price[0].PriceAmount,
        page: book.onix.DescriptiveDetail?.extent?.[0]?.extentValue ?? 0,
      };
    });
    console.log(booksData);
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
