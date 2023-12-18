type UsersISBN = {
  id: number;
  user_id: string;
  isbn: string;
  created_at: string;
};

type Payload = {
  new: UsersISBN;
  old: UsersISBN;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  schema: "public";
  table: "users_isbn";
  commit_timestamp: string;
  data: {
    id: number;
    user_id: string;
    isbn: string;
    created_at: string;
  };
  error: null | any;
};
