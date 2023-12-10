export default defineEventHandler(async (event) => {
  const baseUrl = "https://api.openbd.jp/v1/get";

  const url = `${baseUrl}?${new URLSearchParams()}`;
  const res = await fetch(url);
  return res
})
