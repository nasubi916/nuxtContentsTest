type UserBooks = {
  id: string;
  user_id: string;
  isbn: string;
  created_at: string;
  book_data: BookData;
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
};

type Payload = {
  new: UserBooks;
  old: UserBooks;
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
