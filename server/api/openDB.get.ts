export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${query.isbn}`)
  const data = await res.json()
  return data
})
