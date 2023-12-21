export default defineEventHandler(
  async (event): Promise<string | undefined> => {
    const query = getQuery(event);
    const res = await fetch(`https://iss.ndl.go.jp/thumbnail/${query.isbn}`);
    if (res.status === 404 || res.status === 500) {
      return undefined;
    }
    const data = await res.text();
    return data;
  },
);
