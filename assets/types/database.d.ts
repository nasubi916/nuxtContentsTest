type UserBook = {
  id: string;
  user_id: string;
  isbn: string;
  state: string;
  book_data: BookData;
  created_at: string;
};

type BookData = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  label: string;
  date: string;
  price: number;
  page: number;
  cover: string;
};

type Payload = {
  new: UserBook;
  old: UserBook;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  schema: "public";
  table: "user_isbn";
  commit_timestamp: string;
  data: {
    id: number;
    user_id: string;
    isbn: string;
    created_at: string;
    book_data?: BookData;
  };
  error: null | any;
};
