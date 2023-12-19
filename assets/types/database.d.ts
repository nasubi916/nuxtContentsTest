type UserISBN = {
  id: number;
  user_id: string;
  isbn: string;
  created_at: string;
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
  };
  error: null | any;
};
