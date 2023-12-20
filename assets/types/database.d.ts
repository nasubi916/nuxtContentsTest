type UserISBN = {
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
};

type Payload = {
  new: UserISBN;
  old: UserISBN;
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
