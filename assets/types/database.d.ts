type Users_isbn = {
  id: number;
  user_id: string;
  isbn: string;
  created_at: string;
};

type PayloadUsers_isbn = {
  new: Users_isbn;
  old: Users_isbn;
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
